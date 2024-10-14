import * as api from "@/api/backend";
import { errorWrapperAction } from "@/utils/errorUtil";

export default {
  state: {
    comments: {},
    errors: [],
  },
  mutations: {
    SET_COMMENTS(state, { comments, articleId }) {
      state.comments[articleId] = comments;
    },
    SET_COMMENT(state, { comment, articleId }) {
      if (state.comments[articleId]) {
        const arr = state.comments[articleId];
        const ind = arr.findIndex((e, i, a) => e.id == comment.id);
        if (ind !== -1) {
          arr[ind] = comment;
        } else {
          arr.push(comment);
        }
      } else {
        state.comments[articleId] = [comment];
      }
    },
    DELETE_COMMENT(state, { id, articleId }) {
      if (state.comments[articleId]) {
        const comments = state.comments[articleId];
        const ind = comments.findIndex((e, i, a) => e.id == id);
        if (ind !== -1) {
          comments.splice(ind, 1);
        }
      }
    },
  },
  actions: {
    async fetchAllComments({ commit }, articleId) {
      await errorWrapperAction(async () => {
        const response = await api.fetchComments(articleId);
        commit("SET_COMMENTS", { comments: response.data, articleId });
      }, `Error while fetchAllComments for ArticleId ${articleId}`);
    },
    async fetchComment({ commit }, { id, articleId }) {
      await errorWrapperAction(async () => {
        const response = await api.fetchComment(id, articleId);
        commit("SET_COMMENT", { comment: response.data, articleId });
      }, `Error while fetchComment ${id} for ArticleId ${articleId}`);
    },
    async editComment({ commit }, { id, articleId, content }) {
      await errorWrapperAction(async () => {
        const response = await api.editComment(id, articleId, content);
        commit("SET_COMMENT", { comment: response.data, articleId });
      }, `Error while editComment ${id} for ${articleId} with ${content}`);
    },
    async deleteComment({ commit }, { id, articleId }) {
      await errorWrapperAction(async () => {
        const response = await api.deleteComment(id, articleId);
        commit("DELETE_COMMENT", { id, articleId });
      }, `Error while deleteComment ${id} for ${articleId}`);
    },
    async addComment({ commit }, { articleId, content }) {
      await errorWrapperAction(async () => {
        const response = await api.createComment(articleId, content);
        commit("SET_COMMENT", { comment: response.data, articleId });
      }, `Error while addComment for ${articleId} with ${content}`);
    },
  },
  getters: {
    comments: (state) => (articleId) => {
      return state.comments[articleId] ? state.comments[articleId] : [];
    },
    comment: (state) => (id, articleId) => {
      if (state.comments[articleId]) {
        const ind = state.comments[articleId].findIndex(
          (e, i, a) => e.id == id,
        );
        if (ind !== -1) {
          return state.comments[articleId][ind];
        }
        return undefined;
      }
      return undefined;
    },
  },
};
