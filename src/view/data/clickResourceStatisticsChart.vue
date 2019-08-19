<style rel="stylesheet/less" lang="less">
.el-form-item__label{
	font-size: 16px;
	color: #000;
}
	@import "../../styles/common.less";
</style>
<template>
	<div>
		<Card>
			<p slot="title">
				<Icon type="help-buoy"></Icon>
				点击来源统计图
			</p>
			 <Row>
        <div class="demo-input-suffix">
				<el-button type="primary" size="small" style="margin-left: 20px; float: right">查询</el-button>
          <span class="el-form-item__label">创建时间:</span>
          <el-date-picker
            v-model="createTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </div>
				<el-form ref="form" :model="form" >
					<el-form-item label="产品类别">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="年满18周岁" name="type"></el-checkbox>
              <el-checkbox label="手机本人实名6个月以上" name="type"></el-checkbox>
              <el-checkbox label="芝麻分580" name="type"></el-checkbox>
              <el-checkbox label="18-40周岁" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
				</el-form>
      </Row>
			<div id="clickChart" style="margin-top: 50px;width:100%;height:300px;"></div>
		</Card>
	</div>
	<!-- <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>卡片名称</span>
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
</el-card> -->
</template>
<script>
import echarts from 'echarts'
export default {
	name: "clickResourceChart",
	data(){
		return {
			createTime: '',
			form: {
        type: [],
      },
		}
	},
	mounted () {
		const options = {
			title: {
				text: '近7小时点击来源统计'
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			toolbox: {
				feature: {
					saveAsImage: {}
				}
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: ['周一','周二','周三','周四','周五','周六','周日']
			},
			yAxis: {
				type: 'value'
			},
			series: [
				{
			  	name:'邮件营销',
					type:'line',
					stack: '总量',
					data:[120, 132, 101, 134, 90, 230, 210]
				},
				{
					name:'联盟广告',
					type:'line',
					stack: '总量',
					data:[220, 182, 191, 234, 290, 330, 310]
				},
				{
					name:'视频广告',
					type:'line',
					stack: '总量',
					data:[150, 232, 201, 154, 190, 330, 410]
				},
				{
					name:'直接访问',
					type:'line',
					stack: '总量',
					data:[320, 332, 301, 334, 390, 330, 320]
				},
				{
					name:'搜索引擎',
					type:'line',
					stack: '总量',
					data:[820, 932, 901, 934, 1290, 1330, 1320]
				}
			]
		};
		const clickChart = echarts.init(document.getElementById('clickChart'));
		clickChart.setOption(options);
		window.addEventListener('resize', function () {
     	clickChart.resize();
    });
	}
}
</script>