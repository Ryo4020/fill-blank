<template>
  <div class="app">
    <GlobalHeader :linkLabel="linkLabel" />
    <router-view />
    <Modal v-show="$store.state.modal.isOpening" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount } from "vue";
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

    const isAuthed = computed(() => store.state.auth.isAuthed);
    const linkLabel = computed(() => isAuthed.value ? "ログアウト" : "ログイン"); // アカウント状態変更リンクの表示文字

    onBeforeMount(() => {
      store.dispatch("auth/onAuthChanged");
      store.dispatch("modal/closeModal");
    })

    return {
      linkLabel
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