const game = {
    namespaced: true,
    state: {
        gameLoopIntervalId: null,
        messages: "",
        challenges: [
            {
              title: 'Challenge 1',
              text: `Winter is coming...`,
              subtext: 'Lose humanity progress & unlock next virtue.',
              img: 'https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3264&q=80',
            },
            {
              title: 'Challenge 2',
              text: 'Greatest Rock Hits',
              subtext: 'Lose humanity progress & unlock next virtue.',
              img: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
            },
            {
              title: 'Challenge 3',
              text: 'Ambient Bass',
              subtext: 'Lose humanity progress & unlock next virtue.',
              img: 'https://images.unsplash.com/photo-1542320868-f4d80389e1c4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3750&q=80',
            },
            {
                title: 'Challenge 4',
                text: 'The Great War',
                subtext: 'Lose humanity progress & unlock next virtue.',
                img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
            },
            {
                title: 'Challenge 5',
                text: 'The Great War',
                subtext: 'Lose humanity progress & unlock next virtue.',
                img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
            },
            {
                title: 'Challenge 6',
                text: 'The Great War',
                subtext: 'Lose humanity progress & unlock next virtue.',
                img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
            },
          ],
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
                    dispatch("sendMessage", "- People find some old tools in this ancient ruin.\n");
                }
                resolve()
            }).then(() => commit("player/increaseRuins", { amount: 1 }, { root: true }))
        }
    },
    modules: {},
};

export default game;