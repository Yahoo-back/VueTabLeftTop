<template>
  <div>
    <div style="margin-top: 20px;">
      <Button type="primary" @click="modal1 = true">显示对话框</Button>
      <Modal
        v-model="modal1"
        title="普通的Modal对话框标题"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>对话框内容</p>
        <p>对话框内容</p>
        <p>对话框内容</p>
      </Modal>

      <Button @click="modal2 = true">自定义页头和页脚</Button>
      <Modal v-model="modal2" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>删除确认</span>
        </p>
        <div style="text-align:center">
          <p>此任务删除后，下游10个任务将无法执行。</p>
          <p>是否继续删除?</p>
        </div>
        <div slot="footer">
          <Button type="error" size="large" long :loading="modal_loading" @click="del">删除</Button>
        </div>
      </Modal>
      <Button @click="modal3 = true">不带标题栏</Button>
      <Modal v-model="modal3">
        <p>对话框内容</p>
        <p>对话框内容</p>
        <p>对话框内容</p>
      </Modal>
      <Button @click="modal4 = true">国际化</Button>
      <Modal
        v-model="modal4"
        title="模态标题"
        ok-text="确定"
        cancel-text="取消">
        <p>内容.....</p>
        <p>内容....</p>
        <p>内容....</p>
      </Modal>
      <Button @click="modal5 = true">设置宽度</Button>
      <Modal
        v-model="modal5"
        title="自定义宽度"
        width="300">
        <p>自定义狂帝，单位px,默认520px;</p>
        <p>对话框的宽度是响应式，当屏幕尺寸小于768px时，宽度会变为自动<code>auto</code></p>
      </Modal>
    </div>
    <div style="margin-top: 20px;">
      <Button @click="instance('info')">消息</Button>
      <Button @click="instance('success')">成功</Button>
      <Button @click="instance('warning')">警告</Button>
      <Button @click="instance('error')">错误</Button>
    </div>

    <div style="margin-top: 20px;">
      <p>
        姓名: {{ value }}
      </p>
      <p>
        <Button @click="handleRender">自定义内容</Button>
      </p>
    </div>


  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: '',
        modal1: false,
        modal2: false,
        modal_loading: false,
        modal3: false,
        modal4: false,
        modal5: false,
      }
    },
    methods: {
      ok() {
        this.modal1 = false,
          this.$Message.info('点击了确定');
      },
      cancel() {
        this.$Message.info('点击了取消');
      },
      del() {
        this.modal_loading = true;
        setTimeout(() => {
          this.modal_loading = false;
          this.modal2 = false;
          this.$Message.success('Successfully delete');
        }, 2000);
      },
      instance(type) {
        const title = '对话框标题';
        const content = '<p>内容....</p><p>内容...</p>';
        switch (type) {
          case 'info':
            this.$Modal.info({
              title: title,
              content: content
            });
            break;
          case 'success':
            this.$Modal.success({
              title: title,
              content: content
            });
            break;
          case 'warning':
            this.$Modal.warning({
              title: title,
              content: content
            });
            break;
          case 'error':
            this.$Modal.error({
              title: title,
              content: content
            });
            break;
        }
      },
      handleRender() {
        this.$Modal.confirm({
          render: (h) => {
            return h('Input', {
              props: {
                value: this.value,
                autofocus: true,
                placeholder: 'Please enter your name...'
              },
              on: {
                input: (val) => {
                  this.value = val;
                }
              }
            })
          }
        })
      }
    }
  }
</script>
