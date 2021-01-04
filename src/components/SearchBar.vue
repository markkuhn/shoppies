<template>
  <div class="ui form">
    <div class="fields">
      <div class="ten wide field">
        <div
          class="ui left icon fluid input"
          :class="{ loading: isLoadingResults }"
        >
          <i class="search icon"></i>
          <input
            v-model.trim="query"
            type="text"
            placeholder="Search..."
            @keyup="search"
          />
        </div>
      </div>
      <div
        class="six wide field"
        :class="{
          error:
            (isNaN(parseInt(year)) ||
              parseInt(year) < 1888 ||
              parseInt(year) > 2025) &&
            year.length > 0
        }"
      >
        <div class="ui labeled input">
          <div class="ui label">Release Year</div>
          <input
            v-model="year"
            type="text"
            placeholder="ex: 2015"
            @keyup="search"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  emits: ["set-results"],
  data() {
    return {
      query: "star wars",
      year: ""
    };
  },
  computed: {
    ...mapState(["isLoadingResults"])
  },
  created() {
    this.search();
  },
  methods: {
    search() {
      this.$store.dispatch("search", { query: this.query, year: this.year });
    }
  }
};
</script>

<style>
.ui.form {
  margin-bottom: 3rem;
}
</style>
