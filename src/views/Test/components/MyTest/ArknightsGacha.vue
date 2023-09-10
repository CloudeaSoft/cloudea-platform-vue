<script>
import TestCard from '../TestCard.vue'
import axios from 'axios'
import * as echarts from 'echarts'
export default {
    components: {
        TestCard,
    },
    data() {
        return {
            gachaToken: '',
            queryData: [],
            tableData: [],
        }
    },
    methods: {
        async analyzeGacha() {
            await this.getGacha();
            console.log(this.tableData);
        },
        async getGacha(val = 1) {
            var res = await axios.get('/api', {
                params: {
                    page: val,
                    token: this.gachaToken,
                    channelId: 2
                }
            })
            this.queryData = res.data;
            this.tableData = this.tableData.concat(this.queryData.data.list);
            if (this.queryData.data.pagination.current < this.queryData.data.pagination.total) {
                await this.getGacha(val + 1)
            }
        },
        async getGachaPage(val = 1) {
            var res = await axios.get('/api', {
                params: {
                    page: val,
                    token: this.gachaToken,
                    channelId: 2
                }
            });
            this.queryData[val] = res.data.data;
        },
        async getGachaRewrite() {
            // 获取第一页数据
            var data = await this.getGachaPage();
            console.log(data);

            // 填入第一页数据
            this.tableData = this.tableData.concat(data.list);
            console.log(this.tableData);

            // 获取total，并根据total发送请求
            console.log(data.pagination.total);
            // 若只有一页，则不再发送请求，直接结束
            if (data.pagination.total == 1) {
                console.log('只有一页')
                return;
            }
            let promiseArr = [];
            // 若不止一页，则批量发送异步请求，全部结束后进行后续内容
            for (let i = 0; i < data.pagination.total; i++) {
                this.getGachaPage(i);
            }
        },
        dateFormat(value) {
            return this.$moment.unix(value).format('YYYY-MM-DD HH:mm:ss')
        },
        initEcharts() {
            const poolAOption = {
                title: {
                    text: '卡池名称',
                    left: 'center',
                    top: 25,
                    textStyle: {
                        color: '#000'
                    }
                },
                grid: {
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    containLabel: true
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '20%',
                    left: 'center'
                },
                series: [
                    {
                        // name: 'Access From',
                        type: 'pie',
                        radius: '50%',
                        center: ['50%', '65%'],
                        color: [
                            '#ee5700',
                            '#cc7a00',
                            '#a231ff',
                            '#40C5F1',
                        ],
                        data: [
                            { value: 1, name: '6星' },
                            { value: 4, name: '5星' },
                            { value: 16, name: '4星' },
                            { value: 29, name: '3星' },
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            const poolA = echarts.init(this.$refs.poolA);// 图标初始化
            poolA.setOption(poolAOption);// 渲染页面
            const poolB = echarts.init(this.$refs.poolB);// 图标初始化
            poolB.setOption(poolAOption);// 渲染页面
            const poolN = echarts.init(this.$refs.poolN);// 图标初始化
            poolN.setOption(poolAOption);// 渲染页面
            //随着屏幕大小调节图表
            // window.addEventListener("resize", () => {
            //     poolA.resize();
            // });
        },
        test() {
            this.initEcharts()
        }
    },
}
</script>

<template>
    <TestCard>
        <template #header>明日方舟寻访记录</template>
        <div>
            <el-form class="gacha-header">
                <el-input type="textarea" rows="4" class="gacha-input" v-model="gachaToken"
                    placeholder="请在此输入Token"></el-input>
                <el-button @click="getGachaRewrite">获取寻访记录</el-button>
                <el-button @click="test">test</el-button>
            </el-form>
            <div class="gacha-body">
                <div class="gacha-analyze">
                    <el-row :gutter="10">
                        <el-col>
                            <div class="gacha-table">
                                <el-table border stripe :data="tableData" max-height="480px">
                                    <el-table-column label="时间戳" min-width="120px" show-overflow-tooltip align="center">
                                        <template #default="scope">
                                            {{ dateFormat(scope.row.ts) }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="卡池" prop="pool" min-width="250px" show-overflow-tooltip
                                        align="center"></el-table-column>
                                    <el-table-column label="角色" min-width="150px" align="center">
                                        <template #default="scope">
                                            <ul>
                                                <li v-for="(a, index) in scope.row.chars" :key="index">
                                                    <span style="color: #a231ff;" v-if="a.rarity == 3">{{ a.name }}</span>
                                                    <span style="color: #cc7a00;" v-else-if="a.rarity == 4">{{ a.name
                                                    }}</span>
                                                    <span style="color: #ee5700;" v-else-if="a.rarity == 5">{{ a.name
                                                    }}</span>
                                                    <span style="color: #333333;" v-else>{{ a.name }}</span>
                                                    <span class="gacha-table-isnew" v-if="a.isNew">N</span>
                                                </li>
                                            </ul>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <div class="echart">
                                <div class="echart-main" ref="poolA" id="mychart"
                                    :style="{ width: '100%', height: '330px' }">
                                </div>
                                <div class="echart-text">
                                    <div>{{ '合计 xx 抽 已累计 xx 抽未出6星' }}</div>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="echart">
                                <div class="echart-main" ref="poolB" id="mychart"
                                    :style="{ width: '100%', height: '330px' }"></div>
                                <div class="echart-text">
                                    <div>{{ '合计 xx 抽 已累计 xx 抽未出6星' }}</div>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="echart">
                                <div class="echart-main" ref="poolN" id="mychart"
                                    :style="{ width: '100%', height: '330px' }">
                                </div>
                                <div class="echart-text">
                                    <div>{{ '合计 xx 抽 已累计 xx 抽未出6星' }}</div>
                                    <div>{{ '6星：1 [2%]' }}</div>
                                    <div>{{ '5星：4 [8%]' }}</div>
                                    <div>{{ '4星：16 [32%]' }}</div>
                                    <div>{{ '3星：29 [58%]' }}</div>
                                    <div>{{ '六星历史记录：澄闪[29]' }}</div>
                                    <div>{{ '六星平均出货次数为：29' }}</div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </TestCard>
</template>

<style scoped>
ul {
    padding: 0;
}

ul li {
    list-style: none;
}

.gacha-header {
    border: 1px solid #999;
    border-radius: 5px;
    margin-bottom: 15px;
    padding: 10px;
}

.gacha-input {
    margin-bottom: 10px;
}

.gacha-body {
    border: 1px solid #999;
    border-radius: 5px;
    padding: 10px;
}

.gacha-analyze {
    background: url();
}

.gacha-analyze .echart {
    border-radius: 5px;
    overflow: hidden;
}

.gacha-analyze .echart-main {
    background-color: #eee;
}

.gacha-analyze .echart-text {
    padding-left: 30px;
    height: 250px;
    background-color: #aaa;
}

.gacha-table {
    margin-top: 10px;
}

.gacha-table-isnew {
    justify-content: center;
    align-items: center;
    color: #fff;
    background-color: #f5352e;
    padding: 0 0.2em;
    top: 0;
    right: 0;
    height: 100%;
    font-family: SourceHanSansCN-Bold;
    border-radius: 0.2em;
}
</style>