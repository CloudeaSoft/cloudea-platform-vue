<script>
  import TestCard from '../TestCard.vue'
  import MyHeader from './Test14/Header.vue'
  import MyList from './Test14/List.vue'
  import MyFooter from './Test14/Footer.vue'
  export default {
    components: {
      TestCard,
      MyHeader,
      MyFooter,
      MyList
    },
    data() {
      return {
        todos: [
          {
            id: '001',
            title: 'Eat',
            done: true
          },
          {
            id: '002',
            title: 'Drink',
            done: false
          },
          {
            id: '003',
            title: 'Drive',
            done: true
          }
        ]
      }
    },
    methods: {
      addTodo(todoObj) {
        this.todos.unshift(todoObj)
      },
      checkTodo(id) {
        this.todos.forEach((element) => {
          if (element.id === id) element.done = !element.done
        })
      },
      deleteTodo(id) {
        this.todos.splice(
          this.todos.findIndex((element) => element.id === id), //清除起始
          1 // 清除长度
        )
      },
      checkAllTodo(done) {
        this.todos.forEach((todo) => {
          todo.done = done
        })
      },
      clearAllTodo() {
        console.log('clear all')
      },
      editTodo(res) {
        this.todos.forEach((element) => {
          if (element.id === res[0]) element.title = res[1]
        })
      }
    },
    mounted() {
      this.$bus.on('checkTodo', this.checkTodo)
      this.$bus.on('deleteTodo', this.deleteTodo)
      this.$bus.on('editTodo', this.editTodo)
    },
    beforeUnmount() {
      this.$bus.off('checkTodo')
      this.$bus.off('deleteTodo')
      this.$bus.off('editTodo')
    }
  }
</script>

<template>
  <TestCard>
    <template #header>Blank</template>
    <div style="width: 500px; border: 1px solid #333; border-radius: 5px">
      <div class="main-div">
        <MyHeader @addTodo="addTodo"></MyHeader>
        <MyList :todos="todos"></MyList>
        <MyFooter
          :todos="todos"
          @checkAllTodo="checkAllTodo"
          @clearAllTodo="clearAllTodo"
        ></MyFooter>
      </div>
    </div>
  </TestCard>
</template>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .main-div {
    padding: 10px;
  }
</style>
