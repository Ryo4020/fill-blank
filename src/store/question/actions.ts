import { ActionTree } from "vuex";
import { IquestionState } from "./models";
import { RootState } from "../RootState";

import firebase from "firebase/app";
import "firebase/firestore";

import {
  DEFAULT_QUESTION_LIST, IquestionData
} from "@/mixins/defaultQuestion";

async function getGroupDocRef(userUid: string, groupId: number): Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>> { // 操作するグループドキュメント取得
  let docId = "";
  const groupCollectionRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> = firebase.firestore().collection('users').doc(userUid).collection('group');

  await groupCollectionRef.where("id", "==", groupId).get() // idでクエリ
    .then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        docId = doc.id; // ドキュメントID取得
      });
    });
  return groupCollectionRef.doc(docId);
}

export const actions: ActionTree<IquestionState, RootState> = {
  initDefaultQuestion(context, payload: { collectionRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>; list: IquestionData[] }): void {
    // クエスチョンサブコレクションにドキュメント追加
    for (const j in payload.list) {
      payload.collectionRef.add(payload.list[j]); // クエスチョンコレクションのドキュメントIDは自動生成
    }
  },
  async setQuestionDataList(context): Promise<void> { // 指定のグループの問題リストを取得してvuexに
    if (context.rootState.auth.isAuthed) {
      const userUid = context.rootGetters["auth/getUserUid"];
      const userQuestionList: firebase.firestore.DocumentData[] = [];
      const groupDocRef = await getGroupDocRef(userUid, context.rootState.group.currentGroupId);

      await groupDocRef.collection('question').orderBy("id").get()
        .then((doc) => {
          doc.forEach(element => {
            userQuestionList.push(element.data()); // 取得したデータを配列に
          });
        })
        .catch((error) => {
          console.log(error);
        });

      context.commit("setQuestionData", userQuestionList);
    } else {
      // ログアウト状態の時は、デフォルト値を設定
      const defaultQuestionList: IquestionData[][] = DEFAULT_QUESTION_LIST;
      const questionIndex: number = context.rootState.group.currentGroupId - 1;
      context.commit("setQuestionData", defaultQuestionList[questionIndex]);
    }
  },
  async addQuestion(context, payload: { text: string; total: number }): Promise<void> { // 問題を追加
    const userUid = context.rootGetters["auth/getUserUid"];
    const groupDocRef = await getGroupDocRef(userUid, context.rootState.group.currentGroupId);

    // 最後の問題IDをdbから取得
    let lastId = 0; // まだ存在しない場合はデフォルト値の0
    await groupDocRef.collection('question').orderBy('id', 'desc').limit(1).get().then((doc) => {
      doc.forEach(element => {
        lastId = element.data().id;
      });
    });

    // dbに問題ドキュメント追加
    const newQuestion: IquestionData = { id: lastId + 1, ...payload };
    await groupDocRef.collection('question').add(newQuestion)
      .then(() => {
        context.dispatch("group/updateTotal", { docRef: groupDocRef, mode: "add" }, { root: true }); // グループの問題数データ加算
      })
      .catch((error) => {
        console.log(error);
      });

    // vuexを更新
    const questionData: IquestionData[] = context.state.questionDataList;
    context.commit("setQuestionData", [...questionData, newQuestion]);
  },
  async deleteQuestion(context): Promise<void> { // 問題削除
    const userUid = context.rootGetters["auth/getUserUid"];
    const groupDocRef = await getGroupDocRef(userUid, context.rootState.group.currentGroupId);

    await groupDocRef.collection('question').where("id", "==", context.state.currentQuestionId).get() // idでクエリ
      .then((doc) => {
        doc.forEach(element => {
          element.ref.delete().then(() => { // 該当ドキュメント削除
            context.dispatch("group/updateTotal", { docRef: groupDocRef, mode: "delete" }, { root: true }); // グループの問題数データ減算
          });
        });
      });

    // vuexを更新
    const questionData: IquestionData[] = context.state.questionDataList;
    const index = context.state.questionDataList.findIndex(({ id }) => id === context.state.currentQuestionId);
    context.commit("setQuestionData", questionData.splice(index, 1));
  },
  async updateQuestion(context, payload: { text: string; total: number }): Promise<void> { // 問題分の更新
    // dbのグループドキュメント取得
    const userUid = context.rootGetters["auth/getUserUid"];
    const groupDocRef = await getGroupDocRef(userUid, context.rootState.group.currentGroupId);

    await groupDocRef.collection('question').where("id", "==", context.state.currentQuestionId).get() // idでクエリ
      .then((doc) => {
        doc.forEach(element => {
          element.ref.update(payload).then(() => { // 該当ドキュメント更新
            alert("更新できました");
          });
        });
      });

    // vuexを更新
    const index = context.state.questionDataList.findIndex(({ id }) => id === context.state.currentQuestionId);
    context.commit("updateText", { text: payload.text, index: index });
    context.commit("updateTotal", { total: payload.total, index: index });
  },
  error({ commit }, payload: string): void {
    commit("setErrorMessage", payload);
  },
};