const game = {
    namespaced: true,
    state: {
        gameLoopIntervalId: null,
        messages: "",
    },
    getters: {

    },
    mutations: {
        // save interval id
        setGameLoopIntervalId(state, id) {
            state.gameLoopIntervalId = id
        },
        // save message
        setMessage(state, message) {
            state.messages += message
        }
    },
    actions: {
        // start game loop interval when page is mounted
        startInterval({ commit, dispatch, rootState }) {
            // set game interval from a commit, because commit's are synchronous
            commit("setGameLoopIntervalId", setInterval(() => {
                // dispatch game loop action. Promise allows to be independent and repeat the action
                new Promise(() => {
                    dispatch("gameLoop")
                })
            }, rootState.player.options.updateRate));
        },
        // do one game loop
        gameLoop({ rootState, rootGetters, commit }) {
            // If the module of the getter you're accessing is namespaced, you'll need to use rootGetters['moduleName/getterName'] 
            let Hsec = rootGetters['player/getHumanityPerSec']
            commit("player/setHumanityPerSec", { amount: Hsec }, { root: true })
            let HPerLoop = Hsec.times(rootState.player.options.updateRate).div(1000)
            commit("player/increaseHumanity", { bought: HPerLoop }, { root: true })
            //commit("increaseVirtues")
        },


        // increase humanity when live button pressed
        live({ commit }) {
            commit("player/increaseHumanity", { bought: 1 }, { root: true });
        },
        // buy virtue when cost chip is pressed
        buy({ commit }, virtue) {
            commit("player/buyVirtue", virtue, { root: true });
        },
        sendMessage({ commit }, message) {
            commit("setMessage", message);
        },
        ruin({ commit, dispatch, rootState }) {
            // if ruins is less than 1, then send message
            new Promise((resolve) => {
                if (rootState.player.ruins == 0) {
                    dispatch("sendMessage", "People find some old tools in this ancient ruin.\n");
                }
                resolve()
            }).then(() => commit("player/increaseRuins", { amount: 1 }, { root: true }))
        }
    },
    modules: {},
};

export default game;