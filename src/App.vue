<template>
  <div v-if="windowWidth < 993" class="ui info message">
    <p>Sorry, not yet supported on mobile</p>
  </div>

  <div v-else class="ui container">
    <div class="ui relaxed grid">
      <div class="ten wide column">
        <!-- <h1 class="ui header">The Shoppies</h1> -->
        <img class="ui medium image logo" src="@/assets/logo.jpg" />
        <SearchBar />
        <h4 v-if="searchResults.length == 0">Start typing to see results</h4>
        <div v-else class="ui four cards">
          <MovieResult
            v-for="result in searchResults"
            :key="result.imdbID"
            :movie="result"
          >
          </MovieResult>
        </div>
      </div>
      <div class="six wide column nominations">
        <h2>My Nominations</h2>
        <ShareBar />
        <MovieNominations />
      </div>
    </div>
  </div>

  <BaseModal :show="messageOpen" @close="closeMessage">
    <template #header>Success</template>
    <template #default>Congratulations! You have nominated 5 movies!</template>
  </BaseModal>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";

import SearchBar from "@/components/SearchBar";
import MovieResult from "@/components/MovieResult";
import MovieNominations from "@/components/MovieNominations";
import BaseModal from "@/components/ui/BaseModal";
import ShareBar from "@/components/ShareBar";

export default {
  components: {
    SearchBar,
    MovieResult,
    MovieNominations,
    BaseModal,
    ShareBar
  },
  data() {
    return {
      windowWidth: window.innerWidth
    };
  },
  computed: {
    ...mapState(["searchResults", "searchQuery", "nominations", "messageOpen"])
  },

  mounted() {
    // Listen to window width to show mobile warning
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  },
  created() {
    if (document.location.search) {
      var ids = [];
      var noms = document.location.search.substring(1).split("&");
      noms.forEach(id => ids.push(id.split("=")[1]));
      this.$store.dispatch("restoreNominations", ids);
    }
  },
  methods: {
    ...mapActions(["getSearchResults"]),
    ...mapMutations(["closeMessage"])
  }
};
</script>

<style>
.container {
  margin-top: 2rem;
}
.info.message {
  text-align: center;
}
.logo {
  margin-bottom: 1.3rem;
}
.nominations {
  margin-top: 1.6rem;
}
body {
  background-color: #f3f3f3;
}
</style>
