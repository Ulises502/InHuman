import Vue from "vue";
import Vuex from "vuex";
import player from "./modules/player";
import game from "./modules/game";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        /*count: 0,
        todos: [
            { id: 1, text: '...', done: true },
            { id: 2, text: '...', done: false },
            { id: 3, text: '...', done: true },
            { id: 4, text: '...', done: true }
        ]*/
    },
    getters: {
        /*doneTodos: (state) => {
            return state.todos.filter(todo => todo.done)
        },
        doneTodosCount: (state, getters) => {
            return getters.doneTodos.length
        }*/
    },
    mutations: {
        /*increment(state, payload) {
            state.count += payload.amount
        }*/
    },
    actions: {
        /*increment(context) {
            context.commit('increment')
        },
        incrementAsync({ commit }, payload) {
            setTimeout(() => {
                commit({
                    type: "increment",
                    amount: payload.amount,
                })
            }, 1000)
        }*/
    },
    modules: {
        player,
        game,
    },
});

export default store;