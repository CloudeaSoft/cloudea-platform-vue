<script>
import TestCard from '../TestCard.vue'
import { mixin1 } from './mixin.ts'
export default {
    components: {
        TestCard
    },
    data() {
        return {
            n: 1,
            myAge: this.age,
        }
    },
    props: {
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            default: 99
        },
        sex: {
            type: String,
            required: true
        }
    },
    mixins: [mixin1]
}
</script>

<template>
    <TestCard>
        <template #header>props / plugins</template>
        <div>
            {{ name }}
            {{ age }}
            {{ sex }}
        </div>
        <button @click="myAge++">myAge++ {{ myAge }}</button>
        <button @click="showName">mixin</button>
    </TestCard>
</template>

<style></style>