<template>
  <v-container>
    <h1>{{ action }} {{ $t("label.article") }}</h1>
    <v-form v-model="isValid" @submit.prevent="handleSubmit">
      <!-- Title -->
      <v-text-field
        :label="u(t('label.title'))"
        v-model="article.title"
        :error-messages="errors.title"
        required
      ></v-text-field>

      <!-- Content -->
      <v-textarea
        :label="u(t('label.content'))"
        v-model="article.content"
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
  article: {
    type: Object,
    default: {},
  },
});

const article = ref({
  title: undefined,
  content: undefined,
});

const errors = ref({
  title: "",
  content: "",
});
const networkError = ref(undefined);

// change article values
watch(
  () => article.value,
  (newArticle) => {
    if (!newArticle.title || !newArticle.content) {
      errors.value.title = !newArticle.title
        ? u(t("validator.title_required"))
        : "";
      errors.value.content = !newArticle.content
        ? u(t("validator.content_required"))
        : "";
      isValid.value = false;
    } else {
      errors.value.title = "";
      errors.value.content = "";
      isValid.value = true;
    }
  },
  { deep: true },
);

// change props
watch(() => props.article, initArticle);

initArticle(props.article);

const isEdit = computed(() => ("id" in props.article ? true : false));
const sending = ref(false);
const isValid = ref(false);

const action = computed(() => {
  const message = isEdit.value ? t("action.update") : t("action.create");
  return u(message);
});

async function handleSubmit() {
  if (sending.value) return;
  sending.value = true;
  networkError.value = undefined;

  try {
    if (isEdit.value) {
      await store.dispatch("editArticle", {
        ...article.value,
        id: props.article.id,
      });
    } else {
      await store.dispatch("addArticle", article.value);
    }
    networkError.value = [];
  } catch (err) {
    networkError.value = err;
  }

  sending.value = false;
}

function initArticle(newArticle) {
  article.value.title = newArticle.title ? newArticle.title : "";
  article.value.content = newArticle.content ? newArticle.content : "";
  networkError.value = undefined;
}
</script>
