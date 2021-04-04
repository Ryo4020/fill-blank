<template>
  <button @click="clickButton">{{ label }}</button>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from "vue";

export default defineComponent({
  name: "CommonButton",
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  emits: ["click-event"],
  setup(props, context: SetupContext) {
    
    function clickButton(): void {
      context.emit("click-event");
    }

    return {
      clickButton
    };
  },
});
</script>

<style lang="scss" scoped>
button {
  min-width: 64px;
  height: 32px;
  font-size: 16px;
  font-weight: bold;
  background: rgb(240, 240, 240);
  border: 2px solid black;
  outline: none;
  cursor: pointer;

  &:hover {
    color: white;
    background: gray;
  }
}
</style>