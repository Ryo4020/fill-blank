<template>
  <ModalFrame size="L">
    <template v-slot:header>
      <div class="header-label">新規追加</div>
    </template>
    <template v-slot:content>
      <div class="content-description">説明</div>
      <TextArea v-model="questionText" label="ここに問題文を入力" />
    </template>
    <template v-slot:footerLeft>
      <div></div>
    </template>
    <template v-slot:footerRight>
      <div class="button-wrapper">
        <CommonButton label="追加" @click-event="addQuestion" />
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
  name: "AddQuestionForm",
  components: {
    ModalFrame,
    TextArea,
    CommonButton,
  },
  setup() {
    const store = useStore();

    const questionText = ref<string>(""); // 入力される問題文

    function closeModal(): void {
      // モーダル閉じる処理
      store.dispatch("modal/closeModal");
    }

    function addQuestion(): void {
      // グループを追加
      console.log("追加");
      closeModal();
    }

    return {
      questionText,
      addQuestion,
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

.button-wrapper {
  width: 100%;
  text-align: center;
}
</style>