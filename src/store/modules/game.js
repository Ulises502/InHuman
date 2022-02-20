import Decimal from 'decimal.js';

const game = {
    namespaced: true,
    state: {
        gameLoopIntervalId: null,
        messages: "",
        drawer: false,
        virtues: {
            Survival: {
                name: "Survival",
                cost: new Decimal(50),
                multiplier: new Decimal(1),
                costMult: new Decimal(1e3),
            },
            Might: {
                name: "Might",
                cost: new Decimal(250),
                multiplier: new Decimal(2),
                costMult: new Decimal(1e4),
            },
            Faith: {
                name: "Faith",
                cost: new Decimal(1e3),
                multiplier: new Decimal(4),
                costMult: new Decimal(1e5),
            },
            Knowledge: {
                name: "Knowledge",
                cost: new Decimal(5e6),
                multiplier: new Decimal(8),
                costMult: new Decimal(1e6),
            },
            Cooperation: {
                name: "Cooperation",
                cost: new Decimal(2e8),
                multiplier: new Decimal(16),
                costMult: new Decimal(1e7),
            },
            Culture: {
                name: "Culture",
                cost: new Decimal(7.5e9),
                multiplier: new Decimal(32),
                costMult: new Decimal(1e8),
            },
            Ethics: {
                name: "Ethics",
                cost: new Decimal(3e11),
                multiplier: new Decimal(64),
                costMult: new Decimal(1e9),
            },
        },
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
                    description: "Gain Humanity/10 sec",
                },
                Tools: {
                    name: "Tools",
                    icon: "mdi-spear",
                    cost: new Decimal(2e3),
                    description: "Gain Survival/10 sec",
                },
            },
            Knowledge: {
                "1": {
                    name: "Agriculture",
                    cost: new Decimal(50),
                    icon: "mdi-seed",
                },
                "2": {
                    name: "Pottery",
                    cost: new Decimal(1e6),
                    icon: "mdi-pot",
                },
                "3": {
                    name: "Husbundry",
                    cost: new Decimal(1e7),
                    icon: "mdi-baby",
                },
                "4": {
                    name: "Archery",
                    cost: new Decimal(1e8),
                    icon: "mdi-bow-arrow",
                },
                "5": {
                    name: "Mining",
                    cost: new Decimal(1e9),
                    icon: "mdi-pick",
                },
            },
        },
        upgradesIntervalID: [],
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
        },
        // save upgrades interval id
        saveUpgradesIntervalID(state, id) {
            state.upgradesIntervalID.push(id)
        },
        // empty game loop interval
        clearGameInterval(state) {
            state.gameLoopIntervalId = null
        },
        // empty upgrades interval id
        clearUpgradesIntervalID(state) {
            state.upgradesIntervalID = []
        },
        // reset messages
        resetMessage(state) {
            state.messages = ""
        },
        // reset drawer
        resetDrawer(state) {
            state.drawer = false
        },
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
            commit("player/increaseHumanity", { amount: HPerLoop }, { root: true })
            //commit("increaseVirtues")
        },

        // ****************************************************************
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

        //************************* RESET *************************** */
        // make a soft reset
        softReset({ commit, state, dispatch }, resetNumber) {
            // clear game interval
            clearInterval(state.gameLoopIntervalId)
            // commit clear game interval
            commit("clearGameInterval")
            // clear interval ids
            state.upgradesIntervalID.forEach(id => clearInterval(id))
            // commit clear interval ids
            commit("clearUpgradesIntervalID", null)
            // reset messages
            commit("resetMessage", "")
            // reset drawer
            commit("setDrawer", false)
            // make next virtue showable
            switch(resetNumber.toFixed()) {
                case '0':
                    commit("player/setVirtueShowable", "Might", { root: true })
                    break;
                case '1':
                    commit("player/setVirtueShowable", "Faith", { root: true })
                    break;
                case '2':
                    commit("player/setVirtueShowable", "Knowledge", { root: true })
                    break;
                case '3':
                    commit("player/setVirtueShowable", "Cooperation", { root: true })
                    break;
                case '4':
                    commit("player/setVirtueShowable", "Culture", { root: true })
                    break;
                case '5':
                    commit("player/setVirtueShowable", "Ethics", { root: true })
                    break;
             }

            // dispatch reset player state
            dispatch("player/resetPlayerState", null, { root: true }).then(() => {
                // re-start game loop
                dispatch("startInterval")
            })
        },
                            

        buyUpgrade({ commit, state }, upgrade) {
            commit("player/changeVirtueUpgrade", upgrade, { root: true });
            commit("player/decreaseHumanity", { amount: state.virtueUpgrades[upgrade.type][upgrade.id].cost }, { root: true });

            // use name of upgrade to apply effect
            switch (upgrade.id) {
                case "Fire":
                    commit("player/multiplyVirtueMultiplier", { id: upgrade.id, type: upgrade.type, amount: 2 }, { root: true });
                    break;
                case "Hunters":
                    commit("saveUpgradesIntervalID", setInterval(() => {
                        // dispatch upgrade effect. Promise allows to be independent and repeat the action
                        new Promise(() => {
                            // increase humanity by 300 every 10 sec
                            commit("player/increaseHumanity", { amount: new Decimal(300) }, { root: true });
                        })
                    }, 10000));
                    break;
                case "Tools":
                    commit("saveUpgradesIntervalID", setInterval(() => {
                        // dispatch upgrade action. Promise allows to be independent and repeat the action
                        new Promise(() => {
                            // increase survival every 10 sec
                            commit("player/increaseVirtueAmount", { type: 'Survival', amount: new Decimal(1) }, { root: true });
                        })
                    }, 10000));
                    break;
            }
        },
    },
    modules: {},
};

export default game;