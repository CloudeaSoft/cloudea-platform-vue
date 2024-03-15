<script>
  import TestCard from '../TestCard.vue'
  import GachaTips from './ArknightsGachaTips.vue'
  import request from '@/utils/http.ts'
  import * as echarts from 'echarts'
  import { ElMessage } from 'element-plus'
  import { Search } from '@element-plus/icons-vue'
  import { nextTick } from 'vue'
  export default {
    components: {
      TestCard,
      GachaTips,
      Search
    },
    data() {
      return {
        // 账号令牌信息 - 保存在浏览器本地
        gachaTokenFull: JSON.parse(localStorage.getItem('gachaTokenFull')) || '',
        // 服务器信息 - 保存在浏览器本地
        gachaChannelId: JSON.parse(localStorage.getItem('gachaChannelId')) || 1,
        gachaChannelIdList: [
          { channelId: 1, name: '官服' },
          { channelId: 2, name: 'B服' }
        ],
        // 初始卡池数据
        tableData: [],
        // 分析结果
        analyzedData: [],
        // 对话框 - 图表
        echartDialogVisible: false,
        // 对话框 - 教程
        tutorialDialogVisible: true,
        // 加载锁
        loadingCheck: false,
        // 按钮样式
        buttonTypeGetGacha: 'primary',
        buttonTypeAnalyzeGacha: 'default',
        // 表头样式
        tableHeaderCellStyle: {
          background: 'linear-gradient(18edeg，#DBE8FF 0%，rgba(243，248，255，0.42)100%)',
          color: '#606266',
          fontWeight: 700
        }
      }
    },
    methods: {
      //#region 寻访逻辑相关
      // 总方法 - 获取所有记录 并 分析
      async showGacha() {
        // 数据校验
        if (this.gachaToken === '') {
          ElMessage({
            message: 'token不可为空',
            type: 'warning'
          })
          return
        }
        // 禁用页面
        this.loadingCheck = true
        this.buttonTypeAnalyzeGacha = 'default'
        // 初始化，获取并分析数据
        this.tableData = []
        try {
          await this.getGacha()
          this.analyzeGacha()
        } catch (err) {
          alert('出现错误：' + err)
          // 解锁页面
          this.loadingCheck = false
          return
        }
        // 解锁页面
        this.buttonTypeAnalyzeGacha = 'success'
        this.loadingCheck = false
      },
      // 请求数据 - 获取寻访记录
      async getGacha() {
        //获取记录
        var res = await request.get('/api/GameHelper/ArkNights/GetGacha', {
          params: {
            token: this.gachaToken,
            channelId: this.gachaChannelId
          }
        })
        try {
          // 加入记录列表
          this.tableData = res.list;
        } catch (e) {
          // 提示
          ElMessage({
            message: 'token无效',
            type: 'warning'
          })
        }
      },
      // 卡池分析 - 分析寻访记录
      analyzeGacha() {
        // 初始化
        this.analyzedData = []
        // 警告：在此行处可以输出后续添加的pool对象，可能会有bug存在

        // 获取反转的卡池信息（由旧到新）
        const reversedTableData = this.reverseArr(this.tableData)
        // 依次扫描并填写相关数据
        reversedTableData.forEach((element) => {
          // 检查是否匹配到对应卡池
          var poolCheck = false

          // 根据卡池名称匹配后 -> 填写内容
          for (var index = 0; index < this.analyzedData.length; index++) {
            if (element.pool == this.analyzedData[index].name) {
              // 查询到对应卡池 -> 填写内容
              poolCheck = true
              // 向卡池对象填入内容
              this.editPool(index, element.chars)
            }
          }

          // 未查询到对应卡池 -> 新增卡池 -> 填写内容
          if (!poolCheck) {
            //新增卡池并获取到卡池的index
            const index = this.initPool(element.pool) - 1
            //向卡池对象填写内容
            this.editPool(index, element.chars)
          }
        })
        // 填写六星平均抽数
        this.analyzedData.forEach((element) => {
          var sixSum = 0
          element.sixStarList.forEach((sixStar) => {
            sixSum += sixStar.count
          })
          element.sixAvg = Math.trunc(sixSum / element.sixStarList.length)
        })
      },
      // 卡池分析 - 构造 新增卡池并返回卡池的index
      initPool(name = '未知卡池') {
        return this.analyzedData.push({
          name,
          total: 0,
          stars: [
            { value: 0, name: '6星', labelLine: { show: true }, label: { show: true } },
            { value: 0, name: '5星', labelLine: { show: true }, label: { show: true } },
            { value: 0, name: '4星', labelLine: { show: true }, label: { show: true } },
            { value: 0, name: '3星', labelLine: { show: true }, label: { show: true } }
          ],
          notSixStarCounter: 0,
          sixStarList: [],
          sixAvg: 0
        })
      },
      // 卡池分析 - 填写数据
      editPool(index, chars = []) {
        chars.forEach((element) => {
          switch (element.rarity) {
            case 2: // 3星
              this.analyzedData[index].total++
              this.analyzedData[index].stars[3].value++
              this.analyzedData[index].notSixStarCounter++
              break
            case 3: // 4星
              this.analyzedData[index].total++
              this.analyzedData[index].stars[2].value++
              this.analyzedData[index].notSixStarCounter++
              break
            case 4: // 5星
              this.analyzedData[index].total++
              this.analyzedData[index].stars[1].value++
              this.analyzedData[index].notSixStarCounter++
              break
            case 5: // 6星 记录名字与抽数，计数器归零
              this.analyzedData[index].total++
              this.analyzedData[index].stars[0].value++
              this.analyzedData[index].sixStarList.push(
                this.initSix(element.name, this.analyzedData[index].notSixStarCounter + 1)
              )
              this.analyzedData[index].notSixStarCounter = 0
              break
            default: // 错误数据
              console.log('错误的数据: ' + element.name + '/' + element.rarity)
              break
          }
        })
      },
      // 卡池分析 - 构造 六星记录对象
      initSix(name, count) {
        return {
          name,
          count
        }
      },
      // 饼图相关 - 生成
      async getEchart() {
        this.echartDialogVisible = true
        await nextTick()
        try {
          var charts = document.getElementsByClassName('echart-main')
          for (var i = 0; i < this.analyzedData.length; i++) {
            var myChart = echarts.init(charts[i])
            var opt = this.initPoolOption(this.analyzedData[i])
            this.lineHide(opt)
            myChart.clear()
            myChart.setOption(opt, true)
            window.addEventListener('resize', () => {
              myChart.resize()
            })
          }
        } catch (err) {
          console.log('生成图表时发送错误')
        }
      },
      // 饼图相关 - 构造 初始化的卡池图表参数对象
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
              '3星': true
            }
          },
          series: [
            {
              // name: 'Access From',
              type: 'pie',
              radius: '50%',
              center: ['50%', '65%'],
              color: ['#ee5700', '#cc7a00', '#a231ff', '#40C5F1'],
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
        }
      },
      // 饼图相关 - 隐藏值为0的条目的相关内容
      lineHide(opt) {
        opt.series[0].data.forEach((element) => {
          if (element.value == 0) {
            // 添加属性，将内容设置为不显示
            opt.legend.selected[element.name] = false
            element.labelLine.show = false
            element.label.show = false
          }
        })
      },
      // 工具方法 - 反转数组（替代toReversed()，以保证页面兼容性）
      reverseArr(arr) {
        var newArr = []
        for (let index = arr.length - 1; index >= 0; index--) {
          newArr.push(arr[index])
        }
        return newArr
      },
      // 工具方法 - 将Unix时间戳转换为标准时间
      dateFormat(value) {
        return this.$moment.unix(value).format('YYYY-MM-DD HH:mm:ss')
      },
      //#endregion

      //弃用 用户点击按钮时的 确认用 回调方法
      handleCLose(done) {
        ElMessageBox.confirm('确定要关闭吗？')
          .then(() => {
            done()
          })
          .catch(() => {
            // catch error
          })
      }
    },
    computed: {
      gachaToken() {
        return JSON.parse(this.gachaTokenFull).data.content
      },
      analyzedDataCheckForBtn() {
        return this.analyzedData.length === 0 ? true : false
      }
    },
    watch: {
      gachaTokenFull: {
        deep: true,
        handler(value) {
          localStorage.setItem('gachaTokenFull', JSON.stringify(value))
        }
      },
      gachaChannelId: {
        deep: true,
        handler(value) {
          localStorage.setItem('gachaChannelId', JSON.stringify(value))
        }
      }
    }
  }
