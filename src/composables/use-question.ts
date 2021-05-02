import { computed, ComputedRef } from 'vue';

import store from '../store';

import { IquestionData } from '@/mixins/defaultQuestion';

export default function useQuestion() {
    const questionDataList: ComputedRef<IquestionData[]> = computed( // 問題のリストデータ
        () => store.state.question.questionDataList
    );

    const addQuestion = (questionText: string) => {
        // 問題を追加
        const blankTotal: number = Math.floor( // 空白の数
            questionText.split("｜").length / 2
        );
        if (blankTotal === 0) {
            alert("空欄がありません");
        } else {
            store.dispatch("question/addQuestion", {
                text: questionText,
                total: blankTotal,
            });
            store.dispatch("modal/closeModal");
        }
    };

    const updateQuestion = (questionText: string) => {
        // 問題を更新
        const blankTotal: number = Math.floor( // 空白の数
            questionText.split("｜").length / 2
        );
        if (blankTotal === 0) {
            alert("空欄がありません");
        } else {
            store.dispatch("question/updateQuestion", {
                text: questionText,
                total: blankTotal,
            });
            store.dispatch("modal/closeModal");
        }
    };

    const deleteQuestion = () => { // 問題削除
        store.dispatch("question/deleteQuestion");
    };

    return {
        questionDataList,

        addQuestion,
        updateQuestion,
        deleteQuestion,
    };
}