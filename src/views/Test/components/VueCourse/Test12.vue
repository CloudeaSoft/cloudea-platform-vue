<script>
import TestCard from '../TestCard.vue'
export default {
    components: {
        TestCard
    },
    data() {
        return {
            opacity: 0.5,
        }
    },
    methods: {
        ddd(){

        }
    },
    beforeCreate(){

    },
    created(){
        
    },
    beforeMount(){
        // console.log('beforeMount');
    },
    mounted() {
        // console.log('mounted');
        // setInterval(() => {
        //     this.opacity = (this.opacity + 1) % 1 - 0.01
        // }, 16);
    },
    beforeUnmount(){
        // console.log('beforeUnmount');
    },
    unmounted() {
        // console.log('unmounted')
    },
}
</script>

<template>
    <TestCard>
        <template #header>生命周期函数</template>
        <!-- 
            生命周期函数：钩子，vue在特定时机调用。

            beforeCreate() - 无法访问到data methods
                - vm.$create() - init injections & reactivity 初始化：数据监测/数据代理
            created() - 可以访问到data methods

            beforeMount() - vue在此时已经将模板解析完毕，但仍未渲染到页面上。
                            在此阶段，所有对于dom的操作最终都不奏效，会被vue覆写。
                - vm.$mount() 
            mounted() - vue将vm.$el转换为真实dom插入页面，覆写原本的内容。至此阶段，初始化过程结束。

            beforeUpdate() - 数据已更新，但新页面尚未被渲染
                - vm.$update()
            updated() - 页面已保持最新

            beforeDestroy() - 实例将被卸载 (实例可以是页面组件，也就是说仅解绑组件的全部指令与‘自定义事件’的监听器)
                              在此阶段，vm的内容都处于可用状态，将要进行收尾操作（关闭定时器，取消订阅信息，解绑自定义事件等）
                              但即使可以访问数据调用方法，如果数据发生更新，也不会触发update()事件。
                - vm.$destroy()
            destroyed() - 实例已被卸载

            beforeUnmounte()
            Unmounted()
         -->
        <div>
            <h2 :style="{ opacity }">vue</h2>
            <button @click="ddd">a</button>
        </div>
    </TestCard>
</template>

<style></style>