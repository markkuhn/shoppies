<template>
  <teleport to="body">
    <transition name="backdrop">
      <div v-if="show" class="backdrop" @click="$emit('close')">
        <div v-if="show" class="ui card window">
          <div class="content">
            <div class="header">
              <slot name="header">Info</slot>
            </div>
          </div>
          <div class="content">
            <slot name="default"></slot>
          </div>
          <div class="extra content">
            <div class="ui basic green button" @click="$emit('close')">
              Close
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: {
    show: Boolean
  },
  emits: ["close"]
};
</script>

<style scoped>
.window {
  display: block;
  margin: 0em 0em 0em 0em;
  position: absolute;
  top: 10vh;
  z-index: 201;
}

.backdrop {
  position: fixed;
  top: 0em;
  left: 0em;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 200;
}

/* Animations */
.backdrop-enter-active,
.backdrop-leave-active {
  transition: all 0.3s ease-in-out;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}
</style>
