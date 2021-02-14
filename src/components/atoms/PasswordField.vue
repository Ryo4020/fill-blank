<template>
  <input
    type="password"
    :placeholder="label"
    v-model="innerValue"
    @input="changeValue"
  />
</template>

<script lang="ts">
import { defineComponent, ref, SetupContext } from "vue";

export default defineComponent({
  name: "PasswordField",
  props: {
    modelValue: {
      // 入力される文字列
      type: String,
      required: true,
    },
    id: {
      // 配列を変更する場合のid
      type: Number,
      required: false,
    },
    label: {
      // テキストフィールドに表示する文字列
      type: String,
      default: "",
    },
  },
  emits: ["update:model-value"],
  setup(props, context: SetupContext) {
    const innerValue = ref<string>(props.modelValue); // v-modelで変更される

    function changeValue(): void {
      // 値の変更を反映
      context.emit("update:model-value", innerValue.value);
    }

    return {
      innerValue,
      changeValue,
    };
  },
});
</script>

<style lang="scss" scoped>
input[type="password"] {
  font-size: 20px;
  width: 100%;
  height: 36px;
  background: rgb(240, 240, 240);
  padding: 4px;
  outline: none;
}
</style>