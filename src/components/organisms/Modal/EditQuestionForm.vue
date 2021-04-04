<template>
  <ModalFrame size="L">
    <template v-slot:header>
      <div class="header-label">編集</div>
    </template>
    <template v-slot:content>
      <div class="content-description">  空白にしたい箇所を｜（全角）で囲んで問題文を入力してください</div>
      <TextArea v-model="questionText" :row="13" label="ここに問題文を入力" />
    </template>
    <template v-slot:footerLeft>
      <div class="footer-wrapper">
        <CommonButton label="戻る" @click-event="back" />
      </div>
    </template>
    <template v-slot:footerRight>
      <div class="footer-wrapper">
        <CommonButton label="更新" @click-event="updateQuestion" />
      </div>
    </template>
  </ModalFrame>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

import ModalFrame from "@/components/organisms/Modal/ModalFrame.vue";
import TextArea from "@/components/atoms/TextArea.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";

export default defineComponent({
  name: "EditQuestionForm",
  components: {
    ModalFrame,
    TextArea,
    CommonButton,
  },
  setup() {
    const store = useStore();

    const questionText = ref<string>(
      store.getters["question/getQuestionData"].text
    ); // 編集される問題文

    function closeModal(): void {
      // モーダル閉じる処理
      store.dispatch("modal/closeModal");
    }

    function back(): void {
      // キャンセル
      closeModal();
    }

    function updateQuestion(): void {
      // グループを更新
      const blankTotal: number = Math.floor( // 空白の数
        questionText.value.split("｜").length / 2
      );
      if (blankTotal === 0) {
        alert("空欄がありません");
      } else {
        store.dispatch("question/updateQuestion", {
          text: questionText.value,
          total: blankTotal,
        });
        closeModal();
      }
    }

    return {
      questionText,
      back,
      updateQuestion,
    };
  },
});
</script>

<style lang="scss" scoped>
.header-label {
  font-size: 18px;
  font-weight: bold;
}

.content-description {
  height: 64px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: silver;
  padding: 2px;
  white-space: pre-wrap;
}

.footer-wrapper {
  width: 50%;
  text-align: center;
}
</style>