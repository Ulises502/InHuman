import Decimal from 'decimal.js';

const player = {
    namespaced: true,
    state: {
        humanity: new Decimal(10),
        humanityPerSec: new Decimal(0),
        survival: {
            points: new Decimal(0),
            cost: new Decimal(50),
            amount: new Decimal(0),
        },
        options: {
            updateRate: 1000,
        },
    },
    getters: {
        
    },
    mutations: {
        // increase humanity by amount
        increaseHumanity(state, payload) {
            state.humanity = state.humanity.plus(payload.amount)
        },
        // increase virtue amount, pay humanity cost, update next virtue cost
        buyVirtue(state, virtue) {
            state.humanity = state.humanity.minus(state[virtue]['cost'])
            state[virtue]['amount'] = state[virtue]['amount'].plus(1)
            state[virtue]['cost'] = state[virtue]['cost'].times(1.5)
        }
    },
    actions: {
        
    },
    modules: {},
};

export default player;