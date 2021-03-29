import { Module } from "vuex";
import { mutations } from "./mutations";
import { getters } from "./getters";
import { actions } from "./actions";
import { RootState } from "../RootState";
import { QuestionState, IquestionState } from "./models";

const namespaced = true;

export const state: IquestionState = new QuestionState();

export const question: Module<IquestionState, RootState> = {
  namespaced,
  state,
  mutations,
  getters,
  actions
};
