import { MutationTree } from "vuex";
import { AuthState, IauthState } from "./models";

export const mutations: MutationTree<IauthState> = {
  // 初期化
  init(state: IauthState) {
    Object.assign(state, new AuthState());
  },
  setUserData(state: IauthState, payload: object | undefined) { // ユーザー情報変更
    state.userData = payload;
  },
  setSignInState(state: IauthState, payload: boolean) { // 認証状態変更
    state.isAuthed = payload;
  },
  setUserName(state: IauthState, payload: string) { // ユーザー名変更
    state.userName = payload;
  },
};
