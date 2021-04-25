import { ActionTree } from "vuex";
import { IgroupState } from "./models";
import { RootState } from "../RootState";

import firebase from "firebase/app";
import "firebase/firestore";

import {
  DEFAULT_GROUP_LIST, DEFAULT_QUESTION_LIST, IgroupData, IquestionData
} from "@/mixins/defaultQuestion";

export const actions: ActionTree<IgroupState, RootState> = {
  initDefaultGroup({ dispatch }, payload: string): void { // 新規登録後firestoreにグループコレクション追加
    const defaultGroupList = DEFAULT_GROUP_LIST;
    const defaultQuestionList: IquestionData[][] = DEFAULT_QUESTION_LIST;

    for (let i = 0; i < defaultGroupList.length; i++) {
      const groupDocRef = firebase.firestore().collection('users').doc(payload).collection('group').doc(); // usersのドキュメント下のgroupサブコレクションのドキュメント
      groupDocRef.set(defaultGroupList[i]); // グループコレクションのドキュメントIDはランダム

      const subQCollectionRef = groupDocRef.collection('question'); // グループコレクション下にクエスチョンサブコレクション追加
      dispatch("question/initDefaultQuestion", { collectionRef: subQCollectionRef, list: defaultQuestionList[i] }, { root: true });
    }
  },
  async setGroupDataList(context): Promise<void> { // アカウントのグループデータをvuexに
    if (context.rootState.auth.isAuthed) {
      const userUid = context.rootGetters["auth/getUserUid"];
      const userGroupList: firebase.firestore.DocumentData[] = [];
      await firebase.firestore().collection('users').doc(userUid).collection('group').orderBy('id').get()
        .then((doc) => {
          doc.forEach(element => {
            userGroupList.push(element.data()); // 取得したデータを配列に
          });
        })
        .catch((error) => {
          console.log(error);
        });

      context.commit("setGroupData", userGroupList);
    } else {
      // ログアウト状態の時は、デフォルト値を設定
      const defaultGroupList: IgroupData[] = DEFAULT_GROUP_LIST;
      context.commit("setGroupData", defaultGroupList);
    }
  },
  async addGroup(context, payload: string): Promise<void> { // グループ新規追加
    // 今あるグループIDの最後を取得
    const userUid = context.rootGetters["auth/getUserUid"];
    let lastId = 0; // まだ存在しない場合は初期値の0
    await firebase.firestore().collection('users').doc(userUid).collection('group').orderBy('id', 'desc').limit(1).get().then((doc) => {
      doc.forEach(element => {
        lastId = element.data().id;
      });
    });

    // 新グループをdbに追加
    const newGroup: IgroupData = { id: lastId + 1, name: payload, total: 0 };
    await firebase.firestore().collection('users').doc(userUid).collection('group').add(newGroup);

    // vuexを更新
    const groupData: IgroupData[] = context.state.groupDataList;
    context.commit("setGroupData", [...groupData, newGroup]);
  },
  async deleteGroup(context): Promise<void> { // グループ削除
    const userUid = context.rootGetters["auth/getUserUid"];
    let docId = "";
    const groupCollectionRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> = firebase.firestore().collection('users').doc(userUid).collection('group');

    await groupCollectionRef.where("id", "==", context.state.currentGroupId).get() // idでクエリ
      .then((querySnapshot) => {
        querySnapshot.forEach(doc => {
          docId = doc.id; // ドキュメントID取得

          doc.ref.delete().then(() => { // 該当ドキュメント削除
            alert("削除できました");
          }).catch((error) => {
            alert("削除できませんでした");
            console.log(error);
          });
        });
      });

    // vuexを更新
    const groupData: IgroupData[] = context.state.groupDataList;
    const index = groupData.findIndex(({ id }) => id === context.state.currentGroupId);
    context.commit("setGroupData", groupData.splice(index, 1));

    context.dispatch("deleteSubCollection", groupCollectionRef.doc(docId)); // グループ削除後の問題データ削除
  },
  deleteSubCollection(context, payload: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>): void {
    // グループ下のクエスションサブコレクションの削除
    payload.collection('question').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
  },
  async updateTotal(context, payload: { docRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>; mode: string }): Promise<void> {
    // 問題追加削除後にグループの問題数変更
    const questionTotal: number = context.getters.getGroupTotal;
    if (payload.mode === "add") { // 増加後に加算
      await payload.docRef.update({ total: questionTotal + 1 });
    } else { // 削除後に減算
      await payload.docRef.update({ total: questionTotal - 1 });
    }

    context.dispatch("setGroupDataList");
  },
  error({ commit }, payload: string): void {
    commit("setErrorMessage", payload);
  },
};