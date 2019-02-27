<template>
    <div class="main-box">
        <div class="clearfix">
            <div class="search-condition">
                <div class="item">
                    <p>姓名</p>
                    <el-input v-model="searchData.name" type="text" placeholder="查询对象姓名"></el-input>
                </div>
                <div class="item">
                    <p>手机号</p>
                    <el-input v-model="searchData.phone" maxlength="11" type="tel" placeholder="查询对象手机号"></el-input>
                </div>
                <div class="item">
                    <p>身份证号</p>
                    <el-input v-model="searchData.idcard" type="text" placeholder="查询对象身份证号"></el-input>
                </div>
                <!-- <div class="item">
                    <p>查询内容</p>
                    <div>
                        <el-radio v-model="radio" label="1">反欺诈</el-radio>
                        <el-radio v-model="radio" label="2">借条综合</el-radio>
                        <el-radio v-model="radio" label="3">同D</el-radio>
                        <el-radio v-model="radio" label="4">有凭*</el-radio>
                    </div>
                </div> -->
                <div class="item"> 
                    <el-button type="primary" @click="getDate()">提交查询</el-button>
                    <span class="ml5">查询消耗{{goldSum}}金币/次</span>
                </div>
            </div>
        </div>
        <el-dialog class='search-result'  width="80%" :title="dialogTitle" :visible.sync="dialogFormVisible">
            <div class="info-header clearfix">
                <p>{{searchData.name}} / {{searchData.phone}} / {{searchData.authItem}}</p>
                <p>订单编号：{{dialogData.flowNo}}</p>
                <p>风险结果： <span :class="[{blue:dialogData.finalDecision == 'Accept'},{red:dialogData.finalDecision == 'Reject'}]" v-html="finalDecision(dialogData.finalDecision)"></span></p>
                <p>风险系数： <span>{{dialogData.finalScore}}</span></p>
                
                <p>请求结果： <span v-html="resultCode(dialogData.resultCode)"></span></p>
            </div>
            <el-card v-if="dialogData.strategySet && dialogData.strategySet.length" class="box-card mt20">
                <div :style="{height:dialogHeight}">
                    <div class="info-body mt15">
                        <div class="item mb20" v-for="(item,$j) in dialogData.strategySet" :key="$j">
                            <h2 class="mb15">{{item.strategyName}}</h2>
                            <div class="">
                                <p>策略流水号：{{item.strategyId}}</p>
                                <p>风险系数：{{item.strategyScore}}</p>
                                <p>风险结果：
                                    <span :class="[{blue:dialogData.finalDecision == 'Accept'},{red:dialogData.finalDecision == 'Reject'}]" v-html="finalDecision(dialogData.finalDecision)"></span>
                                </p>
                                <p>策略模式：<span v-html="strategyMode(item.strategyMode)"></span></p>
                                <p>风险类型：<span v-html="riskType(item.riskType)"></span></p>
                                <p>提示：{{item.tips}}</p>
                            </div>
                            <div class="mt15" v-for="(val,$k) in item.hitRules" :key="$k">
                                <!-- <h3 class="mb15" v-html="template(val.template)"></h3> -->
                                <h3 class="mb15">{{val.ruleName}}</h3>
                                <el-row :gutter="24">
                                    <el-col :span="12">
                                        <div>规则ID：{{val.ruleId}}</div>
                                        <div>规则风险系数：{{val.score}}</div>
                                        <div>规则结果： <span v-html="finalDecision(val.decision)"></span></div>
                                        <div>规则信息：{{val.memo}}</div>
                                    </el-col>
                                    <!-- <el-col :span="12"><div>规则名称：</div></el-col> -->
                                    <!-- <el-col :span="12"></el-col> -->
                                    <el-col :span="12">
                                        <!-- 页面模板 -->
                                        <!-- 失信风险模板 -->
                                        <div v-if="val.template =='compare'">
                                            <strong>失信风险：</strong>
                                            <ul v-for="(type,$i) in val.detail" :key="$i">
                                                <li>失信名单第一级分类：{{type.firstType}}</li>
                                                <li>失信名单等级类别：{{type.grade}}</li>
                                                <li>失信名单二级分类：{{type.secondType}}</li>
                                            </ul>
                                        </div>
                                        <!-- 多头模板 -->
                                        <div v-if="val.template =='multiLoan'">
                                            <strong>多头：</strong>
                                            <ul v-for="(type,$i) in val.detail" :key="$i">
                                                <li>多头统计类型：{{type.type == 'all' ? '全部' : type.type == 'single' ? '单独' : ''}}</li>
                                                <li>多头统计行业：{{type.name}}</li>
                                                <li>多头统计数字：{{type.value}}</li>
                                            </ul>
                                        </div>
                                        <!-- 频次统计模板 -->
                                        <div v-if="val.template =='frequency'">
                                            <strong>频次统计：</strong>{{val.detail.value}}
                                        </div>
                                        <!-- 求平均值计算 -->
                                        <div v-if="val.template =='average'">
                                            <strong>平均值</strong>{{val.detail.value}}
                                        </div>
                                        <!-- 跨事件字段相同次数统计 -->
                                        <div v-if="val.template =='ceFieldCompare'">
                                            <strong>搜索字段相同次数</strong>{{val.detail.value}}
                                        </div>
                                        <!-- 字段交叉统计 -->
                                        <div v-if="val.template =='crossStat'">
                                            <strong>字段交叉统计</strong>{{val.detail.value}}
                                        </div>
                                        <!-- 统计结果集匹配 -->
                                        <div v-if="val.template =='resultSetMatch'">
                                            <strong>统计结果集匹配 </strong>{{val.detail.value}}
                                        </div>
                                        <!-- 时间段次数统计 -->
                                        <div v-if="val.template =='tcount'">
                                            <strong>时间段次数统计</strong>{{val.detail.value}}
                                        </div>
                                        <!-- 求和计算 -->
                                        <div v-if="val.template =='sum'">
                                            <strong>求和计算</strong>{{val.detail.value}}
                                        </div>
                                        <!-- 移动距离 -->
                                        <div v-if="val.template =='moveDistance'">
                                            <strong>移动距离</strong>{{val.detail.value}}
                                        </div>
                                    </el-col>
                                    <!-- <el-col :span="12">
                                        
                                    </el-col>
                                    <el-col :span="12"></el-col> -->
                                </el-row>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </el-card>
        </el-dialog>
    </div>
