<script>
import CloudeaHeader from './components/CloudeaHeader.vue';
export default {
    components: {
        CloudeaHeader
    },
    data() {
        return {

        }
    },
}
</script>

<template>
    <CloudeaHeader></CloudeaHeader>
    <div class="main">
        <slot></slot>
    </div>
</template>

<style scoped>
.main{
    /* height: 3000px; */
}
</style>