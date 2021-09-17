import Decimal from "decimal.js";

export default {
    state: {
        gameLoopIntervalID: 0,
        VIRTUES_NAMES: [
            "Survival",
            "Military",
            "Knowledge",
            "Culture",
            "Cooperation",
            "Faith",
            "Ethics",
        ],
        cost_multiplier: [
            new Decimal(1e3),
            new Decimal(1e4),
            new Decimal(1e5),
            new Decimal(1e6),
            new Decimal(1e8),
            new Decimal(1e10),
            new Decimal(1e12),
            new Decimal(1e15),
        ],
        save_timer: 30000,
        saveLoopIntervalID: 0,
    },
    getters: {
        gameLoopIntervalID(state) {
            return state.gameLoopIntervalID;
        },
        VIRTUES_NAMES(state) {
            return state.VIRTUES_NAMES;
        },
        cost_multiplier(state) {
            return state.cost_multiplier;
        },
    },
    mutations: {
        SET_GAMELOOPINTERVALID(state, gameLoopIntervalID) {
            state.gameLoopIntervalID = gameLoopIntervalID;
        },
        SET_VIRTUESNAMES(state, VIRTUES_NAMES) {
            state.VIRTUES_NAMES = VIRTUES_NAMES;
        },
        SET_COSTMULTIPLIER(state, cost_multiplier) {
            state.cost_multiplier = cost_multiplier;
        },
        SET_SAVELOOPINTERVALID(state, saveLoopIntervalID) {
            state.saveLoopIntervalID = saveLoopIntervalID;
        }
    },
    actions: {
        startInterval({ commit, rootState, dispatch }) {
            var ID = setInterval(async () => {
                dispatch('cycle')
                }, rootState.player.options.updateRate);
            commit('SET_GAMELOOPINTERVALID', ID)
        },
        cycle({ commit, rootState, dispatch }) {
            for (var i = 0; i < 7; i++) {
                dispatch('getVirtueProductionPerSec', i).then((response) => {
                    commit('SET_HUMANITY', rootState.player.humanity.add(response));
                })
            }
        },
        getVirtueProductionPerSec({ commit, rootState, dispatch }, tier) {
            var quan = new Decimal(
                rootState.player.virtues[tier].quantity
            );
            var updateFor;
            
            return new Promise((resolve) => {
                dispatch('getVirtueTotalMultiplier', tier).then(response => {
                var multiplier = response;
                // updates humanity per sec from virtue
                commit('SET_VIRTUEPROP', [tier, 'h_per_sec', quan.mul(multiplier)]);
                // calculates h per TICK
                updateFor = quan
                    .times(rootState.player.options.updateRate)
                    .div(1000)
                    .mul(multiplier);
                resolve(updateFor);
            })})
            
        },
        getVirtueTotalMultiplier({rootState}, virtue) {
            return rootState.player.virtues[virtue].multiplier;
        },


        saveInterval({ commit, dispatch, state }) {
            var ID = setInterval(async () => {
                dispatch('save')
            }, state.save_timer);
            commit('SET_GAMELOOPINTERVALID', ID)
        },
        save({ rootState }) {
            localStorage.setItem('inhumanSave', Buffer.from(JSON.stringify(rootState.player)).toString('base64'));
        },
    },
    modules: {}
}