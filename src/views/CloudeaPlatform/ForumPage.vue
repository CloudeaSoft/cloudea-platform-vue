<script setup lang="ts">
  import { onMounted, ref, type Ref } from 'vue'
  import ForumList from './Forum/components/ForumList.vue'
  import ForumAside from './Forum/components/ForumAside.vue'
  import type { ForumListItemProps } from '@/types'
  const itemList: Ref<Array<ForumListItemProps>> = ref([])

  onMounted(() => {
    for (let i = 0; i < 15; i++) {
      const testItem: ForumListItemProps = {
        title: '1标题',
        abstract: '概述-该文章说明了xxx的原理',
        author: {
          userId: 'xxxx-xxxx-xxxx',
          userName: '作者'
        },
        viewCount: 1,
        date: new Date(),
        like: 0
      }
      itemList.value.push(testItem)
    }
  })
</script>

<template>
  <div class="forum-bg">
    <div class="forum-body">
      <div class="forum-top-nav"></div>
      <div class="main-container">
        <div class="main-content">
          <!-- 左侧边导航栏 -->
          <div class="index-nav">
            <div class="side-navigator-wrap">
              <div class="nav-item-wrap">
                <div class="nav-item-content"><a href="" class="nav-item">xxx</a></div>
              </div>
              <div class="nav-item-wrap">
                <div class="nav-item-content"><a href="" class="nav-item">xxx</a></div>
              </div>
              <div class="nav-item-wrap">
                <div class="nav-item-content"><a href="" class="nav-item">xxx</a></div>
              </div>
              <div class="nav-item-wrap">
                <div class="nav-item-content"><a href="" class="nav-item">xxx</a></div>
              </div>
              <div class="nav-item-wrap">
                <div class="nav-item-content"><a href="" class="nav-item">xxx</a></div>
              </div>
            </div>
          </div>
          <!-- 主体内容 -->
          <div class="timeline-container">
            <div class="timeline-content">
              <!-- 文章列表 -->
              <div class="timeline-list">
                <ForumList :list="itemList"></ForumList>
              </div>
              <!-- 右侧边功能栏 -->
              <ForumAside></ForumAside>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

  /* -----------------nav----------------- */
  @media (max-width: 1220px) {
    .index-nav {
      display: none;
    }
  }

  .index-nav {
    width: 180px;
    position: -webkit-sticky;
    position: sticky;
    top: 80px;
    margin-right: 20px;

    height: fit-content;
    background: var(--Forum-Content-Color);
  }

  .side-navigator-wrap {
    min-width: 180px;
    padding: 8px;
  }

  .nav-item-wrap {
    display: flex;
    flex-direction: column;
  }

  .nav-item-content {
    line-height: 24px;
    border-right: 4px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .nav-item-content .nav-item {
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    padding: 10px 17px;
    cursor: pointer;
  }

  /* -----------------list----------------- */
  .timeline-container {
    margin: 0 auto;
  }

  .timeline-content {
    position: relative;
  }

  .timeline-list {
    /* margin-right: 23.33rem; */
    margin-right: 280px;
    border-radius: 2px;
    width: 720px;
    position: relative;
  }

  @media (max-width: 1000px) {
    .timeline-list {
      margin: 0 auto;
      width: 95vw;
    }
  }
</style>
