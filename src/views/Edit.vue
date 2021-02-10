<template>
  <div class="edit">
    <!-- 左上に固定 -->
    <ArrowToHome />
    
    <SearchForm @search-event="search" />
    <div class="button-wrapper">
      <CommonButton label="新規追加" @click-event="addQuestion" />
    </div>
    <TableComponent
      :headerList="editTableList"
      :operatorList="editOperatorList"
      :data="questionList"
      @click-row="opeQuestion"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import ArrowToHome from "@/components/atoms/ArrowToHome.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";
import SearchForm from "@/components/molecules/SearchForm.vue";
import TableComponent, {
  PropEditDataType,
} from "@/components/organisms/Table/index.vue";

import { EDIT_TABLE_LIST, EDIT_TABLE_OPERATOR_LIST } from "@/mixins/tableLists";

export default defineComponent({
  name: "Edit",
  components: {
    ArrowToHome,
    CommonButton,
    SearchForm,
    TableComponent,
  },
  setup() {
    const editTableList = EDIT_TABLE_LIST; // 表の列データ
    const editOperatorList = EDIT_TABLE_OPERATOR_LIST; // 表のボタンのデータ

    const questionList = ref<PropEditDataType[]>([
      // 試験的な問題データ
      {
        id: 1,
        text: "sample1",
        total: 2,
      },
      {
        id: 2,
        text: "sample2",
        total: 3,
      },
    ]);

    function search(searchWord: string): void {
      // 問題を検索
      console.log(searchWord);
    }

    function addQuestion(): void {
      // 問題の新規追加
      console.log("add");
    }

    function opeQuestion(dataId: number, operatorKey: string): void {
      // 押されたボタンの種類で分岐
      console.log(dataId, operatorKey);
    }

    return {
      editTableList,
      editOperatorList,
      questionList,
      search,
      addQuestion,
      opeQuestion,
    };
  },
});
</script>

<style lang="scss" scoped>
.edit {
  width: 100%;
  height: calc(100% - 72px); //ヘッダーの分引く
  display: grid;
  grid-template:
    "..... search add  " 36px
    "table table  table" calc(100% - 36px)
    / minmax(84px, 1fr) minmax(160px, 480px) 80px;
  gap: 14px;
  position: relative;
  padding: 24px;

  .arrow-home {
    position: absolute;
    top: 16px;
    left: 16px;
  }

  .search-form {
    grid-area: search;
  }

  .button-wrapper {
    grid-area: add;
    display: flex;
    align-items: center;
  }

  .table {
    grid-area: table;
  }
}

@media screen and (max-width: 510px) { // 幅が狭い場合は「一覧に戻る」の下に下がる
  .edit {
    grid-template:
    "..... search add  " 36px
    "table table  table" calc(100% - 36px)
    / 1fr minmax(160px, 480px) 80px;
    padding: 52px 4px 24px 4px !important;
  }
}
</style>