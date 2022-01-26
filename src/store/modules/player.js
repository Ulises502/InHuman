import Decimal from 'decimal.js';

const player = {
    namespaced: true,
    state: {
        humanity: new Decimal(10),
        humanityPerSec: new Decimal(0),
        virtues: {
            Survival: {
                name: "Survival",
                amount: new Decimal(0),
                cost: new Decimal(50),
                bought: new Decimal(0),
                //show: false,
            },
            Military: {
                name: "Military",
                amount: new Decimal(0),
                cost: new Decimal(50),
                bought: new Decimal(0),
                //show: false,
            },
            Knowledge: {
                name: "Knowledge",
                amount: new Decimal(0),
                cost: new Decimal(50),
                bought: new Decimal(0),
                //show: false,
            },
            Culture: {
                name: "Culture",
                amount: new Decimal(0),
                cost: new Decimal(50),
                bought: new Decimal(0),
                //show: false,
            },
            Cooperation: {
                name: "Cooperation",
                amount: new Decimal(0),
                cost: new Decimal(50),
                bought: new Decimal(0),
                //show: false,
            },
            Faith: {
                name: "Faith",
                amount: new Decimal(0),
                cost: new Decimal(50),
                bought: new Decimal(0),
                //show: false,
            },
            Ethics: {
                name: "Ethics",
                amount: new Decimal(0),
                cost: new Decimal(5000),
                bought: new Decimal(0),
                //show: false,
            },
        },
        options: {
            updateRate: 50,
        },
    },
    getters: {
        // calculate total humanity per second
        getHumanityPerSec: (state) => {
            let humanityPerSec = new Decimal(0)
            for (let virtue in state.virtues) {
                // use the whole virtue object to enter itself and get the amount
                humanityPerSec = humanityPerSec.plus(state.virtues[virtue].amount.times(state.virtues[virtue].bought))
            }
            return humanityPerSec
        }
    },
    mutations: {
        // increase humanity by amount bought
        increaseHumanity(state, payload) {
            state.humanity = state.humanity.plus(payload.bought)
        },
        // increase virtue bought, pay humanity cost, update next virtue cost
        buyVirtue(state, virtue) {
            state.humanity = state.humanity.minus(state.virtues[virtue]['cost'])
            state.virtues[virtue]['bought'] = state.virtues[virtue]['bought'].plus(1)
            state.virtues[virtue]['amount'] = state.virtues[virtue]['amount'].plus(1)
            state.virtues[virtue]['cost'] = state.virtues[virtue]['cost'].times(1.5)
        },
        // show virtue
        showVirtue(state, virtue) {
            state.virtues[virtue]['show'] = true
        },
        // set humanity per second
        setHumanityPerSec(state, payload) {
            state.humanityPerSec = payload.amount
        }
    },
    actions: {
        showVirtue({ commit }, virtue) {
            commit("showVirtue", virtue)
        }
    },
    modules: {},
};

export default player;