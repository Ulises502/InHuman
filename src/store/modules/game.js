const game = {
    namespaced: true,
    state: {
        gameLoopIntervalId: null,
    },
    getters: {

    },
    mutations: {
        // save interval id
        setGameLoopIntervalId(state, id) {
            state.gameLoopIntervalId = id
        },
    },
    actions: {
        // start game loop interval when page is mounted
        startInterval({ commit, rootState }) {
            // set game interval from a commit, because commit's are synchronous
            commit("setGameLoopIntervalId", setInterval(() => {
                console.log('hola')
            }, rootState.player.options.updateRate));
        },

        // increase humanity when live button pressed
        live({ commit }) {
            commit("player/increaseHumanity", { amount: 1 }, { root: true });
        },
    },
    modules: {},
};

export default game;