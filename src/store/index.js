import Vue from 'vue';
import Vuex from 'vuex';

import layout from './layout';
import manager from "./manager";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    layout,
    manager
  },
});
