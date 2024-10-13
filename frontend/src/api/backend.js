import axios from "axios";

const client = axios.create({
  baseURL: `http://localhost:3000`,
  timeout: 4000,
});

export const fetchArticles = async () => {
  return await client.get(`/articles`);
};

export const fetchArticle = async () => {
  return await client.get(`/article/${articleId}`);
};

export const fetchComments = async (articleId) => {
  return await client.get(`/article/${articleId}/comments/`);
};

export const fetchComment = async (id, articleId) => {
  return await client.get(`/article/${articleId}/comment/${id}`);
};

export const createArticle = async (title, content) => {
  return await client.post(`/article`, { title, content });
};

export const createComment = async (articleId, content) => {
  return await client.post(`/article/${articleId}/comment/`, { content });
};

export const editArticle = async (id, title, content) => {
  return await client.patch(`/article/${id}`, { title, content });
};

export const editComment = async (id, articeleId, content) => {
  return await client.patch(`/article/${articeleId}/comment/${id}`, {
    content,
  });
};

export const deleteArticle = async (id) => {
  return await client.delete(`/article/${id}`);
};

export const deleteComment = async (id, articleId) => {
  return await client.delete(`/article/${articleId}/comment/${id}`);
};

export const analyticComments = async (dateFrom, dateTo) => {
  return await client.get("/analytic/comments", {
    params: {
      dateFrom,
      dateTo,
    },
  });
};
