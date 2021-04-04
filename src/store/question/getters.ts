import { GetterTree } from "vuex";
import { IquestionState } from "./models";
import { RootState } from "../RootState";

import { IquestionData } from "@/mixins/defaultQuestion";

export const getters: GetterTree<IquestionState, RootState> = {
    getQuestionData(state: IquestionState): IquestionData { // 編集中の問題データ
        const index = state.questionDataList.findIndex(({ id }) => id === state.currentQuestionId);
        return state.questionDataList[index];
    },
};
