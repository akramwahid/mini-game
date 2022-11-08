import Vue from 'vue'
import Vuex from 'vuex'

import gameModule from '@/store/modules/game/index';
import playerModule from '@/store/modules/player/index';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        gameModule,
        playerModule
    },
    state: {},
    mutations: {},
    getters: {},
    actions: {},
});

