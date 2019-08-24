import Vuex from "vuex";
import cookie from "./modules/cookie";
import toast from "./modules/toast";

const createStore = () => {
  return new Vuex.Store({
    modules: {
      cookie,
      toast,
    }
  });
};

export default createStore;
