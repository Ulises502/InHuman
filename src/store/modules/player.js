import Decimal from 'decimal.js';

const player = {
    namespaced: true,
    state: {
        humanity: new Decimal(10),
        humanityPerSec: new Decimal(0),
        survival: new Decimal(0),
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
        }
    },
    actions: {
        
    },
    modules: {},
};

export default player;