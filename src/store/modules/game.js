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
                // dispatch game loop action
                //dispatch("gameLoop")
            }, rootState.player.options.updateRate));
        },
        // do one game loop
        //gameLoop({ commit, dispatch }) {
            //commit("getHumanityPerSec")
            //dispatch("increaseHumanity")
            //commit("increaseVirtues")
        //},


        // increase humanity when live button pressed
        live({ commit }) {
            commit("player/increaseHumanity", { bought: 1 }, { root: true });
        },
        // buy virtue when cost chip is pressed
        buy({ commit }, virtue) {
            commit("player/buyVirtue", virtue, { root: true });
        }
    },
    modules: {},
};

export default game;