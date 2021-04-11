import { computed, ComputedRef, ref } from 'vue';

import { IquestionData } from '@/mixins/defaultQuestion';

export default function useExerciseQuestion(questionList: ComputedRef<IquestionData[]>) {
    const questionId = ref<number>(0); // 実行中の問題番号（初めは０）

    const questionTextArray = computed(() =>
        // 問題文を空白とその他で分割して配列に
        questionList.value[questionId.value].text.split("｜")
    );

    const isBlankOpenedList = ref<boolean[]>([]); // 表示状態を順にした配列
    const setIsBlankOpend = () => {
         // 全ての空欄を隠す処理
        const blankTotal: number = questionList.value[questionId.value].total;
        isBlankOpenedList.value.splice(-isBlankOpenedList.value.length);
        for (let i = 0; i < blankTotal; i++) {
            isBlankOpenedList.value[i] = false;
        }
    };
    const getIsBlankOpened = (id: number) => {
        // 表示状態の取得
        return isBlankOpenedList.value[(id + 1) / 2 - 1];
    };

    const shiftBlankState = (id: number) => {
        // 空白の答え表示の切り替え
        isBlankOpenedList.value[id - 1] = !isBlankOpenedList.value[id - 1];
    };

    const openAll = () => {
        // 全ての解答を表示
        isBlankOpenedList.value.fill(true);
    };

    const back = () => {
        // 前の問題に移る
        questionId.value--;
        if (questionId.value === -1) {
            questionId.value = questionList.value.length - 1;
        }
        setIsBlankOpend(); // 全て空欄に
    };

    const next = () => {
        // 次の問題に移る
        questionId.value++;
        if (questionId.value === questionList.value.length) {
            questionId.value = 0;
        }
        setIsBlankOpend(); // 全て空欄に
    };

    return {
        questionTextArray,

        // 空欄
        setIsBlankOpend,
        getIsBlankOpened,
        shiftBlankState,

        // 問題推移
        back,
        openAll,
        next,
    };
}