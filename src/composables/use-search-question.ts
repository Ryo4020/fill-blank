import { computed, ComputedRef, ref } from 'vue';

import { IquestionData } from '@/mixins/defaultQuestion';

export default function useSearchQuestion(questionDataList: ComputedRef<IquestionData[]>) {
    const searchWord = ref<string>(""); // 検索ワード
    const search = (word: string) => {
        // 検索ワードを更新
        searchWord.value = word;
    };
    const filteredQuestionList: ComputedRef<IquestionData[]> = computed( // 表示する問題のリストデータ
        () => questionDataList.value.filter((item) => {
            const result: number = item.text.indexOf(searchWord.value); // ワードが一致した最初のインデックス
            return result !== -1;
        })
    );

    return {
        searchWord,
        search,
        filteredQuestionList,
    };
}