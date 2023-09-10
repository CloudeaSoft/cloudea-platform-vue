<script>
import TestCard from '../TestCard.vue'
export default {
    components: {
        TestCard
    },
    data() {
        return {
            n: 1,
        }
    },
    directives: {
        // 调用时机：1.与元素成功绑定时。2.指令所在模板被重新解析时
        big(element, binding) {
            console.log(element, binding.value);
            element.innerText = binding.value * 10
        },
    }
}
</script>

<template>
    <TestCard>
        <template #header>自定义标签指令</template>
        <div>
            <h2>n:<span v-text="n"></span></h2>
            <h2>big n:<span v-big="n"></span></h2>
            <button @click="n++">n+1</button>
            <input type="text" v-fbind="n">
        </div>
    </TestCard>
</template>

<style></style>