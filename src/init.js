import Decimal from 'decimal.js';

var game = {
    humanity: new Decimal(10),
    VIRTUES_NAMES: [null, "Survival", "Military", "Knowledge", "Culture", "Cooperation", "Faith", "Ethics"],

    survival_cost: new Decimal(10),
    options: {
        updateRate: 50,
    },
}

export default game;