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

    const subCollectionRef = firebase.firestore().collection('users').doc(payload).collection('group'); // usersのドキュメント下のgroupサブコレクション
    for (let i = 0; i < defaultGroupList.length; i++) {
      subCollectionRef.doc("Group" + String(i + 1)).set(defaultGroupList[i]); // グループコレクションのドキュメントIDの数字はグループのidと同じ

      const subQCollectionRef = subCollectionRef.doc("Group" + String(i + 1)).collection('question'); // グループコレクション下にクエスチョンサブコレクション追加
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
    const newGroup: IgroupData = { id: lastId + 1, name: payload, total: 0 }
    await firebase.firestore().collection('users').doc(userUid).collection('group').doc("Group" + String(lastId + 1)).set(newGroup);
    context.dispatch("setGroupDataList");
  },
  async deleteGroup(context): Promise<void> { // グループ削除
    const userUid = context.rootGetters["auth/getUserUid"];
    const groupDocId: string = context.getters.getGroupDocId;
    const groupDocRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> = firebase.firestore().collection('users').doc(userUid).collection('group').doc(groupDocId);

    await groupDocRef.delete()
      .then(() => {
        alert("削除できました");
      })
      .catch((error) => {
        alert("削除できませんでした");
        console.log(error);
      });

    context.dispatch("setGroupDataList");
    context.dispatch("deleteSubCollection", groupDocRef); // グループ削除後の問題データ削除
  },
  deleteSubCollection(context, payload: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>): void {
    // グループ下のクエスションサブコレクションの削除
    payload.collection('question').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete()
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
  },
  error({ commit }, payload: string): void {
    commit("setErrorMessage", payload);
  },
};