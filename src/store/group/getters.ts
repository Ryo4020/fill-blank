import { GetterTree } from "vuex";
import { IgroupState } from "./models";
import { RootState } from "../RootState";

export const getters: GetterTree<IgroupState, RootState> = {
    getGroupName(state: IgroupState): string { // 開いているグループ名
        const index = state.groupDataList.findIndex(({ id }) => id === state.currentGroupId);
        return state.groupDataList[index].name;
    },
    getGroupDocId(state: IgroupState): string { // グループコレクションのドキュメントID
        return "Group" + String(state.currentGroupId);
    },
};