</template>
<style lang="scss" scoped>
    .search-condition{
        width: 355px;
        .item{
            margin-bottom: 30px;
            p{
                margin-bottom: 5px;
            }
        }
    }
    .info-header{
        p{
            line-height: 25px;
            font-size: 15px;
            float: left;
            margin-right: 40px;
        }
    }
</style>
<style lang="scss">
    .search-result{
        .el-dialog{
            min-height: 300px;
        }
        .el-dialog__body{
            
            overflow: auto;
            padding: 0 20px 20px 20px;
            .el-col-12{ width:50%}
        } 
        .item p{ display: inline-block; margin-right:40px;}
        .info-body h3.mb15{
            font-size: 14px;
            color: #409eff;
            font-weight: normal;
        }
        .el-dialog__body .el-row{
            padding: 0 2px;
            font-size: 13px;
            color: #909bab;
        }
        .el-card__body{
            overflow: auto;
        }
    }
</style>

<script>
    import { blackList } from "@/api/riskManagement"
    import { mapGetters } from 'vuex'
    export default{
        data() {
            return {
                radio: '1',
                searchData: {
                    name: '',
                    phone: '',
                    idcard: '',
                    // authItem: ''
                },

                dialogFormVisible: false,
                dialogTitle: '风控信息详情',
                dialogData: {},
                dialogHeight: document.body.clientHeight * 0.8  - 150 + 'px'
            }
        },
        created() {
        },
        computed: {
            ...mapGetters([
                'group',
                'roles',
                'goldSum',
                'gold'
            ]),
        },
        mounted() {
            
        },
        methods: {
            showDialog(){
                this.dialogFormVisible = !this.dialogFormVisible
            },
            // 模板标题
            template(name) {
                let txt = ''
                switch(name){
                    case 'compare':
                        txt = '失信风险模板'
                        break
                    case 'multiLoan':
                        txt = '多头模板'
                        break
                    case 'frequency':
                        txt = '频次统计模板'
                        break
                    case 'average':
                        txt = '求平均值计算模板'
                        break
                    case 'ceFieldCompare':
                        txt = '跨事件字段相同次数统计模板'
                        break
                    case 'crossStat':
                        txt = '字段交叉统计模板'
                        break
                    case 'resultSetMatch':
                        txt = '统计结果集匹配模板'
                        break
                    case 'tcount':
                        txt = '时间段次数统计模板'
                        break
                    case 'sum':
                        txt = '求和计算模板'
                        break
                    case 'moveDistance':
                        txt = '移动距离模板'
                        break
                }
                return txt
            },
            // 风险类型
            riskType(type) {
                let txt = ''
                switch(type){
                    case 'botAction':
                        txt = '机器行为'
                        break
                    case 'fakeRegister':
                        txt = '伪冒申请'
                        break
                    case 'dynamicCode':
                        txt = '动码攻击'
                        break
                    case 'suspiciousAction':
                        txt = '异常行为'
                        break
                    case 'bruteForce':
                        txt = '暴力破解'
                        break
                    case 'userFraud':
                        txt = '本人欺诈'
                        break
                    case 'accountTakeover':
                        txt = '账户盗用'
                        break
                    case 'garbageRegister':
                        txt = '垃圾注册'
                        break
                    case 'creditRisk':
                        txt = '失信风险'
                        break
                    case 'agencyCash':
                        txt = '中介套现'
                        break
                    case 'multipleLoan':
                        txt = '多头风险'
                        break
                }
                return txt
            },
            // 策略模式
            strategyMode(mode) {
                let txt = ''
                switch(mode){
                    case 'FirstMode':
                        txt = '首次匹配'
                        break
                    case 'WorstMode':
                        txt = '最坏匹配'
                        break
                    case 'WeightMode':
                        txt = '权重匹配'
                        break
                }
                return txt
            },
            // 请求结果
            resultCode(type) {
                let txt = ''
                switch(type){
                    case 'BQS000':
                        txt = '成功'
                        break
                    case 'BQS101':
                        txt = '认证失败'
                        break
                    case 'BQS102':
                        txt = '参数不合法'
                        break
                    case 'BQS103':
                        txt = '授权过期'
                        break
                    case 'BQS104':
                        txt = '没有对应的策略，即 partnerId 不存在'
                        break
                    case 'BQS500':
                        txt = '系统内部异常'
                        break
                }
                return txt
            },
            // 风险结果
            finalDecision(name) {
                let txt = ''
                switch(name){
                    case 'Accept':
                        txt = '通过，无风险'
                        break
                    case 'Reject':
                        txt = '拒绝，风险评估决策为高风险建议拒绝'
                        break
                    case 'Review':
                        txt = '审核，风险评估决策为低风险建议人工审核'
                        break
                }
                return txt
            },
            //查询
            getDate() {
                let self = this
                if(self.goldSum > self.gold){
                    self.$message({message:'金币不足，请及时充值',type: 'warning'})
                    return
                }
                let tag = self.searchData
                if(!tag.name.trim()){
                    self.$message({message:'请输入正确的姓名',type: 'error'})
                    return
                }
                if(!tag.phone.trim() || tag.phone.length !=11){
                    self.$message({message:'请输入正确手机号',type: 'warning'})
                    return
                }
                if(!tag.idcard.trim()) {
                    self.$message({message:'请输入正确的身份证号',type: 'warning'})
                    return
                }
                blackList(tag).then(res => {
                    if(res.data){
                        self.dialogData = res.data
                        self.showDialog()
                    }else{
                        self.$message({message:'暂无数据',type:'warning'})
                    }
                    
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        watch: {
        }
    }
</script>