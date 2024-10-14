<template>
  <v-container>
    <h1>
      {{ action }} {{ $t("label.comment") }}
      {{ $t("label.article") + " " + props.articleId }}
    </h1>
    <v-form v-model="isValid" @submit.prevent="handleSubmit">
      <!-- Content -->
      <v-textarea
        :label="u(t('label.content'))"
        v-model="comment.content"
        :error-messages="errors.content"
        required
      ></v-textarea>

      <!-- Errors -->
      <v-container v-if="networkError">
        <v-alert v-if="!networkError.length" dismissible type="success">
          {{ $t("error.success") }}
        </v-alert>
        <v-list-item-subtitle v-for="err in networkError">
          <v-alert type="error" dismissible>
            {{ $t(err) }}
          </v-alert>
        </v-list-item-subtitle>
      </v-container>

      <v-container>
        <!-- Submit -->
        <v-btn
          v-if="!sending"
          :disabled="!isValid"
          color="primary"
          type="submit"
        >
          {{ action }}
        </v-btn>
        <!-- Loading Indicator -->
        <v-progress-circular
          v-else
          indeterminate
          color="primary"
          size="33"
        ></v-progress-circular>
      </v-container>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

import { u } from "../utils/textUtil";

const { t } = useI18n();
const store = useStore();

const props = defineProps({
  comment: {
    type: Object,
    default: {},
  },
  articleId: {
    require: true,
  },
});

const comment = ref({
  content: undefined,
});

const errors = ref({
  content: "",
});
const networkError = ref(undefined);

// change comment values
watch(
  () => comment.value,
  (newComment) => {
    if (!newComment.content) {
      errors.value.content = !newComment.content
        ? u(t("validator.content_required"))
        : "";
      isValid.value = false;
    } else {
      errors.value.content = "";
      isValid.value = true;
    }
  },
  { deep: true },
);

// change props
watch(() => props.comment, initComment);

initComment(props.comment);

const isEdit = computed(() => (props.comment.id ? true : false));
const sending = ref(false);
const isValid = ref(false);

const action = computed(() => {
  const message = isEdit.value ? t("action.update") : t("action.create");
  return u(message);
});

async function handleSubmit() {
  if (sending.value) return;
  sending.value = true;

  try {
    if (isEdit.value) {
      await store.dispatch("editComment", {
        id: props.comment.id,
        articleId: props.articleId,
        content: comment.value.content,
      });
    } else {
      await store.dispatch("addComment", {
        articleId: props.articleId,
        content: comment.value.content,
      });
    }
    networkError.value = [];
  } catch (err) {
    networkError.value = err;
  }

  sending.value = false;
}

function initComment(newComment) {
  comment.value.content = newComment.content ? newComment.content : "";
  networkError.value = undefined;
}
</script>
