<template>
  <h3 class="header">{{ nominations.length }} of 5</h3>
  <h3 v-if="nominations.length == 0">No nominations yet</h3>
  <transition-group name="label">
    <div
      v-for="movie in nominations"
      :key="movie.imdbID"
      class="ui large image label"
    >
      <img v-if="movie.Poster == 'N/A'" src="@/assets/placeholder.png" />
      <img v-else :src="movie.Poster" />
      {{
        titleTooLong(movie.Title)
          ? movie.Title.substring(0, 35) + "..."
          : movie.Title
      }}
      | <i>{{ movie.Genre.split(",")[0] }}</i>
      <i class="delete icon" @click="removeNomination(movie.imdbID)"></i>
    </div>
  </transition-group>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["nominations"])
  },
  methods: {
    removeNomination(imdbID) {
      this.$store.commit("removeNomination", { imdbID });
    },
    titleTooLong(title) {
      return title.length > 35;
    }
  }
};
</script>

<style scoped>
.label {
  margin-bottom: 1rem !important;
}

/* Animations */
.label-enter-active,
.label-leave-active {
  transition: all 0.3s ease-in-out;
}

.label-enter-from,
.label-leave-to {
  opacity: 0;
  transform: translateX(-3rem);
}
</style>
