<script>
  export default {
    name: 'MyItem',
    props: ['todo'],
    data() {
      return {
        isEdit: false
      }
    },
    methods: {
      handleCheck(id) {
        this.$bus.emit('checkTodo', id)
      },
      handleDelete(id) {
        if (confirm('确定删除吗？')) {
          this.$bus.emit('deleteTodo', id)
        }
      },
      handleEdit() {
        this.isEdit = !this.isEdit
        this.$nextTick(() => {})
      },
      handleEditFin(e) {
        if (!e.target.value) return alert('输入不能为空！')
        this.$bus.emit('editTodo', [this.todo.id, e.target.value])
        this.isEdit = false
      }
    },
    computed: {
      editButtonType() {
        return this.isEdit ? 'primary' : 'default'
      }
    }
  }
</script>
<template>
  <li class="main-item">
    <label>
      <input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)" />
      <span v-show="!isEdit">{{ todo.title }}&nbsp;</span>
      <input
        v-show="isEdit"
        :value="todo.title"
        @blur="handleEditFin"
        @keyup.enter="handleEditFin($event)"
      />
    </label>
    <el-button class="btn btn-edit" type="danger" @click="handleDelete(todo.id)">Delete</el-button>
    <el-button class="btn btn-delete" :type="editButtonType" @click="handleEdit">Edit</el-button>
  </li>
</template>

<style scoped>
  .main-item {
    padding: 10px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid;
    align-items: center;
  }

  .main-item:last-child {
    border-bottom: 0;
  }

  .main-item input {
    margin-right: 10px;
  }

  .main-item button {
    float: right;
    display: none;
    margin-left: 10px;
  }

  .main-item:hover {
    background-color: #ddd;
  }

  .main-item:hover button {
    display: block;
  }
</style>
