<template>
  <div class="ui two fields">
    <button class="ui basic mini button" @click="createShareLink">
      <i class="share alternate icon"></i>
      Share
    </button>
    <transition name="fade">
      <div v-if="shareLink.length > 0" class="ui mini action input">
        <input id="share-link" type="text" :value="shareLink" />
        <button class="ui blue right labeled icon mini button" @click="copy">
          <i class="copy icon"></i>
          Copy
        </button>
      </div>
    </transition>
  </div>

  <BaseBanner :show="bannerOpen">
    <template #header>No nominations</template>
    <template #default>
      You must add at least 1 nomination before you can share your list
    </template>
  </BaseBanner>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import BaseBanner from "./ui/BaseBanner.vue";

export default {
  components: {
    BaseBanner
  },
  computed: {
    ...mapState(["shareLink", "bannerOpen"])
  },
  methods: {
    ...mapMutations(["createShareLink"]),
    copy() {
      var txt = document.getElementById("share-link");
      txt.select();
      txt.setSelectionRange(0, 99999);
      document.execCommand("copy");
      this.$store.commit("eraseShareLink");
    }
  }
};
</script>

<style>
.blue.button {
  background-color: #303942 !important;
}
.blue.button:hover {
  background-color: #242b32 !important;
}
.blue.button:active {
  background-color: #191d23 !important;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
