<template>
  <div style="width:100%;height:100%;" id="visite_volume_con"></div>
</template>

<script>
  import echarts from 'echarts';

  export default {
    name: 'visiteVolume',
    data() {
      return {
        //
      };
    },
    mounted() {
      this.$nextTick(() => {
        let visiteVolume = echarts.init(document.getElementById('visite_volume_con'));
        let xAxisData = [];
        let data1 = [];
        let data2 = [];
        for (let i = 0; i < 20; i++) {
          xAxisData.push('类目' + i);
          data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
          data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
        }

        const option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            top: 0,
            left: '2%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
            nameTextStyle: {
              color: '#c3c3c3'
            }
          },
          series: [
            {
              name: '访问量',
              type: 'bar',
              data: [
                {value: 453682, name: '星期一', itemStyle: {normal: {color: '#2d8cf0'}}},
                {value: 879545, name: '星期二', itemStyle: {normal: {color: '#2d8cf0'}}},
                {value: 2354678, name: '星期三', itemStyle: {normal: {color: '#2d8cf0'}}},
                {value: 1598403, name: '星期四', itemStyle: {normal: {color: '#2d8cf0'}}},
                {value: 543250, name: '星期五', itemStyle: {normal: {color: '#2d8cf0'}}},
                {value: 1305923, name: '星期六', itemStyle: {normal: {color: '#2d8cf0'}}},
                {value: 1103456, name: '星期日', itemStyle: {normal: {color: '#2d8cf0'}}}
              ]
            }
          ]
        };

        visiteVolume.setOption(option);

        window.addEventListener('resize', function () {
          visiteVolume.resize();
        });
      });
    }
  };
</script>
