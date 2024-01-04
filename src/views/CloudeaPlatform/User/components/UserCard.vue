<template>
  <div class="user-right-title">
    <span class="user-right-title-icon"></span>
    <span class="user-right-title-text"><slot name="header"></slot></span>
  </div>
  <div><slot></slot></div>
</template>

<style scoped>
  .user-right-title {
    height: 50px;
    padding-left: 30px;
    border-bottom: 1px solid var(--el-menu-border-color);
  }

  .user-right-title-icon {
    float: left;
    width: 4px;
    height: 16px;
    margin-top: 18px;
    background: var(--User-Main-Color);
    border-radius: 4px;
  }

  .user-right-title-text {
    float: left;
    margin: 15px 0 0 5px;
    color: var(--User-Main-Color);
    font-size: 14px;
    cursor: default;
  }
</style>
