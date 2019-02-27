<template>
    <div class="main-box">
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="basic-info">
                    <h3 class="title">芝麻分</h3>
                    <p class="zima-val">637</p>
                    <h3 class="title">基础信息</h3>
                    <ul class="list-info">
                        <li><span>姓名</span>: 葛明明</li>
                        <li><span>手机号</span>: 17775518194</li>
                        <li><span>身份证号</span>: 339005198110144818</li>
                        <li><span>性别年龄</span>: 男 37岁</li>
                        <li><span>欲借金额</span>: <i style="color: #409eff">1000元</i></li>
                        <li><span>QQ、微信</span>: 765428757、无</li>
                        <li><span>ip定位</span>:  四川广元 (电信)</li>
                        <li><span>工作</span>: 有</li>
                        <li><span>提交时间</span>:11月13日 13:51</li>
                    </ul>
                    <ul class="img-list">
                        <li><img src="https://xinkouzi.oss-cn-shanghai.aliyuncs.com/e12b78b0-e707-11e8-a463-1b9c636b4e51.png?1047_539" alt=""></li>
                        <li><img src="https://xinkouzi.oss-cn-shanghai.aliyuncs.com/e12b78b0-e707-11e8-a463-1b9c636b4e51.png?1047_539" alt=""></li>
                        <li><img src="https://xinkouzi.oss-cn-shanghai.aliyuncs.com/e12b78b0-e707-11e8-a463-1b9c636b4e51.png?1047_539" alt=""></li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="17">
                <div class="other-info">
                    <div>
                        <h3 class="title">审核流程</h3>
                        <div class="flow-chart clearfix">
                            <div class="step">
                                <div class="step-head success">
                                    <div class="step-line"></div>
                                    <div class="step-icon is-text">
                                        <div class="icon-inner el-icon-check"></div>
                                    </div>
                                </div>
                                <div class="step-main">
                                    <div class="step-title success">
                                        审核分配
                                    </div>
                                    <div class="step-description success">
                                        <span>72729分配给</span>359642 (测试号)
                                    </div>
                                </div>
                            </div>
                            <div class="step">
                                <div class="step-head">
                                    <div class="step-line"></div>
                                    <div class="step-icon is-text">
                                        <div class="icon-inner">2</div>
                                    </div>
                                </div>
                                <div class="step-main">
                                    <div class="step-title process">审核中</div>
                                    <div class="step-description process">
                                        <el-button type="success">通过</el-button>
                                        <el-button type="danger">拒绝</el-button>
                                    </div>
                                    <div>
                                        <p class="mt10 mb10">备注标记：</p>
                                        <el-input style="width: 150px" type="textarea"></el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="step">
                                <div class="step-head wait">
                                    <div class="step-line"></div>
                                    <div class="step-icon is-text">
                                        <div class="icon-inner">3</div>
                                    </div>
                                </div>
                                <div class="step-main">
                                    <div class="step-title wait">审核结果</div>
                                    <div class="step-description wait"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="operator-info">
                        <h3 class="title mt20 mb20">运营商信息</h3>
                        <p class="mb20"><span class="label Mr">紧急联系人：</span> 李华 13286324127 (0个通话) 胡同 15826390217 (0个通话)</p>
                        <div>
                            <el-tabs v-model="activeName" @tab-click="handleClick">
                                <el-tab-pane label="摘要信息" name="first">
                                    <div class="summary-info">
                                        <el-row :gutter="24">
                                            <el-col :span="10">
                                                <ul>
                                                    <li><span>姓名</span>: <span>蔡明</span>  </li>
                                                    <li><span>手机号</span>: <span class="success">15500000000</span>  </li>
                                                    <li><span>身份证号</span>: <span class="success">339005198110144818</span>  </li>
                                                    <li><span>运营商类型</span>: <span>中国电信 ()</span>  </li>
                                                    <li><span>套餐类型</span>: <span>畅越冰激凌国内不限流量套餐-98元档</span>  </li>
                                                    <li><span>归属地</span>: <span>四川省 广元市</span>  </li>
                                                    <li><span>上月账单</span>: <span>79.2元</span>  </li>
                                                    <li><span>账户余额</span>: <span>19.2元</span>  </li>
                                                    <li><span>入网时间</span>: <span>2015-12-09</span> <span class="success">35个月</span> </li>
                                                    <li><span>查询时间</span>: <span>11月13日 13:51</span>  </li>
                                                </ul>
                                            </el-col>
                                            <el-col :span="14">
                                                <el-table size="mini" border :data="summaryList">
                                                    <el-table-column label="项目" prop=""></el-table-column>
                                                    <el-table-column width="100px" label="近6个月" prop=""></el-table-column>
                                                    <el-table-column label="近1月多(上月1号-查询时间)" prop=""></el-table-column>
                                                </el-table>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="账单及充值记录" name="second">
                                    <div class="bill-recharge">
                                        <el-row :gutter="24">
                                            <el-col :span="14">
                                                <el-table size="mini" border :data="bill">
                                                    <el-table-column label="账单月份" prop=""></el-table-column>
                                                    <el-table-column label="月基本费" prop=""></el-table-column>
                                                    <el-table-column label="语音费" prop=""></el-table-column>
                                                    <el-table-column label="消费合计" prop=""></el-table-column>
                                                    <el-table-column label="实际缴费" prop=""></el-table-column>
                                                </el-table>
                                            </el-col>
                                            <el-col :span="10">
                                                <el-table size="mini" border :data="recharge">
                                                    <el-table-column label="充值时间" prop=""></el-table-column>
                                                    <el-table-column label="充值金额" prop=""></el-table-column>
                                                    <el-table-column label="充值类型" prop=""></el-table-column>
                                                </el-table>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="通话记录详情" name="third">
                                    <div class="call-log">
                                        <div class="flex mt15 mb15">
                                            <div class="mr20">
                                                <span>电话号码</span>
                                                <el-input style="width: 150px" type="number" placeholder="请输入手机号码"></el-input>
                                            </div>
                                            <div>
                                                <span>归属地</span>
                                                <el-input style="width: 150px" type="number" placeholder="请输入归属地"></el-input>
                                            </div>
                                        </div>
                                        <div>
                                            <el-table border size="mini" :data="callLog">
                                                <el-table-column label="电话号码" prop=""></el-table-column>
                                                <el-table-column label="归属地" prop=""></el-table-column>
                                                <el-table-column label="类型" prop=""></el-table-column>
                                                <el-table-column label="通话时间" prop=""></el-table-column>
                                                <el-table-column label="通话时长(s)" prop=""></el-table-column>
                                            </el-table>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="通话号码统计" name="fourth">
                                    <div class="service-meter">
                                        <div class="flex mt15 mb15">
                                            <div class="mr20">
                                                <span>电话号码</span>
                                                <el-input style="width: 150px" type="number" placeholder="请输入手机号码"></el-input>
                                            </div>
                                            <div>
                                                <span>归属地</span>
                                                <el-input style="width: 150px" type="number" placeholder="请输入归属地"></el-input>
                                            </div>
                                        </div>
                                        <div>
                                            <el-table border size="mini" :data="serviceMeter">
                                                <el-table-column label="电话号码" prop=""></el-table-column>
                                                <el-table-column label="归属地" prop=""></el-table-column>
                                                <el-table-column label="近3月联系次数" prop=""></el-table-column>
                                                <el-table-column label="近3月通话分钟" prop=""></el-table-column>
                                                <el-table-column label="近6月通话次数" prop=""></el-table-column>
                                                <el-table-column label="近6月通话分钟" prop=""></el-table-column>
                                                <el-table-column label="近6月主叫次数" prop=""></el-table-column>
                                                <el-table-column label="近6月被叫次数" prop=""></el-table-column>
                                            </el-table>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="通话归属地统计" name="five">
                                    <div class="affiliation-count">
                                        <div class="flex mt15 mb15">
                                            <div class="mr20">
                                                <div>
                                                    <span>归属地</span>
                                                    <el-input style="width: 150px" type="number" placeholder="请输入归属地"></el-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <el-table border size="mini" :data="affiliationCount">
                                               <el-table-column label="归属地" prop=""></el-table-column> 
                                               <el-table-column label="通话次数" prop=""></el-table-column> 
                                               <el-table-column label="通话时长" prop=""></el-table-column> 
                                               <el-table-column label="通话号码数" prop=""></el-table-column> 
                                               <el-table-column label="被叫次数" prop=""></el-table-column> 
                                               <el-table-column label="被叫通话时长" prop=""></el-table-column> 
                                               <el-table-column label="主叫次数" prop=""></el-table-column> 
                                               <el-table-column label="主叫通话时长" prop=""></el-table-column> 
                                            </el-table>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="短信号码统计" name="six">
                                    <div class="note-count">
                                        <div class="flex mt15 mb15">
                                            <div class="mr20">
                                                <span>电话号码</span>
                                                <el-input style="width: 150px" type="number" placeholder="请输入手机号码"></el-input>
                                            </div>
                                            <div>
                                                <span>归属地</span>
                                                <el-input style="width: 150px" type="number" placeholder="请输入归属地"></el-input>
                                            </div>
                                        </div>
                                        <div>
                                            <el-table border size="mini" :data="noteCount">
                                                <el-table-column label="号码" prop=""></el-table-column>
                                                <el-table-column label="归属地" prop=""></el-table-column>
                                                <el-table-column label="短信次数" prop=""></el-table-column>
                                            </el-table>
                                        </div>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </div>
                    <div class="investment-info">
                        <h3 class="title mt20 mb20">风控信息</h3>
                        <div class="mt20">
                            <el-radio v-model="radio" label="1">反欺诈</el-radio>
                            <el-radio v-model="radio" label="2">借条综合</el-radio>
                            <el-radio v-model="radio" label="3">同D</el-radio>
                            <el-radio v-model="radio" label="4">有凭*</el-radio>
                        </div>
                        <el-button style="display: block;width: 100px;margin: 20px auto;" type="primary">立即查询</el-button>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<style lang="scss" scoped>
    .basic-info{
        border-right: 2px solid #ededed;
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
    .title{ 
        color: #e6a23c;
    }
    .other-info{
        .flow-chart{
            .step{
                width: 33%;
                position: relative;
                float: left;
                &:last-of-type{
                    .step-line{
                        display: none;
                    }
                }
                .step-head{
                    width: 100%;
                    position: relative;
                    text-align: center;
                    &.success{
                        color: #67c23a;
                        border-color: #67c23a;
                    }
                    &.wait{
                        color: #c0c4cc;
                        border-color: #c0c4cc;
                    }
                    .step-line{
                        height: 2px;
                        top: 11px;
                        left: 50%;
                        right: -50%;
                        position: absolute;
                        border-color: inherit;
                        background-color: #c0c4cc;
                        text-align: center;
                        white-space: nowrap;
                    }
                    .step-icon{
                        position: relative;
                        z-index: 1;
                        display: -ms-inline-flexbox;
                        display: inline-flex;
                        -ms-flex-pack: center;
                        justify-content: center;
                        -ms-flex-align: center;
                        align-items: center;
                        width: 24px;
                        height: 24px;
                        font-size: 14px;
                        box-sizing: border-box;
                        background: #fff;
                        transition: .15s ease-out; 
                        border-radius: 50%;
                        border: 2px solid;
                        border-color: inherit;
                        background-color: #fff;
                        &.is-text{
                            border-radius: 50%;
                            border: 2px solid;
                            border-color: inherit;
                        }
                        .icon-inner{
                            display: inline-block;
                            -webkit-user-select: none;
                            user-select: none;
                            text-align: center;
                            font-weight: 700;
                            line-height: 1;
                            color: inherit;
                        }
                    }
                }
                .step-main{
                    white-space: normal;
                    text-align: center;
                    .success{
                        color: #67c23a;
                    }
                    .step-title{
                        font-size: 16px;
                        line-height: 38px;
                        &.process{
                            font-weight: 700;
                            color: #303133;
                        }
                        &.wait{
                            color: #c0c4cc;
                        }
                    }
                    .step-description{
                        padding: 0 10px;
                        margin-top: -5px;
                        font-size: 12px;
                        line-height: 20px;
                        font-weight: 400;
                    }
                }
            }
        }
        .operator-info{
            margin-top: 30px;
            padding-bottom: 30px;
            border-top: 2px solid #ededed;
            border-bottom: 2px solid #ededed;
        }
    }
    .label{
        color: #909bab;
    }
    .success{
        color: #67c23a;
    }
    .summary-info{
        ul{
            li{
                line-height: 30px;
                span:first-child{
                    display: inline-block;
                    width: 80px;
                }
            }
        }
    }
</style>
<script>
    export default{
        data() {
            return {
                activeName: 'first',
                summaryList: [], // 摘要信息
                bill: [], //账单及充值记录
                recharge: [],
                callLog: [], //通话记录详情
                serviceMeter: [], // 通话号码统计
                affiliationCount: [], //归属地统计
                noteCount: [], // 短信统计
            }
        },
        created() {
            
        },
        mounted() {
            
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>