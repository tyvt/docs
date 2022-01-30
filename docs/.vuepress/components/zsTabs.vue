<template>
  <div class="tabs">
    <div class="tabs-bar">
      <div v-for="(item, index) in tabList" :key="index" :class="tabCls(item)" @click="handleChange(item)">
        {{ item.label }}
        <svg v-if="index != '0'" width="20px" height="30px" class="tab-s-svg svg-left">
          <path :d="pathL" stroke="#2E4DCD" stroke-width="2px" :fill="item.name == value ? '#fff' : '#3855cd'"></path>
        </svg>
        <svg width="20px" height="31px" class="tab-s-svg svg-right">
          <path :d="pathR" stroke="#2E4DCD" stroke-width="1.2px" :fill="item.name == value ? '#fff' : '#3855cd'"></path>
        </svg>
      </div>
      <slot name="header"></slot>
      <i v-if="tabHide" class="el-icon-d-caret fixed-right" @click="contentHide = !contentHide"></i>
    </div>
    <div
      :class="[
        'tabs-content',
        {
          'tabs-hide': contentHide,
          'over-flow': tabHide
        }
      ]"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    value: {
      type: [String, Number],
      default: 0
    },
    tabHide: {
      type: Boolean,
      default: false
    },
    tabList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      pathL: 'M0,0 C8,8 9,20 15,30 L0,30',
      pathR: 'M0,0 C10,12 8,20 18,31 L0,31',
      contentHide: false
    }
  },
  methods: {
    tabCls(item) {
      return [
        'tabs-tab',
        {
          'tabs-tab-active': item.name == this.value
        }
      ]
    },
    handleChange(item) {
      this.$emit('update:value', item.name)
      this.$emit('tab-click', item)
    }
  }
}
</script>

<style scoped>
.tabs {
  font-size: 14px;
  color: #3855cd;
  position: relative;
}

.tabs-bar {
  overflow: hidden;
  position: relative;
}

.tabs-bar:after {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  background: #3855cd;
  margin-top: -1px;
}

.tabs-tab {
  display: inline-block;
  position: relative;
  height: 30px;
  line-height: 30px;
  padding: 0px 20px;
  margin: 0px 7px;
  box-sizing: border-box;
  background: #fff;
  border-top: 1px solid #3855cd;
  border-left: 1px solid #3855cd;
  cursor: pointer;
  position: relative;
  background: #3855cd;
  color: #fff;
}

.tabs-tab:first-child {
  border-top-left-radius: 7px;
}

.tabs-tab .tab-s-svg {
  position: absolute;
  top: -1px;
}

.tabs-tab .tab-s-svg.svg-left {
  left: -19px;
  transform: rotate(180deg);
  top: -1px;
}

.tabs-tab .tab-s-svg.svg-right {
  right: -20px;
}

.tabs-tab-active {
  color: #3855cd;
  background: #fff;
}

.tabs-content {
  position: relative;
  padding: 10px;
}

.tabs-content.over-flow {
  overflow: auto;
}

.tabs-content.tabs-hide {
  height: 1px !important;
  border-bottom: none !important;
  overflow: hidden;
}

.tabs .tab-btns {
  display: flex;
  position: absolute;
  right: 10px;
  top: 4px;
  z-index: 999;
}

.tabs .fixed-right {
  color: #3855cd;
  font-size: 22px;
  position: absolute;
  right: 7px;
  top: 7px;
  cursor: pointer;
}
</style>
