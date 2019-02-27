<template>
    <div class="main-box">
        <div class>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <h3 class="title">自动分配<i v-if="customerLoading" class="el-icon-loading"></i></h3>
                </div>
                <div class="flex">
                    <div class="switch pt10">
                        <el-switch
                        v-model="customer"
                        active-text="开启"
                        inactive-text="关闭"
                        @change="setSend">
                        </el-switch>
                    </div>
                    <div class="describe gray">
                        <p>开启自动分配后，会按照为审核人员设定的 <span class="blue">周期分配值</span>（即权重，若不分配可设为0，管理员默认为0）自动分配订单。</p>
                        <p>当所有审核员的<span class="blue">分配监控值</span>≥<span class="blue">周期分配值</span>时，称为一个周期。 </p>
                        <p><span class="blue">分配监控值</span>大于0即表示审核人员开始被自动分配，一个周期后所有<span class="blue">分配监控值</span>将归零。</p>
                        <p class="title">建议添加【审核员或全角色】子账号后，开启自动分配，除非管理员需自己审核。 </p>
                        <p>如果当天列表中所有<span class="blue">周期分配值</span>都为0，新订单将默认分配给列表中第一个审核人员。</p>
                        <p><span class="blue">总接单数</span>=自动分配数+人工分配数。 (可使用<span class="blue">标签</span>记录审核员的工作情况)</p>
                    </div>
                </div>
            </el-card>
        </div> 
        <div class="search-box mt30" style="display: none">
             <el-row :gutter="20">
                <el-col :span="6">
                    <span class='tit'>审核员ID</span>
                    <el-select @change="changeValue" v-model="searchData.uid" placeholder="请选择">
                        <el-option v-for="item in group" :label="item.name" :value="item.Id" :key="item.Id"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <span class='tit'>标签</span>
                    <el-input @input="changeValue" v-model="searchData.tags"  type="text" placeholder="请输入标签"></el-input>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="10">
                    <span class='tit'>创建时间</span>
                    <el-date-picker
                    @change="changeValue"
                    :disabled="searchData.unlimitedTime"
                    v-model="searchData.createAt"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </el-col>
                <el-col :span="2">
                    <el-checkbox @change="changeValue" v-model="searchData.unlimitedTime">不限时间</el-checkbox>
                </el-col>
            </el-row>
        </div>
        <div class="table-box mt20" style="width: 1000px;display: none">
            <el-table border :data="list">
                <el-table-column label="ID" prop="id"></el-table-column>
                <el-table-column label="审核员ID" prop="uid">
                    <template slot-scope="scope">
                        <div v-html="filterAuditor(scope.row.uid)"></div>
                    </template>
                </el-table-column>
                <el-table-column label="总接单数" prop="ordNum"></el-table-column>
                <el-table-column label="创建时间" prop="createdAt"></el-table-column>
                <el-table-column label="更新时间" prop="updatedAt"></el-table-column>
            </el-table>
        </div>
        <div class="page-footer" style="display: none">
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
    </div>
</template>
<style lang="scss" scoped>
    .title{ 
        color: #e6a23c;
    }
    .box-card{
        .switch{
            width: 150px
        }
        .describe{
            line-height: 20px;
        }
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
</style>
<script>
    import { getCustomer, setCustomer, sendInfo } from '@/api/flow'
    import Cookies from 'js-cookie'
    import { export_json_to_excel } from '@/vendor/Export2Excel'
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                searchData: {
                    start: 1,
                    limit: 20,
                    uid: '',
                    tags: '',
                    createAt: [],
                    unlimitedTime: false
                },
                customer: false,
                customerLoading: false,
                list: [],
                pageCount: 0,
                timer: null,
                loading: false,
            }
        },
        computed: {
            ...mapGetters([
                'group'
            ]),
        },
        created() {
            let self = this
            // self.getDataList()

            getCustomer({id:Cookies.get('Id')}).then(res => {
                self.customer = res.data.autoSend
            }).catch(err => { console.log(err)})
        },
        mounted() {
            
        },
        methods: {
            // 监控搜索条件
            changeValue(){
                let self = this
                clearTimeout(self.timer)
                self.timer = setTimeout(() => {
                    self.getDataList(1)
                }, 800);
            },
            // 设置自动分配
            setSend() {
                let self = this
                let params = {
                    Id: Cookies.get('Id') || '',
                    autoSend: self.customer ? 1 : 0
                }
                self.customerLoading = true
                setCustomer(params).then(res => {
                    self.customerLoading = false
                    self.$message.success('设置成功')
                }).catch(err => { console.log(err) })
                console.log(self.customer)
            },
            getDataList(page) {
                let self = this
                page ? self.searchData.start = page : ''
                let tag = JSON.parse(JSON.stringify(self.searchData))
                self.loading = true
                self.unlimitedTime ? delete tag.createAt : ''
                sendInfo(tag).then(res => {
                    self.loading = false
                    let arr = res.data.rows
                    for(let item of arr) {
                        item.focus = false
                        item.tagsVal = ''
                    }
                    self.list = arr
                    self.pageCount = res.data.count
                }).catch(err => { console.log(err) })
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
                console.log(tag)
                console.log(index)
                console.log('删除标签')
                // splice 起始下标，长度
                self.list[index].tags.splice(tagIndex,1)
                
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
                    // 保存标签
                    // self.$message.error('没有接口')
                    // splice 起始下标，长度
                    self.list[index].tags.splice(0,0,inputValue.trim())
                }
                self.list[index].tagsVal = ''
                self.list[index].focus = false
            },
            //导出
            exportExcel() {
                let self = this
                const tHeader = ['ID','审核员ID','周期分配值(权重)','分配监控值','总接单数','标签','创建时间','更新时间']
                const filterVal = ['id','uid','unitNum','useNum','ordNum','tags','createdAt','updatedAt']
                let list = JSON.parse(JSON.stringify(self.list))
                for(let item of list) {
                    item.uid = self.filterAuditor(item.uid)
                }
                const data = self.formatJson(filterVal,list)
                export_json_to_excel(tHeader,data,'全部订单列表')
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => { return v[j]}))
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
        watch: {

        }
    }
</script>