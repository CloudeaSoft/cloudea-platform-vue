<script>
import Test from './Test/Test.vue'
import CloudeaIndex from './CloudeaPlatform/CloudeaIndex.vue'
export default {
    components: {
        Test,
        CloudeaIndex,
    },
    data() {
        return {
            showKey: 0,
        }
    },
}
</script>

<template>
    <CloudeaIndex>
        <Test v-if="showKey === 0"></Test>
    </CloudeaIndex>
</template>