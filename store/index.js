import Vuex from "vuex";
import cookie from "./modules/cookie";

const createStore = () => {
  return new Vuex.Store({
    modules: {
      cookie,
    }
  });
};

export default createStore;
