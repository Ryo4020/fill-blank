<template>
  <div class="exercise">
    <ArrowToHome />
    <div class="exercise-content">
      <div class="exercise-content-icon">Q 問題</div>
      <div class="exercise-content-main">
        <component
          v-for="(item, index) in questionTextArray"
          :key="index"
          :is="setTextComponent(index)"
          :blankId="(index + 1) / 2"
          :isOpened="getIsBlankOpened(index)"
          :text="item"
          @click-blank="shiftBlankState"
        />
      </div>
    </div>
    <div class="button-wrapper">
      <CommonButton label="すべて解答表示" @click-event="openAll" />
      <CommonButton label="次の問題へ" @click-event="next" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, ref, watch } from "vue";

import BlankComponent from "@/components/atoms/BlankComponent.vue";
import PlainText from "@/components/atoms/PlainText.vue";
import ArrowToHome from "@/components/atoms/ArrowToHome.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";

type QuestionDataType = {
  id: number;
  text: string;
  total: number;
};

export default defineComponent({
  name: "Exercise",
  components: {
    BlankComponent,
    PlainText,
    ArrowToHome,
    CommonButton,
  },
  setup() {
    const testQuestion = ref<QuestionDataType[]>([ // 試験的な問題文データ
      {
        id: 1,
        text: "$空白$aaaaaaaaaaaaaaaaaaaaaaa$空白$bbbbbbbbbbbbbbb",
        total: 2,
      },
      {
        id: 2,
        text: "$空白$aaaaaaaaaaaa$空白$bbbbbbbbbbb$空白$cccccccc",
        total: 3,
      },
    ]);
    const questionId = ref<number>(0); // 実行中の問題番号（初めは０）

    function next(): void { // 次の問題に移る
      questionId.value++;
      if (questionId.value === testQuestion.value.length) {
        questionId.value = 0;
      }
    }

    const questionTextArray = computed(() => // 問題文を空白とその他で分割して配列に
      testQuestion.value[questionId.value].text.split("$")
    );

    const setTextComponent = computed(() => { // 空白とその他で違うコンポーネントに
      return function (key: number): string {
        return key % 2 === 0 ? "PlainText" : "BlankComponent";
      };
    });

    const isBlankOpenedList = ref<boolean[]>([]); // 表示状態を順にした配列
    function setIsBlankOpend(total: number): void { // 問題が出た時に中身をfalseに
      isBlankOpenedList.value.splice(-isBlankOpenedList.value.length);
      for (let i = 0; i < total; i++) {
        isBlankOpenedList.value[i] = false;
      }
    }
    function getIsBlankOpened(id: number): boolean { // 表示状態の取得
      return isBlankOpenedList.value[(id + 1) / 2 - 1];
    }

    // Exerciseの開始時と問題番号の変更時に空欄をすべて空白に
    onMounted(() => {
      const blankTotal: number = testQuestion.value[questionId.value].total;
      setIsBlankOpend(blankTotal);
    });
    watch(questionId, (newValue: number) => {
      const blankTotal: number = testQuestion.value[newValue].total;
      setIsBlankOpend(blankTotal);
    });

    function shiftBlankState(id: number): void {
      // 空白の答え表示の切り替え
      isBlankOpenedList.value[id - 1] = !isBlankOpenedList.value[id - 1];
    }

    function openAll(): void { // 全ての解答を表示
      isBlankOpenedList.value.fill(true);
    }

    return {
      questionTextArray,
      next,

      setTextComponent,

      shiftBlankState,
      getIsBlankOpened,
      openAll,
    };
  },
});
</script>

<style lang="scss" scoped>
.exercise {
  width: 100%;
  height: calc(100% - 72px); //ヘッダーの分引く
  display: grid;
  grid-template-rows: 32px 1fr 32px;
  row-gap: 16px;
  padding: 16px;

  &-content {
    width: 90%;
    display: grid;
    grid-template-rows: 48px 1fr;
    row-gap: 2px;
    border: 1px solid black;
    margin: 0 auto; // 左右中央揃え
    padding: 8px;

    &-icon {
      width: 92px;
      height: 40px;
      font-size: 20px;
      background: silver;
      border-radius: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 4px; // 上下中央揃え用
    }

    &-main {
      width: 90%;
      background: silver;
      margin: 0 auto; // 左右中央揃え
      padding: 8px;
    }
  }

  .button-wrapper {
    width: 240px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto; // 左右中央揃え用
  }
}
</style>