<script>
  import MyItem from './Item.vue'
  export default {
    name: 'MyList',
    props: ['todos'],
    components: {
      MyItem
    },
    methods: {

    }
  }
</script>

<template>
  <ul class="main-list">
    <MyItem
      v-for="todoObj in todos"
      :key="todoObj.id"
      :todo="todoObj"
    ></MyItem>
  </ul>
</template>

<style scoped>
  .main-list {
    border: 1px solid;
    border-radius: 5px;
    list-style: none;
    margin-bottom: 10px;
    overflow: hidden;
  }
</style>
