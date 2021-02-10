<template>
  <div class="exercise">
    <ArrowToHome />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ArrowToHome from "@/components/atoms/ArrowToHome.vue";

export default defineComponent({
  name: "Exercise",
  components: {
    ArrowToHome,
  },
});
</script>

<style lang="scss" scoped>
.exercise {
  width: 100%;
  height: calc(100% - 72px); //ヘッダーの分引く
  padding: 16px;
}
</style>