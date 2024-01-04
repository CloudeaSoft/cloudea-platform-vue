<script setup lang="ts">
  import { ref } from 'vue'

  const isCollapse = ref(true)
  const changeMenuStatus = () => {
    isCollapse.value = !isCollapse.value
  }
</script>

<template>
  <div class="tool-bg">
    <div class="tool-menu">
      <el-menu router default-active="index" class="el-menu-vertical-demo" :collapse="isCollapse">
        <el-menu-item @click="changeMenuStatus">
          <div v-if="!isCollapse">
            <el-icon><ArrowLeftBold /></el-icon>
            <span>关闭菜单</span>
          </div>
          <div v-else>
            <el-icon><ArrowRightBold /></el-icon>
          </div>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><document /></el-icon>
            <span>抽卡分析</span>
          </template>
          <el-menu-item index="arknightsgacha">
            <el-icon
              ><svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="512px"
                height="512px"
                viewBox="0 0 512 512"
                enable-background="new 0 0 512 512"
                xml:space="preserve"
                style="background-color: #999"
              >
                <image
                  id="image0"
                  width="512"
                  height="512"
                  x="0"
                  y="0"
                  href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAMAAADDpiTIAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAt1BMVEUAAAD+///+///+///+
///+///+///+///+///+///+///+///+///+///+///+///+///+///+///+///+///+///+///+
///+///+///+///+///+///+///+///+///+///+///+///+///+///+///+///+///+///+///+
///+///+///+///+///+///+///+///+///+///+///+///+///+///+///+///+///+///////q
fP4GAAAAO3RSTlMADAg0SxsfbIcvOaK6RlvJ4YLmdKfyFZH4J2CsDz/EVxix3YwE0+216XCWK5z6
Q32/IxL0zml4ZU/YU5DUab4AAAABYktHRDynamHPAAAAB3RJTUUH5wsDBxEBg2EaZgAAJfZJREFU
eNrtnWlD6jzTgFncWDwggrKJyC6CguCC/f//69CVJN2SJmloO9en972fYymZIZnMmssBAAAAAAAA
AAAAUcgXVL8BoJR8UfUbAGq5uFT9BoBSrq5VvwGglpuS6jcAlFKuqH4DQC3VW9VvACjlX031GwBK
KdT/qX4FQCl3DfAGZZpL7V71KwBKabYeVL8CoJKy9qj6FQCl1Nod1a8AqKSr9VS/AqCSfkN7Uv0O
gEputIHqVwBU0mlrz3F/5lD1lwYQXrRRPuaPHKv+zgDChRa3N+hppPo7AwiTqTYbxvqJ84Xq7wyg
vGraMs7PK2qwA5wVw5nWfovx85qgAGfGStNe4vu00hp8T2dGUdO099g+ralpF6q/MYAz0LTaJKbP
emtrI0hCODP+HbeAbkyfVdG0G9XfFyDI1zVt1I/lozptbR2nxQlQcXPcAj5i+aSjwblR/W0BF9u2
ps2uYvig4wYQ22EDMNA7bgGrGD7nuAEsPlV/WcDN7VEB1vLLhbe7mL2OACWT6VEDqtI/Znn8lLLq
7wp4cX0UjXQHjb4B7FV/U8CTh9lRAfaSvUGPx894Vf1NAW/03Vn7kvoRVy1Na0FXijOluD4qQEOq
ha5vABAHOls2+hYg00t72YrBzAAi86wrQGsr7wPGx+dDHOh8yY90DZDXNORSNzPvVH9LwJ87XQHW
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
MSswMDowMHC3lGgAAAAASUVORK5CYII="
                />
              </svg>
            </el-icon>
            <span>明日方舟</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><Stopwatch /></el-icon>
            <span>Osu工具</span>
          </template>
          <el-menu-item index="osuskinini">
            <el-icon><document /></el-icon>
            <span>skin.ini编辑</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="4" disabled>
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="tool-main"><router-view></router-view></div>
  </div>
</template>

<style lang="scss" scoped>
  .tool-bg {
    background-color: var(--Tool-Main);
    display: flex;
    height: 100%;
    flex-direction: column;
  }

  .tool-menu {
    position: fixed;
    top: var(--header-height);
    bottom: 0;
    left: 0;
    z-index: var(--z-index-sidebar);
  }

  .menu-btn {
    position: absolute;
    right: -30px;
    width: 30px;
    height: 30px;
    background-color: #fff;
    border-left: 1px solid #fff;
    border-radius: 0 15px 15px 0;
    cursor: pointer;
    box-shadow: -1px 1px 5px 1px #333;
    line-height: 30px;
    text-align: center;
    padding-top: 1px;
    padding-right: 2px;
  }

  :deep(.el-menu) {
    animation: left 0s;
  }

  .el-menu-vertical-demo {
    height: 100%;
  }

  .tool-main {
    background-color: var(--Tool-Back);
    margin-top: var(--header-height);
    padding-left: var(--tool-menu-width);
    z-index: 0;
    height: 100%;
  }
</style>
