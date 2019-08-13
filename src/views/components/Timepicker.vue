<template>
  <div>
    <Row>
      <Col span="24">
        <div style="" class="doc-header">
          <Time-picker :value="value1" format="HH点mm分ss秒" placeholder="选择时间" style="width: 168px"></Time-picker>
          <Time-picker :value="value2" format="HH’mm’ss" type="timerange" placement="bottom-end" placeholder="选择时间"
                       style="width: 168px"></Time-picker>

        </div>
        <div style="" class="doc-content">
          <h2>基础用法</h2>
          <p>设置属性 type 为 time 或 timerange 分别显示选择单个时间和选择范围时间类型。</p>
          <p>设置属性 placement 可以更改选择器出现的方向，与 Poptip 和 Tooltip 配置一致，支持 12 个方向，详见 API。</p>
        </div>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <div style="" class="doc-header">
          <Time-picker format="HH:mm" placeholder="选择时间" style="width: 112px"></Time-picker>
          <Time-picker format="HH:mm" type="timerange" placement="bottom-end" placeholder="选择时间"
                       style="width: 168px"></Time-picker>
        </div>
        <div style="" class="doc-content">
          <h2>选择时分</h2>
          <p>组件浮层中的列会随着 format 变化，当略去 format 中的秒时，浮层中对应的列也会消失。</p>
        </div>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <div style="" class="doc-header">
          <Time-picker
            :disabled-hours="[1,5,10]"
            :disabled-minutes="[0,10,20]"
            placeholder="选择时间"
            style="width: 168px"></Time-picker>
          <Time-picker
            hide-disabled-options
            :disabled-hours="[1,5,10]"
            :disabled-minutes="[0,10,20]"
            placeholder="选择时间"
            style="width: 168px"></Time-picker>
        </div>
        <div style="" class="doc-content">
          <h2>不可选时间</h2>
          <p>可以使用 disabled-hours disabled-minutes disabled-seconds 组合禁止用户选择某个时间。</p>
          <p>使用 hide-disabled-options 可以直接把不可选择的项隐藏。</p>
        </div>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <div style="" class="doc-header">
          <Time-picker
            :open="open"
            :value="value3"
            confirm
            @on-change="handleChange"
            @on-clear="handleClear"
            @on-ok="handleOk">
            <a href="javascript:void(0)" @click="handleClick">
              <Icon type="ios-clock-outline"></Icon>
              <template v-if="value3 === ''">选择时间</template>
              <template v-else>{{ value3 }}</template>
            </a>
          </Time-picker>
        </div>
        <div style="" class="doc-content">
          <h2>手动控制组件</h2>
          <p>对于一些定制化的场景，可以使用 slot 配合参数 open confirm 及事件来手动控制组件的显示状态，详见示例和 API。</p>
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value1: '09:41:00',
        value2: ['09:41:00', '12:00:00'],
        open: false,
        value3: '',
      }
    },
    methods: {
      handleClick() {
        this.open = !this.open;
      },
      handleChange(time) {
        this.value3 = time;
      },
      handleClear() {
        this.open = false;
      },
      handleOk() {
        this.open = false;
      }
    }
  }
</script>
<style type="text/css">
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
