<template>
  <div class="app">
    <GlobalHeader :linkLabel="linkLabel" />
    <router-view />
    <Modal v-show="$store.state.modal.isOpening" />
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from "vue";
import { useStore } from "vuex";

import GlobalHeader from "@/components/layouts/GlobalHeader.vue";
import Modal from "@/components/organisms/Modal/index.vue";

export default defineComponent({
  name: "App",
  components: {
    GlobalHeader,
    Modal,
  },
  setup() {
    const store = useStore();

    const isAuthed: ComputedRef<boolean> = computed(() => store.state.auth.isAuthed); // 認証されているかどうか
    const linkLabel = computed(() => // アカウント状態変更リンクの表示文字
      isAuthed.value ? "ログアウト" : "ログイン"
    );

    store.dispatch("auth/onAuthChanged"); // 認証変化の検知
    store.dispatch("modal/closeModal"); // 初期はモーダル閉じる

    return {
      linkLabel,
    };
  },
});
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html,
body,
#app,
.app {
  width: 100%;
  height: 100%;
  margin: 0px;
}
</style>