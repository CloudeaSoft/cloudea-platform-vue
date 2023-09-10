<script>
import TestCard from '../TestCard.vue'
export default {
    components: {
        TestCard
    },
    data() {
        return {
            firstName: '张',
            lastName: '三'
        }
    },
    methods: {
        fullName() {
            return this.firstName.slice(0, 3) + '-' + this.lastName
        }
    },
    computed: {
        fullName2: {
            //get有什么作用？当有人读取时，get被调用，返回值
            //get什么时候调？1.初次读取 2.依赖数据变化
            get() {
                return this.firstName.slice(0, 3) + '-' + this.lastName
            },
            //set什么时候调？当fullName2被修改时
            set() {

            }
        },
        //计算属性+get缩写（仅当无set函数时）
        fullName3() {
            return this.firstName.slice(0, 3) + '-' + this.lastName
        },
    }
}
</script>

<template>
    <TestCard>
        <template #header>计算属性</template>
        <div>
            <TestCard>
                <template #header>data</template>
                姓：<input type="text" v-model="firstName"><br>
                名：<input type="text" v-model="lastName"><br>
                姓名：<span>{{ firstName.slice(0, 3) + '-' + lastName }}</span>
            </TestCard>
            <TestCard>
                <template #header>methods</template>
                姓：<input type="text" v-model="firstName"><br>
                名：<input type="text" v-model="lastName"><br>
                姓名：<span>{{ fullName() }}</span>
                <button @click="fullName">click</button>
            </TestCard>
            <TestCard>
                <template #header>computed</template>
                姓：<input type="text" v-model="firstName"><br>
                名：<input type="text" v-model="lastName"><br>
                姓名：<span>{{ fullName2 }}</span>
            </TestCard>
            <TestCard>
                <template #header>computed-min</template>
                姓：<input type="text" v-model="firstName"><br>
                名：<input type="text" v-model="lastName"><br>
                姓名：<span>{{ fullName3 }}</span>
            </TestCard>
        </div>
    </TestCard>
</template>

<style></style>