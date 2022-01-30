<template>
  <el-dialog v-dialogDrag="draggable" v-bind="dialogProps" v-on="$listeners">
    <template slot="title">
      <slot name="title" />
    </template>
    <slot />

    <template slot="footer">
      <slot name="footer" />
    </template>
  </el-dialog>
</template>
<script>
export default {
  name: 'ZSDialog',
  props: {
    // 弹窗是否可以拖拽
    draggable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 弹窗默认属性
      dialogDefaultProps: {
        'close-on-press-escape': false,
        'close-on-click-modal': false,
        'append-to-body': true
      }
    }
  },
  computed: {
    dialogProps: function () {
      return Object.assign(this.dialogDefaultProps, this.$attrs)
    }
  }
}
</script>
