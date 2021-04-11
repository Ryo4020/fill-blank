import { computed, ComputedRef } from 'vue';

import store from '../store';

import { IgroupData } from '@/mixins/defaultQuestion';

export default function useGroup() {
    const groupDataList: ComputedRef<IgroupData[]> = computed(() => store.state.group.groupDataList); // 問題グループリストのデータ

    const addGroup = (name: string) => {
        // グループを追加
        if (name) { // グループ名があるなら追加
            store.dispatch("group/addGroup", name);
            store.dispatch("modal/closeModal");
        } else {
            alert("グループ名を入力してください");
        }
    };

    const deleteGroup = () => { // グループ削除
        store.dispatch("group/deleteGroup");
    };

    return {
        groupDataList,
        addGroup,
        deleteGroup,
    };
}