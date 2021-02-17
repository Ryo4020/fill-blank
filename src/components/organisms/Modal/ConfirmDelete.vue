<template>
  <ModalFrame size="S">
    <template v-slot:header>
      <div class="header-label">確認</div>
    </template>
    <template v-slot:content>
      <div class="content-message">削除されたデータは復元できません。本当に削除しますか？</div>
    </template>
    <template v-slot:footerLeft>
      <div class="footer-wrapper">
        <CommonButton label="いいえ" @click-event="cancel" />
      </div>
    </template>
    <template v-slot:footerRight>
      <div class="footer-wrapper">
        <CommonButton label="はい" @click-event="confirm" />
      </div>
    </template>
  </ModalFrame>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";

import ModalFrame from "@/components/organisms/Modal/ModalFrame.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";

export default defineComponent({
  name: "ConfirmDelete",
  components: {
    ModalFrame,
    CommonButton,
  },
  setup() {
    const store = useStore();

    function closeModal(): void {
      // モーダル閉じる処理
      store.dispatch("modal/closeModal");
    }

    function cancel(): void { // キャンセル
      console.log("キャンセル");
      closeModal();
    }

    function confirm(): void { // 削除確定
      console.log("削除");
      closeModal();
    }

    return {
      cancel,
      confirm,
    };
  },
});
</script>

<style lang="scss" scoped>
.header-label {
  font-size: 18px;
  font-weight: bold;
}

.content-message {
  font-size: 20px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: silver;
  padding: 0px 12px;
}

.footer-wrapper {
  width: 50%;
  text-align: center;
}
</style>