<template>
  <div class="exercise">
    <ArrowToHome />
    <div class="exercise-content">
      <div class="exercise-content-icon">Q</div>
      <div class="exercise-content-main"></div>
    </div>
    <div class="button-wrapper">
      <CommonButton label="次の問題へ" @click-event="next" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ArrowToHome from "@/components/atoms/ArrowToHome.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";

export default defineComponent({
  name: "Exercise",
  components: {
    ArrowToHome,
    CommonButton,
  },
  setup() {
    function next(): void { // 次の問題を写す
      console.log("次の問題へ");
    }

    return {
      next,
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
    grid-template-rows: 32px 1fr;
    row-gap: 2px;
    border: 1px solid black;
    margin: 0 auto; // 左右中央揃え
    padding: 8px;

    &-icon {
      width: 32px;
      height: 32px;
      background: silver;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &-main {
      width: 90%;
      background: silver;
      margin: 0 auto; // 左右中央揃え
      padding: 8px;
    }
  }

  .button-wrapper {
    text-align: center;
  }
}
</style>