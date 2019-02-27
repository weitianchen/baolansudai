<template>
    <div class="main-box">
        <div class="search-box">
            <el-row :gutter="24">
                <el-col :span="6">
                    <span class='tit'>身份信息</span>
                    <el-input @input="changeValue" v-model="searchData.realName"  type="text" placeholder="搜索姓名"></el-input>
                </el-col>
                <el-col :span="6">
                    <span class='tit'>手机号</span>
                    <el-input @input="changeValue" v-model="searchData.phone"  type="text" placeholder="搜索0可汇总"></el-input>
                </el-col>
                <el-col :span="6">
                    <span class='tit'>身份证号</span>
                    <el-input @input="changeValue" v-model="searchData.idcard"  type="text" placeholder="搜索0可汇总"></el-input>
                </el-col>
                <el-col :span="6">
                    <span class='tit'>芝麻分</span>
                    <el-input @input="changeValue" v-model="searchData.zhimaScore"  type="text" placeholder="搜索支持>、<、a"></el-input>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="6">
                    <span class='tit'>分配员</span>
                    <el-select @change="changeValue" v-model="searchData.sendUid" placeholder="请选择">
                        <el-option v-for="item in group" :label="item.name" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <span class='tit'>审核员</span>
                    <el-select @change="changeValue" v-model="searchData.examUid" placeholder="请选择">
                        <el-option v-for="item in group" :label="item.name" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <span class='tit'>备注</span>
                    <el-input @input="changeValue" v-model="searchData.note"  type="text" placeholder=""></el-input>
                </el-col>
                <el-col :span="6" v-if="status =='ALL'">
                    <span class='tit'>状态</span>
                    <el-select @change="changeValue" v-model="searchData.state" placeholder="请选择">
                        <el-option label="未分配" value="0"></el-option>
                        <el-option label="审核中" value="3"></el-option>
                        <el-option label="已通过" value="6"></el-option>
                        <el-option label="已拒绝" value="9"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="24">
                    <span class='tit'>创建时间</span>
                    <el-date-picker
                    @change="changeValue"
                    type="daterange"
                    :disabled="searchData.unlimitedTime"
                    v-model="searchData.createTime"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                    <el-checkbox class="ml15" @change="changeValue" v-model="searchData.unlimitedTime">不限时间</el-checkbox>
                </el-col>
            </el-row>
        </div>
        <div class="table-box">
            <el-table border :data="list" @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="55"
                v-if="status =='0'">
                </el-table-column>
                <el-table-column label="ID" prop="id"></el-table-column>
                <el-table-column width='150px' label="身份信息" prop="">
                    <template slot-scope="scope">
                        <div>
                            <p>
                                {{scope.row.realName}} 
                                <svg-icon v-if="scope.row.sex == 0" style="color: #409eff" class-name="disabled" icon-class="man" />
                                <svg-icon v-else style="color: #f54545" class-name="disabled" icon-class="lady" />
                                {{(new Date().getFullYear()) - scope.row.age}}</p>
                            <p class="phone">
                                <svg-icon style="color: #409eff" class-name="disabled" icon-class="phone" />
                                {{scope.row.mobile ? scope.row.mobile.substring(0,3)+'****'+scope.row.mobile.substr(-4) : ''}}
                            </p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="年龄" prop="">
                    <template slot-scope="scope">
                        <div>
                            <p>{{scope.row.age}}</p>
                            <el-popover
                            placement="right"
                            trigger="click">
                                <div>
                                    <img width="450" :src="scope.row.idcardImg1" alt="">
                                </div>
                                <img slot="reference" width="100" :src="scope.row.idcardImg1" alt="">
                            </el-popover>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column width='100px' label="欲借(元)" prop="loanYuan" sortable></el-table-column>
                <el-table-column label="芝麻分" prop="" sortable>
                    <template slot-scope="scope">
                        <div class="fw-b">
                            {{scope.row.zhimaScore}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="ip定位" prop="ipCity">
                </el-table-column>
                <el-table-column label="来源" prop="refer">
                </el-table-column>
                <el-table-column label="分配员" prop="sendUid">
                    <template slot-scope="scope">
                        <div v-html="filterAuditor(scope.row.sendUid)"></div>
                    </template>
                </el-table-column>
                <el-table-column label="审核员" prop="examUid">
                    <template slot-scope="scope">
                        <div v-html="filterAuditor(scope.row.examUid)"></div>
                    </template>
                </el-table-column>
                <el-table-column width='150px' label="备注" prop="">
                    <template slot-scope="scope">
                        <div>
                            <el-tag
                            :key="$j"
                            v-for="(tag,$j) in scope.row.tags"
                            class="mb5"
                            size="small"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(tag,$j,scope.$index,scope.row.id)">
                            {{tag}}
                            </el-tag>
                            <el-input
                            class="input-new-tag"
                            v-if="scope.row.focus"
                            v-model="scope.row.tagsVal"
                            ref="saveTagInput"
                            @keyup.enter.native="handleInputConfirm(scope.row.tags,scope.$index,scope.row.id)"
                            @blur="handleInputConfirm(scope.row.tags,scope.$index,scope.row.id)"
                            >
                            </el-input>
                            <i class="el-icon-edit blue" @click="showInput(scope.$index,scope.row)"></i>
                            
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="状态" prop="">
                    <template slot-scope="scope">
                        <div v-html="filterState(scope.row.state)"></div>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="createdAt" sortable>
                </el-table-column>
                <el-table-column fixed="right" label="操作" prop="">
                    <template slot-scope="scope">
                        <div>
                            <p><el-button type="primary" size="small" @click="seeDetail(scope.row)">查看</el-button></p>
                            <p class="mt5"><el-button v-if="status == '6'" type="danger" size="small" @click="setCollection(scope.row.id)">催收</el-button></p>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page-footer">
            <div class="inline-b">
                <el-button v-if="status == '0'" type="primary" @click="assigningJob()">批量分配</el-button>
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
        
        <!-- 详情弹窗 -->
        <div class="uesr-detail">
            <el-dialog :visible.sync="userDialogVisible" @close="getDataList()" width="90%">
                <div slot="title" class="title">
                    <h3>{{realName}}订单详情</h3>
                </div>
                <userDialog :realDetail="realDetail"></userDialog>
            </el-dialog>
        </div>
        
        <el-dialog :visible.sync="batchProcessing" width="600px">
            <div slot="title" class="title">
                <h3>批量设置{{multipleSelection.length}}条记录</h3>
            </div>
            <div>
                <span class="mr15">审核员</span>
                <el-select placeholder="请选择" v-model="sendUid">
                    <el-option v-for="item in group" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
            </div>
            <div class="text-right">
                <el-button type="" @click="showBatchProcessing()">取消</el-button>
                <el-button type="primary" @click="saveAssigningJob()">确认</el-button>
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
        .table-box{
            .phone{
                background-color: rgba(64,158,255,.1);
                padding: 0 10px;
                height: 25px;
                line-height: 25px;
                font-size: 12px;
                color: #409eff;
                border-radius: 4px;
                box-sizing: border-box;
                border: 1px solid rgba(64,158,255,.2);
                white-space: nowrap;
                display: inline-block;
            }
        }
    }
    
