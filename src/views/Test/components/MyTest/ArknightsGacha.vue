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
            tableData: [],
            analyzedData: [],
            echartsShow: false,
        }
    },
    methods: {
        //#region 寻访数据相关
        // 获取所有记录并分析
        async showGacha() {
            this.tableData = [];
            await this.getGacha();
            this.analyzeGacha();
        },
        // 获取所有记录（递归）
        async getGacha(val = 1) {
            //获取一页记录
            var res = await this.getGachaPage(val)
            //加入记录列表
            this.tableData = this.tableData.concat(res.list);
            //递归条件：当前页数小于总页数，且返回结果长度不为0
            if (res.pagination.current < res.pagination.total && res.list.length != 0) {
                await this.getGacha(val + 1)
            }
        },
        // 获取指定页号的记录
        async getGachaPage(val = 1) {
            var res = await axios.get('/api', {
                params: {
                    page: val,
                    token: this.gachaToken,
                    channelId: 2
                }
            });
            return res.data.data;
        },
        // 分析寻访记录
        analyzeGacha() {
            this.analyzedData = [];
            // 警告：在此处可以输出后续添加的pool对象，可能会有bug存在
            this.tableData.toReversed().forEach(element => {
                let poolCheck = false;
                for (let j = 0; j < this.analyzedData.length; j++) {
                    if (element.pool == this.analyzedData[j].name) {
                        // 查询到对应卡池 -> 填写内容
                        poolCheck = true;
                        // console.log('ts:' + element.ts, '卡池名：' + this.analyzedData[i].name);
                        // 向卡池对象填入内容
                        this.editPool(j, element.chars)
                    }
                };
                //未查询到对应卡池 -> 新增卡池 -> 填写内容
                if (!poolCheck) {
                    //新增卡池并获取到卡池的index
                    const index = this.initPool(element.pool) - 1
                    // console.log('ts:' + element.ts, '插入了卡池：' + element.pool, "位置为：" + index);
                    //向卡池对象填写内容
                    this.editPool(index, element.chars)
                }
            });
            console.log(this.analyzedData);
        },
        // 构造 新增卡池并返回卡池的index
        initPool(name = '未知卡池') {
            return this.analyzedData.push({
                name,
                total: 0,
                stars: [
                    { value: 0, name: '6星', labelLine: { show: true }, label: { show: true } },
                    { value: 0, name: '5星', labelLine: { show: true }, label: { show: true } },
                    { value: 0, name: '4星', labelLine: { show: true }, label: { show: true } },
                    { value: 0, name: '3星', labelLine: { show: true }, label: { show: true } },
                ],
                notSixStarCounter: 0,
                sixStarList: [],
                sixAvg: 0,
            })
        },
        // 填写数据
        editPool(index, chars = []) {
            // console.log(this.analyzedData[index].name, chars);
            chars.toReversed().forEach(element => {
                switch (element.rarity) {
                    case 2:
                        this.analyzedData[index].total++;
                        this.analyzedData[index].stars[3].value++;
                        this.analyzedData[index].notSixStarCounter++;
                        // console.log(2);
                        break;
                    case 3:
                        this.analyzedData[index].total++;
                        this.analyzedData[index].stars[2].value++;
                        this.analyzedData[index].notSixStarCounter++;
                        // console.log(3);
                        break;
                    case 4:
                        this.analyzedData[index].total++;
                        this.analyzedData[index].stars[1].value++;
                        this.analyzedData[index].notSixStarCounter++;
                        // console.log(4);
                        break;
                    case 5:
                        this.analyzedData[index].total++;
                        this.analyzedData[index].stars[0].value++;
                        this.analyzedData[index].sixStarList.push(this.initSix(element.name, this.analyzedData[index].notSixStarCounter + 1));
                        this.analyzedData[index].notSixStarCounter = 0;
                        // console.log(5);
                        break;
                    default:
                        console.log('错误的数据: ' + element.name + '/' + element.rarity);
                        break;
                }
            });
            //计算六星平均
            var sixAvg = 0;
            this.analyzedData[index].sixStarList.forEach(element => {
                sixAvg += element.count;
            });
            this.analyzedData[index].sixAvg = Math.trunc(sixAvg / this.analyzedData[index].sixStarList.length);
        },
        // 构造 新增六星记录
        initSix(name, count) {
            return {
                name,
                count,
            }
        },
        // 将Unix时间戳转换为标准时间
        dateFormat(value) {
            return this.$moment.unix(value).format('YYYY-MM-DD HH:mm:ss')
        },
        //#endregion   
        // 生成饼图
        initEchart() {
            this.echartsShow = true;
            // this.analyzedData.forEach(element => {
            //     console.log(this.initPoolOption(element));
            // });
            var charts = document.getElementsByClassName("echart-main");
            for (var i = 0; i < this.analyzedData.length; i++) {
                var myChart = echarts.init(charts[i])
                var opt = this.initPoolOption(this.analyzedData[i])
                this.lineHide(opt)
                myChart.setOption(opt);
                window.addEventListener("resize", () => {
                    myChart.resize();
                });

            }
        },
        initPoolOption(poolData) {
            // console.log(poolData.name)
            return {
                title: {
                    text: poolData.name,
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
                    left: 'center',
                    selected: {
                        '6星': true,
                        '5星': true,
                        '4星': true,
                        '3星': true,
                    }
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
                        data: poolData.stars,
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
        },
        lineHide(opt) {
            opt.series[0].data.forEach(element => {
                if (element.value == 0) {
                    // 添加属性，将内容设置为不显示
                    opt.legend.selected[element.name] = false
                    element.labelLine.show = false;
                    element.label.show = false;
                }
            });
        },
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
                <el-button @click="showGacha">获取寻访记录</el-button>
                <!-- <el-button @click="analyzeGacha">分析寻访记录</el-button> -->
                <el-button @click="initEchart">生成分析图表</el-button>
                <!-- <el-button @click="echartsShow = !echartsShow">{{ echartsShow ? '关闭饼图' : '显示饼图' }}</el-button> -->
            </el-form>
            <div class="gacha-body">
                <div class="gacha-analyze">
                    <el-row :gutter="10" v-show="echartsShow">
                        <el-col :span="8" v-for="a in analyzedData">
                            <div class="echart">
                                <div class="echart-main" ref="poolN" :style="{ width: '328px', height: '330px' }">
                                </div>
                                <div class="echart-text">
                                    <div>{{ '合计 ' + a.total + ' 抽 已累计 ' + a.notSixStarCounter + ' 抽未出6星' }}</div>
                                    <div>{{ '6星: ' + a.stars[0].value + ' [' + Math.trunc(a.stars[0].value / a.total * 100)
                                        +
                                        '%]' }}</div>
                                    <div>{{ '5星: ' + a.stars[1].value + ' [' + Math.trunc(a.stars[1].value / a.total * 100)
                                        +
                                        '%]' }}</div>
                                    <div>{{ '4星: ' + a.stars[2].value + ' [' + Math.trunc(a.stars[2].value / a.total * 100)
                                        +
                                        '%]' }}</div>
                                    <div>{{ '3星: ' + a.stars[3].value + ' [' + Math.trunc(a.stars[3].value / a.total * 100)
                                        +
                                        '%]' }}</div>
                                    <div>
                                        <ul>
                                            <li style="display: inline-block;">六星历史记录:</li>
                                            <li v-if="a.sixStarList.length == 0"
                                                style="display: inline-block; padding-left: 5px;">无</li>
                                            <li v-else v-for="b in a.sixStarList"
                                                style="display: inline-block; padding-left: 5px;">{{ b.name + '[' + b.count
                                                    + ']' }}</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <span>{{ '六星平均抽卡次数为: ' }}</span>
                                        <span v-if="a.sixStarList.length == 0">无</span>
                                        <span v-else>{{ a.sixAvg }}</span>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col>
                            <div class="gacha-table">
                                <el-table border stripe :data="tableData" max-height="480px"
                                    :header-cell-style="{ background: '#ccc', color: '#606266', fontWeight: 700 }">
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
    margin-bottom: 10px;
    padding: 10px;
}

.gacha-input {
    margin-bottom: 10px;
}

.gacha-body {}

.gacha-analyze {
    background: url();
}

.gacha-analyze .echart {
    margin-bottom: 10px;
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

.gacha-table {}

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