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
            var gameLoopIntervalId = setInterval(console.log('hola'), rootState.player.options.updateRate);
            commit('setGameLoopIntervalId', gameLoopIntervalId);
        }
    },
    modules: {},
};

export default game;