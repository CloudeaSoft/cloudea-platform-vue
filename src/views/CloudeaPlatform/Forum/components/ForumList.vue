<script setup lang="ts">
  import ForumListItem from './ForumListItem.vue'
  import { type ForumListItemProps } from '@/types'

  const props = defineProps({
    list: Array<ForumListItemProps>
  })
  console.log(props.list)
</script>

<template>
  <div class="timeline-list-container">
    <div class="timeline-list-header">
      <div class="list-nav">
        <ul class="nav-list">
          <li class="nav-item"><a href="">推荐</a></li>
          <li class="nav-item"><a href="">最新</a></li>
        </ul>
        <div class="drop-down-area"></div>
      </div>
    </div>
    <div class="timeline-list-content">
      <li class="item">
        <ForumListItem v-for="(item, index) in props.list" :key="index" :data="item"
          >{{ console.log(item) }}
        </ForumListItem>
      </li>
    </div>
  </div>
</template>

<style scoped>
  .timeline-list-container {
    background: var(--Forum-Content-Color);
    border-radius: 4px;
  }

  .timeline-list-header {
    padding: 1rem 1.66rem;
    border-bottom: 1px solid var(--Forum-Grey);
  }

  .timeline-list-header .list-nav,
  .timeline-list-header .list-nav .nav-list {
    display: flex;
    justify-content: space-between;
  }

  .timeline-list-header .list-nav .nav-list .nav-item {
    padding: 0 1.66rem;
    line-height: 2rem;
    margin-left: -1.66rem;
    font-size: 1rem;
    border: none;
    position: relative;
    cursor: pointer;
  }

  .timeline-list-header .nav-list {
    align-items: center;
    line-height: 1;
  }

  .timeline-list-content {
    width: 100%;
    position: relative;
  }

  .timeline-list-content .item {
    background: var(--Forum-Content-Color);
    margin-bottom: 20px;
  }
</style>
