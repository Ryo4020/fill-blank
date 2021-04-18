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
      <CommonButton label="グループを追加" @click-event="addGroup" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from "vue";
import { useStore } from "vuex";
import { Router, useRouter } from "vue-router";

import CommonButton from "@/components/atoms/CommonButton.vue";
import TableComponent from "@/components/organisms/Table/index.vue";

import useGroup from '@/composables/use-group';

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

    const isAuthed: ComputedRef<boolean> = computed(() => store.state.auth.isAuthed); // ログインしてるかどうか
    const userName: ComputedRef<string> = computed(() => store.state.auth.userName); // ユーザー名

    store.dispatch("group/setGroupDataList"); // dbからグループリスト取得
    const { groupDataList } = useGroup(); // グループのデータリスト

    function addGroup(): void {
      // グループの新規追加
      if (isAuthed.value) {
        // 追加するにはログイン必要
        store.dispatch("modal/setModal", "AddGroupForm"); // 追加用のモーダル開く
      } else {
        alert("グループを追加するにはログインが必要です");
        store.dispatch("modal/setModal", "LogInForm");
      }
    }

    async function startExercise(dataId: number): Promise<void> {
      // 演習開始処理
      const groupIndex: number = groupDataList.value.findIndex(({ id }) => id === dataId); // 開始するグループのID
      const totalOfQuestion: number = groupDataList.value[groupIndex].total; // 開始するグループの問題数
      if (totalOfQuestion > 0) { // 問題があるならExerciseへ
        await store.dispatch("question/setQuestionDataList"); // 問題リスト設定
        router.push("/exercise");
      } else {
        alert("このグループにまだ問題がありません");
      }
    }

    function startEdit(): void {
      if (isAuthed.value) {
        store.dispatch("question/setQuestionDataList"); // 問題リスト設定
        router.push("/edit");
      } else {
        // 編集するにはログイン必要
        alert("問題を編集するにはログインが必要です");
        store.dispatch("modal/setModal", "LogInForm");
      }
    }

    function openConfirmDelete(): void {
      if (isAuthed.value) {
        store.dispatch("modal/setModal", "ConfirmDelete");
      } else {
        // 削除するにはログイン必要
        alert("グループを編集するにはログインが必要です");
        store.dispatch("modal/setModal", "LogInForm");
      }
    }

    function opeGroup(dataId: number, operatorKey: string): void {
      store.commit("group/setGroupId", dataId); // 選択したグループidをvuexに

      // 押されたボタンの種類で分岐
      switch (operatorKey) {
        case "exercise": // グループの問題を演習
          startExercise(dataId);
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
  grid-template-rows: 26px calc(100% - 90px) 32px;
  row-gap: 16px;
  padding: 24px;

  &-message {
    width: 80%;
    font-size: 20px;
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