<script>
import { h } from 'vue'
import { ref } from 'vue'
export default {
  name: 'App',
  setup() {
    let name = ref('张三')
    let age = ref(18)

    function sayHello() {
      alert(`我叫${name}, 我${age}岁了，你好。`)
    }

    function changeInfo() {
      name = '李四'
      age = 48
    }

    //返回一个对象
    return {
      name,
      age,
      sayHello,
      changeInfo,
    }

    //返回一个函数（渲染函数）
    //return () => { return h('h1','fff') }
  }
}
</script>

<template>
  <h1>我是App</h1>
  <h2>姓名：{{ name }}</h2>
  <h2>年龄：{{ age }}</h2>
  <h2><button @click="sayHello()">说话</button></h2>
  <button @click="changeInfo()">111</button>
</template>
