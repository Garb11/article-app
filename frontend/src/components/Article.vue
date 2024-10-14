<template>
  <v-container>
    <v-card class="article">
      <v-card-title class="text-center">{{ article.title }}</v-card-title>
      <v-card-text>{{ article.content }}</v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
});
</script>
