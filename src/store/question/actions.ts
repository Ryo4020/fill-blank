import { ActionTree } from "vuex";
import { IquestionState } from "./models";
import { RootState } from "../RootState";

import firebase from "firebase/app";
import "firebase/firestore";

import {
  DEFAULT_QUESTION_LIST, IquestionData
} from "@/mixins/defaultQuestion";

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
      const groupDocId: string = context.rootGetters["group/getGroupDocId"];
      const userQuestionList: firebase.firestore.DocumentData[] = [];
      await firebase.firestore().collection('users').doc(userUid).collection('group').doc(groupDocId).collection('question').orderBy("id").get()
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
    const groupDocId: string = context.rootGetters["group/getGroupDocId"];
    const groupDocRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> = firebase.firestore().collection('users').doc(userUid).collection('group').doc(groupDocId);

    // 最後の問題IDをdbから取得
    let lastId = 0; // まだ存在しない場合はデフォルト値の0
    await groupDocRef.collection('question').orderBy('id', 'desc').limit(1).get().then((doc) => {
      doc.forEach(element => {
        lastId = element.data().id;
      });
    });

    const questionData: IquestionData = { id: lastId + 1, ...payload };
    await groupDocRef.collection('question').add(questionData)
      .then()
      .catch((error) => {
        console.log(error);
      });

    context.dispatch("setQuestionDataList");
    context.dispatch("group/updateTotal", { docRef: groupDocRef, mode: "add" }, { root: true }); // グループの問題数データ加算
  },
  async deleteQuestion(context): Promise<void> { // 問題削除
    const userUid = context.rootGetters["auth/getUserUid"];
    const groupDocId: string = context.rootGetters["group/getGroupDocId"];
    const groupDocRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> = firebase.firestore().collection('users').doc(userUid).collection('group').doc(groupDocId);

    await groupDocRef.collection('question').where("id", "==", context.state.currentQuestionId).get() // idでクエリ
      .then((doc) => {
        doc.forEach(element => {
          element.ref.delete().then(() => { // 該当ドキュメント削除
            alert("削除できました");
          });
        });
      });

    context.dispatch("setQuestionDataList");
    context.dispatch("group/updateTotal", { docRef: groupDocRef, mode: "delete" }, { root: true }); // グループの問題数データ減算
  },
  async updateQuestion(context, payload: { text: string; total: number }): Promise<void> { // 問題分の更新
    // dbのグループドキュメント取得
    const userUid = context.rootGetters["auth/getUserUid"];
    const groupDocId: string = context.rootGetters["group/getGroupDocId"];
    const groupDocRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> = firebase.firestore().collection('users').doc(userUid).collection('group').doc(groupDocId);

    await groupDocRef.collection('question').where("id", "==", context.state.currentQuestionId).get() // idでクエリ
      .then((doc) => {
        doc.forEach(element => {
          element.ref.update(payload).then(() => { // 該当ドキュメント更新
            alert("更新できました");
          });
        });
      });

    context.dispatch("setQuestionDataList");
  },
  error({ commit }, payload: string): void {
    commit("setErrorMessage", payload);
  },
};