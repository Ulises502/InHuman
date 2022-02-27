import Decimal from 'decimal.js';

const player = {
    namespaced: true,
    state: {
        humanity: new Decimal(1e10),
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
                costMult: new Decimal(1.15),
            },
            Might: {
                name: "Might",
                amount: new Decimal(0),
                cost: new Decimal(250),
                bought: new Decimal(0),
                show: false,
                multiplier: new Decimal(2),
                costMult: new Decimal(1.25),
            },
            Faith: {
                name: "Faith",
                amount: new Decimal(0),
                cost: new Decimal(1e3),
                bought: new Decimal(0),
                show: false,
                multiplier: new Decimal(4),
                costMult: new Decimal(1.35),
            },
            Knowledge: {
                name: "Knowledge",
                amount: new Decimal(0),
                cost: new Decimal(5e6),
                bought: new Decimal(0),
                show: false,
                multiplier: new Decimal(8),
                costMult: new Decimal(1.45),
            },
            Cooperation: {
                name: "Cooperation",
                amount: new Decimal(0),
                cost: new Decimal(2e8),
                bought: new Decimal(0),
                show: false,
                multiplier: new Decimal(16),
                costMult: new Decimal(1.6),
            },
            Culture: {
                name: "Culture",
                amount: new Decimal(0),
                cost: new Decimal(7.5e9),
                bought: new Decimal(0),
                show: false,
                multiplier: new Decimal(32),
                costMult: new Decimal(1.75),
            },
            Ethics: {
                name: "Ethics",
                amount: new Decimal(0),
                cost: new Decimal(3e11),
                bought: new Decimal(0),
                show: false,
                multiplier: new Decimal(64),
                costMult: new Decimal(2),
            },
        },
        virtueUpgraded: {
            Survival: {
                Fire: {
                    name: "Fire",
                    bought: false,
                },
                Hunters: {
                    name: "Hunters",
                    bought: false,
                },
                Tools: {
                    name: "Tools",
                    bought: false,
                },
            },
            Might: {
                mightBonus: 0,
            },
            Faith: {
                faithBonus: 1,
                sacrifice: "",
                consumption: {
                    Humanity: 25,
                    Survival: 2,
                    Might: 2,
                    Faith: 1,
                    Knowledge: 1,
                    Cooperation: 1,
                    Culture: 1,
                    Ethics: 1,
                },
                bonus: {
                    Humanity: 1.5,
                    Survival: 2.5,
                    Might: 3.5,
                    Faith: 4.5,
                    Knowledge: 5.5,
                    Cooperation: 6.5,
                    Culture: 7.5,
                    Ethics: 8.5,
                }
            },
            Knowledge: {
                technologies: {
                    "1": {
                        name: "Agriculture",
                        bought: false,
                    },
                    "2": {
                        name: "Pottery",
                        bought: false,
                    },
                    "3": {
                        name: "Husbundry",
                        bought: false,
                    },
                    "4": {
                        name: "Archery",
                        bought: false,
                    },
                    "5": {
                        name: "Mining",
                        bought: false,
                    },
                },
                discoveryBonus: new Decimal(1),
                progress: new Decimal(0),
                progressPerSec: new Decimal(1),
                observations: new Decimal(0),
            },
        },
        virtueReset: new Decimal(0),
        options: {
            updateRate: 50,
        },
    },
    getters: {
        // calculate total humanity per second
        getHumanityPerSec: (state, getters) => {
            let humanityPerSec = new Decimal(0);

            // get total humanity per second from each virtue's getter
            humanityPerSec = humanityPerSec.plus(getters.getHumanityPerSecFromSurvival);
            humanityPerSec = humanityPerSec.plus(getters.getHumanityPerSecFromMight);
            humanityPerSec = humanityPerSec.plus(getters.getHumanityPerSecFromFaith);
            humanityPerSec = humanityPerSec.plus(getters.getHumanityPerSecFromKnowledge);
            humanityPerSec = humanityPerSec.plus(getters.getHumanityPerSecFromCooperation);
            humanityPerSec = humanityPerSec.plus(getters.getHumanityPerSecFromCulture);
            humanityPerSec = humanityPerSec.plus(getters.getHumanityPerSecFromEthics);

            // if one ruin has been purchased, add 1 humanity per second
            if (state.ruins.gt(0)) {
                humanityPerSec = humanityPerSec.plus(1)
            }

            // return humanityPerSec
            return humanityPerSec;
        },
        // calculate humanity per sec from Survival
        getHumanityPerSecFromSurvival: (state) => {
            let humanityPerSec = new Decimal(0)
            humanityPerSec = humanityPerSec.plus(state.virtues['Survival'].amount.times(state.virtues['Survival'].multiplier))
            // if the player has bought one Might virtue, add the Defence bonus to humanity from Survival
            if (state.virtues['Might'].bought > 0) {
                humanityPerSec = humanityPerSec.plus(humanityPerSec.times(state.virtues['Might'].amount.times((100 - state.virtueUpgraded['Might'].mightBonus) / 100)))
            }
            return humanityPerSec
        },
        // calculate humanity per sec from Might
        getHumanityPerSecFromMight: (state) => {
            let humanityPerSec = new Decimal(0)
            humanityPerSec = humanityPerSec.plus(state.virtues['Might'].amount.times(state.virtues['Might'].multiplier))
            // if the player has bought one Might virtue, add the bonus from mightBonus
            if (state.virtues['Might'].bought > 0) {
                humanityPerSec = humanityPerSec.plus(humanityPerSec.times(state.virtues['Might'].amount.times((state.virtueUpgraded['Might'].mightBonus) / 100)))
            }
            return humanityPerSec
        },
        // calculate humanity per sec from Faith
        getHumanityPerSecFromFaith: (state) => {
            let humanityPerSec = new Decimal(0)
            humanityPerSec = humanityPerSec.plus(state.virtues['Faith'].amount.times(state.virtues['Faith'].multiplier))
            // multiply humanityPerSec by the sacrifice bonus
            humanityPerSec = humanityPerSec.times(state.virtueUpgraded['Faith'].faithBonus)
            return humanityPerSec
        },
        // calculate humanity per sec from Knowledge
        getHumanityPerSecFromKnowledge: (state) => {
            let humanityPerSec = new Decimal(0)
            humanityPerSec = humanityPerSec.plus(state.virtues['Knowledge'].amount.times(state.virtues['Knowledge'].multiplier))
            // multiply humanityPerSec by the discovery bonus
            humanityPerSec = humanityPerSec.times(state.virtueUpgraded['Knowledge'].discoveryBonus).round()
            return humanityPerSec
        },
        // calculate humanity per sec from Cooperation
        getHumanityPerSecFromCooperation: (state) => {
            let humanityPerSec = new Decimal(0)
            humanityPerSec = humanityPerSec.plus(state.virtues['Cooperation'].amount.times(state.virtues['Cooperation'].multiplier))
            return humanityPerSec
        },
        // calculate humanity per sec from Culture
        getHumanityPerSecFromCulture: (state) => {
            let humanityPerSec = new Decimal(0)
            humanityPerSec = humanityPerSec.plus(state.virtues['Culture'].amount.times(state.virtues['Culture'].multiplier))
            return humanityPerSec
        },
        // calculate humanity per sec from Ethics
        getHumanityPerSecFromEthics: (state) => {
            let humanityPerSec = new Decimal(0)
            humanityPerSec = humanityPerSec.plus(state.virtues['Ethics'].amount.times(state.virtues['Ethics'].multiplier))
            return humanityPerSec
        },
        countTechs: (state) => {
            let count = 0;
            for (let key in state.virtueUpgraded['Knowledge'].technologies) {
                if (state.virtueUpgraded['Knowledge'].technologies[key].bought) {
                    count++
                }
            }
            return count
        },
    },
    mutations: {
        // increase humanity by amount bought
        increaseHumanity(state, payload) {
            state.humanity = state.humanity.plus(payload.amount)
        },
        // decrease humanity by amount
        decreaseHumanity(state, payload) {
            state.humanity = state.humanity.minus(payload.amount)
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
            state.virtues[virtue]['cost'] = state.virtues[virtue]['cost'].times(state.virtues[virtue]['costMult']).round()
            //if (state.virtues[virtue]['bought'] % 10 === 0 && state.virtues[virtue]['bought'] > 1) {
            //state.virtues[virtue]['cost'] = state.virtues[virtue]['cost'].times(state.virtues[virtue]['costMult']).round()
            //}
        },
        // show virtue
        showVirtue(state, virtue) {
            state.virtues[virtue]['show'] = true
        },
        // set humanity per second
        setHumanityPerSec(state, payload) {
            state.humanityPerSec = payload.amount
        },

        // change bought status of virtue upgrade
        changeVirtueUpgrade(state, upgrade) {
            state.virtueUpgraded[upgrade.type][upgrade.id]['bought'] = !state.virtueUpgraded[upgrade.type][upgrade.id]['bought']
        },
        // change virtue multiplier
        multiplyVirtueMultiplier(state, payload) {
            state.virtues[payload.type]['multiplier'] = state.virtues[payload.type]['multiplier'].times(payload.amount)
        },
        // increase virtue amount
        increaseVirtueAmount(state, payload) {
            state.virtues[payload.type]['amount'] = state.virtues[payload.type]['amount'].plus(payload.amount)
        },

        // set might bonus
        setMightBonus(state, payload) {
            state.virtueUpgraded.Might.mightBonus = payload.amount
        },
        // set faith bonus
        setFaithBonus(state, payload) {
            state.virtueUpgraded.Faith.faithBonus = payload.amount
        },
        // set faith sacrifice
        setFaithSacrifice(state, payload) {
            state.virtueUpgraded.Faith.sacrifice = payload.type
        },


        // reset player state
        resetPlayerState(state) {
            state.humanity = new Decimal(1e10)
            state.humanityPerSec = new Decimal(0)
            for (let virtue in state.virtues) {
                state.virtues[virtue]['amount'] = new Decimal(0)
                state.virtues[virtue]['bought'] = new Decimal(0)
            }
            state.virtueUpgraded.Knowledge.discoveryBonus = new Decimal(1);
            state.virtueUpgraded.Knowledge.progress = new Decimal(0);
            state.virtueUpgraded.Knowledge.progressPerSec = new Decimal(1);
            state.virtueUpgraded.Knowledge.observations = new Decimal(0);
        },
        // increase soft reset by 1
        increaseSoftReset(state) {
            state.virtueReset = state.virtueReset.plus(1)
        },
        setVirtueShowable(state, virtue) {
            state.virtues[virtue]['show'] = true
        },

        // decrease virtue amount
        decreaseVirtueAmount(state, payload) {
            state.virtues[payload.type]['amount'] = state.virtues[payload.type]['amount'].minus(payload.amount)
        },

        // progress discovery 
        progressDiscovery(state) {
            state.virtueUpgraded.Knowledge.progress = state.virtueUpgraded.Knowledge.progress.plus(state.virtueUpgraded.Knowledge.progressPerSec.div(10));
            // if knowledge progress is 100, increase discoveries by 1
            if (state.virtueUpgraded.Knowledge.progress.gte(100)) {
                state.virtueUpgraded.Knowledge.observations = state.virtueUpgraded.Knowledge.observations.plus(1)
                state.virtueUpgraded.Knowledge.progress = new Decimal(0)
            }
        },
        // increase discovery bonus according current discoveries
        increaseDiscoveryBonus(state) {
            state.virtueUpgraded.Knowledge.discoveryBonus = state.virtueUpgraded.Knowledge.discoveryBonus.plus(Decimal.log(state.virtueUpgraded.Knowledge.observations))
        },
        // consume observation
        consumeObservation(state) {
            state.virtueUpgraded.Knowledge.observations = new Decimal(0)
        },
    },
    actions: {
        // action to change virtue showable status
        showVirtue({ commit }, virtue) {
            commit("showVirtue", virtue)
        },

        // reset player state
        resetPlayerState({ commit, rootState, state }) {
            commit("resetPlayerState")
            // add 1 soft reset
            commit("increaseSoftReset")
            // set original costs of each virtue
            for (let virtue in state.virtues) {
                state.virtues[virtue]['cost'] = rootState.game.virtues[virtue]['cost']
            }
        },

        // discover action: consume all observations and turn them into discoveryBonus
        discover({ commit }) {
            commit("increaseDiscoveryBonus")
            commit("consumeObservation")
        },
    },
    modules: {},
};

export default player;