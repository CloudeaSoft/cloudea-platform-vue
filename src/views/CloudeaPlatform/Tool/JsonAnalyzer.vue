<script setup lang="ts">
  import { ref } from 'vue'
  import ToolCard from './components/ToolCard.vue'

  const tempJson = ref()
  const tempResult = ref()

  // 功能按钮
  const makeIt = () => {
    let text = tempJson.value
    let json = JSON.parse(text)
    // console.log(json)
    tempResult.value = SortSix(json)
  }

  // 干员信息
  interface CharactorInfo {
    elite: number // 精英化等级
    id: string // MAA内置Id
    level: number // 干员等级
    name: string // 干员名称
    own: boolean // 是否持有
    potential: number // 潜能
    rarity: number // 稀有度
  }

  // 筛选六星干员
  const SortSix = (arr: Array<CharactorInfo>) => {
    var resultarr: Array<CharactorInfo> = []
    arr.forEach((element) => {
      if (element.rarity == 6) {
        resultarr.push(element)
      }
    })
    return resultarr
  }
</script>

<template>
  <ToolCard>
    <template #header>MAA干员资产分析</template>
    <el-input v-model="tempJson" type="textarea" :rows="6"></el-input>
    <el-button @click="makeIt">解析</el-button>

    <el-table :data="tempResult">
      <el-table-column prop="name" label="名称" width="180" />
      <el-table-column prop="rarity" label="稀有度" width="180" />
      <el-table-column prop="own" label="已拥有" width="180" />
      <el-table-column prop="elite" label="精英化" width="180" />
      <el-table-column prop="level" label="等级" />
      <el-table-column prop="potential" label="潜能" />
    </el-table>
  </ToolCard>
</template>
