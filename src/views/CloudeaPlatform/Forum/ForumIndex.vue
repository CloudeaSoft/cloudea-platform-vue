<script setup lang="ts"></script>

<template>
  <div class="forum-bg">
    <div class="forum-body">
      <div class="forum-top-nav"></div>
      <div class="main-container">
        <div class="main-content">
          <RouterView></RouterView>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .main-container {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: var(--forum-padding);
  }

  .main-content {
    margin-top: 1.66rem;
    display: flex;
    flex-direction: row;
  }
  /* -----------------forum----------------- */
  .forum-bg {
    position: relative;
    height: 100%;
    background: var(--Forum-Main-Color);
  }

  .forum-body {
    width: 100%;
    padding-top: var(--header-height);
    background: var(--Forum-Main-Color);
  }

  .forum-top-nav {
    height: 0;
    background: #222;
  }

  .forum-content {
    display: flex;
    flex-direction: row;
    min-height: 1000px;
    padding: 30px;
  }
</style>
