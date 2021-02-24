<template>
  <div class="home">
    <div class="home-message">{{ userName }} さんのグループページです</div>
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
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { Router, useRouter } from "vue-router";

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

    const store = useStore();
    const router: Router = useRouter();

    const isAuthed = computed(() => store.state.auth.isAuthed); // ログインしてるかどうか
    const userName = computed(() => store.state.auth.userName); // 試験的なユーザー名

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

    function startExercise(dataId: number): void {
      // 演習開始処理
      console.log(dataId);
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
      groupList,

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