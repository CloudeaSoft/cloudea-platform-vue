<script>
  import TestCard from '../TestCard.vue'
  export default {
    components: {
      TestCard
    },
    data() {
      return {
        isShow: true
      }
    },
    methods: {
      myshowChan() {
        this.isShow = !this.isShow
      }
    },
    computed: {
      showclass() {
        return this.isShow ? 'come' : 'go'
      }
    }
  }
</script>

<template>
  <TestCard>
    <template #header>15</template>
    <button @click="myshowChan">s</button>
    <div class="blo">
      <Transition appear><div v-show="isShow">Blank</div></Transition>
    </div>
    <span>aaa</span>
  </TestCard>
</template>

<style>
  .blo {
    width: 150px;
    height: 70px;
    background-color: #ccc;
    padding: 20px;
  }

  .v-enter-active {
    animation: myshow 1s linear;
  }

  .v-leave-active {
    animation: myshow 1s reverse;
  }

  @keyframes myshow {
    from {
      transform: translateX(-100px);
    }
    to {
      transform: translateX(0px);
    }
  }
</style>
