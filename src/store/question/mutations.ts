import { MutationTree } from "vuex";
import { QuestionState, IquestionState } from "./models";

import { IquestionData } from "@/mixins/defaultQuestion";

export const mutations: MutationTree<IquestionState> = {
  // 初期化
  init(state: IquestionState) {
    Object.assign(state, new QuestionState());
  },
  setQuestionData(state: IquestionState, payload: IquestionData[]): void { // 問題データ変更
    state.questionDataList = payload;
  },
  setQuestionId(state: IquestionState, payload: number): void { // 問題ID変更
    state.currentQuestionId = payload;
  },
  setDeleteState(state: IquestionState, payload: boolean): void { // 削除対象かを変更
    state.deletingQuestion = payload;
  },
};
