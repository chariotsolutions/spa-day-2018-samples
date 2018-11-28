import Vue from 'vue';
import Vuex from 'vuex';
import * as Axios from 'axios';

// we chose to use Axios as the Ajax library
// Pick anything you like, such as RxJS's ajax observable...
const axios = Axios.create({
  baseURL: '/spaday/api/'
});

// Install the VueX mixin
Vue.use(Vuex);

// configure VueX
const store = new Vuex.Store({
  state: {
    sessions: [
    ],
    registration: [
    ],
    registeredSession: {},
    loaders: []
  },
  getters: {
    sessions: (state) => {
      return state.sessions;
    },
    sessionById: (state) => (id) => {
      return state.sessions.find(entry => entry.id === id);
    },
    registeredSession: (state) => state.registeredSession,
    lastRegistration: (state) => state.lastRegistration,
    loaders: (state) => state.loaders
  },
  mutations: {
   LOADING(state, payload) {
     const loaderIdx = state.loaders.findIndex(loader => payload === loader);
     if (loaderIdx === -1) {
       Vue.set(state, 'loaders', [...state.loaders, payload]);
       console.log('adding loader', payload);
       console.dir(state.loaders);
     }
   },
   LOADED(state, payload) {
     const loaderIdx = state.loaders.findIndex(loader => payload === loader);
     if (loaderIdx >= 0) {
       Vue.set(state, 'loaders', state.loaders.filter(s => s !== payload));
       console.log('removing loader', payload);
       console.dir(state.loaders);
     }
   },
   SET_SESSIONS(state, payload) {
      const parsedDateSessions =  payload.sessions.map(s => ({ ...s, date: new Date(s.date)}));
      console.log('state before mutation', state);
      // in this case we wipe out and reset state
      Vue.set(this.state, 'sessions', parsedDateSessions);
    },
   SET_LAST_REGISTRATION(state, payload) {
     Vue.set(this.state, 'lastRegistration', payload);
   },
   SET_REGISTERED_SESSION(state, payload) {
      Vue.set(this.state, 'registeredSession', {
        session: { ...payload.session },
        registrations: { ...payload.registrations }
      });
   },
  },
  actions: {
    loadSessions({commit}) {
      commit('LOADING', 'sessions');
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get('session');
          const fetchedSessions = response.data;
          // fetch all registration counts
          // note: HORRIBLE idea - better to get a web service
          // that packs in all data in one payload if this is the
          // need. Also ignoring paging / less than full results
          // as this is mostly a toy app showing potential features.
          // i.e. - don't do this on the regular, it's not a hammer
          // for async loading of multiple payloads! Heck, we're
          // loading all subscriptions just to count them! O THE PAIN!
          // So we have O(n+1)
          await Promise.all(fetchedSessions.map(async (fetchedSession) => {
            const subscriptionCount = await axios.get(`session/${fetchedSession.id}/subscriptions`)
                .then(response => (response.data ? response.data.length : 0));
            Vue.set(fetchedSession, 'subscriptionCount', subscriptionCount);
          }));
          commit('SET_SESSIONS', {sessions: fetchedSessions});
          commit('LOADED', 'sessions');
          resolve();
        } catch (e) {
          // TODO yuck
          commit('LOADED', 'sessions');
          reject(e);
        }
      });
    },
    async loadSessionDetails({commit}, id) {
      commit('LOADING', 'registered-session');
      return new Promise(async (resolve, reject) => {
        try {
          const sessionDetailsResponse = await axios.get(`session/${id}`);
          const subscriptionsResponse = await axios.get(`session/${id}/subscriptions`);
          const sessionDetails = sessionDetailsResponse.data;
          commit('LOADED', 'registered-session');
          commit('SET_REGISTERED_SESSION', {
            session: { ...sessionDetails, date: new Date(sessionDetails.date) },
            registrations: subscriptionsResponse.data
          });
          resolve();
        } catch (e) {
          commit('LOADED', 'registered-session');
          reject(e);
        }
      });
    },
    addRegistrationToSession({commit}, registrationData) {
      return new Promise(async(resolve, reject) => {
        commit('LOADING', 'registering');
        try {
          await axios.post(
            `session/${registrationData.sessionId}/subscribe`, registrationData.registration);
          commit('SET_LAST_REGISTRATION', registrationData);
          commit('LOADED', 'registering');
          resolve();
        } catch (e) {
          commit('LOADED', 'registering');
          reject(e);
        }
      });
    }
 }
});

store.dispatch('loadSessions');

export default store;
