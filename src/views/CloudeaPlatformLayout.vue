<script setup lang="ts">
  import { ref } from 'vue'
  // import CloudeaCursor from './CloudeaPlatform/components/CloudeaCursor.vue';
  const windowHeight = ref()

  const documentHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--doc-height', `${window.innerHeight}`)
    windowHeight.value = window.innerHeight
  }

  window.addEventListener('resize', documentHeight)
  documentHeight()
</script>

<template>
  <div class="cloudea-main" :height="windowHeight">
    <router-view></router-view>
    <!-- <CloudeaCursor></CloudeaCursor> -->
  </div>
</template>

<style scoped>
  .cloudea-main {
    height: 100vh;
    height: var(--doc-height);
    overflow: overlay;
  }
</style>
