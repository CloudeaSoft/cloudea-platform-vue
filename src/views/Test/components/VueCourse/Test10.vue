<script>
import TestCard from '../TestCard.vue'
export default {
    components: {
        TestCard
    },
    data() {
        return {
            name: 'xiao ming',
            htmlText: '<div>xxx</div>',
            num: 1,
        }
    },
    methods: {
        numIncrease() {
            this.num++
        },
        async f() {
            await console.log("f");
            console.log("f-2")
        },
        async f0() {
            console.log("f0");
            await this.f();
            console.log("f0-2");
        },
        async f1() {
            console.log("f1")
            await this.f0();
            //加了await， 会等到f0()的”f0-2"输出之后再输出f1-2；没加await，
            console.log("f1-2")
        },
        async f2() {
            console.log("f2")
            await this.f1();
            console.log("f2-2")
        }
    },
}
</script>

<template>
    <TestCard>
        <template #header>vue属性标签v-xxx 内置指令</template>
        <!-- 
            v-text:
                1.作用：向其所在的节点中渲染 “文本内容”
                2.改变：v-text会覆盖节点中的内容，而插值语法不会
         -->
        <div>
            <div>你好，{{ name }}</div>
            <div v-text="name"></div>
            <div>{{ htmlText }}</div>
            <div v-text="htmlText"></div>

        </div>
        <!--  
            v-once
                1. 初次动态渲染后，就视为静态资源
         -->
        <div>
            <div v-once>{{ num }}</div>
            <div>{{ num }}</div>
            <button @click="numIncrease">num++</button>
        </div>
        <!-- 
            v-pre:
                1. 跳过其所在节点的编译过程。
                2. 可利用跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译。
         -->
        <div>
            <div v-pre="">{{ num }}</div>
        </div>
        <button @click="f2">a</button>
    </TestCard>
</template>

<style></style>