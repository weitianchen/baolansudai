<template>
    <div class="main-box autonomously">
        <div class="search-box">
            <el-row :gutter="24">
                <el-col :span="6">
                    <span class='tit'>ID</span>
                    <el-input @input="changeValue" v-model="searchData.Id"  type="text" placeholder="搜索支持>、<、a"></el-input>
                </el-col>
                <el-col :span="6">
                    <span class='tit'>渠道名称</span>
                    <el-input @input="changeValue" v-model="searchData.title"  type="text" placeholder=""></el-input>
                </el-col>
                <el-col :span="6">
                    <span class='tit'>渠道号</span>
                    <el-input @input="changeValue" v-model="searchData.channel"  type="text" placeholder="限字母、数字、下划线"></el-input>
                </el-col>
                <el-col :span="6">
                    <span class='tit'>状态</span>
                    <el-select v-model="searchData.state">
                        <el-option label="全部" :value="defaultValue"></el-option>
                        <el-option label="休息" value="0"></el-option>
                        <el-option label="在线" value="1"></el-option>
                    </el-select>
                </el-col>
            </el-row>
        </div>
        <div class="table-box mt20">
            <el-table border :data="list">
                <el-table-column label="ID" prop="id"></el-table-column>
                <el-table-column label="创建人ID" prop="cid"></el-table-column>
                <el-table-column label="渠道名称" prop="title"></el-table-column>
                <el-table-column label="渠道号" prop="channel"></el-table-column>
                <el-table-column label="统计链接" prop="admUrl">
                    <template slot-scope="scope">
                        <div class="showHove" style="position: relative;">
                            <div class="copy-box">
                                <p>
                                    <input style="border: none;display: inline-block;" type="text" readonly :id="'clip_num'+scope.row.id" :value="scope.row.admUrl">
                                </p>
                                <a :href="scope.row.admUrl" targer="_blank">
                                    <el-button size="small" type="text">打开</el-button>
                                </a>
                                <el-button size="small" type="text" @click="onCopy" :data-clipboard-text="scope.row.admUrl" class="copybtn">复制链接</el-button>
                                <div :id="'qrc'+scope.row.id"></div>
                                <el-button size="small" type="text" @click="createQrc('qrc'+scope.row.id,scope.row.admUrl,$event)">生成二维码</el-button>
                            </div>
                            <el-button v-if="scope.row.admUrl" slot="reference" type="primary" plain size="mini">链接</el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="推广链接" prop="goUrl">
                    <template slot-scope="scope">
                        <div class="showHove" style="position: relative;">
                            <div class="copy-box">
                                <p>
                                    <input style="border: none;display: inline-block;" type="text" readonly :id="'clip_num'+scope.row.id" :value="scope.row.goUrl">
                                </p>
                                <a :href="scope.row.goUrl" target="_blank">
                                    <el-button size="small" type="text">打开</el-button>
                                </a>
                                <el-button size="small" type="text" @click="onCopy" :data-clipboard-text="scope.row.goUrl" class="copybtn">复制链接</el-button>
                                <div :id="'qrcgo'+scope.row.id"></div>
                                <el-button size="small" type="text" @click="createQrc('qrcgo'+scope.row.id,scope.row.goUrl,$event)">生成二维码</el-button>
                            </div>
                            <el-button v-if="scope.row.goUrl" slot="reference" type="primary" plain size="mini">链接</el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="注册量" prop="regNum"></el-table-column>
                <el-table-column label="状态" prop="">
                    <template slot-scope="scope">
                        <div>
                            <div>
                                <el-switch
                                @change="editState(scope.$index)"
                                v-model="scope.row.state"
                                on-value="1"
                                off-value="2"
                                active-color="#13ce66"
                                inactive-color="#bfbfbf">
                                </el-switch>
                            </div>
                            <!-- 1在线 2休息 -->
                            {{scope.row.state == false ? '休息' : '在线'}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="createdAt"></el-table-column>
                <el-table-column label="更新时间" prop="updatedAt"></el-table-column>
                <el-table-column fixed="right" label="操作" prop="">
                    <template slot-scope="scope">
                        <div>
                            <p>
                                <el-button type="text" @click="showDetail(scope.row)">查看</el-button>
                            </p>
                            <p @click="deleteAuto(scope.row.id)"><span><svg-icon style="color: #e6a23c" class-name="disabled" icon-class="logout"/></span></p>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page-footer">
            <div class="inline-b">
                <el-button type="primary" @click="showDetail()">添加推广设置</el-button>
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
        <el-dialog  width="800px" :title="dialogTitle" :visible.sync="dialogFormVisible">
            <el-form :model="detailForm">
                <el-form-item>
                    <el-form-item class="inline-b one-half" label-width="100px" label="渠道名称" >
                        <el-input v-model="detailForm.title"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item class="inline-b one-half" label-width="100px" label="渠道号">
                        <el-input v-model="detailForm.channel" placeholder="限字母、数字、下划线，2-20"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item class="inline-b" label-width="100px" width="100%" label="logoUrl">
                    <el-upload
                    class="upload-demo"
                    :action="flieUrl"
                    list-type="picture-card"
                    :file-list="fileList"
                    :multiple='defaultFalse'
                    :limit='limitNum'
                    :on-exceed="exceedFile"
                    :on-remove="removeFile"
                    ref="upload" 
                    name="file"
                    :on-success="fileSuccess"
                    :headers="fileHeader"
                    :before-upload="beforeFile"
                    >
                    <i class="el-icon-plus"></i>
                    <div slot="tip" v-if="!fileData.raw" class="el-upload__tip">只能上传jpg/png文件</div>
                    </el-upload>
                </el-form-item>
                <el-form-item  width="100%" v-if="edit">
                    <el-form-item class="inline-b" label-width="100px" label="统计链接">
                        <div>{{detailForm.admUrl}}</div>
                    </el-form-item>
                </el-form-item>
                <el-form-item v-if="edit" label="推广链接" label-width="100px">
                    <div>{{detailForm.goUrl}}</div>
                </el-form-item>
                <el-form-item v-if="edit">
                    <el-form-item class="inline-b one-half" label-width="100px" label="注册量">
                        <div>{{detailForm.regNum}}</div>
                    </el-form-item>
                </el-form-item>
                <el-form-item v-if="edit">
                    <el-form-item class="inline-b" style="" label-width="100px" label="状态" >
                        {{detailForm.state ? '在线' : '休息'}}
                        <!-- <el-select v-model="detailForm.state" placeholder="请选择">
                            <el-option label="休息" :value="defaultFalse"></el-option>
                            <el-option label="在线" :value="defaultTrue"></el-option>
                        </el-select> -->
                    </el-form-item>
                </el-form-item>
                <el-form-item v-if="edit" label="创建时间" label-width="100px">
                    <div>{{detailForm.createdAt}}</div>
                </el-form-item>
                <el-form-item v-if="edit" label="更新时间" label-width="100px">
                    <div>{{detailForm.updatedAt}}</div>
                </el-form-item>
                <el-form-item>
                    <div class="text-center">
                        <el-button @click="cancel()">取消</el-button>
                        <el-button type="primary" @click="onSubmit">确定</el-button>
                    </div>
                </el-form-item>
            </el-form>
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
        .showHove{
            &:hover{
              .copy-box{
                  display: block;
              }  
            }
        }
        .copy-box{
            background: #fff;
            width: 200px;
            position: absolute;
            bottom: 28px;
            left: 50%;
            margin-left: -100px;
            transform-origin: center top 0px;
            border-radius: 4px;
            border: 1px solid #ebeef5;
            padding: 12px;
            z-index: 2000;
            color: #606266;
            line-height: 1.4;
            text-align: justify;
            font-size: 14px;
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            display: none;
        }
    }
