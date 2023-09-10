<script>
import TestCard from '../TestCard.vue'
export default {
    components: {
        TestCard
    },
    data() {
        return {
            varr: [],
        }
    },
    methods: {
        arr() {
            this.varr = new Array(9).fill(null)
            console.log(this.varr)
        },
        a() {
            this.varr.splice(1, 1, 'x')
        },
        b() {
            this.varr.splice(2, 1, 2)
        },
        c() {
            this.varr.splice(3, 1, {
                'xxx': 2,
            })
        },
        d() {
            this.varr.splice(4, 1, [null])
        }
    }
}
</script>

<template>
    <TestCard>
        <template #header>Demo</template>
        <div>
            {{ varr }}
        </div>
        <button @click="arr">click</button>
        <button @click="a">a</button>
        <button @click="b">b</button>
        <button @click="c">c</button>
        <button @click="d">d</button>
    </TestCard>
</template>

<style></style>