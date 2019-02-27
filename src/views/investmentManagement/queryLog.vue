<template>
    <div class="main-box">
        <div class="search-box">
            <el-row :gutter="24">
                <el-col :span="6">
                    <span class='tit'>姓名</span>
                    <el-input @input="changeValue" v-model="searchData.name" type="text" placeholder="搜索姓名"></el-input>
                </el-col>
                <el-col :span="6">
                    <span class='tit'>手机号</span>
                    <el-input @input="changeValue" v-model="searchData.phone" type="text" placeholder="请输入手机号"></el-input>
                </el-col>
                <el-col :span="6">
                    <span class='tit'>身份证</span>
                    <el-input @input="changeValue" v-model="searchData.idcard" type="text" placeholder="请输入身份证号"></el-input>
                </el-col>
                <el-col :span="6">
                    <span class='tit'>查询类型</span>
                    <el-input @input="changeValue" v-model="searchData.radar" type="text" placeholder="请输入查询类型"></el-input>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="6">
                    <span class='tit'>查询者</span>
                    <el-select @change="changeValue" v-model="searchData.uid" placeholder="请选择">
                        <el-option v-for="item in group" :label="item.name" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="18">
                    <span class='tit'>创建时间</span>
                    <el-date-picker
                    @change="changeValue"
                    type="daterange"
                    v-model="searchData.createAt"
                    :disabled="searchData.unlimitedTime"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                    <el-checkbox class="ml15" @change="changeValue" v-model="searchData.unlimitedTime">不限时间</el-checkbox>
                </el-col>
            </el-row>
        </div>
        <div class="table-box">
            <el-table style="width:1500px" border :data="list">
                <el-table-column width="80px" label="ID" prop="id"></el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="手机号" prop="phone"></el-table-column>
                <el-table-column label="身份证" prop="idcard"></el-table-column>
                <el-table-column label="查询者" prop="attachUid">
                    <template slot-scope="scope">
                        <div v-html="filterAuditor(scope.row.attachUid)"></div>
                    </template>
                </el-table-column>
                <el-table-column label="查询类型" prop="radar"></el-table-column>
                <el-table-column label="创建时间" prop="createAt" sortable></el-table-column>
                <el-table-column width="80px"  label="操作" prop="">
                    <template slot-scope="scope">
                        <div>
                            <el-button type="text" @click="showDialog(scope.row.uthJson,scope.row)">查看</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page-footer">
            <div class="inline-b">
                <el-button :loading="loading" type="primary" plain @click="getDataList()">刷新</el-button>
                <el-button v-if="list.length" plain @click="exportExcel()">导出本页{{searchData.limit > list.length ? list.length : searchData.limit}}条记录</el-button>
            </div>
            <el-pagination
            class="rt"
            @size-change="handleSizeChange"
            @current-change="getDataList"
            :current-page="searchData.start"
            :page-sizes="[20, 100, 200, 300, 400]"
            :page-size="searchData.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageCount">
            </el-pagination>
        </div>

        <el-dialog class='search-result'  width="80%" :title="dialogTitle" :visible.sync="dialogFormVisible">
            <div v-if="dialogFormVisible" class="info-header clearfix">
                <p>{{dialogData.name}} / {{dialogData.phone}} / {{dialogData.idcard}}</p>
                <p>订单编号：{{dialogData.flowNo}}</p>
                <p>风险结果： <span :class="[{blue:dialogData.finalDecision == 'Accept'},{red:dialogData.finalDecision == 'Reject'}]" v-html="finalDecision(dialogData.finalDecision)"></span></p>
                <p>风险系数： <span>{{dialogData.finalScore}}</span></p>
                
                <p>请求结果： <span v-html="resultCode(dialogData.resultCode)"></span></p>
            </div>
            <el-card v-if="dialogFormVisible && dialogData.strategySet&& dialogData.strategySet.length" class="box-card mt20">
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
                                            <strong>统计结果集匹配</strong>{{val.detail.value}}
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
    .main-box{
        .search-box{
            .el-row{
                margin-bottom: 15px;
                line-height: 32px;
                .tit{
                    display: inline-block;
                    width: 75px;
                }
            }
            .el-input,.el-select{
                width: calc(100% - 80px);
                width: -webkit-calc(100% - 80px);
                input{
                    width: 100%;
                }
            }
            .el-select{
                .el-input{
                    width: 100%;
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
    }
</style>

<style lang="scss">
    .search-result{
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
    import { getCredit } from '@/api/riskManagement'
    import { export_json_to_excel } from '@/vendor/Export2Excel'
    import { mapGetters } from 'vuex'
    export default{
        data() {
            return {
                list: [],
                searchData: {
                    start: 1,
                    limit: 20,
                    name: '',
                    phone: '',
                    uid: null,
                    idcard: '',
                    createAt:[],
                    radar:'',
                    unlimitedTime: false
                },
                timer: null,
                pageCount: 0,
                loading: false,
                dialogFormVisible: false,
                dialogTitle: '风控信息详情',
                dialogData: {},
                dialogHeight: document.body.clientHeight * 0.8  - 150 + 'px'
            }
        },
        computed: {
            ...mapGetters([
                'group'
            ]),
        },
        created() {
            let self = this
            let startMonth = '',endMonth='';
            let date = new Date();
            let yy = date.getFullYear()
            let mm = date.getMonth()+1
            let dd = date.getDate()+1
            startMonth = yy + '-' + mm + '-01'
            endMonth = yy + '-' + mm + '-' + dd
            self.searchData.createAt.push(startMonth)
            self.searchData.createAt.push(endMonth)
            self.getDataList()
        },
        mounted() {

        },
        methods: {
            filterAuditor(num) {
                let self = this
                let str = ''
                for(let item of self.group){
                    if(num == item.id) {
                        str = item.id +' ' + item.name
                    }
                }
                if(str) {
                    return str
                }else{
                    return num
                }
            },
            // 查看详情
            showDialog(item,row){
                let self = this
                if(item){
                    self.dialogData = JSON.parse(item)
                    self.dialogData.name = row.name
                    self.dialogData.phone = row.phone
                    self.dialogData.idcard = row.idcard

                }else{
                    self.dialogData = {}
                }
                self.dialogFormVisible = !self.dialogFormVisible
                
            },
            // 监控搜索条件
            changeValue(){
                let self = this
                clearTimeout(self.timer)
                self.timer = setTimeout(() => {
                    self.getDataList(1)
                }, 800);
            },
            getDataList(page) {
                let self = this
                page ? self.searchData.start = page : ''
                let tag = JSON.parse(JSON.stringify(self.searchData))
                tag.unlimitedTime ? delete tag.createAt : ''
                delete tag.unlimitedTime
                self.loading = true
                getCredit(tag).then(res => {
                    self.loading = false
                    if(res.data && res.data.rows){
                        self.list = res.data.rows
                    }
                    self.pageCount = res.data.count
                }).catch(err => { console.log(err)})
            },
            // 一页多少条内容
            handleSizeChange(val) {
                let self = this
                self.searchData.limit = val
                self.getDataList()
            },
            //导出
            exportExcel() {
                let self = this
                const tHeader = ['ID','姓名','手机号','身份证','查询者','查询类型','创建时间',]
                const filterVal = ['id','name','phone','idcard','attachUid','radar','createAt']
                
                let list = []
                let arr = JSON.parse(JSON.stringify(self.list))
                for(let item of arr) {
                    item.attachUid = self.filterAuditor(item.attachUid)
                }
                list = arr
                
                const data = self.formatJson(filterVal,list)
                export_json_to_excel(tHeader,data,'查询记录')
                
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => { return v[j]}))
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
        }
    }
</script>