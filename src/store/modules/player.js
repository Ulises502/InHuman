import Decimal from "decimal.js";

import options from "./options.js"

export default {
    state: {
        humanity: new Decimal(10),
        wellbeing: new Decimal(0),
        soft_resets: new Decimal(0),
        collapses: new Decimal(0),
        wellbeing_cost: new Decimal(1000),
        virtues_bonus: new Decimal(0),
        virtues: [
            {
                name: "Survival",
                quantity: 0,
                momentum: 1,
                multiplier: new Decimal(1),
                h_per_sec: 0,
                cost: new Decimal(10),
                softreset_cost: 0,
            },
            {
                name: "Military",
                quantity: 0,
                momentum: 1,
                multiplier: new Decimal(1),
                h_per_sec: 0,
                cost: new Decimal(100),
                softreset_cost: 0,
            },
            {
                name: "Knowledge",
                quantity: 0,
                momentum: 1,
                multiplier: new Decimal(1),
                h_per_sec: 0,
                cost: new Decimal(100000),
                softreset_cost: 0,
            },
            {
                name: "Culture",
                quantity: 0,
                momentum: 1,
                multiplier: new Decimal(1),
                h_per_sec: 0,
                cost: new Decimal(1),
                softreset_cost: 1,
            },
            {
                name: "Cooperation",
                quantity: 0,
                momentum: 1,
                multiplier: new Decimal(1),
                h_per_sec: 0,
                cost: new Decimal(1),
                softreset_cost: 2,
            },
            {
                name: "Faith",
                quantity: 0,
                momentum: 1,
                multiplier: new Decimal(1),
                h_per_sec: 0,
                cost: new Decimal(1),
                softreset_cost: 3,
            },
            {
                name: "Ethics",
                quantity: 0,
                momentum: 1,
                multiplier: new Decimal(1),
                h_per_sec: 0,
                cost: new Decimal(1),
                softreset_cost: 4,
            },
        ],
    },
    getters: {
        humanity(state) {
            return state.humanity;
        },
        wellbeing(state) {
            return state.wellbeing;
        },
        soft_resets(state) {
            return state.soft_resets;
        },
        collapses(state) {
            return state.collapses;
        },
        wellbeing_cost(state) {
            return state.wellbeing_cost;
        },
        virtues_bonus(state) {
            return state.virtues_bonus;
        },
        virtues(state) {
            return state.virtues;
        },
        virtues_prop(state, virtue, prop) {
            return state.virtues[virtue][prop];
        }
    },
    mutations: {
        SET_HUMANITY(state, humanity) {
            state.humanity = humanity;
        },
        SET_VIRTUEPROP(state, getter) {
            state.virtues[getter[0]][getter[1]] = getter[2];
        },
    },
    actions: {
    },
    modules: {options}
}