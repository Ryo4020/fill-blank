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
      <CommonButton label="前の問題へ" @click-event="back" />
      <CommonButton label="すべて解答表示" @click-event="openAll" />
      <CommonButton label="次の問題へ" @click-event="next" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import BlankComponent from "@/components/atoms/BlankComponent.vue";
import PlainText from "@/components/atoms/PlainText.vue";
import ArrowToHome from "@/components/atoms/ArrowToHome.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";

import useQuestion from "@/composables/use-question";
import useExerciseQuestion from "@/composables/use-exercise-question";

export default defineComponent({
  name: "Exercise",
  components: {
    BlankComponent,
    PlainText,
    ArrowToHome,
    CommonButton,
  },
  setup() {
    const { questionDataList } = useQuestion(); // 問題のリストデータ

    const {
      questionTextArray, // 問題文を空白とその他で分割して配列に

      setIsBlankOpend, // 全ての空欄を隠す処理
      getIsBlankOpened, // 表示状態の取得
      shiftBlankState, // 空白の答え表示の切り替え

      back, // 前の問題へ
      openAll, // 全ての解答を表示
      next, // 次の問題へ
    } = useExerciseQuestion(questionDataList);

    const setTextComponent = computed(() => {
      // 空白とその他で違うコンポーネントに
      return function (key: number): string {
        return key % 2 === 0 ? "PlainText" : "BlankComponent";
      };
    });

    // Exerciseの開始時に空欄をすべて空白に
    setIsBlankOpend();

    return {
      questionTextArray,

      getIsBlankOpened,
      shiftBlankState,

      back,
      openAll,
      next,

      setTextComponent,
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
    min-width: 340px;
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
    width: 340px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto; // 左右中央揃え用
  }
}
</style>