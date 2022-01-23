import Decimal from 'decimal.js';

const player = {
    namespaced: true,
    state: {
        humanity: new Decimal(10),
        humanityPerSec: new Decimal(0),
        options: {
            updateRate: 1000,
        },
    },
    getters: {
        
    },
    mutations: {
        
    },
    actions: {
        
    },
    modules: {},
};

export default player;