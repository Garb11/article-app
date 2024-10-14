import ArticleForm from "@/components/ArticleForm";
import CommentForm from "@/components/CommentForm";
import Preview from "@/pages/Preview.vue";

import store from "@/store";

export default [
  {
    path: "/preview",
    name: "preview",
    component: Preview,
    beforeEnter: async (to, from, next) => {
      try {
        await store.dispatch("fetchAllArticles");
      } catch {}
      next();
    },
    children: [
      {
        path: "edit",
        children: [
          {
            path: "article",
            name: "preview-add-article",
            component: ArticleForm,
          },
          {
            path: "article/:id",
            name: "preview-edit-article",
            component: ArticleForm,
            beforeEnter: (to, from, next) => {
              const article = store.getters.article(to.params.id);
              if (article) {
                // article exist with id
                next();
              } else {
                // article not exist with id
                next({ name: "preview" });
              }
            },
            props: (route) => {
              return { article: store.getters.article(route.params.id) };
            },
          },
          {
            path: "article/:articleId/comment",
            name: "preview-add-comment",
            component: CommentForm,
            props: (route) => {
              return { articleId: route.params.articleId };
            },
          },
          {
            path: "article/:articleId/comment/:id",
            name: "preview-edit-comment",
            component: CommentForm,
            beforeEnter: async (to, from, next) => {
              const { id, articleId } = to.params;
              await store.dispatch("fetchComment", { id, articleId });
              const comment = store.getters.comment(
                to.params.id,
                to.params.articleId,
              );
              if (comment) {
                next();
              } else {
                next({ name: "preview" });
              }
            },
            props: (route) => {
              const comment = store.getters.comment(
                route.params.id,
                route.params.articleId,
              );
              return {
                comment,
                articleId: route.params.articleId,
              };
            },
          },
        ],
      },
    ],
  },
];
