<template>
  <div class="ui card">
    <div class="image">
      <img v-if="movie.Poster == 'N/A'" src="@/assets/placeholder.png" />
      <img v-else :src="movie.Poster" />
    </div>
    <div class="content">
      <div class="header">{{ movie.Title }}</div>
      <div class="meta">
        <span class="date">{{ movie.Year }}</span>
      </div>
    </div>
    <div
      class="ui bottom attached button"
      :class="{
        disabled:
          isNominated || isLoading || nominations.length == 5 || isRestoring,
        loading: isLoading
      }"
      @click="nominate(movie.imdbID)"
    >
      <i class="icon" :class="[isNominated ? 'check' : 'add']"></i>
      {{ isNominated ? "Nominated" : "Nominate" }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isLoading: false
    };
  },
  computed: {
    ...mapState(["nominations", "isRestoring"]),
    isNominated() {
      if (this.nominations.find(e => e.imdbID == this.movie.imdbID))
        return true;
      else return false;
    }
  },
  methods: {
    async nominate(imdbID) {
      this.isLoading = true;
      await this.$store.dispatch("nominate", { imdbID });
      this.isLoading = false;
    }
  }
};
</script>
