<template>
  <div class="modal-wrapper" @click.self="closeModal">
    <component :is="$store.state.modal.path" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from 'vuex';

import LogInForm from "@/components/organisms/Modal/LogInForm.vue";
import ConfirmLogOut from "@/components/organisms/Modal/ConfirmLogOut.vue";
import ConfirmDelete from "@/components/organisms/Modal/ConfirmDelete.vue";
import AddGroupForm from "@/components/organisms/Modal/AddGroupForm.vue";
import AddQuestionForm from "@/components/organisms/Modal/AddQuestionForm.vue";
import EditQuestionForm from "@/components/organisms/Modal/EditQuestionForm.vue";

export default defineComponent({
  name: "Modal",
  components: {
    LogInForm,
    ConfirmLogOut,
    ConfirmDelete,
    AddGroupForm,
    AddQuestionForm,
    EditQuestionForm,
  },
  setup() {
    const store = useStore();

    function closeModal(): void { // モーダル閉じる処理
      store.dispatch("modal/closeModal");
    }

    return {
      closeModal
    };
  },
});
</script>

<style lang="scss" scoped>
.modal-wrapper {
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 0px 32px;
}
</style>