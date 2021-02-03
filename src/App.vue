<template>
  <div class="app">
    <GlobalHeader :linkLabel="linkLabel" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import GlobalHeader from "@/components/layouts/GlobalHeader.vue";

export default defineComponent({
  name: "App",
  components: {
    GlobalHeader,
  },
  setup() {
    const linkLabel = ref<string>("ログイン"); // アカウント状態変更リンクの表示文字

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