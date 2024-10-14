<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>{{ $t("name.app_title") }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="navigateToPage('preview')">{{
        $t("name.preview_page")
      }}</v-btn>
      <v-btn text @click="navigateToPage('articles')">{{
        $t("name.articles_page")
      }}</v-btn>
    </v-app-bar>
    <v-main>
      <v-container v-if="error">
        <v-alert type="error" v-for="err in error" outlined>
          {{ $t(err) }}
        </v-alert>
      </v-container>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, onBeforeUnmount, ref } from "vue";
import { useStore } from "vuex";

const refetchTimeout = 15000;

const store = useStore();
const router = useRouter();

const error = ref(undefined);

const navigateToPage = (page) => router.push({ name: page });
const fetchArticles = async () => {
  try {
    await store.dispatch("fetchAllArticles");
    error.value = undefined;
  } catch (err) {
    error.value = err;
  }
};
const refetchInterval = setInterval(fetchArticles, refetchTimeout);

onBeforeUnmount(() => {
  clearInterval(refetchInterval);
});
</script>
