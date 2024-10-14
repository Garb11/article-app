import ArticlesTable from "@/pages/ArticlesTable.vue";
import Analytic from "@/pages/Analytic.vue";

export default [
  {
    path: "/articles",
    name: "articles",
    component: ArticlesTable,
  },
  {
    path: "/analytic",
    name: "analytic",
    component: Analytic,
  },
];
