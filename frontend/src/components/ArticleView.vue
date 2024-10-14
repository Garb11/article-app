<template>
  <v-container fluid>
    <v-row>
      <v-col cols="10">
        <!-- Show Article -->
        <Article @click="onArticleClick" :article="article"></Article>
        <slot name="article"></slot>
      </v-col>
      <slot></slot>
      <v-col class="pl-16">
        <!-- Show Comments -->
        <v-list-item-subtitle v-for="comment in comments" :key="comment.id">
          <Comment
            @click="onCommentClick(comment)"
            :comment="comment"
          ></Comment>
          <slot name="comment" :comment="comment"></slot>
        </v-list-item-subtitle>
      </v-col>
      <slot v-if="!comments.length" name="empty"></slot>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from "vue";

const emit = defineEmits();

const props = defineProps({
  article: {
    type: Object,
    require: true,
  },
});

const article = computed(() => props.article);
const comments = computed(() =>
  props.article.comments ? props.article.comments : [],
);

const onArticleClick = () => {
  emit("article-click", article);
};
const onCommentClick = (comment) => {
  emit("comment-click", comment);
};
</script>

<style>
.comment {
  border: 1px solid;
}
</style>
