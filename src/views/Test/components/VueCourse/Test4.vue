<script>
import TestCard from '../TestCard.vue'
export default {
    components: {
        TestCard
    },
    data() {
        return {
            name: 'normal',
            mood: 'normal',
            classArr: ['normal', 'happy'],
            // 对象 true代表启用
            classObj: {
                normal: true,
                sad: true,
                happy: true
            },
            styleObj: {
                // fontSize => font-size 驼峰写法表示属性名
                fontSize: '50px'
            },
            styleObj2: {
                // fontSize => font-size 驼峰写法表示属性名
                fontWeight: '700',
                textAlign: 'center'
            },
            styleArr: [{
                fontSize: '50px'
            }, {
                fontWeight: '700',
                textAlign: 'center'
            },],
        }
    },
    methods: {
        changeMood() {
            const arr = ['happy', 'sad', 'normal']
            this.mood = arr[Math.floor(Math.random() * 3)]
            this.name = this.mood
        }
    },
}
</script>

<template>
    <TestCard>
        <template #header>绑定Class</template>
        <div>
            字符串写法
            <div class="basic" :class="mood" @click="changeMood">{{ name }}</div>
        </div>
        <div>
            数组class写法：classArr
            <div class="basic" :class="classArr"></div>
        </div>
        <div>
            对象class写法：classObj
            <div class="basic" :class="classObj"></div>
        </div>
        <div>
            对象style写法：styleObj
            <div class="basic" :style="styleObj">xxx</div>
        </div>
        <div>
            对象数组style写法：[styleObj,styleObj2]
            <div class="basic" :style="styleArr">xxx</div>
        </div>
    </TestCard>
</template>

<style>
.basic {
    height: 80px;
    width: 400px;
    border: 1px solid #333;
    padding: 10px;
}

.normal {
    background-color: skyblue;
}

.happy {
    border: 2px solid red;
    background-color: rgba(255, 255, 0, 0.644);
    background: linear-gradient(30deg, yellow, pink, orange, yellow);
}

.sad {
    border: 4px dashed rgb(2, 197, 2);
    background-color: gray;
}
</style>