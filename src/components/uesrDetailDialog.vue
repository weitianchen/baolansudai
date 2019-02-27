<template>
    <div class="user-detail">
        <div class="user-info flew">
            <img src="../assets/images/default_avatar.png" alt="">
            <h3 class="name inline-b">{{realDetail.realName}}</h3>
            <div class="inline-b">
                <el-select :disabled="!flowJurisdiction" @change="allocation()" v-model="realDetail.sendUid" placeholder="请选择" size="mini" style="width: 100px;">
                    <el-option v-for="item in group" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
            </div>
            <div class="inline-b">
                <el-select @change="adjustTheState()" v-model="realDetail.state" size="mini" style="width: 100px;">
                    <el-option label="未分配" value="0"></el-option>
                    <el-option label="审核中" value="3"></el-option>
                    <el-option label="已通过" value="6"></el-option>
                    <el-option label="已拒绝" value="9"></el-option>
                </el-select>
            </div>
        </div>
        <div class="mt20">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="申请单详情" name="tab0">
                    <div class="order-detail">
                        <el-row :gutter="24">
                            <el-col :span="6">
                                <div class="basic-info">
                                    <h3 class="title">芝麻分</h3>
                                    <p class="zima-val">{{realDetail.zhimaScore}}</p>
                                    <h3 class="title">基础信息</h3>
                                    <ul class="list-info">
                                        <li><span>姓名</span>: {{realDetail.realName}}</li>
                                        <li><span>手机号</span>: {{realDetail.mobile}}</li>
                                        <li><span>身份证号</span>: {{realDetail.idcard}}</li>
                                        <li><span>性别年龄</span>: {{realDetail.sex == 0 ? '男' : '女'}} {{(new Date().getFullYear()) - realDetail.age}}岁</li>
                                        <li><span>欲借金额</span>: <b style="color: #409eff">{{realDetail.loanYuan}}元</b></li>
                                        <li><span>QQ、微信</span>: {{realDetail.qq}}、无</li>
                                        <li><span>ip定位</span>:  {{realDetail.ipCity}}</li>
                                        <li><span>提交时间</span>: {{realDetail.createdAt}}</li>
                                    </ul>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="basic-info">
                                    <h3 class="title">公司信息</h3>
                                    <ul class="list-info">
                                        <li><span>工作</span>: {{realDetail.companyJob}}</li>
                                        <li><span>公司名称</span>: {{realDetail.companyName}}</li>
                                        <li><span>公司地址</span>: {{realDetail.companyAddress}}</li>
                                        <li><span>联系电话</span>: {{realDetail.companyPhone}}</li>
                                    </ul>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="basic-info">
                                    <h3 class="title">紧急联系人</h3>
                                    <ul class="list-info">
                                        <li v-for="(item,$j) in realDetail.contact" :key="$j">
                                            <p><span>联系人{{$j+1}}</span>: {{item.contactName}}</p>
                                            <p><span>联系电话</span>: {{item.contactPhone}}</p>
                                        </li>
                                    </ul>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="basic-info">
                                    <h3 class="title">身份证信息</h3>
                                    <div>
                                        <div class="mt15">
                                            <el-popover
                                            placement="left-end"
                                            trigger="click">
                                                <div>
                                                    <img width="700" :src="realDetail.idcardImg1" alt="">
                                                </div>
                                                <img slot="reference" width="100%" :src="realDetail.idcardImg1" alt="">
                                            </el-popover>
                                        </div>
                                        <div class="mt15">
                                            <el-popover
                                            placement="left-end"
                                            trigger="click">
                                                <div>
                                                    <img width="700" :src="realDetail.idcardImg2" alt="">
                                                </div>
                                                <img slot="reference" width="100%" :src="realDetail.idcardImg2" alt="">
                                            </el-popover>
                                        </div>
                                        <div class="mt15">
                                            <el-popover
                                            placement="left-end"
                                            trigger="click">
                                                <div>
                                                    <img width="700" :src="realDetail.idcardImg3" alt="">
                                                </div>
                                                <img slot="reference" width="100%" :src="realDetail.idcardImg3" alt="">
                                            </el-popover>
                                        </div>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-tab-pane>
                <el-tab-pane v-for="(item,$j) in realDetail.vtags" :key="$j" :label="item.vtagName" :name="'tab'+ ($j+1)">
                    <iframe style="width: 100%;height: 450px;" :src="item.vtagUrl" frameborder="0"></iframe>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .user-detail{
        height: 560px;
        .title{ 
            color: #e6a23c;
        }
        .basic-info{
            // border-right: 2px solid #ededed;
            padding-right: 20px;
            .zima-val{
                font-size: 35px;
                font-weight: 600;
                text-align: center;
                padding: 10px 0;
            }
            .list-info{
                margin-top: 20px;
                li{
                    line-height: 30px;
                    span{
                        display: inline-block;
                        width: 80px;
                        color: #909bab;
                    }
                }
            }
            .img-list{
                width: 100%;
                li{
                    margin-bottom: 10px;
                }
            }
        }
    }
    .user-info{
        img{
            width: 50px;
            margin-right: 15px;
            vertical-align: middle;
        }
        .name{
            font-size: 18px;
            margin-right: 15px;
        }
        span{
            padding: 3px 10px;
            color: #fff;
            border-radius: 3px;
            margin-right: 15px;
            background-color: #f19f00;
            cursor: pointer;
        }
        .order-status{
            background-color: #409eff;
            padding: 2px 5px;
            font-size: 12px;
        }
        .first{
            background-color: #5cb85c;
            padding: 2px 5px;
            font-size: 12px;
        }
    }
    
</style>
<script>
import { mapGetters } from 'vuex'
 import { putLoanApply } from '@/api/order'
export default {
    data() {
        return {
            activeName: 'tab0',
            formLabelWidth: '150px',
            defauleValue: true,
            flowJurisdiction: false
        }
    },
    props: {
        realDetail: {
            type: Object,
            default: function () {
                return {}
            }
        },
    },
    computed: {
        ...mapGetters([
            'group',
            'roles'
        ]),
    },
    created() {
        let self = this
        self.roles.indexOf('b') > 0 ? self.flowJurisdiction = true : self.flowJurisdiction = false
        
    },
    mounted() {
        
    },
    watch: {

    },
    methods: {
        
        // 分配按钮
        allocation() {
            let self = this
            let params = {
                Id: self.realDetail.id,
                sendUid: self.realDetail.sendUid
            }
            putLoanApply(params).then(res => {
                self.$message({message:'分配成功',type:'success'})
            }).catch(err =>{console.log(err)})
        },
        // 调整状态
        adjustTheState() {
            let self = this
            let params = {
                Id: self.realDetail.id,
                state: self.realDetail.state
            }
            putLoanApply(params).then(res => {
                self.$message({message:'分配成功',type:'success'})
            }).catch(err =>{console.log(err)})
        },
        // 切换
        handleClick(tab, event) {
            console.log(tab, event);
        },
        // 过滤状态
        filterState(state) {
            let txt = ''
            switch(state) {
                case 0 :
                    txt = '未分配'
                    break
                case 3 :
                    txt = '审核中'
                    break
                case 6 :
                    txt = '已通过'
                    break
                case 9 :
                    txt = '已拒绝'
                    break
            }
            return txt
        }
    },
}
</script>
