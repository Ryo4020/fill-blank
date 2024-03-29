import { GetterTree } from "vuex";
import { IauthState } from "./models";
import { RootState } from "../RootState";

export const getters: GetterTree<IauthState, RootState> = {
    getUserUid(state: IauthState): string | undefined { // ユーザーのuid取得
        return state.userData?.uid;
    },
};
