import { createStore } from "vuex";

import articles from "./modules/articles";

export default createStore({
  modules: {
    articles,
  },
});
