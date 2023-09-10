<script>
import TestCard from '../TestCard.vue'
export default {
    components:{
        TestCard
    },
    data() {
        return {
            name: 'App'
        }
    },
    methods: {
        showInfo(e) {
            console.log(e.key, e.keyCode);
        }
    }
}
</script>

<template>
    <TestCard>
        <template #header>Test1</template>
        <div>
            <h2>欢迎使用{{ name }}</h2>
            <input type="text" placeholder="按下回车提示输入" @keyup.ctrl="showInfo">
        </div>
    </TestCard>
</template>