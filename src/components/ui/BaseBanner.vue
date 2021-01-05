<template>
  <teleport to="body">
    <transition name="banner">
      <div v-if="show" class="ui floating message info">
        <div class="header">
          <slot name="header"></slot>
        </div>
        <slot></slot>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style scoped>
.floating.message {
  position: absolute;
  z-index: 1;
  left: calc(50vw - 19rem);
  width: 38rem;
  top: 1rem;
  box-shadow: 6px 10px 48px 0px rgba(0, 0, 0, 0.75);
}

/* Animations */
.banner-enter-active,
.banner-leave-active {
  transition: all 0.3s ease-in-out;
}

.banner-enter-from,
.banner-leave-to {
  opacity: 0;
}
</style>
