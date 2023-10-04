<script>
  import { nanoid } from 'nanoid'
  export default {
    name: 'MyHeader',
    data() {
      return {
        todoTitle: ''
      }
    },
    methods: {
      add(e) {
        //数据校验
        if (!this.todoTitle.trim()) return alert('输入不能为空')
        //包装
        const todoObj = {
          id: nanoid(),
          title: e.target.value,
          done: false
        }
        //调用父组件方法
        this.$emit('addTodo', todoObj) // 事件，参数
        //清空输入
        this.todoTitle = ''
      }
    }
  }
</script>

<template>
  <div class="main-myheader">
    <el-input
      type="text"
      v-model="todoTitle"
      placeholder="请输入任务名称"
      @keyup.enter="add"
    ></el-input>
  </div>
</template>

<style scoped>
  .main-myheader {
    /* border: 1px solid #333;
    border-radius: 5px; */
    margin-bottom: 10px;
  }

  input {
    list-style: none;
  }
</style>
