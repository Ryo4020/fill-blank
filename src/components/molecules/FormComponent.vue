<template>
  <div class="form-component">
    <div class="form-component-label">{{ form.label }}</div>
    <component
      :is="form.formType"
      v-model="formValue"
      @input="changeValue"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, SetupContext } from "vue";

import TextField from "@/components/atoms/TextField.vue";
import PasswordField from "@/components/atoms/PasswordField.vue";

export type PropFormType = {
  id: number;
  label: string;
  value: string;
  formType: string;
};

export default defineComponent({
  name: "FormComponent",
  components: {
    TextField,
    PasswordField,
  },
  props: {
    form: {
      type: Object as PropType<PropFormType>, // フォームのデータ
      required: true,
    },
  },
  emits: ["change-value"],
  setup(props, context: SetupContext) {
    const formValue = ref<string>(props.form.value); // v-modelで変更される

    function changeValue(): void { // 変更をされると発火
      context.emit("change-value", formValue.value, props.form.id);
    }

    return {
      formValue,
      changeValue,
    };
  },
});
</script>

<style lang="scss" scoped>
.form-component {
  width: 100%;
  padding: 8px;
  &-label {
    font-size: 20px;
  }
}
</style>