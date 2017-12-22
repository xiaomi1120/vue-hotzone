<template>
<HotZone
                           
                        ></HotZone>
      <!-- <img src="http://haitao.nos.netease.com/EbrC2L4UuXFI1CPmWall%20o207T1705221905_1920_1080.jpg" alt=""> -->
</template>

<script>
import Vue from 'vue'
// import HotZone from './components/HotZone'

export default Vue.extend({
  template: {
    // HotZone
  },
  data: function () {
    return {
      msg: '这是一个组件例子',
      i: 1,
      image: ''
    }
  },
  config: function (data) {
    Object.assign(data, {
      image:
        'http://haitao.nos.netease.com/EbrC2L4UuXFI1CPmWall%20o207T1705221905_1920_1080.jpg',
      zones: [],
      config: {
        pattern: 'www.kaola.com'
      },
      isEdit: true
    })
    this.supr(data)
  },
  erase: function (index) {
    console.log('erase!index:', index)
  },
  change: function () {
    console.log('changed!')
  }
})
</script>
