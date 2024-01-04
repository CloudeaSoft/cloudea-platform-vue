<script setup lang="ts">
  import CloudeaFooter from './components/CloudeaFooter.vue'
</script>

<template>
  <div class="content-wrap">
    <div class="content-body">
      <div class="mv-bg mv-anime"></div>
      <div id="sakura"></div>
      <div class="bg-mask">
        <el-scrollbar><RouterView></RouterView></el-scrollbar>
      </div>
    </div>
    <div class="my-block"></div>
    <CloudeaFooter></CloudeaFooter>
  </div>
</template>

<style scoped>
  @import url('@/assets/css/sakura.css');
  @import url('@/assets/css/anime-bg.css');

  .content-wrap {
    margin: 0 auto;
    height: 100%;
    width: 100%;
  }

  .content-body {
    height: 100%;
    z-index: 0;
    width: 100%;
  }

  .bg-mask {
    position: absolute;
    width: 100%;
    max-width: 1200px;

    top: 120px;
    left: 50%;
    transform: translate(-50%, 0);

    padding: 50px;
    background-color: rgba(255, 255, 255, 0.8);

    transition: all 0.3s;
  }

  @media screen and (min-width: 0px) {
    .bg-mask {
      top: var(--header-height);
      bottom: 0;
    }
  }

  @media screen and (min-width: 1200px) {
    .bg-mask {
      top: 120px;
      bottom: 120px;
    }
  }

  :deep(.el-scrollbar) {
    height: 100%;
  }

  .my-block {
    position: relative;
    height: 500px;
    background-color: rgba(100, 100, 100, 0.5);
  }
</style>
