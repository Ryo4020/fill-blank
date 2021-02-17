<template>
  <ModalFrame size="L">
    <template v-slot:header>
      <div class="header-label">編集</div>
    </template>
    <template v-slot:content>
      <div class="content-description">説明</div>
      <TextArea v-model="questionText" label="ここに問題文を入力" />
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

    const questionText = ref<string>(""); // 試験的な編集される問題文

    function closeModal(): void {
      // モーダル閉じる処理
      store.dispatch("modal/closeModal");
    }

    function back(): void { // キャンセル
      console.log("もどる");
      closeModal();
    }

    function updateQuestion(): void {
      // グループを更新
      console.log("変更");
      closeModal();
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
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: silver;
}

.footer-wrapper {
  width: 50%;
  text-align: center;
}
</style>