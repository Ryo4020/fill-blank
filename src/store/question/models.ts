import {
    IquestionData
} from "@/mixins/defaultQuestion";

export interface IquestionState {
    questionDataList: IquestionData[];
    currentQuestionId: number;
    deletingQuestion: boolean;
}

export class QuestionState implements IquestionState {
    questionDataList = []; // 作業中グループの問題リスト

    currentQuestionId = 0; // 作業中問題のid
    deletingQuestion = false; // 削除対象（グループか問題）
}