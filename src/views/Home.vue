<template>
  <div class="home">
    <TableComponent
      :headerList="homeTableList"
      :operatorList="homeOperatorList"
      :data="groupList"
      @click-row="clickRow"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TableComponent from "@/components/organisms/Table/index.vue";

import { HOME_TABLE_LIST, HOME_TABLE_OPERATOR_LIST } from "@/mixins/tableLists";

export default defineComponent({
  name: "Home",
  components: {
    TableComponent,
  },
  setup() {
    const homeTableList = HOME_TABLE_LIST; // 表の列データ
    const homeOperatorList = HOME_TABLE_OPERATOR_LIST; // 表のボタンのデータ

    const groupList = [
      // 試験的な問題グループデータ
      {
        id: 1,
        name: "test1",
        value: [],
        total: 2,
      },
      {
        id: 2,
        name: "test2",
        value: [],
        total: 3,
      },
    ];

    function clickRow(dataId: number, operatorKey: string): void { // 押されたボタンの種類で分岐
      console.log(dataId, operatorKey);
    }

    return {
      homeTableList,
      homeOperatorList,
      groupList,
      clickRow,
    };
  },
});
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: calc(100% - 72px); //ヘッダーの分引く
  padding: 28px;
}
</style>