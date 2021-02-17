<template>
  <input
    type="text"
    :placeholder="label"
    :value="modelValue"
    @input="changeValue"
  />
</template>

<script lang="ts">
import { defineComponent, SetupContext } from "vue";

export default defineComponent({
  name: "TextField",
  props: {
    modelValue: {
      // 入力される文字列
      type: String,
      required: true,
    },
    label: {
      // テキストフィールドに表示する文字列
      type: String,
      default: "",
    },
  },
  emits: ["update:model-value"],
  setup(props, context: SetupContext) {

    function changeValue(e: { target: { value: string } }): void {
      // 値の変更を反映
      context.emit("update:model-value", e.target.value);
    }

    return {
      changeValue,
    };
  },
});
</script>

<style lang="scss" scoped>
input[type="text"] {
  font-size: 20px;
  width: 100%;
  height: 36px;
  background: rgb(240, 240, 240);
  padding: 4px;
  outline: none;
}
</style>