</style>
<style lang="scss">
    .main-box{
        .uesr-detail{
            .el-dialog{
                border-radius: 5px;
                max-width: 1200px;
                .el-card__body{
                    padding: 10px;
                    padding-bottom: 0;
                }
            }
        }
    }
</style>
<script>
    import { loanApply,putLoanApply, getCollection, putCollection,loanApplyFp } from '@/api/order'
    import Cookies from 'js-cookie'
    import { export_json_to_excel } from '@/vendor/Export2Excel'
    import userDialog from '@/components/uesrDetailDialog'
    import { mapGetters } from 'vuex'
    export default{
        data(){
            return{
                list: [],
                searchData: {
                    start: 1,
                    limit: 20,
                    realName: '',
                    phone: '',
                    idcard: '',
                    zhimaScore: '',
                    sendUid: '',
                    examUid: '',
                    note: '',
                    state: '',
                    createTime: [],
                    unlimitedTime: false
                },
                pageCount: 0,
                loading: false,
                timer: null,
                multipleSelection: [],
                // 弹窗
                userDialogVisible: false,
                // 用户详情
                realDetail: {},
                realName: '', // 人名
                // 批量设置
                batchProcessing: false,
                sendUid: null
            }
        },
        props: {
            status: {
                type: String,
                default: ''
            },
            collection: {
                type: Boolean,
                default: false
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
            self.searchData.createTime.push(startMonth)
            self.searchData.createTime.push(endMonth)
            self.status !='ALL' ? self.searchData.state = self.status : ''
            self.getDataList()
        },
        mounted() {
        },
        methods: {
            // 催收
            setCollection(id) {
                let self = this
                self.$message({message: '接口未完善',type: 'warning'})
                let params = {
                    id: id
                }
                putCollection(params).then(res => {
                    self.$message({message:'催收成功',type:'success'})
                    self.getDataList()
                }).catch(err => { console.log(err)})
            },
            // 保存分配人员
            saveAssigningJob() {
                let self = this
                if(!self.sendUid) {
                    self.$message.error('请选择审核人员')
                    return
                }
                let ids = []
                for(let item of self.multipleSelection) {
                    ids.push(item.id)
                }
                let params = {
                   examUid: self.sendUid,
                   ids: ids 
                }
                loanApplyFp(params).then(res => {
                    self.$message({message:'分配成功',type:'success'})
                    self.showBatchProcessing()
                    self.getDataList()
                }).catch(err => {console.log(err)})
            },
            // 批量分配
            assigningJob() {
                let self = this
                if(!self.multipleSelection.length) {
                    self.$message.error('请选择分配人员')
                }else{
                    self.showBatchProcessing()
                }
                
            },
            showBatchProcessing() {
                this.batchProcessing = !this.batchProcessing
            },
            // 选择用户
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            //导出
            exportExcel() {
                let self = this
                const tHeader = ['ID','姓名','性别','年龄','手机号','年龄','照片','欲借(元)','芝麻分','ip定位','来源','分配员','审核员','备注','状态','创建时间']
                const filterVal = ['id','realName','sex','birthday','mobile','age','idcardImg','loanYuan','zhimaScore','ipCity','refer','sendUid','examUid','tags','state','createdAt']
                let list = []
                let arr = JSON.parse(JSON.stringify(self.list))
                for(let item of arr) {
                    item.birthday = (new Date().getFullYear()) - item.age
                    item.state = self.filterState(item.state)
                    item.sendUid = self.filterAuditor(item.sendUid)
                    item.examUid = self.filterAuditor(item.examUid)
                    item.sex = item.sex == 1 ? '女' : '男'
                    item.idcardImg = item.idcardImg1 + ' ' + item.idcardImg2 + ' ' + item.idcardImg3
                    let str =""
                    for(let val of item.tags) {
                        str += val+',' 
                    }
                    item.tags = str
                }
                list = arr
                const data = self.formatJson(filterVal,list)
                export_json_to_excel(tHeader,data,'订单列表')
                
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => { return v[j]}))
            },
            // 监控搜索条件
            changeValue(){
                let self = this
                clearTimeout(self.timer)
                self.timer = setTimeout(() => {
                    self.getDataList(1)
                }, 800);
            },
            // 搜索数据
            getDataList(page) {
                let self = this
                page ? self.searchData.start = page : ''
                let tag = JSON.parse(JSON.stringify(self.searchData))
                self.loading = true
                tag.unlimitedTime ? delete tag.createTime : ''
                delete tag.unlimitedTime
                
                // 是否是催收管理
                self.collection ? self.collectionData(tag) : self.orderList(tag)
            },
            // 订单管理
            orderList(params){
                let self = this
                loanApply(params).then(res => {
                    self.loading = false
                    let arr = res.data.rows
                    for(let item of arr) {
                        item.focus = false
                        item.tagsVal = '',
                        item.tags = item.tags.split(',')
                        if(item.idcard){
                            item.age = parseFloat(self.getBirthdayFromIdCard(item.idcard).split('-')[0])
                            item.sex = self.getsex(item.idcard)
                        }
                    }
                    self.list = arr
                    self.pageCount = res.data.count
                }).catch(err => { console.log(err)})
            },
            // 催收管理
            collectionData(params){
                let self = this
                getCollection(params).then(res => {
                    self.loading = false
                    self.list = []
                    let arr = res.data.rows
                    for(let item of arr) {
                        item.focus = false
                        item.tagsVal = '',
                        item.tags = item.tags.split(',')
                        if(item.idcard){
                            item.age = parseFloat(self.getBirthdayFromIdCard(item.idcard).split('-')[0])
                            item.sex = self.getsex(item.idcard)
                        }
                    }
                    self.list = arr
                    self.pageCount = res.data.count
                }).catch(err => { console.log(err)})
            },
            // 身份证信息提取生日
            getBirthdayFromIdCard(idCard) {  
                var birthday = "";  
                if(idCard != null && idCard != ""){  
                    if(idCard.length == 15){  
                        birthday = "19"+idCard.substr(6,6);  
                    } else if(idCard.length == 18){  
                        birthday = idCard.substr(6,8);  
                    }  
                
                    birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-");  
                }  
                return birthday;  
            },
            // 身份证信息提取性别
            getsex(psidno){
                var sexno,sex

                if(psidno.length==18){
                    sexno=psidno.substring(16,17)
                }else if(psidno.length==15){
                    sexno=psidno.substring(14,15)
                }else{
                    alert("错误的身份证号码，请核对！")
                    return false
                }
                var tempid=sexno%2;
                if(tempid==0){
                    sex='1'
                }else{
                    sex='0'
                }
                return sex
            },
            // 点击查看详情
            seeDetail(item) {
                let self = this
                self.userDialogVisible = true
                self.realDetail = item
                self.realName = item.realName
            },
            // 一页多少条内容
            handleSizeChange(val) {
                let self = this
                self.searchData.limit = val
                self.getDataList()
            },
            // 删除标签 标签名 标签位置，列表位置，列表id
            handleClose(tag,tagIndex,index,id) {
                let self = this
                // splice 起始下标，长度
                let sTag = JSON.parse(JSON.stringify(self.list[index].tags))
                sTag.splice(tagIndex,1)
                let str = sTag.join(',')
                let params = {
                    Id: id,
                    tags: str
                }
                putLoanApply(params).then(res =>{
                    self.$message({message:'更新成功',type:'success'})
                    self.list[index].tags.splice(tagIndex,1)
                }).catch(err => {console.log(err)})
            },
            // 显示编辑备注输入框
            showInput(index,item) {
                let self = this 
                if(self.list[index].focus) {
                    self.list[index].focus = false
                    return
                }else{
                    self.list[index].focus = true
                }
                this.$nextTick( _ => {
                    this.$refs.saveTagInput.$refs.input.focus()
                    $('.input-new-tag input').focus()
                });
            },
            // 失去焦点或回车键触发保存备注 原备注，列表位置，列表id
            handleInputConfirm(tags,index,id) {
                let self = this
                let inputValue = self.list[index].tagsVal
                if (inputValue.trim()) {
                    let sTag = JSON.parse(JSON.stringify(self.list[index].tags))
                    sTag.splice(1,0,inputValue.trim())
                    let str = sTag.join(',')
                    let params = {
                        Id: id,
                        tags: str
                    }
                    putLoanApply(params).then(res =>{
                        self.$message({message:'更新成功',type:'success'})
                        self.list[index].tags.splice(0,0,inputValue.trim())
                    }).catch(err => {console.log(err)})
                }
                self.list[index].tagsVal = ''
                self.list[index].focus = false
            },
            // 过滤状态
            filterState(state) {
                let txt = ''
                switch(state) {
                    case '0':
                        txt = '未分配'
                        break
                    case '3':
                        txt = '审核中'
                        break
                    case '6':
                        txt = '已通过'
                        break
                    case '9':
                        txt = '已拒绝'
                        break
                }
                return txt
            },
            // 过滤审核人员
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
            }
        },
        components: {
            userDialog
        }
    }
</script>