import isScreen from '@/core/screenHelper';

export default {
    namespaced: true,
    state: {
        agents: null,
        ambulances:null
    },
    mutations: {

        setAgents(state, value) {
            if (value) {
                state.agents = value;
            } else {
                state.agents = value;
            }
        },
        setAmbulances(state, value) {
            if (value) {
                state.ambulances = value;
            } else {
                state.ambulances = value;
            }
        },

    },
    actions: {
        agentsSet({ commit }, value) {
            commit('setAgents', value);
        },
        ambulancesSet({ commit }, value) {
            commit('setAmbulances', value);
        },

    },
};
