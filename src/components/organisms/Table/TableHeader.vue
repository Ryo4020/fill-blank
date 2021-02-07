<template>
  <div class="table-header">
    <div
      v-for="(item, index) in header"
      :key="index"
      class="table-header-item"
      :style="`width: ${item.width}%`"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { ItableContent } from "@/mixins/tableLists";

export default defineComponent({
  name: "TableHeader",
  props: {
    header: {
      // 表の項目の配列
      type: Array as PropType<ItableContent[]>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.table-header {
  width: 100%;
  height: 44px;
  background: silver;
  display: flex;

  &-item {
    height: 100%;
    color: black;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0px 8px;
    white-space: nowrap;
    overflow-x: visible;
  }
}
</style>