import { ActionTree } from "vuex";
import { ImodalState } from "./models";
import { RootState } from "../RootState";

export const actions: ActionTree<ImodalState, RootState> = {
  setModal({ commit }, payload: string): void { // モーダルを開く処理
    commit("setIsOpening", true);
    commit("setPath", payload);
  },
  closeModal({ commit }): void { // モーダルを閉じる処理
    commit("setIsOpening", false);
    commit("setPath", null);
  },
  error({ commit }, payload: string): void {
    commit("setErrorMessage", payload);
  },
};