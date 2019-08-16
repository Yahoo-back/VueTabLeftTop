<template>
  <div class="dashboard-container">
    <Row :gutter="10" class="margin-top-10">
      <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
        <Card>
          <p slot="title" class="card-title">
            <Icon type="ios-shuffle-strong"></Icon>
            服务器访问来源
          </p>
          <div style="height: 300px;">
            <custo-mized></custo-mized>
          </div>
        </Card>
      </Col>
      <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
        <Card>
          <p slot="title" class="card-title">
            <Icon type="ios-pulse-strong"></Icon>
            数据来源统计
          </p>
          <div style="height: 300px;">
            <doughnut-chart></doughnut-chart>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
  import custoMized from './components/custoMized.vue';
  import doughnutChart from './components/doughnutChart.vue';

  export default {
    name: 'index',
    components: {
      custoMized,
      doughnutChart
    },

    data() {
      return {}
    },
    computed: {},
    methods: {},
    mounted() {
    }
  }
</script>

