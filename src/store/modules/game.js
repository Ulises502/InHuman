import Decimal from 'decimal.js';

const game = {
    namespaced: true,
    state: {
        gameLoopIntervalId: null,
        messages: "",
        drawer: false,
        virtueUpgrades: {
            Survival: {
                Fire: {
                    name: "Fire",
                    icon: "mdi-campfire",
                    cost: new Decimal(200),
                    description: "x2 Humanity from Survival",
                },
                Hunters: {
                    name: "Hunters",
                    icon: "mdi-bow-arrow",
                    cost: new Decimal(1e3),
                    description: "Gain Humanity every 30 sec",
                },
                Tools: {
                    name: "Tools",
                    icon: "mdi-spear",
                    cost: new Decimal(2e3),
                    description: "Gain Survival every 30 sec",
                },
            },
        }
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
        },
        // change drawer state
        changeDrawer(state) {
            state.drawer = !state.drawer
        },
        // set drawer state
        setDrawer(state, drawer) {
            state.drawer = drawer
        }
    },
    actions: {
        // change drawer state
        changeDrawer({ commit }) {
            commit("changeDrawer");
        },
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
            commit("player/consumeAllHumanity", null, { root: true });
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
                    dispatch("sendMessage", "- Your people find some old tools in an ancient ruin.\n");

                }
                resolve()
            }).then(() => commit("player/increaseRuins", { amount: 1 }, { root: true }))
        },

        buyUpgrade({ commit }, upgrade) {
            commit("player/changeVirtueUpgrade", upgrade, { root: true });
        },
    },
    modules: {},
};

export default game;