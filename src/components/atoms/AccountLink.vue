<template>
  <div class="top-link">{{ label }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AccountLink",
  props: {
    label: {
      type: String,
      required: true,
      validator: (value: string) => {
        // プロパティの値は、必ずいずれかの文字列でなければならない
        return ["ログイン", "ログアウト"].indexOf(value) !== -1;
      },
    },
  },
});
</script>

<style lang="scss" scopped>
.top-link {
  font-size: 18px;
  color: black;
  cursor: pointer;

  &:hover {
    color: gray;
    border-bottom: 1px solid gray;
  }
}
</style>