<script setup lang="ts">
import TestCard from './components/TestCard.vue'
import BlankTest from './components/BlankTest.vue'

//vue学习
import Test1 from './components/VueCourse/Test1.vue'
import Test2 from './components/VueCourse/Test2.vue'
import Test3 from './components/VueCourse/Test3.vue'
import Test4 from './components/VueCourse/Test4.vue'
import Test5 from './components/VueCourse/Test5.vue'
import Test6 from './components/VueCourse/Test6.vue'
import Test7 from './components/VueCourse/Test7.vue'
import Test8 from './components/VueCourse/Test8.vue'
import Test9 from './components/VueCourse/Test9.vue'
import Test10 from './components/VueCourse/Test10.vue'
import Test11 from './components/VueCourse/Test11.vue'
import Test12 from './components/VueCourse/Test12.vue'
import Test13 from './components/VueCourse/Test13.vue'
import Test14 from './components/VueCourse/Test14.vue'
import Test15 from './components/VueCourse/Test15.vue'
 
//个人测试
// import ArknightsGacha from './components/MyTest/ArknightsGacha.vue'
import None from './components/MyTest/None.vue'

</script>

<template>
    <div class="frame">
        <div class="header">
            <h1>测试区域</h1>
        </div>
        <TestCard>
            <template #header>VueCourse</template>
            <div>
                <Test15></Test15>
                <Test14></Test14>
                <!-- <Test13 :name="123" :age="777" :sex="22"></Test13> -->
                <!-- <Test12></Test12>
                <Test11></Test11>
                <Test10></Test10>
                <Test9></Test9>
                <Test8></Test8>
                <Test7></Test7>
                <Test6></Test6>
                <Test5></Test5>
                <Test4></Test4>
                <Test3></Test3>
                <Test2></Test2>
                <Test1></Test1> -->
            </div>
        </TestCard>
        <TestCard>
            <template #header>MyTest</template>
            <div>
                <None></None>
            </div>
        </TestCard>
        <BlankTest></BlankTest>
    </div>
</template>

<style scoped>
.frame {
    margin: 0px auto;
    padding: 15px;
    max-width: 1080px;
    width: 100%;
    border: 1px solid #999;
}

.header {
    border-bottom: 1px solid #999;
}
</style>