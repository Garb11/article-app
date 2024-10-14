<template>
  <v-data-table :items="articles" item-key="id"> </v-data-table>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const articles = computed(() => store.state.articles.articles);
</script>
