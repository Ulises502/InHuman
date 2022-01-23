const game = {
    namespaced: true,
    state: {
        gameLoopIntervalId: null,
    },
    getters: {

    },
    mutations: {
        setGameLoopIntervalId(state, id) {
            state.gameLoopIntervalId = id
        }
    },
    actions: {
        startInterval({ commit, rootState }) {
            // set game interval from a commit, because commit's are synchronous
            commit("setGameLoopIntervalId", setInterval(() => {
                console.log('hola')
            }, rootState.player.options.updateRate));
        }
    },
    modules: {},
};

export default game;