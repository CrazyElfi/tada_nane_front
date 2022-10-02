import Vue from 'vue'
import Vuex from 'vuex'
import Api from "@/api/api";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: null,
    roomHistory: null,
    roomName: null,
    username: "Козьма Прутков",
    settings: {
      maxMessageLength: 50,
      maxRoomTitleLength: 50,
      maxUsernameLength: 50,
      uptime: 0,
    },
  },
  mutations: {
    updateRoomsList(state, rooms) {
      state.rooms = rooms;
    },

    updateRoomHistory(state, history) {
      state.roomHistory = history;
    },

    updateRoomName(state, name) {
      state.roomName = name;
    },

    updateUserName(state, name) {
      state.username = name;
    },

    updateSettings(state, settings) {
      state.settings = settings;
    },
  },
  actions: {
    async fetchRoomsList({ commit }) {
      const data = await Api.getRooms();
      commit('updateRoomsList', data);
    },

    async fetchRoomHistory({ commit }) {
      const data = await Api.getRoomHistory(this.state.roomName);

      commit('updateRoomHistory', data);
    },

    fetchRoomName({ commit }, roomName) {
      commit('updateRoomName', roomName);
    },

    fetchUserName({ commit }, newName) {
      commit('updateUserName', newName);
    },

    async fetchSettings({ commit }) {
      const data = await Api.getSettings();

      let settings = {
        maxMessageLength: data.max_message_length,
        maxRoomTitleLength: data.max_room_title_length,
        maxUsernameLength: data.max_username_length,
        uptime: data.uptime,
      };
      commit('updateSettings', settings);
    },
  },
})
