const state = {
  toast: false,
  toastMessage: ""
};

const mutations = {
  resetToast(state) {
    try {
      state.toast = false;
      state.toastMessage = "";
    } catch (error) {}
  },
  openToast(state, open) {
    try {
      state.toast = open;
    } catch (error) {}
  },
  messageToast(state, message) {
    if (message && message != "") {
      try {
        state.toastMessage = message.toString();
        state.toast = true;
      } catch (error) {}
    }
  },
  messageError(state, error) {
    if (error.response) {
      let data = error.response.data;
      if (!data.success) {
        let info = data.info;
        if (info && info.detail && info.detail.includes("already exists")) {
          state.toastMessage = "Ya existe!";
          state.toast = true;
        } else {
          state.toastMessage = data.message;
          state.toast = true;
        }
      }
    }
  }
};

const getters = {
  showToast(state) {
    return state.toast;
  },
  getMessage(state) {
    try {
      return state.toastMessage;
    } catch (error) {
      return null;
    }
  }
};

const actions = {};

export default {
  state,
  getters,
  actions,
  mutations
};
