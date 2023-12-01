<template>
  <div class="main">
    <CloudeaHeader></CloudeaHeader>
    <el-container class="shelf">
      <el-header class="book-title">
        {{ `${bookMeta.title} —— ${bookMeta.content[page - 1].name}` }}
      </el-header>
      <el-main class="book-body"><iframe :src="book"></iframe></el-main>
      <el-footer class="book-page-control">
        <el-button @click="changePage(false)">上一章<ArrowLeft /></el-button>
        <el-button @click="changePage(true)"><ArrowRight />下一章</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
  import { getNovel } from '@/utils/getAssetFile'
  import CloudeaHeader from './components/CloudeaHeader.vue'
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'

  const bookMeta = {
    title: '夏日、柠檬与overlay',
    author: 'Ru',
    translator: '叶樱',
    language: 'zh-cn',

    sourceTitle: '夏とレモンとオーバーレイ',
    sourceAuthor: 'Ru',
    sourceLanguage: 'jp',
    sourceLink: 'pixiv.net/novel/show.php?id=14241819',

    other: {
      翻译: '叶樱',
      转载来源: '百合会'
    },

    content: [
      {
        index: 0,
        name: '第一话 遗书声优与玩INS的女人'
      },
      {
        index: 1,
        name: '第二话 初次约会总有些难熬'
      },
      {
        index: 2,
        name: '第三话 她是柠檬，我是西柚'
      },
      {
        index: 3,
        name: '第四话 封口浴盐'
      },
      {
        index: 4,
        name: '第五话 执念'
      },
      {
        index: 5,
        name: '第六话 夏色相片'
      },
      {
        index: 6,
        name: '第七话 烟花大会新手入门，自带消暑用品'
      },
      {
        index: 7,
        name: '第八话 泡澡计时器'
      },
      {
        index: 8,
        name: '第九话 夏日的终结，清晨的秋千'
      },
      {
        index: 9,
        name: '第十话 不要走'
      },
      {
        index: 10,
        name: '尾声'
      }
    ]
  }

  let page = ref(1)
  let book = ref(getNovel(`000001/${page.value}.html`))

  const changePage = (val: Boolean) => {
    if (val && page.value < 11) {
      page.value++
      book.value = getNovel(`000001/${page.value}.html`)
    } else if (!val && page.value > 1) {
      page.value--
      book.value = getNovel(`000001/${page.value}.html`)
    } else {
      ElMessage('没有更多了')
    }
  }
</script>

<style scoped>
  .main {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: rgba(yellow, green, blue, 0.8);
    background-color: #333;
  }

  .shelf {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    /* padding: 20px; */
  }

  .book-title {
    display: flex;

    height: 50px;
    line-height: 50px;
    text-align: center;
    justify-content: center;
    width: 100%;

    font-size: 18px;
    font-weight: 700;

    background-color: #fff;
  }

  .book-body {
    width: 100%;
    /* flex-grow: 1; */
    /* margin-bottom: 20px; */
    overflow: hidden;
  }

  .book-body iframe {
    background-color: #cce099;
    width: 100%;
    height: 100%;
  }

  .book-page-control {
  }
</style>
