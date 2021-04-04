import { MutationTree } from "vuex";
import { GroupState, IgroupState } from "./models";

import { IgroupData } from "@/mixins/defaultQuestion";

export const mutations: MutationTree<IgroupState> = {
  // 初期化
  init(state: IgroupState) {
    Object.assign(state, new GroupState());
  },
  setGroupData(state: IgroupState, payload: IgroupData[]): void { // グループデータ変更
    state.groupDataList = payload;
  },
  setGroupId(state: IgroupState, payload: number): void { // グループID変更
    state.currentGroupId = payload;
  },
};
