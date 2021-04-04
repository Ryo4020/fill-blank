import { Module } from "vuex";
import { mutations } from "./mutations";
import { getters } from "./getters";
import { actions } from "./actions";
import { RootState } from "../RootState";
import { GroupState, IgroupState } from "./models";

const namespaced = true;

export const state: IgroupState = new GroupState();

export const group: Module<IgroupState, RootState> = {
  namespaced,
  state,
  mutations,
  getters,
  actions
};
