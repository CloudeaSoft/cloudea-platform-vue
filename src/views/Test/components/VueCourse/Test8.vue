<script>
import TestCard from '../TestCard.vue'
export default {
    components: {
        TestCard
    },
    data() {
        return {
            sortType: 0,//0：原序 1：降序 2：升序 
            keyWord: '',
            persons: [
                { id: '001', name: '张三', age: 18, sex: '女' },
                { id: '002', name: '李四', age: 19, sex: '男' },
                { id: '003', name: '王五', age: 10, sex: '女' },
            ],
            filPersons: []
        }
    },
    computed: {
        filPersonsComputed() {
            const arr = this.persons.filter((p) => {
                return p.name.indexOf(this.keyWord) !== -1
            })
            
            if (this.sortType) {
                arr.sort((p1, p2) => {
                    return this.sortType === 1 ? p2.age - p1.age : p1.age - p2.age
                })
            }
            return arr
        },
    },
    watch: {
        keyWord: {
            immediate: true,
            handler(val) {
                this.filPersons = this.persons.filter((p) => {
                    return p.name.indexOf(val) !== -1
                })
            }
        }
    }
}
</script>

<template>
    <TestCard>
        <template #header>列表过滤+排序</template>
        <div>
            <h2>人员列表</h2>
            <input type="text" placeholder="请输入名字" v-model="keyWord">
            <button @click="sortType = 2">年龄升序</button>
            <button @click="sortType = 1">年龄降序</button>
            <button @click="sortType = 0">原顺序</button>
            <h3>Computed实现</h3>
            <ul>
                <li v-for="(p, index) in filPersonsComputed" :key="p.id">
                    {{ p.name }} - {{ p.age }} - {{ p.sex }}
                </li>
            </ul>
            <h3>Watch实现</h3>
            <ul>
                <li v-for="(p, index) in filPersons" :key="p.id">
                    {{ p.name }} - {{ p.age }} - {{ p.sex }}
                </li>
            </ul>
        </div>
    </TestCard>
</template>

<style></style>