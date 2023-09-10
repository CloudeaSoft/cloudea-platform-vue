<script>
import TestCard from '../TestCard.vue'
export default {
    components: {
        TestCard
    },
    data() {
        return {
            isHot: true,
            numbers: {
                a: 1,
                b: 1
            }
        }
    },
    computed: {
        info() {
            return this.isHot ? '炎热' : '凉爽'
        },
    },
    methods: {
        changeWeather() {
            this.isHot = !this.isHot
        },
    },
    watch: {
        isHot: {
            //初始化时自动调用
            immediate: true,
            handler(newValue, oldValue) {
                console.log('xxx', newValue, oldValue);
            }
        },
        // 简写形式（当watch属性中只存在handler函数）
        'numbers.a'() {
            console.log('简易监视numbers.a')
        },
        numbers: {
            //监视多级结构中所有属性的变化
            deep: true,
            handler() {
                console.log('numbers');
            }
        }
        // 被主体管理的函数     以普通函数形式书写
        // 不被主体管理的函数   以箭头函数形式书写
        // 目的是为了可以从主体读取目标函数，使其this指向
    }
}
</script>

<template>
    <TestCard>
        <template #header>监视属性变化/深度监视</template>
        <div>
            <h2>今天天气：{{ info }}</h2>
            <!-- @xxx="yyy" xxx是事件名 yyy里可以写一些简单的语句，也可以放函数 -->
            <button @click="changeWeather">切换天气</button>

            <h2>a:{{ numbers.a }}</h2>
            <button @click="numbers.a++">a+1</button>
            <h2>b:{{ numbers.b }}</h2>
            <button @click="numbers.b++">b+1</button>
        </div>
    </TestCard>
</template>

<style></style>