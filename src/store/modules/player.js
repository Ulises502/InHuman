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
                multiplier_shake: false,
            },
            {
                name: "Military",
                quantity: 0,
                momentum: 1,
                multiplier: new Decimal(1),
                h_per_sec: 0,
                cost: new Decimal(100),
                softreset_cost: 0,
                multiplier_shake: false,
            },
            {
                name: "Knowledge",
                quantity: 0,
                momentum: 1,
                multiplier: new Decimal(1),
                h_per_sec: 0,
                cost: new Decimal(100000),
                softreset_cost: 0,
                multiplier_shake: false,
            },
            {
                name: "Culture",
                quantity: 0,
                momentum: 1,
                multiplier: new Decimal(1),
                h_per_sec: 0,
                cost: new Decimal(1),
                softreset_cost: 1,
                multiplier_shake: false,
            },
            {
                name: "Cooperation",
                quantity: 0,
                momentum: 1,
                multiplier: new Decimal(1),
                h_per_sec: 0,
                cost: new Decimal(1),
                softreset_cost: 2,
                multiplier_shake: false,
            },
            {
                name: "Faith",
                quantity: 0,
                momentum: 1,
                multiplier: new Decimal(1),
                h_per_sec: 0,
                cost: new Decimal(1),
                softreset_cost: 3,
                multiplier_shake: false,
            },
            {
                name: "Ethics",
                quantity: 0,
                momentum: 1,
                multiplier: new Decimal(1),
                h_per_sec: 0,
                cost: new Decimal(1),
                softreset_cost: 4,
                multiplier_shake: false,
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
        SET_WELLBEING(state, wellbeing) {
            state.wellbeing = wellbeing;
        },
        SET_SOFTRESETS(state, soft_resets) {
            state.soft_resets = soft_resets;
        },
        SET_COLLAPSES(state, collapses) {
            state.collapses = collapses;
        },
        SET_WELLBEINGCOST(state, wellbeing_cost) {
            state.wellbeing_cost = wellbeing_cost;
        },
        SET_VIRTUESBONUS(state, virtues_bonus) {
            state.virtues_bonus = virtues_bonus;
        },
        SET_VIRTUES(state, virtues) {
            state.virtues = virtues;
        },
        SET_VIRTUEPROP(state, getter) {
            // getter is an array with [virtue index, prop, value]
            state.virtues[getter[0]][getter[1]] = getter[2];
        },
    },
    actions: {
    },
    modules: {options}
}