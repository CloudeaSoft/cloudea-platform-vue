<script>
import TestCard from '../TestCard.vue'
export default {
    components: {
        TestCard
    },
    data() {
        return {
            userInfo: {
                account: '',
                password: '',
                sex: null,
                age: null,
                hobby: [],
                city: '',
                other: '',
                agree: false,
            }
        }
    },
    methods: {
        demo() {
            alert(this.userInfo)
        }
    },
}
</script>

<template>
    <TestCard>
        <template #header>Vue表单绑定基础</template>
        <div>
            <form @submit.prevent="demo">
                <label for="account">账号: </label><input type="text" id="account" v-model.trim="userInfo.account"><br>

                <label for="password">密码: </label><input type="text" id="password" v-model.trim="userInfo.password"><br>

                <label>性别: </label>
                <label>男</label><input type="radio" name="sex" v-model="userInfo.sex" value="true">
                <label>女</label><input type="radio" name="sex" v-model="userInfo.sex" value="false"><br>

                <label>年龄</label><input type="number" v-model.number.trim="userInfo.age"><br>

                <label>爱好：</label>
                <label>学习</label> <input type="checkbox" name="hobby" v-model="userInfo.hobby" value="study">
                <label>打游戏</label><input type="checkbox" name="hobby" v-model="userInfo.hobby" value="game">
                <label>吃饭</label> <input type="checkbox" name="hobby" v-model="userInfo.hobby" value="eat"><br>
                <label>所属校区：</label>
                <select v-model="userInfo.city">
                    <option value="">请选择校区</option>
                    <option value="beijing">北京</option>
                    <option value="shenzhen">深圳</option>
                    <option value="wuhan">武汉</option>
                </select><br>
                <label>其他信息：</label>
                <textarea v-model.lazy="userInfo.other"></textarea><br>
                <input type="checkbox" v-model="userInfo.agree">阅读并接受<a href="#">《用户协议》</a>
                <button type="submit">提交</button>
            </form>
        </div>
    </TestCard>
</template>

<style></style>