<template>
  <div class="top-link" @click="openModal">
    <div class="top-link-label">{{ label }}</div>
    <img :src="require(`@/assets/icons/${iconName}.svg`)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from 'vuex';

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
    const store = useStore();

    const iconName = computed(() =>  props.label === "ログイン" ? "log-in" : "log-out"); // ログイン状況でiconを変更

    function openModal(): void { // モーダルを開く処理
      const modalName: string = props.label === "ログイン" ? "LogInForm" : "ConfirmLogOut";
      store.dispatch("modal/setModal", modalName);
    }

    return {
      iconName,
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