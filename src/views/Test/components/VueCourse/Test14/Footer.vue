<script>
  export default {
    name: 'MyFooter',
    props: ['todos'],
    computed: {
      total() {
        return this.todos.length
      },
      doneTotalInTodos() {
        return this.todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0)
      },
      isAll: {
        get() {
          return this.doneTotalInTodos === this.total && this.total > 0
        },
        set(value) {
          this.$emit('checkAllTodo',value)
        }
      }
    },
    methods: {
      clearAll(){
        this.$emit('clearAllTodo')
      }
    }
  }
</script>

<template>
  <div class="main-footer">
    <div style="text-align: center">
      <label style="float: left">
        <input type="checkbox" v-model="isAll"/>
      </label>
    </div>
    <span style="text-align: center; padding-left: 10px">
      <span>{{ '已完成: ' }}</span>
      <span>{{ doneTotalInTodos + ' / ' + total }}</span>
    </span>
    <el-button type="danger" style="float: right" @click="clearAll">清除已完成任务</el-button>
  </div>
</template>

<style scoped>
  .main-footer {
    padding: 10px;
  }
</style>
https://desktop.docker.com/linux/main/amd64/docker-desktop-4.23.0-amd64.deb