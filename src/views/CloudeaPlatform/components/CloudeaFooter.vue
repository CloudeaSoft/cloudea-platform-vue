<script setup lang="ts">
  const beianUrl =
    'https://hlwicpfwc.miit.gov.cn/icpproject_query/api/icpAbbreviateInfo/queryByCondition/'
  const beianID = '浙ICP备2023031352号'
</script>

<template>
  <footer class="cloudea-footer">
    <div class="beian">
      <el-row :gutter="20">
        <el-col :span="8"></el-col>
        <el-col :span="4"
          ><el-link href="https://beian.miit.gov.cn/" target="_blank">浙ICP备2023031352号</el-link>
        </el-col>
        <el-col :span="4"
          ><el-link href="https://beian.miit.gov.cn/" target="_blank">xxx</el-link></el-col
        ><el-col :span="8"></el-col
      ></el-row>
    </div>
  </footer>
</template>

<style>
  .cloudea-footer {
    position: relative;
    height: 150px;
    width: 100%;
    bottom: 0;
    background-color: #333;
    z-index: 998;

    overflow: hidden;
  }
</style>
