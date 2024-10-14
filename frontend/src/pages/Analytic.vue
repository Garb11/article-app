<template>
  <v-container fluid class="pa-5" style="min-height: 100vh">
    <v-row class="mt-5" justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="3">
          <v-card-title class="text-h5">
            {{ $t("label.analytic_title") }}
          </v-card-title>
          <v-card-text>
            <!-- Date pickers -->
            <v-form>
              <v-text-field
                :label="$t('label.start_time')"
                type="datetime-local"
                v-model="dateFrom"
                outlined
                dense
                class="mb-4"
              ></v-text-field>

              <v-text-field
                :label="$t('label.end_time')"
                type="datetime-local"
                v-model="dateTo"
                outlined
                dense
                class="mb-4"
              ></v-text-field>

              <!-- Errors -->
              <v-alert v-if="errors.length" type="error" prominent class="mb-4">
                <ul>
                  <li v-for="(error, index) in errors" :key="index">
                    {{ error }}
                  </li>
                </ul>
              </v-alert>
              <v-btn v-if="!load" @click="search" color="primary" block large>
                {{ $t("action.search") }}
              </v-btn>
              <v-row v-else justify="center">
                <v-progress-circular
                  indeterminate
                  color="primary"
                  size="33"
                ></v-progress-circular>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Data display -->
    <v-row v-if="data">
      <v-col
        v-for="item in data"
        :key="item.id"
        class="mt-5"
        cols="12"
        md="6"
        lg="4"
        xl="3"
      >
        <v-container class="article-view">
          <ArticleView :article="item"></ArticleView>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { analyticComments } from "@/api/backend";
import { errorHandle } from "@/utils/errorUtil";

const dateTo = ref("");
const dateFrom = ref("");
const data = ref(undefined);
const errors = ref([]);
const load = ref(false);

const convertToUTC = (date) => {
  const localTime = new Date(date);
  const utcDateTime = localTime.toISOString();
  return utcDateTime;
};
const validateDate = (date) => {
  return !date ? "date field cannot be empty " : undefined;
};

const search = async () => {
  const e1 = validateDate(dateTo.value);
  const e2 = validateDate(dateFrom.value);
  if (e1 || e2) {
    errors.value = [e1, e2];
    return;
  }

  load.value = true;
  errors.value = [];
  const dateToUTC = convertToUTC(dateTo.value);
  const dateFromUTC = convertToUTC(dateFrom.value);
  try {
    const response = await analyticComments(dateFromUTC, dateToUTC);
    data.value = response.data;
  } catch (err) {
    const errs = errorHandle(err);
    errors.value = errs;
  } finally {
    load.value = false;
  }
};

onMounted(() => {
  const now = new Date();
  const localISOTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
  dateTo.value = localISOTime;
  dateFrom.value = localISOTime;
});
</script>

<style scoped>
.v-container {
  min-height: 100vh;
}
.article-view {
  border: 1px solid rgb(44, 39, 39);
}
.v-card {
  max-height: 80vh;
  overflow-y: auto;
}
</style>
