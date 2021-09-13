import Vue from "vue";
import Vuex from "vuex";

import game from './modules/game.js';
import player from './modules/player.js';

Vue.use(Vuex);


const store = new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        game,
        player,
    },
});

export default store;