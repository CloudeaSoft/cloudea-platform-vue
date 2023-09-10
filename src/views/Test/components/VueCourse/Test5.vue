<script>
import TestCard from '../TestCard.vue'
export default {
    components: {
        TestCard
    },
    data() {
        return {
            n: 0,
        }
    },
    methods: {
        add() {
            this.n++
            console.log(this.n===1);
        }
    },
}
</script>

<template>
    <TestCard>
        <!-- 使用 v-if不一定能获取到元素，v-show必定能获取到元素 -->
        <template #header>条件渲染</template>
        <div>
            <button @click="add">add</button>
            <div>{{ n }}</div>
            <template v-if="n % 2 === 1">
                <div>
                    123
                </div>
            </template>
        </div>
    </TestCard>
</template>

<style></style>