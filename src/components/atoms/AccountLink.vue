<template>
  <div class="top-link" @click="openModal">
    <div class="top-link-label">{{ label }}</div>
    <img :src="require(`@/assets/icons/${ icon }.svg`)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from "vue";

export default defineComponent({
  name: "AccountLink",
  props: {
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
      validator: (value: string) => {
        // プロパティの値は、必ずいずれかの文字列でなければならない
        return ["log-in", "log-out"].indexOf(value) !== -1;
      },
    },
  },
  emits: ["open-modal"],
  setup(props, context: SetupContext) {

    function openModal(): void { // モーダルを開く処理 
      context.emit("open-modal");
    }

    return {
      openModal
    };
  },
});
</script>

<style lang="scss" scopped>
.top-link {
  display: flex;
  align-items: center;
  padding: 4px;
  &-label {
    font-size: 18px;
    color: black;
    cursor: pointer;
  }

  &:hover {
    border: 1px solid gray;
  }
}
</style>