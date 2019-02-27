<template>
    <div class="main-box">
        <div class="search-box">
            <el-row :gutter="24">
                <el-col :span="6">
                    <span class='tit'>相关说明</span>
                    <el-input @input="changeValue" v-model="searchData.title"  type="text" placeholder=""></el-input>
                </el-col>
                <el-col :span="6">
                    <span class='tit'>重置/消费</span>
                    <el-select @change="changeValue" v-model="searchData.inout" placeholder="请选择">
                        <el-option label="消费" value="0"></el-option>
                        <el-option label="充值" value="1"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <span class='tit'>金币数</span>
                    <el-input @input="changeValue" v-model="searchData.coinNum"  type="text" placeholder=""></el-input>
                </el-col>
                <el-col :span="6">
                    <span class='tit'>类型</span>
                    <el-select @change="changeValue" v-model="searchData.relType" placeholder="请选择">
                        <el-option label="资料认证-消费" value="1"></el-option>
                        <el-option label="订单-消费" value="2"></el-option>
                        <el-option label="风控-消费" value="3"></el-option>
                        <el-option label="短信-消费" value="4"></el-option>
                        <el-option label="转账" value="5"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="24">
                    <span class='tit'>创建时间</span>
                    <el-date-picker
                    @change="changeValue"
                    type="daterange"
                    v-model="searchData.createdAt"
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
            <el-table border :data="list" style="width: 1000px;">
                <el-table-column label="ID" prop="id"></el-table-column>
                <el-table-column label="用户Id" prop="cid"></el-table-column>
                <el-table-column label="相关说明" prop="title"></el-table-column>
                <!-- <el-table-column label="相关数量" prop="ordNum" sortable></el-table-column> -->
                <el-table-column label="单价" prop="perCoin" sortable></el-table-column>
                <!-- <el-table-column label="金币数" prop="coinNum" sortable></el-table-column> -->
                <!-- <el-table-column label="类型" prop="">
                    <template slot-scope="scope">
                        <div v-html="filterType(scope.row.relType)"></div>
                    </template>
                </el-table-column> -->
                <el-table-column label="创建时间" prop="createdAt" sortable></el-table-column>
                <!-- <el-table-column label="总数" prop="count" sortable></el-table-column> -->
                <!-- <el-table-column label="操作" prop="">
                    <template slot-scope="scope">
                        <div><el-button type="text" @click="seeDetail(scope.row)">查看</el-button></div>
                    </template>
                </el-table-column> -->
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
        <el-dialog :visible.sync="dialogVisible" width="90%">
                <div slot="title" class="title">
                    <h3>编辑ID: {{goldDetail.id}}</h3>
                </div>
                <div>
                    
                </div>
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
    }
</style>
<script>
    import Cookies from "js-cookie"
    import { logCoin } from "@/api/finance"
    import { export_json_to_excel } from '@/vendor/Export2Excel'
    import { mapGetters } from 'vuex'
    export default{
        data() {
            return {
                list: [],
                searchData: {
                    start: 1,
                    limit: 20,
                    title: '',
                    inout: '',
                    relType: '',
                    createdAt: [],
                    unlimitedTime: false
                },
                timer: null,
                loading: false,
                pageCount: 0,
                goldDetail: {},
                dialogVisible: false,
            }
        },
        created() {
            let self= this
            let startMonth = '',endMonth='';
            let date = new Date();
            let yy = date.getFullYear()
            let mm = date.getMonth()+1
            let dd = date.getDate()+1
            startMonth = yy + '-' + mm + '-01'
            endMonth = yy + '-' + mm + '-' + dd
            self.searchData.createdAt.push(startMonth)
            self.searchData.createdAt.push(endMonth)
            self.getDataList()
        },
        mounted() {
            
        },
        computed: {
            ...mapGetters([
                'group'
            ]),
        },
        methods: {
            //导出
            exportExcel() {
                let self = this
                const tHeader = ['ID','用户Id','相关说明','单价','创建时间']
                const filterVal = ['id','cid','title','perCoin','createdAt']
                let list = []
                let arr = JSON.parse(JSON.stringify(self.list))
                for(let item of arr) {
                    item.relType = self.filterType(item.relType)
                }
                list = arr
                const data = self.formatJson(filterVal,list)
                export_json_to_excel(tHeader,data,'金币记录')
                
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => { return v[j]}))
            },
            // 查看详情
            seeDetail(item) {
                let self = this
                self.goldDetail = item
                self.dialogVisible = !self.dialogVisible
            },
            // 监控搜索条件
            changeValue(){
                let self = this
                clearTimeout(self.timer)
                self.timer = setTimeout(() => {
                    self.getDataList(1)
                }, 800);
            },
            //获取数据
            getDataList(page) {
                let self = this
                page ? self.searchData.start = page : ''
                let tag = JSON.parse(JSON.stringify(self.searchData))
                tag.unlimitedTime ? delete tag.createdAt : ''
                delete tag.unlimitedTime
                self.loading = true
                logCoin(tag).then(res => {
                    console.log(res)
                    self.loading = false
                    self.list = res.data.rows
                    self.pageCount = res.data.count
                }).catch(err => { console.log(err)})
            },
            // 一页多少条内容
            handleSizeChange(val) {
                let self = this
                self.searchData.limit = val
                self.getDataList()
            },
            // 过滤类型
            filterType(type) {
                console.log(type)
                let txt = ''
                switch(type) {
                    case 1:
                        txt = '资料认证-消费'
                        break
                    case 2:
                        txt = '订单-消费'
                        break
                    case 3:
                        txt = '风控消费'
                        break
                    case 4:
                        txt = '短信-消费'
                        break
                    case 5:
                        txt = '转账'
                        break
                    
                }
                return txt
            }
        }
    }
</script>