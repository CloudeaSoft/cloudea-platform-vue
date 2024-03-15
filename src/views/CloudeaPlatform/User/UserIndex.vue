<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const navItemList = ref([
    {
      name: '首页',
      route: '/platform/user/home',
      icon: 'House'
    },
    {
      name: '我的信息',
      route: '/platform/user/setting',
      icon: 'User'
    },
    {
      name: '我的头像',
      route: '/platform/user/avatar',
      icon: 'Avatar'
    },
    {
      name: '账号安全',
      route: '/platform/user/security',
      icon: 'Key'
    }
  ])

  const activeRoute = () => {
    return router.currentRoute.value.name
  }
</script>

<template>
  <div class="user-wrap">
    <div class="user-content">
      <div class="content-header"></div>
      <el-container class="content-body">
        <el-aside class="main-left">
          <span class="main-left-title">个人中心</span>
          <el-menu
            router
            :default-active="navItemList[0].route"
            style="
              --el-menu-bg-color: #fafafa;
              --el-menu-text-color: #222;
              --el-menu-active-color: var(--User-Main-Color);
              --el-menu-hover-bg-color: rgba(0, 0, 0, 0.14);
            "
          >
            <el-menu-item v-for="(item, index) in navItemList" :key="index" :index="item.route">
              <el-icon style="color: var(--user-nav-title-color)">
                <component :is="item.icon"></component>
              </el-icon>
              <span class="main-nav-name">{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <div class="main-right">
          <RouterView></RouterView>
        </div>
      </el-container>
      <div class="content-footer"></div>
    </div>
  </div>
</template>

<style scoped>
  :root {
    --user-nav-title-color: #99a2aa;
  }
  .user-wrap {
    width: 100%;
    height: 100%;
    padding-top: var(--header-height);
    background-color: var(--User-Main-Color);
  }

  .user-content {
    height: 100%;

    background-color: #fff;
  }

  .content-header {
    width: 100%;
    height: 100px;
    background-color: purple;
  }

  .content-body {
    overflow: hidden;
    margin: 10px auto 100px;
    width: 980px;
    /* height: 100%; */
    border: 1px solid #e1e2e5;
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14);
    background: #fafafa;
  }

  .main-left {
    width: 150px;
    height: 100%;
    overflow: hidden;
  }

  .content-footer {
    height: 100px;
    background: yellow;
  }

  .main-right {
    width: 828px;
    min-height: 890px;
    background-color: #fff;
    border-left: 1px solid var(--el-menu-border-color);
  }

  .el-menu {
    border-right: 0;
  }

  .main-left-title {
    display: block;
    width: 150px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    color: var(--user-nav-title-color);
    cursor: default;
    border-bottom: 1px solid #e1e2e5;
  }

  .main-nav-name {
    margin-left: 12px;
    font-size: 14px;
    /* color: #222; */
  }
</style>
