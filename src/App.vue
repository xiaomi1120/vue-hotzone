<template>
<div id="box">
<HotZone v-bind:src='image'
          v-bind:zones='zones'
          v-if="isEdit"
          v-on:erase='erase($event)'
          v-on:change='change($event)'
></HotZone>
</div>
</template>

<script>
import Vue from 'vue';
import HotZone from './components/HotZone'
export default Vue.extend({
  components:{
    HotZone
  },
  data:function() {
    return {
     image:
        "http://haitao.nos.netease.com/EbrC2L4UuXFI1CPmWall%20o207T1705221905_1920_1080.jpg",
      zones: [],
      config: {
        pattern: 'www.kaola.com'
      },
      isEdit: true
    }
  },
  // config: function(data) {
  //   Object.assign(data, {
   
  //   });
  //   this.methods(data);
  // },
  methods:{
  erase: function(index) {
    console.log("erase!index:", index);
  },
  change: function() {
    console.log("changed!");
  }
  }

});
</script>
