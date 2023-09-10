<script>
import TestCard from '../TestCard.vue'
export default {
    components: {
        TestCard
    },
    data() {
        return {
            personsArr: [
                {
                    id: '001',
                    name: '张三',
                    age: 18
                }, {
                    id: '002',
                    name: '李四',
                    age: 19
                }, {
                    id: '003',
                    name: '王五',
                    age: 20
                },
            ],
            car: {
                name: '奥迪A8',
                price: '700,000',
                color: '黑色'
            },
            str: 'hello'
        }
    },
}
</script>

<template>
    <TestCard>
        <template #header>v-for渲染列表</template>
        <div>
            <h2>人员列表</h2>
            <ul>
                <li v-for="(p, index) in personsArr" :key="p.id">
                    {{ index + 1 }}.&nbsp;&nbsp;{{ p.id }}-{{ p.name }}-{{ p.age }}
                </li>
            </ul>
            <h2>遍历对象</h2>
            <ul>
                <li v-for="(p, key) in car" :key="key">
                    {{ key }}-{{ p }}
                </li>
            </ul>
            <h2>遍历字符串</h2>
            <ul>
                <li v-for="(char, index) in str">
                    {{ index }}-{{ char }}
                </li>
            </ul>
        </div>
    </TestCard>
</template>

<style></style>