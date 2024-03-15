<script setup lang="ts">
  const props = defineProps<{
    post: {
      title: string
      content: string
      author: string
      publishedAt: string
    }
  }>()
</script>

<template>
  <div class="view">
    <div class="post-area">
      <article>
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
        <p>Author: {{ post.author }}</p>
        <p>Published at: {{ post.publishedAt }}</p>
      </article>
    </div>
    <div class="post-sidebar"></div>
  </div>
</template>

<style>
  .view {
  }

  .post-area {
    position: relative;
    background-color: #fff;
    width: 850px;
    height: 200px;
    max-width: 100%;
  }

  .post-sidebar {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;

    height: 300px;
    width: 300px;
    background-color: #fff;
  }
</style>
