<template>
  <div class="top-link">
    <div class="top-link-label">{{ label }}</div>
    <img :src="require(`@/assets/icons/${iconName}.svg`)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

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
  setup(props) {
    const iconName = computed(() =>  props.label === "ログイン" ? "log-in" : "log-out"); // ログイン状況でiconを変更

    return {
      iconName,
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