<script>
import axios from 'axios'
import request from '@/utils/http.ts'
import TestCard from '../TestCard.vue'
export default {
    components: {
        TestCard
    },
    data() {
        return {
            varr: [],
            forArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
        },
        forDemo() {
            for (let i = this.forArr.length - 1; i >= 0; i--) {
                console.log(this.forArr[i]);
            }
        },
        override() {
            request({
                method: 'post',
                url: "/api/Test/TestPut",
                headers: {
                    "X-HTTP-Method-Override": "PUT"
                },
            })
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

        <button @click="forDemo">for</button>

        <button @click="override">override</button>
    </TestCard>
</template>

<style></style>@/utils/http/http