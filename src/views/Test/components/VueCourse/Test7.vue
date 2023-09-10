<script>
import TestCard from '../TestCard.vue'
export default {
    components: {
        TestCard
    },
    data() {
        return {
            persons:[
                {id:'001',name:'张三',age:18},
                {id:'002',name:'李四',age:19},
                {id:'003',name:'王五',age:10},
            ]
        }
    },
    methods: {
        add(){
            const p = {id:'004',name:'赵六',age:10}
            this.persons.unshift(p)
        }
    },
}
</script>

<template>
    <TestCard>
        <template #header>v-for中key的原理</template>
        <div>
            <!-- 
                key作为 vue虚拟dom中 li的唯一标识，
                在渲染DOM时与旧虚拟dom进行对应，相同id节点的内容渲染会被优化。

                如果以index作为标识，则在列表中间插入元素后，未发生变化的子节点会被打乱顺序
            -->
            <h2>人员列表</h2>
            <ul>
                <li v-for="(p,index) in persons" :key="p.id">
                    {{ p.name }} - {{ p.age }}
                    <input type="text">
                </li>
            </ul>
            <button @click="add">add</button>
        </div>
    </TestCard>
</template>

<style>

</style>