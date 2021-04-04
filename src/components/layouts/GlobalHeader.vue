<template>
  <div class="global-header">
    <HeaderLogo />
    <div class="global-header-link">
      <AccountLink
        :label="linkLabel"
        :icon="iconName"
        @open-modal="openModal"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

import HeaderLogo from "@/components/atoms/HeaderLogo.vue";
import AccountLink from "@/components/atoms/AccountLink.vue";

export default defineComponent({
  name: "GlobalHeader",
  components: {
    HeaderLogo,
    AccountLink,
  },
  props: {
    linkLabel: {
      type: String,
      required: true,
      validator: (value: string) => {
        // プロパティの値は、必ずいずれかの文字列でなければならない
        return ["ログイン", "ログアウト"].indexOf(value) !== -1;
      },
    },
  },
  setup(props) {
    const iconName = computed(() =>
      props.linkLabel === "ログイン" ? "log-in" : "log-out"
    ); // ログイン状況でiconを変更

    const store = useStore();

    function openModal(): void {
      const modalName: string =
        props.linkLabel === "ログイン" ? "LogInForm" : "ConfirmLogOut"; // 開くモーダルの名前
      store.dispatch("modal/setModal", modalName);
    }

    return {
      iconName,
      openModal,
    };
  },
});
</script>

<style lang="scss" scoped>
.global-header {
  width: 100%;
  height: 72px;
  background: silver;
  display: flex;
  justify-content: center;
  align-items: center;

  &-link {
    position: absolute;
    right: 24px;
  }
}

@media screen and (max-width: 420px) {
  // ロゴとボタンの重なり防止
  .global-header {
    justify-content: left;
    padding-left: 24px;
  }
}
</style>