import Vuex from 'vuex';
import { auth } from './auth/index';
import { group } from './group/index';
import { modal } from './modal/index';
import { question } from './question/index';

import createPersistedState from "vuex-persistedstate";

export default new Vuex.Store({
  modules: {
    auth,
    group,
    modal,
    question,
  },
  plugins: [
    createPersistedState()
  ]
});