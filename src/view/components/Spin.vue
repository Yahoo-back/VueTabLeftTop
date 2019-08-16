<template>
  <div class="animated fadeIn">
    <Row>
      <Col span="24">
        <div class="doc-header">
          <Spin size="small" style="display:inline-block"></Spin>
          <Spin style="display:inline-block"></Spin>
          <Spin size="large" style="display:inline-block"></Spin>
        </div>
        <div style="" class="doc-content">
          <h2>各种尺寸</h2>
          <p>通过设置size属性为large和small将 Spin 设置为大和小尺寸，不设置为默认（中）尺寸。</p>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: 'spin',
  }
</script>
<style scoped lang="css">
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
    margin-bottom: 5px;
    margin-top: 5px
  }

  .doc-content h2 {
    margin-bottom: 10px;
    margin-top: 10px
  }
</style>
