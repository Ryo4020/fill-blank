<template>
  <div class="home">
    <TableComponent
      :headerList="homeTableList"
      :operatorList="homeOperatorList"
      :data="groupList"
      @click-row="opeGroup"
    />
    <div class="button-wrapper">
      <CommonButton label="新規追加" @click-event="addGroup" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import CommonButton from "@/components/atoms/CommonButton.vue";
import TableComponent, {
  PropHomeDataType as IgroupType,
} from "@/components/organisms/Table/index.vue";

import { HOME_TABLE_LIST, HOME_TABLE_OPERATOR_LIST } from "@/mixins/tableLists";

export default defineComponent({
  name: "Home",
  components: {
    CommonButton,
    TableComponent,
  },
  setup() {
    const homeTableList = HOME_TABLE_LIST; // 表の列データ
    const homeOperatorList = HOME_TABLE_OPERATOR_LIST; // 表のボタンのデータ

    const groupList = ref<IgroupType[]>([
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
    ]);

    function addGroup(): void { // グループの新規追加
      console.log("addGroup");
    }

    function opeGroup(dataId: number, operatorKey: string): void {
      // 押されたボタンの種類で分岐
      console.log(dataId, operatorKey);
    }

    return {
      homeTableList,
      homeOperatorList,
      groupList,
      addGroup,
      opeGroup,
    };
  },
});
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: calc(100% - 72px); //ヘッダーの分引く
  display: grid;
  grid-template-rows: calc(100% - 48px) 32px;
  row-gap: 16px;
  padding: 24px;

  .button-wrapper {
    text-align: center;
  }
}
</style>