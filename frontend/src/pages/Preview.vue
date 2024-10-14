<template>
  <v-container fluid>
    <v-row>
      <!-- SackBar -->
      <v-snackbar
        :close-on-content-click="true"
        location="top"
        v-model="snackbar"
        :timeout="snackbarTimeout"
      >
        {{ $t(snackbarMessage) }}
      </v-snackbar>

      <!-- If articles is empty -->
      <v-col v-if="articlesIsEmpty" cols="12" align="center" class="border">
        <h1>{{ $t("message.empty_articles") }}</h1>
        <v-container>
          <v-btn @click="addArticle" width="30%" height="70" color="primary">{{
            $t("action.create")
          }}</v-btn>
        </v-container>
      </v-col>

      <v-col v-else cols="12" md="6" class="pa-1">
        <!-- List Articles -->
        <v-virtual-scroll
          :items="articles"
          :item-size="100"
          class="v-scroll overflow-y-auto"
        >
          <!-- Load Articles -->
          <template v-slot="{ item }">
            <ArticleView
              class="article-view"
              @article-click="toggleComments(item)"
              :article="toModel(item)"
            >
              <template #article>
                <v-card-actions>
                  <v-btn @click="addComment(item)" color="primary">{{
                    $t("action.add_comment")
                  }}</v-btn>
                  <v-btn @click="editArticle(item)" color="warning">{{
                    $t("action.edit")
                  }}</v-btn>
                  <v-btn @click="deleteArticle(item)" color="error">{{
                    $t("action.delete")
                  }}</v-btn>
                  <v-spacer></v-spacer>
                  <v-progress-circular
                    v-if="loadingComments.has(item.id)"
                    indeterminate
                    color="primary"
                    size="33"
                  ></v-progress-circular>
                </v-card-actions>
              </template>
              <template #comment="{ comment }">
                <v-card-actions>
                  <v-btn @click="editComment(item, comment)" color="warning">{{
                    $t("action.edit")
                  }}</v-btn>
                  <v-btn @click="deleteComment(item, comment)" color="error">{{
                    $t("action.delete")
                  }}</v-btn>
                </v-card-actions>
              </template>
            </ArticleView>
            <v-divider></v-divider>
          </template>
        </v-virtual-scroll>
      </v-col>
      <v-col cols="12" md="6" class="pa-4">
        <router-view />
      </v-col>
    </v-row>

    <!-- Add Article Btn-->
    <v-btn class="floating-button" fab color="primary" @click="addArticle">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const snackbarTimeout = 3000;
const success = "success";
const toStr = (arr) => arr.join(". ");

const store = useStore();
const router = useRouter();

const loadingComments = ref(new Set());
const showComments = ref(new Set());

const snackbar = ref(false);
const snackbarMessage = ref("");

const articlesIsEmpty = computed(() => !store.getters.articles.length);
const articles = computed(() => store.getters.articles);
const comments = computed(
  () => (articleId) => store.getters.comments(articleId),
);
const toModel = computed(() => (article) => {
  return {
    ...article,
    comments: showComments.value.has(article.id)
      ? comments.value(article.id)
      : [],
  };
});

const scroll = async () => {
  const timeWait = 100;
  let target = document.querySelector(".v-form");
  if (!target) {
    await new Promise((resolve) => setTimeout(resolve, timeWait));
    target = document.querySelector(".v-form");
  }
  if (target) target.scrollIntoView({ behavior: "smooth" });
};

function editArticle(article) {
  router.push({
    name: "preview-edit-article",
    params: { id: article.id },
  });
  scroll();
}

async function deleteArticle(article) {
  try {
    snackbar.value = false;
    await store.dispatch("deleteArticle", article.id);
    snackbarMessage.value = success;
  } catch (err) {
    snackbarMessage.value = toStr(err);
  }
  snackbar.value = true;
}

function editComment(article, comment) {
  router.push({
    name: "preview-edit-comment",
    params: { id: comment.id, articleId: article.id },
  });
  scroll();
}

function addArticle() {
  router.push({
    name: "preview-add-article",
  });
  scroll();
}

function addComment(article) {
  router.push({
    name: "preview-add-comment",
    params: { articleId: article.id },
  });
  scroll();
}

async function deleteComment(article, comment) {
  try {
    snackbar.value = false;
    await store.dispatch("deleteComment", {
      id: comment.id,
      articleId: article.id,
    });
    snackbarMessage.value = success;
  } catch (err) {
    snackbarMessage.value = toStr(err);
  }
  snackbar.value = true;
}

async function toggleComments(article) {
  const id = article.id;

  if (showComments.value.has(id)) {
    showComments.value.delete(id);
    return;
  }
  if (loadingComments.value.has(id)) return;
  loadingComments.value.add(id);

  if (!store.getters.comments(article.id).length) {
    await store.dispatch("fetchAllComments", id);
  }
  showComments.value.add(id);

  loadingComments.value.delete(id);
}

onMounted(() => scroll());
</script>

<style>
.article {
  cursor: pointer;
}

.v-scroll {
  height: 80vh;
}

.floating-button {
  border-radius: 30%;
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 1000;
}
</style>
