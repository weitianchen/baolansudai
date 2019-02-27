<template>
    <div class="main-box">
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <h3 class="title">流量配置</h3>
                    </div>
                    <div class="content">
                        <p class="gray mb15">
                            <i class="el-icon-info"></i>流量来源为系统渠道员为商家推送的客户，不包含商家自主推广流量。
                        </p>
                        <el-form ref="form" :model="allocation" label-width="100px">
                            <el-form-item label="流量开关">
                                <el-switch v-model="allocation.state"></el-switch>
                            </el-form-item>
                            <el-form-item label="芝麻分要求">
                                <el-select  v-model="allocation.zmfStart">
                                    <el-option label="580分以上" value="580"></el-option>
                                    <el-option label="600分以上" value="600"></el-option>
                                    <el-option label="630分以上" value="630"></el-option>
                                </el-select>
                                <div style="color: red;line-height: 20px;">{{goldSum}}金币/单</div>
                            </el-form-item>
                            <el-form-item label="每日流量范围">
                                <el-select v-model="allocation.dayNum">
                                    <el-option label="0-100" value="0-100"></el-option>
                                    <el-option label="100-200" value="100-200"></el-option>
                                    <el-option label="200-300" value="200-300"></el-option>
                                    <el-option label="300-500" value="300-500"></el-option>
                                    <el-option label="500-1000" value="500-1000"></el-option>
                                    <el-option label="1000-2000" value="1000-2000"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">保存</el-button>
                            </el-form-item>
                        </el-form>
                        <div>
                            <el-button v-if="!isState" type="danger" plain>导流未开启</el-button>
                            <el-button type="danger" plain v-if="goldSum > gold">金币不足,请及时充值</el-button>
                        </div>
                        <div class="gray mt30" style="line-height: 20px;">
                            导流操作说明：
                            1、选择每日导流区间——流量开关开启——点击保存之后，导流功能便开启了。
                            2、导流期间（导流未完成期间），不得修改导流设置，如有特殊情况可联系商务终止流量投放，重新选择。
                            3、导流完成后，可以重新设置导流范围。
                            4、如果今日流量没有完成，需要更改明日流量需求，可以联系商务及时更改。
                            5、为了确保每日流量稳定，请保持导流状态持续开通中。
                        </div>
                    </div>
                </el-card>
            </el-col>
            <!-- <el-col :span="14" style="display: none;">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="流量详情" name="first">
                        <div class="search-box">
                            <el-row :gutter="20">
                                <el-col :span="15">
                                    <span class='tit'>流量开关</span>
                                    <el-select style="width: 150px;" size="small" placeholder="请选择">
                                        <el-option label="已结算" value=""></el-option>
                                        <el-option label="暂停" value=""></el-option>
                                        <el-option label="开启" value=""></el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="17">
                                    <span class='tit'>创建时间</span>
                                    <el-date-picker
                                    type="daterange"
                                    size="small"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                    </el-date-picker>
                                </el-col>
                                <el-col :span="2">
                                    <el-checkbox>不限时间</el-checkbox>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="mt20 table-box">
                            <el-table border :data="list">
                                <el-table-column label="ID" prop=""></el-table-column>
                                <el-table-column label="导流说明" prop=""></el-table-column>
                                <el-table-column label="订单上限" prop=""></el-table-column>
                                <el-table-column label="订单量" prop=""></el-table-column>
                                <el-table-column label="消费金币" prop=""></el-table-column>
                                <el-table-column label="流量开关" prop=""></el-table-column>
                                <el-table-column label="创建时间" prop=""></el-table-column>
                                <el-table-column label="更新时间" prop=""></el-table-column>
                            </el-table>
                            <el-pagination :total="pageCount" @current-change="getDataList" :current-page.sync="searchData.page" :page-size="20" layout="prev, pager, next">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="流量配置" name="second">
                        <div class="search-box">
                            <el-row :gutter="20">
                                <el-col :span="15">
                                    <span class='tit'>状态</span>
                                    <el-select style="width: 150px;" size="small" placeholder="请选择">
                                        <el-option label="关闭" value=""></el-option>
                                        <el-option label="开启" value=""></el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="mt20 table-box">
                            <el-table border :data="list">
                                <el-table-column label="ID" prop=""></el-table-column>
                                <el-table-column label="日流量下线" prop=""></el-table-column>
                                <el-table-column label="日流量上限" prop=""></el-table-column>
                                <el-table-column label="状态" prop=""></el-table-column>
                                <el-table-column label="更新时间" prop=""></el-table-column>
                            </el-table>
                            <el-pagination :total="pageCount" @current-change="getDataList" :current-page.sync="searchData.page" :page-size="20" layout="prev, pager, next">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-col> -->
        </el-row>
    </div>
</template>
<style lang="scss" scoped>
    .main-box{
        .title{ 
            color: #e6a23c;
        }
        .search-box{
            .el-row{
                margin-bottom: 15px;
                line-height: 32px;
                .tit{
                    display: inline-block;
                    width: 85px;
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
    import { getFlowInfo, setFlowInfo,  } from "@/api/flow"
    import { mapGetters } from 'vuex'
    import Cookies from 'js-cookie'
    export default{
        data() {
            return {
                form:{
                    flow: false
                },
                allocation: {
                    dayNumMax: null,
                    dayNumMin: null,
                    perCoin: null,
                    state: null,
                    zmfStart: null,
                    dayNum: '',
                },
                isState: false,
                originalData: {}, // 保存原始值，保存失败时还原数据
                activeName: 'first',
                list: [],
            }
        },
        created() {
            let self = this
            self.getFlowSywtem()
   
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
            // 提交流量配置
            onSubmit() {
                let self = this
                if(self.goldSum > self.gold){
                    self.$message({message:'金币不足，请及时充值',type: 'warning'})
                    return
                }
                let tag = JSON.parse(JSON.stringify(self.allocation))
                tag.dayNumMin = tag.dayNum.split('-')[0]
                tag.dayNumMax = tag.dayNum.split('-')[0]
                tag.state === false ? tag.state = 0 : tag.state = 1
                setFlowInfo(tag).then(res => {
                    if(res) {
                        self.originalData = tag
                        self.$message.success('保存成功')
                    }else {
                        self.setData(self.originalData)
                        self.$message.error('保存失败')
                    }
                }).catch(err => { console.log(err)})
            },
            // 切换tab
            handleClick(event,tabs) {

            },
            getFlowSywtem() {
                let self = this
                let param ={
                    Id: self.allocation.id
                }
                getFlowInfo(param).then(res => {

                    let data = res.data
                    if(data){
                        self.setData(data)
                    }
                }).catch(err => {console.log(err)})
            },
            setData(val) {
                let self = this
                let data = JSON.parse(JSON.stringify(val))
                data.dayNum = data.dayNumMin + '-' +data.dayNumMax
                if(data.state == 0){
                    data.state = false
                    self.isState = false
                }else{
                    data.state = true
                    self.isState = true
                } 
                data.zmfStart = parseInt(data.zmfStart)
                self.allocation = data
                self.originalData = data
            }
        }
    }
</script>