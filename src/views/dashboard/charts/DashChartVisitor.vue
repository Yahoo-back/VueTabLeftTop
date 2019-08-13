<template>
  <div class="echarts" style="width:100%;height:100%;" id="dash-chart-visitor"></div>
</template>

<style scoped>
  .echarts {
    border-radius: 4px;
    height: 250px;
    width: 100%;

  }
</style>
<script>
  import echarts from 'echarts';

  var data = [{
    value: 3661,
    name: '<10w'
  }, {
    value: 5713,
    name: '10w-50w'
  }, {
    value: 9938,
    name: '50w-100w'
  }, {
    value: 17623,
    name: '100w-500w'
  }, {
    value: 3299,
    name: '>500w'
  }];
  export default {
    name: "DashChartVisitor",
    mounted() {
      this.$nextTick(() => {
        let visiteVolume = echarts.init(document.getElementById('dash-chart-visitor'));
        const option = {
          backgroundColor: '#49586e',
          title: {
            text: '注册资金',
            x: '20%',
            y: 'center',
            textStyle: {
              fontWeight: 'normal',
              fontSize: 20,
              color: '#fff',
            }
          },
          tooltip: {
            show: true,
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            right: '5%',
            top: '25%',
            textStyle: {
              fontWeight: 'normal',
              fontSize: 16,
              color: '#fff',
            },
            data: ['<10w', '10w-50w', '50w-100w', '100w-500w', '>500w']
          },
          series: [{
            type: 'pie',
            selectedMode: 'single',
            center: ['30%', '50%'],
            radius: ['50%', '80%'],
            // color: ['#86D560', '#AF89D6', '#59ADF3', '#FF999A', '#FFCC67'],
            color: ['#AF89D6', '#5ab6df', '#6a8bc0', '#4acacb', '#fe8676'],

            label: {
              normal: {
                position: 'inner',
                formatter: '{d}%',

                textStyle: {
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 12
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: data
          }]
        };
        visiteVolume.setOption(option);
        window.addEventListener('resize', function () {
          visiteVolume.resize();
        });
      });
    },
  }
</script>
