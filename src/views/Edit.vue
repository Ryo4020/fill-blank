<template>
  <div class="edit">
    <ArrowToHome />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ArrowToHome from "@/components/atoms/ArrowToHome.vue";

export default defineComponent({
  name: "Edit",
  components: {
    ArrowToHome,
  },
});
</script>

<style lang="scss" scoped>
.edit {
  width: 100%;
  height: calc(100% - 72px); //ヘッダーの分引く
  position: relative;

  .arrow-home {
      position: absolute;
      top: 16px;
      left: 16px;
  }
}
</style>