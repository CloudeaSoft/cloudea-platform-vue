<script setup lang="ts">
  import ForumAsideHotList from './ForumAsideHotList.vue'
  import ForumAsideHotTheme from './ForumAsideHotTheme.vue'
  import ForumAsideFooter from './ForumAsideFooter.vue'
  import ForumAsideSigninTip from './ForumAsideSigninTip.vue'
  import ForumAsideAnnounce from './ForumAsideAnnounce.vue'
</script>

<template>
  <div class="index-aside">
    <ForumAsideSigninTip></ForumAsideSigninTip>
    <ForumAsideAnnounce></ForumAsideAnnounce>
    <ForumAsideHotList><template #title>文章榜</template></ForumAsideHotList>
    <!-- <ForumAsideHotList><template #title>作者榜</template></ForumAsideHotList> -->
    <ForumAsideHotTheme class="hot-theme"></ForumAsideHotTheme>
    <ForumAsideFooter></ForumAsideFooter>
  </div>
</template>

<style scoped>
  .index-aside {
    /* width: 21.66rem; */
    width: 260px;
    position: absolute;
    top: 0;
    right: 0;
    /* background: var(--Forum-Content-Color);
    height: 20px; */
  }

  @media (max-width: 1000px) {
    .index-aside {
      display: none;
    }
  }

  .sidebar-block {
    box-shadow: none;
  }

  .hot-theme {
    margin-bottom: 20px;
  }
</style>
