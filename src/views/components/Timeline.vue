<style scoped type="text/css">
  .time {
    font-size: 14px;
    font-weight: bold;
  }

  .content {
    padding-left: 5px;
  }

  .doc-header {
    width: 100%;
    border-bottom: 1.5px dashed #062873;
    padding-left: 5px;
    padding-top: 5px;
    padding-bottom: 30px
  }

  .doc-content {
    margin-top: 10px;
    margin-bottom: 50px;
    padding: 5px;
    line-height: 20px
  }

  .doc-content p {
    fout-size: 30px;
    margin-bottom: 5px;
    margin-top: 5px
  }

  .doc-content h2 {
margin-bottom: 10px;
margin-top: 10px
}
</style>
<template>
  <div style="margin-top: 20px;margin-left: 10px;">
    <Row>
      <Col span="24">
        <div style="" class="doc-header">
          <Timeline>
            <Timeline-item>
              <p class="time">1976年</p>
              <p class="content">Apple I 问世</p>
            </Timeline-item>
            <Timeline-item>
              <p class="time">1984年</p>
              <p class="content">发布 Macintosh</p>
            </Timeline-item>
            <Timeline-item>
              <p class="time">2007年</p>
              <p class="content">发布 iPhone</p>
            </Timeline-item>
            <Timeline-item>
              <p class="time">2010年</p>
              <p class="content">发布 iPad</p>
            </Timeline-item>
            <Timeline-item>
              <p class="time">2011年10月5日</p>
              <p class="content">史蒂夫·乔布斯去世</p>
            </Timeline-item>
          </Timeline>
        </div>
        <div style="" class="doc-content">
          <h2>基础用法</h2>
          <p>最简单定义一个时间轴的用法。</p>
        </div>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <div style="" class="doc-header">
          <Timeline>
            <Timeline-item color="green">发布1.0版本</Timeline-item>
            <Timeline-item color="green">发布2.0版本</Timeline-item>
            <Timeline-item color="red">严重故障</Timeline-item>
            <Timeline-item color="blue">发布3.0版本</Timeline-item>
          </Timeline>
        </div>
        <div style="" class="doc-content">
          <h2>圆圈颜色</h2>
          <p>
            用各种颜色来标识不同状态，可以使用green、red、blue或自定义的颜色，默认是 blue 。</p>
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>
  export default {}
</script>




