<template>
  <div class="edit">
    <!-- 上に固定 -->
    <ArrowToHome />

    <div class="edit-message">グループ {{ groupName }} の問題一覧</div>
    <SearchForm :word="searchWord" @search-event="search" />
    <div class="button-wrapper">
      <CommonButton label="新規追加" @click-event="addQuestion" />
    </div>
    <TableComponent
      :headerList="editTableList"
      :operatorList="editOperatorList"
      :data="filteredQuestionList"
      @click-row="opeQuestion"
    />
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from "vue";
import { useStore } from "vuex";

import ArrowToHome from "@/components/atoms/ArrowToHome.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";
import SearchForm from "@/components/molecules/SearchForm.vue";
import TableComponent from "@/components/organisms/Table/index.vue";

import useQuestion from "@/composables/use-question";

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

    const store = useStore();

    store.dispatch("question/setQuestionDataList"); // 問題リスト設定

    const groupName: ComputedRef<string> = computed(
      // グループネーム
      () => store.getters["group/getGroupName"]
    );

    const {
      searchWord, // 検索ワード
      search, // 検索開始
      filteredQuestionList, // 表示される問題リスト
    } = useQuestion();

    function addQuestion(): void {
      // 問題の新規追加
      store.dispatch("modal/setModal", "AddQuestionForm"); // 追加用のモーダル開く
    }

    function opeQuestion(dataId: number, operatorKey: string): void {
      // 押されたボタンの種類で分岐
      store.commit("question/setQuestionId", dataId); // 選択した問題idをvuexに
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

      groupName,

      searchWord,
      search,
      filteredQuestionList,

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
    "table table  table" calc(100% - 94px)
    / minmax(80px, 4fr) minmax(320px, 560px) minmax(92px, 3fr);
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
    text-align: right;
    padding-top: 2px; // 上下中央揃え用
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
      "table table  table" calc(100% - 106px)
      / 1fr minmax(160px, 320px) 92px;
    column-gap: 8px;
  }
}
</style>