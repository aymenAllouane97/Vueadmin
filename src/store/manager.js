import isScreen from '@/core/screenHelper';

export default {
    namespaced: true,
    state: {
        agents: null,
        ambulances:null,
        hospitals:null
    },
    mutations: {

        setAgents(state, value) {
            if (value) {
                state.agents = value;
            } else {
                state.agents = null;
            }
        },
        setAmbulances(state, value) {
            if (value) {
                state.ambulances = value;
            } else {
                state.ambulances = null;
            }
        },
        setHospitals(state, value) {
            if (value) {
                state.hospitals = value;
            } else {
                state.hospitals = null;
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
        hospitalsSet({ commit }, value) {
            commit('setHospitals', value);
            },

    },
};
