import * as api from "@/api/backend";
import { errorWrapperAction } from "@/utils/errorUtil";

export default {
  state: {
    articles: [],
    errors: [],
  },
  mutations: {
    SET_ARTICLES(state, articles) {
      state.articles = articles;
    },
    SET_ARTICLE(state, article) {
      const ind = state.articles.findIndex((e, i, a) => e.id == article.id);
      if (ind !== -1) {
        state.articles[ind] = article;
      } else {
        state.articles.push(article);
      }
    },
    DELETE_ARTICLE(state, id) {
      const ind = state.articles.findIndex((e, i, a) => e.id == id);
      if (ind !== -1) {
        state.articles.splice(ind, 1);
      }
    },
  },
  actions: {
    async fetchAllArticles({ commit }) {
      await errorWrapperAction(async () => {
        const response = await api.fetchArticles();
        commit("SET_ARTICLES", response.data);
      }, `Error while fetching all articles`);
    },
    async fetchArticle({ commit }, id) {
      await errorWrapperAction(async () => {
        const response = await api.fetchArticle(id);
        commit("SET_ARTICLE", response.data);
      }, `Error while fetchArticle ${id}`);
    },
    async editArticle({ commit }, { id, title, content }) {
      await errorWrapperAction(async () => {
        const response = await api.editArticle(id, title, content);
        commit("SET_ARTICLE", response.data);
      }, `Error while editArticle ${id} with ${{ title, content }}`);
    },
    async deleteArticle({ commit }, id) {
      await errorWrapperAction(async () => {
        const response = await api.deleteArticle(id);
        commit("DELETE_ARTICLE", id);
      }, `Error while deleteArticle ${id}`);
    },
    async addArticle({ commit }, { title, content }) {
      await errorWrapperAction(async () => {
        const response = await api.createArticle(title, content);
        commit("SET_ARTICLE", response.data);
      }, `Error while addArticle with data: ${content}`);
    },
  },
  getters: {
    article: (state) => (id) => {
      const ind = state.articles.findIndex((e, i, a) => e.id == id);
      return ind != -1 ? state.articles[ind] : undefined;
    },
    articles: (state) => state.articles,
  },
};
