import {
    IquestionData
} from "@/mixins/defaultQuestion";

export interface IquestionState {
    questionDataList: IquestionData[];
    currentQuestionId: number;
}

export class QuestionState implements IquestionState {
    questionDataList = []; // 作業中グループの問題リスト

    currentQuestionId = 0; // 作業中問題のid
}