</script>

<template>
  <TestCard>
    <template #header>明日方舟寻访记录</template>
    <div v-loading="loadingCheck">
      <el-form class="gacha-header">
        <el-input
          type="textarea"
          rows="6"
          class="gacha-input"
          v-model="gachaTokenFull"
          placeholder="请在此输入"
        ></el-input>
        <el-form-item class="area-button" :inline="true">
          <el-button @click="showGacha" :type="buttonTypeGetGacha">获取寻访记录</el-button>
          <el-button
            @click="getEchart"
            :type="buttonTypeAnalyzeGacha"
            :disabled="analyzedDataCheckForBtn"
            >生成分析图表</el-button
          >
          <div class="area-button-right">
            <el-tooltip effect="dark" placement="bottom">
              <template #content>
                <GachaTips></GachaTips>
              </template>
              <el-button circle>
                <el-icon>
                  <Search />
                </el-icon>
              </el-button>
            </el-tooltip>
            <el-radio-group v-model="gachaChannelId" size="default">
              <el-radio-button
                v-for="server in gachaChannelIdList"
                :key="server.channelId"
                :label="server.channelId"
              >
                {{ server.name }}
              </el-radio-button>
            </el-radio-group>
          </div>
        </el-form-item>
      </el-form>
      <div class="gacha-body">
        <div class="gacha-analyze">
          <el-row :gutter="10">
            <el-col>
              <div class="gacha-table">
                <el-table
                  border
                  stripe
                  :data="tableData"
                  height="480px"
                  :header-cell-style="tableHeaderCellStyle"
                >
                  <el-table-column
                    label="时间戳"
                    :resizable="false"
                    min-width="120px"
                    show-overflow-tooltip
                    align="center"
                  >
                    <template #default="scope">
                      {{ dateFormat(scope.row.ts) }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="卡池"
                    :resizable="false"
                    prop="pool"
                    min-width="250px"
                    show-overflow-tooltip
                    align="center"
                  ></el-table-column>
                  <el-table-column label="角色" :resizable="false" min-width="150px" align="center">
                    <template #default="scope">
                      <ul>
                        <li v-for="(a, index) in scope.row.chars" :key="index">
                          <span style="color: #a231ff" v-if="a.rarity == 3">{{ a.name }}</span>
                          <span style="color: #cc7a00" v-else-if="a.rarity == 4">{{ a.name }}</span>
                          <span style="color: #ee5700" v-else-if="a.rarity == 5">{{ a.name }}</span>
                          <span style="color: #333333" v-else>{{ a.name }}</span>
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
  <el-dialog
    v-model="echartDialogVisible"
    width="1080px"
    center
    :close-on-click-modal="false"
    :show-close="false"
  >
    <template #header>
      <div>
        <div class="gacha-analyze-header">
          <h2>抽卡分析</h2>
        </div>
      </div>
    </template>
    <div class="gacha-analyze">
      <el-row :gutter="10">
        <el-col :span="8" v-for="(a, index) in analyzedData" :key="index">
          <div class="echart">
            <div class="echart-main" :style="{ width: '328px', height: '330px' }"></div>
            <div class="echart-text">
              <div>
                {{ '合计 ' + a.total + ' 抽 已累计 ' + a.notSixStarCounter + ' 抽未出6星' }}
              </div>
              <div>
                {{
                  '6星: ' +
                  a.stars[0].value +
                  ' [' +
                  Math.trunc((a.stars[0].value / a.total) * 100) +
                  '%]'
                }}
              </div>
              <div>
                {{
                  '5星: ' +
                  a.stars[1].value +
                  ' [' +
                  Math.trunc((a.stars[1].value / a.total) * 100) +
                  '%]'
                }}
              </div>
              <div>
                {{
                  '4星: ' +
                  a.stars[2].value +
                  ' [' +
                  Math.trunc((a.stars[2].value / a.total) * 100) +
                  '%]'
                }}
              </div>
              <div>
                {{
                  '3星: ' +
                  a.stars[3].value +
                  ' [' +
                  Math.trunc((a.stars[3].value / a.total) * 100) +
                  '%]'
                }}
              </div>
              <div>
                <ul>
                  <li style="display: inline-block">六星历史记录:</li>
                  <li
                    v-if="a.sixStarList.length == 0"
                    style="display: inline-block; padding-left: 5px"
                  >
                    无
                  </li>
                  <li
                    v-else
                    v-for="(b, index) in a.sixStarList"
                    :key="index"
                    style="display: inline-block; padding-left: 5px"
                  >
                    {{ b.name + '[' + b.count + ']' }}
                  </li>
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
    </div>
    <template #footer>
      <span class="gacha-analyze-footer">
        <el-button type="primary" @click="echartDialogVisible = false"> 关闭 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
  ul {
    padding: 0;
  }

  .gacha-header {
    border: 1px solid #999;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 10px;
  }

  :deep(.gacha-header .area-button) {
    margin-bottom: 0;
  }

  :deep(.gacha-header .area-button .area-button-right) {
    margin-left: auto;
    display: flex;
  }

  :deep(.gacha-header .area-button .area-button-right button) {
    margin-right: 10px;
  }

  :deep(.gacha-header .el-checkbox-group) {
    float: right;
  }

  .gacha-input {
    margin-bottom: 10px;
  }

  :deep(.el-table .el-table__header .el-table__cell) {
    background: linear-gradient(180deg, #dbe8ff 15%, rgba(243, 248, 255, 0.42));
  }

  :deep(.el-table .el-table__header .el-table__cell > .cell) {
    font-weight: 700;
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

  .gacha-analyze {
    background: url();
  }

  .gacha-analyze .echart {
    margin-bottom: 10px;
    /* border: 1px solid #999; */
    box-shadow: 10px 5px 10px #dbe8ff;
    border-radius: 5px;
    overflow: hidden;
  }

  .gacha-analyze .echart-text {
    padding-left: 60px;
    padding-top: 20px;
    padding-bottom: 20px;
    height: 100%;
    background-color: #eee;
  }

  .gacha-analyze-header h2 {
    font-size: 30px;
    background: linear-gradient(to right, pink 15%, blue);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
</style>
@/utils/http/http