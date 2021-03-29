import {
    IgroupData
} from "@/mixins/defaultQuestion";

export interface IgroupState {
    groupDataList: IgroupData[];
    currentGroupId: number;
    deletingGroup: boolean;
}

export class GroupState implements IgroupState {
    groupDataList = [{ // グループリストのデータ
        id: 1,
        name: "test-group1",
        total: 2,
    },
    {
        id: 2,
        name: "test-group2",
        total: 3,
    }];

    currentGroupId = 0; // 作業中グループのid
    deletingGroup = false; // 削除対象かどうか
}