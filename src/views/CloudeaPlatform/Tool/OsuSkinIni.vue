<template>
  <ToolCard>
    <template #header>
      <div>Osu皮肤设置</div>
    </template>
    <template #footer>
      <div>xxx</div>
    </template>
    <div class="osuskin-uploader" v-show="!fileExist(skin)">
      <el-upload
        class="upload-demo"
        drag
        :auto-upload="false"
        action="#"
        :on-change="getSkin"
        :limit="1"
        accept=".ini"
        ref="uploadrefosu"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">把 Skin.ini 拖到这里 或者 <em>点击此处上传</em></div>
        <template #tip>
          <div class="el-upload__tip">注：本工具会清除文件内的注释</div>
        </template>
      </el-upload>
    </div>
    <div class="osuskin-editor" v-show="fileExist(skin)">
      <div class="skin-editor-bar">
        <el-row :gutter="10">
          <el-col :span="4"><el-button @click="dialogVisible = true">预览</el-button></el-col>
          <el-col :span="4"><el-button @click="buildSkin">下载</el-button></el-col>
          <el-col :span="4"><el-button @click="cleanSkin">返回</el-button></el-col>
          <el-col :span="12"
            ><el-select v-model="sectionOption">
              <el-option
                v-for="(sectionV, section, index) in skin"
                :key="index"
                :value="section"
                :label="getSection(section)"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="search">
          <el-col
            ><el-input :span="24" placeholder="按下Ctrl+F以打开搜索框(Chorme)" disabled></el-input
          ></el-col>
        </el-row>
      </div>
      <div>
        <div v-if="fileExist(skin)">
          <div class="skin-editor-section-title">
            <span>{{ '[' + getSectionSelected() + ']' }}</span>
          </div>
          <el-form
            class="skin-editor-section-body"
            :label-position="labelPosition"
            label-width="150px"
          >
            <li v-for="(itemV, item, index) in skin[sectionOption]" :key="index">
              <el-form-item v-if="!imageSettingCheck(item.toString())" :label="item">
                <div class="skin-editor-unit">
                  <el-input
                    class="skin-editor-input"
                    v-model="skin[sectionOption][item]"
                    :disabled="item.toString() === 'Keys'"
                  ></el-input>
                  <div>
                    <span
                      >默认值：{{ ini.getTrans(sectionOption, item.toString()).defaultVal }}</span
                    >
                    <span>说明：{{ ini.getTrans(sectionOption, item.toString()).profile }}</span>
                  </div>
                </div>
              </el-form-item>
            </li>
            <span class="tips">注：图片素材相关条目已被隐藏，如有需要请自行修改文件</span>
          </el-form>
        </div>
      </div>
    </div>
    <el-dialog
      class="osuskin-watcher"
      v-model="dialogVisible"
      title="Skin.ini文件预览"
      width="70%"
      center
    >
      <el-scrollbar height="500px"
        ><div class="skin-text-area">{{ ini.stringify(skin) }}</div></el-scrollbar
      >
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </ToolCard>
</template>

<script setup lang="ts">
  import ini from '@/utils/osuTool'
  import type { FormProps } from 'element-plus'
  import { ref, watch } from 'vue'
  import ToolCard from './components/ToolCard.vue'

  // 已接收文件
  const fileExist = (val: Object) => {
    return val != null ? true : false
  }

  const labelPosition = ref<FormProps['labelPosition']>('right')

  // 文件内容
  const skin = ref(JSON.parse(localStorage.getItem('osu-skin')!) || null)
  // 本地缓存
  watch(
    skin,
    (value, oldValue) => {
      console.log(value, oldValue)
      localStorage.setItem('osu-skin', JSON.stringify(value))
    },
    { deep: true, immediate: false }
  )

  // 生成文件
  const buildSkin = () => {
    const text = ini.stringify(skin.value)
    const filename = 'skin.ini'
    const blob = new Blob([text], { type: 'text/plain' })
    const href = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = href
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(href)
  }

  // 选择文件
  const getSkin = (file: any) => {
    const reader = new FileReader()
    reader.onload = function () {
      if (reader.result) {
        //分析文件
        skin.value = ini.parse(reader.result)
      }
    }
    reader.readAsText(file.raw)
  }

  const uploadrefosu = ref()
  // 清除缓存
  const cleanSkin = () => {
    skin.value = null
    sectionOption.value = 'General'
    dialogVisible.value = false
    uploadrefosu.value.clearFiles()
  }

  // 选择的Section
  const sectionOption = ref('General')

  // 获取Section名字
  const getSection = (section: number) => {
    return section.toString().match(/^Mania/) ? 'Mania ' + skin.value[section].Keys + 'K' : section
  }
  const getSectionSelected = () => {
    if (sectionOption.value) {
      return sectionOption.value.toString().match(/^Mania/)
        ? 'Mania ' + skin.value[sectionOption.value].Keys + 'K'
        : sectionOption.value
    }
  }

  // 检查是否是图片路径相关的条目
  const imageSettingCheck = (option: string) => {
    // console.log(option)
    var RegStr = /.*Image/
    return option.match(RegStr)
  }

  // 预览窗口开关
  const dialogVisible = ref(false)
</script>

<style scoped>
  .skin-text-area {
    white-space: pre-wrap;
  }

  .osuskin-editor {
    min-width: 700px;
  }

  .skin-editor-bar {
    width: 400px;
    position: fixed;
    z-index: 200;
    right: 40px;
    padding: 10px;
    border-radius: 10px;
    background-color: rgba(164, 211, 255, 0.8);
    opacity: 0.9;
  }

  .skin-editor-bar .search {
    margin-top: 10px;
  }

  .skin-editor-section-title {
    font-size: 30px;
    font-weight: 700;
    padding-bottom: 30px;
    padding-left: 20px;
  }

  .skin-editor-section-body {
    padding-left: 20px;
  }

  .skin-editor-section-body .mania-key {
    font-size: 20px;
    padding-bottom: 10px;
  }

  .skin-editor-unit {
    display: flex;
    flex-direction: column;
  }
  .skin-editor-unit span {
    padding-left: 20px;
  }

  .skin-editor-input {
    width: 240px;
  }

  :deep(.osuskin-watcher) {
    /* max-height: calc(100vh - 300px); */
  }

  :deep(.osuskin-watcher .skin-text-area) {
    /* overflow-y: scroll; */
    /* height: 400px; */
  }
</style>
