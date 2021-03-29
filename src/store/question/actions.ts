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
      await firebase.firestore().collection('users').doc(userUid).collection('group').doc(groupDocId).collection('question').get()
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
  error({ commit }, payload: string): void {
    commit("setErrorMessage", payload);
  },
};