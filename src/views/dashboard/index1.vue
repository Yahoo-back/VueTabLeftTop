<template>
  <div class="dashboard-container">
    <!--一-->
    <Row :gutter="16" style="margin-top:20px">
      <Col :xs="24" :sm="12" :md="12" :lg="12">
        <div class="state-overview">
          <Col span="12">
            <div class="panel purple">
              <div class="symbol">
                <Icon type="clipboard" size="50" color="white"></Icon>
              </div>
              <div class="state-value">
                <div class="value">
                  230
                </div>
                <div class="title">
                  New Order
                </div>
              </div>
            </div>
          </Col>
          <Col span="12">
            <div class="panel red">
              <div class="symbol">
                <Icon type="pricetags" size="50" color="white"></Icon>
              </div>
              <div class="state-value">
                <div class="value">
                  3490
                </div>
                <div class="title">
                  Copy Sold
                </div>
              </div>
            </div>
          </Col>
        </div>
        <div class="state-overview" style="margin-top: 40px;">
          <Col span="12">
            <div class="panel blue">
              <div class="symbol">
                <Icon type="cash" size="40" color="white"></Icon>
              </div>
              <div class="state-value">
                <div class="value">
                  22014
                </div>
                <div class="title">
                  Total Revenue
                </div>
              </div>
            </div>
          </Col>
          <Col span="12">
            <div class="panel green">
              <div class="symbol">
                <Icon type="eye" size="50" color="white"></Icon>

              </div>
              <div class="state-value">
                <div class="value">
                  390
                </div>
                <div class="title">
                  Unique Visitors
                </div>
              </div>
            </div>
          </Col>
        </div>
      </Col>
      <Col :xs="24" :sm="12" :md="12" :lg="12">
        <div class="" style="height: 270px;">
          <dash-chart-visitor></dash-chart-visitor>
        </div>
      </Col>
    </Row>

  </div>
</template>

<script>
  import DashChartVisitor from './charts/DashChartVisitor';

  export default {
    name: 'dashboard1',
    components: {DashChartVisitor},
    data() {
      return {}
    },
    computed: {
      name() {
        return this.$route.path
      }
    },
    methods: {}
  }

</script>

<style type="text/css" scoped>
  .state-overview {
    color: #fff
  }

  .state-overview .ivu-col {
    margin-bottom: 20px
  }

  .state-overview .state-value .value {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 5px
  }

  .state-overview .state-value .title {
    font-size: 14px
  }

  .state-value {
    width: 60%;
    display: inline-block
  }

  .symbol {
    width: 35%;
    display: inline-block
  }

  .state-overview .panel {
    border-radius: 4px;
    padding: 25px 20px
  }

  .panel.purple {
    background: #6a8abe;
    box-shadow: 0 5px 0 #5f7cab
  }

  .panel.red {
    background-color: #fc8675;
    box-shadow: 0 5px 0 #e27869
  }

  .panel.blue {
    background: #5ab6df;
    box-shadow: 0 5px 0 #51a3c8
  }

  .panel.green {
    background: #4acacb;
    box-shadow: 0 5px 0 #42b5b6
  }


  .staff_progress p {
    margin: 0
  }

  li {
    margin-bottom: 11px;
    margin-left: 10px;
    margin-right: 10px
  }


  .demo-carousel img {
    height: 100%;
    width: 100%
  }

  h3, h4, h5 {
    margin: 12px
  }

  h3 {
    margin-bottom: 20px
  }

  p {
    margin: 12px
  }

  .state-info .panel {
    margin-bottom: 20px;
    float: right;
    margin-left: 15px
  }

  .panel {
    background-color: #fff;
    border: 1px solid transparent;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
    box-shadow: 0 1px 1px rgba(0, 0, 0, .05)
  }

  .page-heading h3 {
    color: #49586e;
    font-size: 25px;
    font-size: 11%;
    font-weight: 400;
    margin: 10px 0
  }

  .chart-bar img {
    display: inline-block;
    width: 68px;
    height: 45px;
    vertical-align: top
  }

  @media screen and (max-width: 767px) {
    .state-info .panel {
      width: 100%
    }
  }

  .panel.blue-box {
    background: none repeat scroll 0 0 #5ab5de;
    box-shadow: 0 5px 0 #51a3c7;
    color: #fff
  }

  .twt-info h3 {
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    font-weight: 900;
    margin: 10px 0 30px 0;
    text-align: center
  }

  .twt-info p {
    font-size: 18px;
    line-height: 25px;
    font-style: italic;
    margin: 0 0 20px 0;
    text-align: center
  }

  .twt-info p a {
    color: #98fdf4
  }

  .media:first-child {
    margin-top: 0
  }

  .media.usr-info > .pull-left {
    margin-right: 20px;
    margin-top: 10px
  }

  .media > .pull-left {
    margin-right: 10px
  }
  .usr-info .thumb {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    -webkit-border-radius: 50%
  }

  .usr-info img {
    vertical-align: middle
  }

  .usr-info h4 {
    color: #658585;
    margin-bottom: 0
  }

  .usr-info .media-body span {
    color: #ea755c;
    font-size: 12px;
    margin-bottom: 20px;
    display: inline-block
  }

  .usr-info .media-body p {
    color: #b6bcbc
  }
</style>
