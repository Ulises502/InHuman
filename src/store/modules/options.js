export default {
    state: {
        updateRate: 50,
        themeDark: false,
    },
    getters: {
        updateRate(state) {
            return state.updateRate;
        },
        themeDark(state) {
            return state.themeDark;
        },
    },
    mutations: {
        SET_UPDATERATE(state, updateRate) {
            state.updateRate = updateRate;
        },
        SET_THEMEDARK(state, themeDark) {
            state.themeDark = themeDark;
        }
    },
    actions: {
        setUpdateRate({ commit }, updateRate) {
            commit('SET_UPDATERATE', updateRate);
        },
        setThemeDark({ commit }, themeDark) {
            commit('SET_THEMEDARK', themeDark);
        }
    }
}