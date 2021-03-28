<template>
  <div class="home">
    <div class="home-message">{{ userName }} さんのグループページです</div>
    <TableComponent
      :headerList="homeTableList"
      :operatorList="homeOperatorList"
      :data="groupDataList"
      @click-row="opeGroup"
    />
    <div class="button-wrapper">
      <CommonButton label="新規追加" @click-event="addGroup" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import { Router, useRouter } from "vue-router";

import CommonButton from "@/components/atoms/CommonButton.vue";
import TableComponent from "@/components/organisms/Table/index.vue";

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

    const store = useStore();
    const router: Router = useRouter();

    const isAuthed = computed(() => store.state.auth.isAuthed); // ログインしてるかどうか
    const userName = computed(() => store.state.auth.userName); // ユーザー名

    store.dispatch("question/setGroupDataList"); // dbからグループリスト取得
    const groupDataList = computed(() => store.state.question.groupDataList); // 問題グループリストのデータ

    function addGroup(): void {
      // グループの新規追加
      if (isAuthed.value) {
        // 追加するにはログイン必要
        store.dispatch("modal/setModal", "AddGroupForm");
      } else {
        alert("グループを追加するにはログインが必要です");
        store.dispatch("modal/setModal", "LogInForm");
      }
    }

    function startExercise(): void {
      // 演習開始処理
      router.push("/exercise");
    }

    function startEdit(): void {
      if (isAuthed.value) {
        // 編集するにはログイン必要
        router.push("/edit");
      } else {
        alert("問題を編集するにはログインが必要です");
        store.dispatch("modal/setModal", "LogInForm");
      }
    }

    function openConfirmDelete(): void {
      if (isAuthed.value) {
        // 削除するにはログイン必要
        store.dispatch("modal/setModal", "ConfirmDelete");
      } else {
        alert("問題を編集するにはログインが必要です");
        store.dispatch("modal/setModal", "LogInForm");
      }
    }

    function opeGroup(dataId: number, operatorKey: string): void {
      store.commit("question/setGroupId", dataId); // 選択したグループidをvuexに

      // 押されたボタンの種類で分岐
      switch (operatorKey) {
        case "exercise": // グループの問題を演習
          startExercise();
          break;
        case "edit": // グループの問題を編集
          startEdit();
          break;
        case "delete": // グループを削除
          openConfirmDelete();
          break;
      }
    }

    return {
      homeTableList,
      homeOperatorList,
      groupDataList,

      userName,

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
  grid-template-rows: 22px calc(100% - 86px) 32px;
  row-gap: 16px;
  padding: 24px;

  &-message {
    width: 80%;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin: 0 auto; // 左右中央揃え用
  }

  .button-wrapper {
    text-align: center;
  }
}
</style>