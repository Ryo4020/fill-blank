<template>
  <ModalFrame size="S">
    <template v-slot:header>
      <div class="header-label">新規追加</div>
    </template>
    <template v-slot:content>
      <FormComponent :form="addGroupData" @change-value="changeFormValue" />
    </template>
    <template v-slot:footerLeft>
      <div></div>
    </template>
    <template v-slot:footerRight>
      <div class="button-wrapper">
        <CommonButton label="追加" @click-event="addGroup" />
      </div>
    </template>
  </ModalFrame>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

import ModalFrame from "@/components/organisms/Modal/ModalFrame.vue";
import FormComponent, {
  PropFormType as IaddGroupData,
} from "@/components/molecules/FormComponent.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";

export default defineComponent({
  name: "AddGroupForm",
  components: {
    ModalFrame,
    FormComponent,
    CommonButton,
  },
  setup() {
    const addGroupData = ref<IaddGroupData>(
      // フォームのデータを格納
      {
        id: 1,
        label: "新グループ名",
        value: "",
        formType: "TextField",
      }
    );

    const store = useStore();
    
    function closeModal(): void {
      // モーダル閉じる処理
      store.dispatch("modal/closeModal");
    }

    function changeFormValue(value: string): void {
      // フォームの入力内容をデータに反映
      addGroupData.value.value = value;
    }

    function addGroup(): void {
      // グループを追加
      console.log("追加");
      closeModal();
    }

    return {
      addGroupData,
      changeFormValue,
      addGroup,
    };
  },
});
</script>

<style lang="scss" scoped>
.header-label {
  font-size: 18px;
  font-weight: bold;
}

.button-wrapper {
  width: 100%;
  text-align: center;
}
</style>