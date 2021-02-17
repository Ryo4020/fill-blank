<template>
  <div class="table-content">
    <TableRow
      v-for="(dataItem, index) in data"
      :key="index"
      :dataItem="dataItem"
      :row="row"
      :operator="operator"
      @click-row="clickRow"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from "vue";

import TableRow, {
  PropHomeDataType,
  PropEditDataType,
} from "@/components/organisms/Table/TableRow.vue";

import { ItableContent, ItableOperator } from "@/mixins/tableLists";

export { PropHomeDataType, PropEditDataType };

export default defineComponent({
  name: "TableContent",
  components: {
    TableRow,
  },
  props: {
    data: {
      // 表のデータの配列
      type: Array as PropType<PropHomeDataType[] | PropEditDataType[]>,
      required: true,
    },
    row: {
      // 表の項目の配列
      type: Array as PropType<ItableContent[]>,
      required: true,
    },
    operator: {
      // 列のボタンの配列
      type: Array as PropType<ItableOperator[]>,
      required: false,
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
.table-content {
  height: calc(100% - 44px); //ヘッダーの分引く
  background: rgb(240, 240, 240);
  border: 1px solid silver;
  padding: 8px;
  overflow-y: scroll;
}
</style>