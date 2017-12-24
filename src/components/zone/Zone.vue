<template>
  <li v-if="setting"
      v-on:dragItem
      v-bind:style="{top: zoneTop, left: zoneLeft, width: zoneWidth, height: zoneHeight}"
  >
  </li>
</template>
<script>
  import Vue from 'vue'

  import Modal from '../modal'

  import computed from './computed'
  import filter from '../../assets/filter'
//  import directive from '../../assets/directive'

  export default Vue.extend({
    data () {
      return {
//           if(data.setting && !data.setting.hasOwnProperty('target')) {
//              data.setting.target = 1;
//          }
      }
    },

    hideZone (isHide = true) {
      this.data.hideZone = isHide
      this.$update()
    },
    stopPropagation (e) {
      e && e.stopPropagation()
    },
    setInfo (e) {
      this.stopPropagation(e)
      let {hasCallback, index, config} = this.data
      let {link, target} = this.data.setting
      if (hasCallback) {
        this.$emit('itemClick', index)
      } else {
        let modal = new Modal({
          data: {
            link,
            target,
            config
          }
        });
        modal.$on('ok', (info) => {
          this.changeInfo(info)
        });
      }
    },
    /**
     * 链接设置和 directives 设置用
     * @param {Object} info
     */
    changeInfo (info = {}) {
      let {index} = this.data;
      this.$emit('changeInfo', {
        info,
        index
      })
    },
    delItem (e, index) {
      this.$emit('delItem', index)
    },
    notRange (row, col) {
      return row !== '100%' || col !== '100%'
    },
    // 强计算属性组件，抽取计算属性逻辑
    computed
  })
    .filter(filter)
//    .directive(directive)
</script>
