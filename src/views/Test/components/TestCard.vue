<script>
export default {
    data() {
        return {
            displayStatus: false
        }
    },
    methods: {
        changeDisplayStatus(e) {
            this.displayStatus = !this.displayStatus
            e.target.value = 'x'
        }
    },
    computed: {
        displayStatusHtml() {
            return this.displayStatus ? '-' : '+'
        }
    }
}
</script>

<template>
    <div class="main">
        <div class="header">
            <slot name="header"></slot>
            <button class="change" @click="changeDisplayStatus">{{ displayStatusHtml }}</button>
        </div>
        <!-- 插槽 -->
        <transition name="fade">
            <div class="child-box" v-show="displayStatus">
                <slot></slot>
            </div>
        </transition>
        <div class="footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<style scoped>
.main {
    border: 1px solid #333;
    border-radius: 10px;
    margin: 15px 0;
    overflow: hidden;
}

.header {
    background-color: #aaa;
    padding: 5px 10px;
    font-size: 16px;
    font-weight: 500;
}

.change {
    float: right;
}

.child-box {
    padding: 10px;
}

.footer {
    height: 10px;
    background-color: #bbb;
}

.fade-enter-active, .fade-leave-active{
    transition: opacity .25s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>