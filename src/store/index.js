import { createStore } from "vuex";
import axios from "axios";

const mutations = {
  closeMessage(state) {
    state.messageOpen = false;
  },

  removeNomination(state, { imdbID }) {
    state.nominations = state.nominations.filter(e => e.imdbID != imdbID);
  },

  createShareLink(state) {
    if (state.nominations.length == 0) {
      state.bannerOpen = true;
      state.shareLink = "";
      setTimeout(() => (state.bannerOpen = false), 3000);
    } else {
      var shareLink = "http://www.shoppies.me/?";
      state.nominations.forEach(
        movie => (shareLink += `nomination=${movie.imdbID}&`)
      );
      state.shareLink = shareLink.substring(0, shareLink.length - 1);
    }
  },

  eraseShareLink(state) {
    state.shareLink = "";
  }
};

const actions = {
  async restoreNominations({ state, dispatch }, ids) {
    state.isRestoring = true;
    state.nominations = [];
    ids.forEach(id =>
      dispatch("nominate", { imdbID: id, hideConfirmation: true })
    );
    state.isRestoring = false;
  },
  async search({ state }, { query, year }) {
    state.isLoadingResults = true;

    const response = await axios.get(`/api/movies?title=${query}&year=${year}`);
    const searchResults = response.data;
    if (searchResults.totalResults > 0)
      state.searchResults = searchResults.Search;
    state.isLoadingResults = false;
  },
  async nominate({ state }, { imdbID, hideConfirmation }) {
    const response = await axios.get(`/api/movie?id=${imdbID}`);

    // Check if valid movie and list not full
    if (response.data.Response != "False" && state.nominations.length < 5) {
      state.nominations.push(response.data);
    }

    // Check if list full
    if (state.nominations.length == 5 && !hideConfirmation) {
      state.messageOpen = true;
    }

    this.isLoading = false;
  }
};

const getters = {};

export default createStore({
  state() {
    return {
      nominations: [],
      searchResults: [],
      isLoadingResults: false,
      isRestoring: false,
      messageOpen: false,
      bannerOpen: false,
      shareLink: ""
    };
  },
  mutations: mutations,
  getters: getters,
  actions: actions
});
