import Decimal from 'decimal.js';

const player = {
    namespaced: true,
    state: {
        humanity: new Decimal(0),
        humanityPerSec: new Decimal(0),
        ruins: new Decimal(0),
        lived: new Decimal(0),
        virtues: {
            Survival: {
                name: "Survival",
                amount: new Decimal(0),
                cost: new Decimal(50),
                bought: new Decimal(0),
                show: true,
                multiplier: new Decimal(1),
                costMult: new Decimal(1e3),
            },
            Might: {
                name: "Might",
                amount: new Decimal(0),
                cost: new Decimal(250),
                bought: new Decimal(0),
                show: false,
                multiplier: new Decimal(2),
                costMult: new Decimal(1e4),
            },
            Faith: {
                name: "Faith",
                amount: new Decimal(0),
                cost: new Decimal(1e3),
                bought: new Decimal(0),
                show: false,
                multiplier: new Decimal(4),
                costMult: new Decimal(1e5),
            },
            Knowledge: {
                name: "Knowledge",
                amount: new Decimal(0),
                cost: new Decimal(5e6),
                bought: new Decimal(0),
                show: false,
                multiplier: new Decimal(8),
                costMult: new Decimal(1e6),
            },
            Cooperation: {
                name: "Cooperation",
                amount: new Decimal(0),
                cost: new Decimal(2e8),
                bought: new Decimal(0),
                show: false,
                multiplier: new Decimal(16),
                costMult: new Decimal(1e7),
            },
            Culture: {
                name: "Culture",
                amount: new Decimal(0),
                cost: new Decimal(7.5e9),
                bought: new Decimal(0),
                show: false,
                multiplier: new Decimal(32),
                costMult: new Decimal(1e8),
            },
            Ethics: {
                name: "Ethics",
                amount: new Decimal(0),
                cost: new Decimal(3e11),
                bought: new Decimal(0),
                show: false,
                multiplier: new Decimal(64),
                costMult: new Decimal(1e9),
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
                humanityPerSec = humanityPerSec.plus(state.virtues[virtue].amount.times(state.virtues[virtue].multiplier))
            }
            if (state.ruins.gt(0)) {
                humanityPerSec = humanityPerSec.plus(1)
            }
            return humanityPerSec
        }
    },
    mutations: {
        // increase humanity by amount bought
        increaseHumanity(state, payload) {
            state.humanity = state.humanity.plus(payload.bought)
        },
        // increase ruins by amount
        increaseRuins(state, payload) {
            state.ruins = state.ruins.plus(payload.amount)
        },
        // consume All Humanity and add it in lived
        consumeAllHumanity(state) {
            state.lived = state.lived.plus(state.humanity)
            state.humanity = new Decimal(0.05)
        },
        // increase virtue bought, pay humanity cost, update next virtue cost
        buyVirtue(state, virtue) {
            state.humanity = state.humanity.minus(state.virtues[virtue]['cost'])
            state.virtues[virtue]['bought'] = state.virtues[virtue]['bought'].plus(1)
            state.virtues[virtue]['amount'] = state.virtues[virtue]['amount'].plus(1)
            state.virtues[virtue]['cost'] = state.virtues[virtue]['cost'].times(1.15).round()
            if (state.virtues[virtue]['bought'] % 10 === 0 && state.virtues[virtue]['bought'] > 1) {
                state.virtues[virtue]['cost'] = state.virtues[virtue]['cost'].times(state.virtues[virtue]['costMult']).round()
            }
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