</style>
<style lang="scss">
    .autonomously{
        .cell,.el-table__body-wrapper,.el-table{
            overflow:initial;
        }
    }
    .upload-demo{
        .el-upload--picture-card,.el-upload-list__item.is-ready{
            width: 80px;
            line-height: 90px;
            height: 80px;
        }
    }
</style>

<script>
    import Cookies from 'js-cookie'
    import { getLoanMarke, putLoanMarke,postLoanMarke,delLoanMarke } from '@/api/flow'
    import Clipboard from 'clipboard';
    import QRCode from 'qrcode2' 
    import { export_json_to_excel } from '@/vendor/Export2Excel'
    import { mapGetters } from 'vuex'
    export default{
        data() {
            return {
                list: [],
                searchData: {
                    start: 1,
                    limit: 20,
                    Id: '',
                    title: '',
                    channel: '',
                    state: null
                },
                defaultValue: null,
                timer: null,
                detailForm: {},
                edit: false,
                pageCount: 0,
                dialogFormVisible: false,
                loading: false,
                dialogTitle: '',
                formInline: true,
                defaultTrue: true,
                defaultFalse: false,
                fileList:[],
                fileData: {},
                limitNum: 1,

                flieUrl: process.env.BASE_API + '/api/loanMarke/file',
                fileHeader:{
                    "Authorization": Cookies.get('X_Auth_Token') || ''
                },
            }
        },
        computed: {
            ...mapGetters([
                'group'
            ]),
        },
        created() {
            let self = this
            self.getDataList()
        },
        mounted() {
            
        },
        methods: {
            // 删除
            deleteAuto(id){
                let self = this
                this.$confirm('',{
                message: '确定删除该记录?',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    let params ={
                        Id: id
                    }
                    delLoanMarke(params).then(res => {
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
            // 修改状态
            editState(index) {
                let self = this
                let params = {
                    Id:  self.list[index].id,
                    state: self.list[index].state == true ? 1 : 2
                }
                putLoanMarke(params).then(res => {
                    self.$message({message: '更新成功',type: 'success'})
                    self.getDataList()
                }).catch(err => {
                    console.log(err)
                    self.getDataList()
                })
            },
            // 生成二维码
            createQrc(id,txt,e){
                let qrcode = new QRCode(id, {  
                    width: 100,  
                    height: 100, // 高度  
                    text: txt // 二维码内容  
                    // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
                    // background: '#f0f'  
                    // foreground: '#ff0'  
                })  
                if(qrcode){
                    e.target.style.display = 'none'
                }
                console.log(qrcode)  
                
            },
            // 复制链接
            onCopy() {
                let self = this
                
                let clipboard = new Clipboard('.copybtn')
                clipboard.on('success', e => {
                    self.$message({message: '已复制链接 '+e.text,type: 'success'})
                    clipboard.destroy()
                })
                clipboard.on('error', e => {
                    self.$message({message: '复制失败',type: 'warning'})
                    clipboard.destroy()
                })
            },
            // 修改或编辑
            showDetail(item) {
                let self = this
                self.showDialog()
                if(item) {
                    self.edit = true
                    self.detailForm = item
                    self.dialogTitle = '编辑 ID' + item.id
                    if(item.logoURL) {
                        let obj = {}
                        obj.name = 'logoURL'
                        obj.url = process.env.BASE_IMG + item.logoURL
                        self.fileList.push(obj)
                    }
                } else {
                    self.initForm()
                    self.edit = false
                    self.dialogTitle = '添加新纪录'
                    self.fileList = []
                }
            },
            initForm() {
                let obj = {
                    restMoney: "",
                    goUrl: "",
                    admUrl: "",
                    id: '',
                    cid: '',
                    title: '',
                    channel: '',
                    note: null,
                    byUid: '',
                    logo: null,
                    bannerUrl: '',
                    appTpl: 0,
                    feeType: '',
                    price: '',
                    regNum: '',
                    ordNumNum: '',
                    totalPaid: null,
                    totalPrice: '',
                    state: '',
                    createdAt: '',
                    updatedAt: '',
                }
                this.detailForm = obj
            },
            showDialog(){
                this.dialogFormVisible = !this.dialogFormVisible
                !self.dialogFormVisible ? self.edit = false : ''
            },
            //导出
            exportExcel() {
                let self = this
                const tHeader = ['ID','创建人ID','渠道名称','渠道号','推广链接','数据连接','注册量','状态','创建时间','更新时间']
                const filterVal = ['id','cid','title','channel','admUrl','goUrl','regNum','state','createdAt','updatedAt']
                let list = []
                let arr = JSON.parse(JSON.stringify(self.list))
                for(let item of arr) {
                    item.state = item.state == 0 ? '休息' : '在线'
                }
                list = arr
                const data = self.formatJson(filterVal,list)
                export_json_to_excel(tHeader,data,'自主推广列表')
                
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => { return v[j]}))
            },
            changeValue(){
                let self = this
                clearTimeout(self.timer)
                self.timer = setTimeout(() => {
                    self.getDataList(1)
                }, 800);
            },
            // 获取列表数据
            getDataList(page) {
                let self = this
                page ? self.searchData.start = page : ''
                let tag = JSON.parse(JSON.stringify(self.searchData))
                self.loading = true
                getLoanMarke(tag).then(res => {
                    self.loading = false
                    if(res.data.rows){
                        let arr = res.data.rows
                        for(let item of arr){
                            item.state == 1 ? item.state = true : item.state = false 
                        }
                        self.list = arr
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
            // 提交表单
            onSubmit() {
                let self = this
                let tag = self.detailForm
                if(!tag.title){
                    self.$message({message:'请输入渠道名称',type:'warning'})
                    return
                }
                if(!tag.channel){
                    self.$message({message:'请输入渠道名称',type:'warning'})
                    return
                }
                let params
                if(tag.id){
                    params = {
                        title: tag.title,
                        channel: tag.channel,
                        id: tag.id,
                        logoURL: tag.logoURL
                    }
                    putLoanMarke(params).then(res => {
                        self.$message({message:'更新成功',type:'success'})
                        self.initForm()
                        self.showDialog()
                        self.getDataList()
                    }).catch(err =>{console.log(err)})
                }else{
                    params = {
                        title: tag.title,
                        channel: tag.channel,
                        logoURL:tag.logoURL
                    }
                    postLoanMarke(params).then(res => {
                        self.$message({message:'新增成功',type:'success'})
                        self.initForm()
                        self.showDialog()
                        self.getDataList()
                    }).catch(err =>{console.log(err)})
                }
            },
            // 文件上传
            submitUpload() {
                this.$refs.upload.submit();
            },
            handlePreview(file) {
                console.log(file);
            },
            fileChange(file) {
                
            },
            beforeFile(file) {
                let self = this
                if(file.name && file.name.length > 28) {
                    self.$message({
                        message: '文件名过长，请缩短文件名',
                        type: 'warning'
                    });
                    return
                }

            },
            fileSuccess(res, file, fileList){
                let self = this
                console.log(res)
                if(res.code == 200) {
                    self.$message({
                        message: '上传成功',
                        type: 'success'
                    });

                    let obj = {}
                    obj.file_name = 'logoURL'
                    obj.url = process.env.BASE_IMG + res.data.logoUrl
                    self.fileList.push(obj)
                    self.detailForm.logoURL = res.data.logoUrl
                }
            },
            fileErr(err, file, fileList) {
                let self = this
                self.$message({
                    message: '上传失败，请重试',
                    type: 'success'
                });
                self.closeFile()
            },
            closeFile(){
                this.$refs.upload.clearFiles()
            },
            // 取消提交
            cancel() {
                let self = this
                self.detailForm = {}
                self.showDialog()
            },
            removeFile(file,fileList){
                let self = this
                self.fileList = fileList
                self.fileData = file
                self.detailForm.logoURL = ''
            },
            exceedFile(files, fileList) {
                let self = this 
                self.$message({message: '只能上传一张图片',type:'warning'})
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
        }
    }
</script>