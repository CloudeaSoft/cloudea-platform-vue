<script setup lang="ts">
  import ForumAsideBlock from './components/ForumAsideBlock.vue'
</script>
<template>
  <ForumAsideBlock class="signin-tip signin">
    <div class="first-line">
      <div class="icon-text">
        <span class="title">上午好！{{ 'xxx' }}</span>
        <div class="second-line">点亮在社区的每一天</div>
      </div>
      <el-button class="signin-btn" type="primary" plain>
        <span class="btn-text">去签到</span>
      </el-button>
    </div>
  </ForumAsideBlock>
</template>
<style scoped>
  .signin-tip {
    padding: 20px;
    background-color: var(--Forum-Content-Color);
  }

  .first-line {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .first-line .icon-text {
    display: flex;
    flex-direction: column;
  }

  .first-line .title {
    color: var(--Cloudea-Font-Black);
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
  }

  .first-line .btn-text {
    font-size: 14px;
    font-weight: 400;
    white-space: nowrap;
  }

  .second-line {
    color: var(--Cloudea-Font-Grey);
    font-size: 12px;
    font-weight: 400;
    line-height: 24px;
    margin-top: 2px;
  }
</style>
