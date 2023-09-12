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
}
</script>

<template>
    <TestCard>
        <template #header>VueComponent</template>
        <div>
            
        </div>
    </TestCard>
</template>

<style></style>