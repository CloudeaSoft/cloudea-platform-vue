<script setup lang="ts">
  import { ref } from 'vue'
  import { RouterView } from 'vue-router'
  import { getImageUrl } from './utils/getAssetFile'

  const loading = ref(true)

  window.addEventListener(
    'load',
    (e) => {
      console.log('页面加载完成: ', e)
      setTimeout(() => {
        loading.value = false
      }, 1000)
    },
    { once: true }
  )
</script>

<template>
  <Transition :name="'loading'">
    <div id="loader-bg" v-show="loading">
      <!-- <p id="loading" class="font01">
        <span class="spac"
          >その歌声は<span style="display: inline-block; margin-right: -0.3em">、</span
          >春風と共に</span
        >──
      </p> -->
      <div class="loading-bg">
        <img class="sakura-1" :src="getImageUrl('loading-bg.gif')" alt="" width="240" />
      </div>
    </div>
  </Transition>

  <router-view></router-view>
</template>

<style scoped>
  .loading-enter-active,
  .loading-leave-active {
    transition: opacity 1s ease;
  }

  .loading-enter-from,
  .loading-leave-to {
    opacity: 0;
  }

  #loader-bg {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background: #fff;
    z-index: 99999;
  }
  #loading {
    height: 100vh;
  }
  #loading,
  .loading-bg {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
  }

  #loading {
    right: 0%;
    left: 1%;
    text-align: center;
    font-size: 2.6rem;
    color: #fc4792;
    -webkit-writing-mode: vertical-rl;
    writing-mode: vertical-rl;
    display: inline;
    transition: all 0.1s ease;
  }

  .loading-bg {
    width: 100%;
    height: 100%;
    max-width: 240px;
    max-height: 240px;
    position: absolute;
    z-index: -1;
  }

  .sakura-1 {
    -moz-animation: saku1 5s linear infinite;
    animation: saku1 5s linear infinite;
  }

  .font01 {
    font-family: 'Rounded Mplus 1c', sans-serif;
  }

  @keyframes saku1 {
    0% {
      transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
    }
  }
  @-moz-keyframes saku1 {
    0% {
      transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes saku1 {
    0% {
      transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
    }
  }
</style>
