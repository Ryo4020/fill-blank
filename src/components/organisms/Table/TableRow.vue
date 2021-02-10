<template>
  <div class="table-row">
    <div
      class="table-row-item"
      v-for="(rowItem, index) in row"
      :key="index"
      :style="`width: ${rowItem.width}%`"
    >
      {{ dataItem[rowItem.key] }}
    </div>
    <div
      class="table-row-operator"
      v-for="(opeItem, index) in operator"
      :key="index"
      :style="`width: ${opeItem.width}%`"
    >
      <div class="table-row-operator-box" @click="clickRow(opeItem.key)">
        {{ opeItem.label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from "vue";

import { ItableContent, ItableOperator } from "@/mixins/tableLists";

export type PropHomeDataType = {
  id: number;
  name: string;
  value: PropEditDataType[];
  total: number;
};

export type PropEditDataType = {
  id: number;
  text: string;
  total: number;
};

export default defineComponent({
  name: "TableRow",
  props: {
    dataItem: {
      type: Object as PropType<PropHomeDataType | PropEditDataType>,
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

    function clickRow(operatorKey: string): void { // ボタン押すと対象のidとイベントの種類を渡す
      context.emit("click-row", props.dataItem.id, operatorKey);
    }

    return {
      clickRow,
    };
  },
});
</script>

<style lang="scss" scoped>
.table-row {
  height: 44px;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
  margin: 8px 0px;

  &-item {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 0px 8px;
  }

  &-operator {
    padding: 0px 4px;

    &-box {
      width: 100%;
      height: 100%;
      background: rgb(240, 240, 240);
      text-align: center;
      border: 2px solid black;
      white-space: nowrap;
      overflow-x: hidden;
      cursor: pointer;

      &:hover {
        color: white;
        background: gray;
      }
    }
  }
}
</style>