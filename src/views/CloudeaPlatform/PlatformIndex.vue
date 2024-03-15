<script setup lang="ts">
  import CloudeaHeader from './components/CloudeaHeader.vue'
  import { ref } from 'vue'
  // import CloudeaCursor from './components/CloudeaCursor.vue';
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
  <div id="frame" :style="`height:${windowHeight}px`">
    <CloudeaHeader></CloudeaHeader>
    <router-view></router-view>
    <!-- <CloudeaCursor></CloudeaCursor> -->
  </div>
</template>

<style scoped>
  #cloudea-main {
    position: relative;
    height: 100vh;
    height: var(--doc-height);
    background-position-y: 0px;
  }
</style>
