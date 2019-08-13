<template>
    <div style="margin-top: 20px;margin-left: 10px;" class="animated fadeIn">
        <Row>
            <Col span="24">
                <div class="doc-header">

                    <Steps :current="1">
                        <Step title="已完成" content="这里是该步骤的描述信息"></Step>
                        <Step title="进行中" content="这里是该步骤的描述信息"></Step>
                        <Step title="待进行" content="这里是该步骤的描述信息"></Step>
                        <Step title="待进行" content="这里是该步骤的描述信息"></Step>
                    </Steps>
                </div>
                <div style="" class="doc-content">
                    <h2>基础用法</h2>
                    <p> 基本用法，组件会根据current自动判断各步骤状态</p>
                </div>
            </Col>
        </Row>
        <Row>
            <Col span="24">
                <div class="doc-header">
                    <Steps :current="1">
                        <Step title="注册" icon="person-add"></Step>
                        <Step title="上传头像" icon="camera"></Step>
                        <Step title="验证邮箱" icon="email"></Step>
                    </Steps>
                </div>
                <div style="" class="doc-content">
                    <h2>带图标的步骤条</h2>
                    <p> 通过设置Step的icon属性可以自定义图标。</p>
                </div>
            </Col>
        </Row>
        <Row>
            <Col span="24">
                <div class="doc-header">
                    <Steps :current="2" direction="vertical">
                        <Step title="已完成" content="这里是该步骤的描述信息"></Step>
                        <Step title="已完成" content="这里是该步骤的描述信息"></Step>
                        <Step title="进行中" content="这里是该步骤的描述信息"></Step>
                        <Step title="待进行" content="这里是该步骤的描述信息"></Step>
                    </Steps>
                </div>
                <div style="" class="doc-content">
                    <h2>垂直方向</h2>
                    <p> 设置属性direction为vertical在垂直方向展示。</p>
                </div>
            </Col>
        </Row>
        <Row>
            <Col span="24">
                <div class="doc-header">
                    <Steps :current="1" status="error">
                        <Step title="已完成" content="这里是该步骤的描述信息"></Step>
                        <Step title="进行中" content="这里是该步骤的描述信息"></Step>
                        <Step title="待进行" content="这里是该步骤的描述信息"></Step>
                        <Step title="待进行" content="这里是该步骤的描述信息"></Step>
                    </Steps>
                </div>
                <div style="" class="doc-content">
                    <h2>步骤运行错误</h2>
                    <p> 设置Steps的属性status为error指定当前步骤状态。</p>
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
       background-color: white !important;
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
    fout-size:30px;
    margin-bottom: 5px;
    margin-top: 5px
  }

  .doc-content h2 {
    margin-bottom: 10px;
    margin-top: 10px
  }
</style>

