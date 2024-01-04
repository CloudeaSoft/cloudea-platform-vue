<script setup lang="ts">
  import { useMouseInElement } from '@vueuse/core'
  import { ref } from 'vue'

  const headerCard = ref()

  const { elementX, elementY } = useMouseInElement(headerCard)
</script>

<template>
  <div class="tool-card up">
    <el-container>
      <el-header
        ><div
          class="tool-card__header"
          ref="headerCard"
          :style="{ '--x': elementX + 'px', '--y': elementY + 'px' }"
        >
          <div class="header-body"><slot name="header"></slot></div>
        </div>
      </el-header>
      <el-main><slot></slot></el-main>
      <!-- <el-footer><slot name="footer"></slot></el-footer> -->
    </el-container>
  </div>
</template>

<style scoped>
  .tool-card {
    /* transition: all 0.5s ease-out;
    color: #999;
    transform: scale(0.2);
    opacity: 0; */
  }

  .tool-card.up {
    /* color: red;
    transform: scale(1);
    opacity: 1; */
  }

  .el-container {
    margin: 10px;
    border-radius: 20px;
    overflow: hidden;
    background-color: var(--Tool-Card-Back);
    position: relative;
  }

  .el-header {
    position: relative;
    height: var(--header-height);
  }

  .tool-card__header {
    position: relative;

    background: radial-gradient(#e66465, #9198e5);
    border-radius: 20px;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
    overflow: hidden;
  }

  .tool-card__header::before {
    content: '';
    position: absolute;
    top: var(--y);
    left: var(--x);
    /* top: v-bind('x');
    left: v-bind('y'); */

    transform: translate(-50%, -50%);
    background: radial-gradient(white, transparent, transparent);
    width: 250px;
    height: 150px;

    opacity: 0;

    transition:
      0.5s,
      top 0s,
      left 0s;
  }

  .tool-card__header:hover::before {
    opacity: 1;
  }

  .tool-card__header::after {
    content: '';
    position: absolute;
    inset: 3px;
    border-radius: 17px;
    background: rgba(164, 211, 255, 0.85);
  }

  .tool-card__header .header-body {
    position: absolute;
    z-index: 200;
  }

  .el-main {
    padding: 30px;
  }

  .el-footer {
    height: 64px;
    background-color: #ccc;
    text-align: center;
  }
</style>
