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
  updateText(state: IquestionState, payload: { text: string; index: number }): void { // 問題文変更
    state.questionDataList[payload.index].text = payload.text;
  },
  updateTotal(state: IquestionState, payload: { total: number; index: number }): void { // 問題の空白数変更
    state.questionDataList[payload.index].total = payload.total;
  },
};
