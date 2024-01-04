<script setup lang="ts"></script>
<template>
  <div class="sidebar-block">
    <div class="first-line"><slot></slot></div>
  </div>
</template>

<style scoped>
  .sidebar-block {
    margin-bottom: 20px;
    /* font-size: 12px; */
    line-height: 1.29;
    border-radius: 4px;
    color: var(--Cloudea-Font-Black);
  }
</style>
