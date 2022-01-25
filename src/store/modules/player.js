import Decimal from 'decimal.js';

const player = {
    namespaced: true,
    state: {
        humanity: new Decimal(10),
        humanityPerSec: new Decimal(0),
        virtues: {
            survival: {
                amount: new Decimal(0),
                cost: new Decimal(50),
                bought: new Decimal(0),
            },
        },
        options: {
            updateRate: 1000,
        },
    },
    getters: {
        
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
            state.virtues[virtue]['cost'] = state.virtues[virtue]['cost'].times(1.5)
        }
    },
    actions: {
        
    },
    modules: {},
};

export default player;