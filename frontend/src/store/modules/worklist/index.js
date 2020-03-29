import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';

const state = {
  list: [],
  filter: {
    status: '',
    entranceTime: null,
  },
  selectedPatient: {
    ticket: '',
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
