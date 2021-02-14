import { MutationTree } from "vuex";
import { ModalState, ImodalState } from "./models";

export const mutations: MutationTree<ImodalState> = {
  // 初期化
  init(state: ImodalState) {
    Object.assign(state, new ModalState());
  },
  setIsOpening(state: ImodalState, payload: boolean) { // モーダルの開閉状況を変更
    state.isOpening = payload;
  },
  setPath(state: ImodalState, payload: string | null) { // モーダル名を設置
    state.path = payload;
  },
};
