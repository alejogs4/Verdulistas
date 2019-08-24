import VueCookie from "vue-cookie";
import config from "@/assets/js/config";

/**
 * STORE unicamente para manipular los datos del store y las cookies
 */

const state = {
  token: null,
  userid: null,
  useruid: null,
  username: null,
  projectid: null,
  projectuid: null,
  projectname: null,
  caseid: null,
  taskid: null,
  idLog: null,
  stateKardex: null
};

const mutations = {
  resetCookie(state) {
    state.token = null;
    state.userid = null;
    state.useruid = null;
    state.username = null;
    state.caseid = null;
    state.taskid = null;
    state.projectid = null;
    state.projectuid = null;
    state.projectname = null;
    state.idLog = null;
    state.stateKardex = null;
    let keys = Object.keys(config.cookie);
    keys.forEach(item => {
      VueCookie.delete(config.cookie[item]);
    });
  },
  setheader(state, user) {
    try {
      state.userid = user.id;
      state.useruid = user.uid;
      state.username = user.name;
      state.token = user.token;
      localStorage.setItem(config.cookie.token, user.token);
      VueCookie.set(config.cookie.token, user.token);
      VueCookie.set(config.cookie.username, user.name);
      VueCookie.set(config.cookie.userid, user.id);
      VueCookie.set(config.cookie.useruid, user.uid);
      VueCookie.set(config.cookie.roles, user.rol[0]);
      if (user.entity) {
        VueCookie.set(config.cookie.entityid, user.entity[0]);
      }
    } catch (error) {
      console.log(error);
    }
  },
  setStateCookie(state, item) {
    state[item.key] = item.value;
    if (item.value) VueCookie.set(item.key, item.value);
    else VueCookie.delete(item.key);
  }
};

const getters = {
  getStateCookie: state => key => {
    try {
      if (key == config.cookie.token) {
        return localStorage.getItem(config.cookie.token);
      } else {
        let data = state[key];
        if (data) state[key] = VueCookie.get(key);
        return VueCookie.get(key);
      }
    } catch (error) {
      console.log(error);
    }
  },
  getHeader(state) {
    try {
      state.token = localStorage.getItem(config.cookie.token);
      if (!state.userid) state.userid = VueCookie.get(config.cookie.userid);
      if (!state.projectid)
        state.projectid = VueCookie.get(config.cookie.projectid);
      if (!state.caseid) state.caseid = VueCookie.get(config.cookie.caseid);
      if (!state.taskid) state.taskid = VueCookie.get(config.cookie.taskid);
      return {
        token: state.token,
        "user-id": state.userid,
        projectid: state.projectid,
        caseid: state.caseid,
        taskid: state.taskid,
        useruid: state.useruid,
      };
    } catch (error) { }
  },
  getUser(state) {
    try {
      if (!state.userid) state.userid = VueCookie.get(config.cookie.userid);
      if (!state.username)
        state.username = VueCookie.get(config.cookie.username);
      return { userid: state.userid, username: state.username };
    } catch (error) { }
  }
};

const actions = {};

export default {
  state,
  getters,
  actions,
  mutations
};
