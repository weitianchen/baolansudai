<template>
     <div class="main-box">
        <div class="search-box">
            <el-row :gutter="20">
                <el-col :span="6">
                    <span class='tit'>ID</span>
                    <el-input @input="changeValue" v-model="searchData.id"  type="text" placeholder="搜索支持>、<、a"></el-input>
                </el-col>
                <el-col :span="6">
                    <span class='tit'>名称</span>
                    <el-input @input="changeValue" v-model="searchData.jsxxName"  type="text" placeholder=""></el-input>
                </el-col>
                <el-col :span="6">
                    <span class='tit'>昵称</span>
                    <el-input @input="changeValue" v-model="searchData.jsxxReal"  type="text" placeholder=""></el-input>
                </el-col>
            </el-row>
        </div>
        <div class="table-box mt20">
            <el-table style="width:1500px;" border :data="list">
                <el-table-column label="ID" prop="id"></el-table-column>
                <el-table-column label="用户名" prop="jsxxName"></el-table-column>
                <el-table-column label="昵称" prop="jsxxReal"></el-table-column>
                <el-table-column label="金币" prop="gold"></el-table-column>
                <el-table-column label="权限" prop="">
                    <template slot-scope="scope">
                        <div v-html="filterPermission(scope.row.permission)"></div>
                    </template>
                </el-table-column>
                <el-table-column label="创建者" prop="">
                    <template slot-scope="scope">
                        <div v-html="filterAuditor(scope.row.createId)"></div>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="createTime"></el-table-column>
                <el-table-column label="最后登录时间" prop="loginTime"></el-table-column>
                <el-table-column label="操作" prop="" fixed="right">
                    <template slot-scope="scope">
                        <div>
                            <p><el-button size="mini" type="text" @click="addAccount(scope.row)">查看</el-button></p>
                            <p @click="deleteUser(scope.row.id)"><span><svg-icon style="color: #e6a23c" class-name="disabled" icon-class="logout"/></span></p>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page-footer">
            <div class="inline-b">
                <el-button v-if="idAdd" type="primary" @click="addAccount()">添加账号记录</el-button>
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
        <el-dialog
        width="800px"
        :title="dialogTitle" :visible.sync="dialogVisible"
        >
            <div>
                <div class="search-box" v-if="dialogVisible">
                    <el-row :gutter="20">
                        <el-col :span="10">
                            <span class='tit'>用户名</span>
                            <div class="el-input">
                                <input maxlength="11" class="initInput" :disabled="edit" @input="referName" :class="{forbid:forbid}" v-model="detailForm.jsxxName" type="text" placeholder="请输入11位数手机号码">
                            </div>
                        </el-col>
                        <el-col :span="10">
                            <span class='tit'>昵称</span>
                            <el-input v-model="detailForm.jsxxReal"  type="text" placeholder="请输入昵称"></el-input>
                        </el-col>
                        
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="20">
                            <span class='tit'>密码</span>
                            <el-input v-model="detailForm.jsxxPwd" type="text" placeholder="请输入密码"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="10">
                            <span class='tit'>角色权限</span>
                            <el-select v-model="detailForm.permission" placeholder="请选择" multiple>
                                <el-option label="订单管理" value="a"></el-option>
                                <el-option label="流量管理" value="b"></el-option>
                                <el-option label="风控管理" value="c"></el-option>
                                <el-option label="财务管理" value="d"></el-option>
                                <el-option label="账号管理" value="e"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" v-if="edit">
                        <el-col :span="10">
                            <span class='tit'>创建者ID</span>
                            <div class="inline-b" v-html="filterAuditor(detailForm.createId)"></div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" v-if="edit">
                        <el-col :span="10">
                            <span class='tit'>创建时间</span>
                            <div class="inline-b">{{detailForm.createTime}}</div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" v-if="edit">
                        <el-col :span="10">
                            <span class='tit'>最后登录时间</span>
                            <div class="inline-b">{{detailForm.loginTime}}</div>
                        </el-col>
                    </el-row>
                </div>
                <div class="text-right">
                    <el-button type="default" @click="showDialog()">取消</el-button>
                    <el-button type="primary" @click="save()">确定</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<style lang="scss" scoped>
    .main-box{
        .one-half{
            width: calc(100% - 40px - 50%);
            width: -webkit-calc(100% - 40px - 50%);
        }
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
import { getUser,delUser,putUser,postUser,isName } from '@/api/account'
import { mapGetters } from 'vuex'
import { export_json_to_excel } from '@/vendor/Export2Excel'
export default {
    data() {
        return{
            list: [],
            searchData: {
                start: 1,
                limit: 20,
                id:'',
                jsxxName: '',
                jsxxReal: ''
            },
            timer: null,
            nameTimer: null,
            pageCount: 0,
            dialogTitle: '', // 弹窗标题
            dialogVisible: false,
            edit: false,
            detailForm: {},
            loading: false,
            forbid: false,
            idAdd: false
        }
    },
    computed: {
        ...mapGetters([
            'group'
        ]),
    },
    created() {
        let self  = this
        self.getDataList()
    },
    mounted() {
        
    },
    methods: {
        // 保存用户名
        save(){
            let self = this
            if(!self.detailForm.jsxxName){
                self.$message({message: '用户名不存在，请填写用户名',type: 'warning'})
                return
            }
            if(!self.detailForm.jsxxReal){
                self.$message({message: '请填写用户昵称',type: 'warning'})
                return
            }
            if(!self.detailForm.jsxxPwd){
                self.$message({message: '请填写密码',type: 'warning'})
                return
            }
            if(self.detailForm.jsxxPwd.length <6){
                self.$message({message: '请填写不小于6位数的密码',type: 'warning'})
                return
            }
            if(self.detailForm.permission.length == 0){
                self.$message({message: '请选择用户角色权限',type: 'warning'})
                return
            }
            // 
            let tag = JSON.parse(JSON.stringify(self.detailForm))
            tag.permission = tag.permission.join(',')
            if(self.edit){
                putUser(tag).then(res => {
                    self.$message({message: '修改成功',type: 'success'})
                    self.addAccount()
                    self.getDataList()
                }).catch(err => {console.log(err)})
            }else{
                postUser(tag).then(res => {
                    self.$message({message: '新增成功',type: 'success'})
                    self.addAccount()
                    self.getDataList()
                }).catch(err => {console.log(err)})
            }
        },
        // 查询账号是否存在
        referName() {
            let self = this
            let params ={
                jsxxName: self.detailForm.jsxxName
            }
            clearTimeout(self.nameTimer)
            self.nameTimer = setTimeout(() => {
                isName(params).then(res => {
                    if(res.data.status) {
                        self.forbid = true
                        self.$message({message: '用户名已存在',type: 'warning'})
                    }else{
                        self.forbid = false
                    }  
                }).catch(err => {
                    console.log(err)
                })
            }, 500);
            
        },

        //  删除账号
        deleteUser(id) {
            let self = this
            this.$confirm('',{
            message: '确定删除该账户记录',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                let params ={
                    Id: id
                }
                delUser(params).then(res => {
                    self.$message({message: '删除成功',type: 'success'})
                    self.getDataList()
                }).catch(err => {console.log(err)})
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
            
            
            
        },
        // 添加账号记录
        addAccount(item) {
            let self= this
            self.showDialog()
            if(item) {
                self.edit = true
                self.detailForm = JSON.parse(JSON.stringify(item))
                self.dialogTitle = '编辑ID '+item.id
            } else {
                self.initForm()
                self.edit = false
                self.dialogTitle = '添加新纪录'
            }
        },
        showDialog(){
            let self = this
            self.dialogVisible = !self.dialogVisible
        },
        initForm(){
            let self = this
            self.detailForm = {
                jsxxName: '',
                jsxxReal: '',
                jsxxPwd: '',
                permission: [],
            }
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
            getUser(tag).then(res => {
                self.loading = false
                if(res.data){
                    self.list = res.data
                    let arr = res.data
                    for(let item of arr){
                        item.permission = item.permission.split(',')
                        if(item.id === item.createId) {
                            self.idAdd = true
                        }
                    }
                }
                self.pageCount = res.data.count
            }).catch(err => { console.log(err) })
        },
        // 一页多少条内容
        handleSizeChange(val) {
            let self = this
            self.searchData.limit = val
            self.getDataList()
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
        },
        filterPermission(name) {
            let txt = ''
            for(let item of name) {
                switch(item) {
                    case 'a':
                        txt += '订单管理 '
                        break
                    case 'b':
                        txt += '流量管理 '
                        break
                    case 'c':
                        txt += '风控管理 '
                        break
                    case 'd':
                        txt += '财务管理 '
                        break
                    case 'e':
                        txt += '账号管理 '
                        break
                }
            }
            return txt
        },
        //导出
        exportExcel() {
            let self = this
            const tHeader = ['ID','用户名','昵称','金币','权限','创建者','创建时间','最后登录时间']
            const filterVal = ['id','jsxxName','jsxxReal','gold','permission','createId','createTime','loginTime']
            let list = []
            let arr = JSON.parse(JSON.stringify(self.list))
            for(let item of arr) {
                item.createId = self.filterAuditor(item.createId)
            }
            list = arr
            const data = self.formatJson(filterVal,list)
            export_json_to_excel(tHeader,data,'账号记录')
            
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => { return v[j]}))
        },
        clearNoNum(obj){
            obj = obj.replace(/[^\d]/g,""); //清除"数字"以外的字符
            obj = obj.replace(/^\./g,""); //验证第一个字符是数字
            obj = obj.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
            obj = obj.replace(".","$#$").replace(/\./g,"").replace("$#$","."); ////保证.只出现一次，而不能出现两次以上
            return obj
        },
    },
    watch: {
        dialogVisible() {
            let self = this
            if(!self.dialogVisible) {
                self.edit = false 
                self.detailForm = {}
            }
        },
        'detailForm.jsxxName'(){
            let self = this
            if(self.detailForm.jsxxName){
                self.detailForm.jsxxName =  self.clearNoNum(self.detailForm.jsxxName)
            }
        }
    }
}
</script>