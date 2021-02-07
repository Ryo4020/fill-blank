<template>
  <div class="table">
    <TableHeader :header="headerList" />
    <TableContent :data="data" :row="headerList" :operator="operatorList" @click-row="clickRow" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from "vue";

import TableHeader from "@/components/organisms/Table/TableHeader.vue";
import TableContent, { PropHomeDataType, PropEditDataType } from "@/components/organisms/Table/TableContent.vue";

import { ItableContent, ItableOperator } from "@/mixins/tableLists";

export default defineComponent({
  name: "TableComponent",
  components: {
    TableHeader,
    TableContent,
  },
  props: {
    headerList: { // 表の項目の配列
      type: Array as PropType<ItableContent[]>,
      required: true,
    },
    operatorList: { // 列のボタンの配列
      type: Array as PropType<ItableOperator[]>,
      required: false,
    },
    data: { // 表のデータの配列
      type: Array as PropType<PropHomeDataType[] | PropEditDataType[]>,
      required: true,
    },
  },
  emits: ["click-row"],
  setup(props, context: SetupContext) {

    function clickRow(dataId: number, operatorKey: string): void {
      context.emit("click-row", dataId, operatorKey);
    }

    return {
      clickRow,
    };
  },
});
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
}
</style>