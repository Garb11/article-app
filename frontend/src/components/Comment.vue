<template>
  <v-container>
    <v-card class="comment">
      <v-card-text>{{ comment.content }}</v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
});
</script>
