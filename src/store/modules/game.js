import Decimal from "decimal.js";

export default {
    state: {
        gameLoopIntervalID: null,
        VIRTUES_NAMES: [
            null,
            "Survival",
            "Military",
            "Knowledge",
            "Culture",
            "Cooperation",
            "Faith",
            "Ethics",
        ],
        cost_multiplier: [
            new Decimal(1e3),
            new Decimal(1e4),
            new Decimal(1e5),
            new Decimal(1e6),
            new Decimal(1e8),
            new Decimal(1e10),
            new Decimal(1e12),
            new Decimal(1e15),
        ],
        options: {
            updateRate: 50,
        },
    },
    getters: {
        gameLoopIntervalID(state) {
            return state.gameLoopIntervalID;
        },
        VIRTUES_NAMES(state) {
            return state.VIRTUES_NAMES;
        },
        cost_multiplier(state) {
            return state.cost_multiplier;
        },
        options(state) {
            return state.options;
        }
    },
    mutations: {
        SET_GAMELOOPINTERVALID(state, gameLoopIntervalID) {
            state.gameLoopIntervalID = gameLoopIntervalID;
        },
        SET_VIRTUESNAMES(state, VIRTUES_NAMES) {
            state.VIRTUES_NAMES = VIRTUES_NAMES;
        },
        SET_COSTMULTIPLIER(state, cost_multiplier) {
            state.cost_multiplier = cost_multiplier;
        },
        SET_OPTIONS(state, options) {
            state.options = options;
        },
    },
    actions: {
    }
}