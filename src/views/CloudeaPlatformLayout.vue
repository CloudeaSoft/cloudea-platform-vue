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
        <router-link to="/test">test</router-link>
        <br>
        <router-link to="/tool">tool</router-link>
        <RouterView></RouterView>
    </CloudeaIndex>
</template>