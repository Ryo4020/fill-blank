<template>
  <div class="edit">
    <!-- 上に固定 -->
    <ArrowToHome />

    <div class="edit-message">グループ {{ testGroupData.name }} の問題一覧</div>
    <SearchForm @search-event="search" />
    <div class="button-wrapper">
      <CommonButton label="新規追加" @click-event="addQuestion" />
    </div>
    <TableComponent
      :headerList="editTableList"
      :operatorList="editOperatorList"
      :data="testGroupData.value"
      @click-row="opeQuestion"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

import ArrowToHome from "@/components/atoms/ArrowToHome.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";
import SearchForm from "@/components/molecules/SearchForm.vue";
import TableComponent, {
  PropHomeDataType as IgroupType,
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

    const testGroupData = ref<IgroupType>(
      // 試験的な問題グループデータ
      {
        id: 1,
        name: "test1",
        value: [
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
        ],
        total: 2,
      }
    );

    function search(searchWord: string): void {
      // 問題を検索
      console.log(searchWord);
    }

    const store = useStore();

    function addQuestion(): void {
      // 問題の新規追加
      store.dispatch("modal/setModal", "AddQuestionForm");
    }

    function opeQuestion(dataId: number, operatorKey: string): void {
      // 押されたボタンの種類で分岐
      console.log(dataId);
      switch (operatorKey) {
        case "edit": // グループの問題を編集
          store.dispatch("modal/setModal", "EditQuestionForm");
          break;
        case "delete": // グループを削除
          store.dispatch("modal/setModal", "ConfirmDelete");
          break;
      }
    }

    return {
      editTableList,
      editOperatorList,

      testGroupData,

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
    "..... msg    ....." 30px
    "..... search add  " 36px
    "table table  table" calc(100% - 66px)
    / minmax(80px, 4fr) minmax(320px, 560px) minmax(80px, 3fr);
  gap: 14px;
  position: relative;
  padding: 24px;

  .arrow-home {
    position: absolute;
    top: 16px;
    left: 16px;
  }

  &-message {
    grid-area: msg;
    font-size: 20px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
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

@media screen and (max-width: 556px) {
  // 幅が狭い場合はメッセージが「一覧に戻る」の下に入る
  .edit {
    grid-template:
      "..... ...... ....." 16px
      "msg   msg    msg  " 30px
      "..... search add  " 36px
      "table table  table" calc(100% - 66px)
      / 1fr minmax(160px, 320px) 80px;
    column-gap: 8px;
  }
}
</style>