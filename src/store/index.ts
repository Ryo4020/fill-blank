import Vuex from 'vuex';
import { auth } from './auth/index';
import { modal } from './modal/index';

import createPersistedState from "vuex-persistedstate";

export default new Vuex.Store({
  modules: {
    auth,
    modal,
  },
  plugins: [
    createPersistedState()
  ]
});