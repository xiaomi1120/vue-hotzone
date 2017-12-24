<template>
  <div class="hz-m-wrap {class}"
       v-bind:class="{'hz-m-view': !isEdit }"
       v-on:erase='erase($event)'>
    <img class="hz-u-img" v-bind:src='image'/>
    <ul class="hz-m-area" v-on:addItem>
      <Zone
        class="hz-m-item"
        isEdit="{isEdit}"
        config="{config}"
        index="{item_index}"
        hasCallback="{hasCallback}"
        ref="{'zone_' + item_index}"
        setting="{zones[item_index]}"
        on-delItem="{this.removeItem($event)}"
        on-itemClick="{this.itemClick($event)}"
        on-changeInfo="{this.changeInfo($event)}"
      ></Zone>
    </ul>
  </div>

</template>


<script>
  import Vue from 'vue'
  // import template from "../components/view.html"
  import Zone from './zone/Zone'
  import _ from '../assets/util'
  // import VueRouter from 'vue-router'
  // Vue.use(VueRouter);
  // import directive from "../assets/directive";

  export default Vue.extend({
    components: {
      Zone
    },
    data () {
      return {
        hasCallback: !!this._handles && !!this._handles.itemClick,
        isEdit: true,
        config: {},
        zones: [],
        image: 'http://haitao.nos.netease.com/EbrC2L4UuXFI1CPmWall%20o207T1705221905_1920_1080.jpg'
      }
    },
    methods: {
      erase: function (index) {
        console.log('erase!index:', index)
      },
      change: function () {
        console.log('changed!')
      },

      changeInfo (res) {
        let {info, index} = res
        this.changeItem(info, index)
      },
      addItem (setting = {}) {
        this.data.zones.push(setting)
        this.$emit('add', setting)
        this.hasChange()
      },
      eraseItem (index = this.data.zones.length - 1) {
        this.$emit('erase', index)
        this.removeItem(index)
      },
      isOverRange () {
        let {config = {}, zones = []} = this.data
        return config.hasOwnProperty('maxNum') && zones.length > config.maxNum
      },
      overRange (index = this.data.zones.length - 1) {
        this.$emit('overRange', index)
        this.removeItem(index)
      },
      removeItem (index = this.data.zones.length - 1) {
        this.data.zones.splice(index, 1)
        this.$emit('remove', index)
        this.hasChange()
      },
      setItem (index = this.data.zones.length - 1) {
        this.$refs[`zone_${index}`].setInfo()
      },
      changeItem (info = {}, index = this.data.zones.length - 1) {
        Object.assign(this.data.zones[index], info)
        this.hasChange()
      },
      hasChange () {
        this.$emit('change', this.data.zones)
        this.$update()
      },
      itemClick (index) {
        this.$emit('itemClick', index)
      },
      getInfo () {
        return this.data.zones
      }

    }
  })
</script>


<style scoped>
  /*overflow: hidden;*/
  .hz-m-wrap {
    position: relative
  }

  .hz-m-wrap .hz-u-img {
    display: block;
    width: 100%;
    max-width: 100%;
    height: auto;
    max-height: 100%;
    user-select: none;
  }

  .hz-m-wrap .hz-m-area {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    cursor: crosshair;
  }

  .hz-m-wrap .hz-m-item {
    position: absolute;
    display: block;
  }

  .hz-m-wrap .hz-m-item:hover .hz-m-bridge {
    display: block
  }

  .hz-m-wrap .hz-m-item:hover .hz-m-info {
    display: block
  }

  .hz-m-wrap .hz-m-info {
    display: none;
    position: absolute;
    padding: 5px 10px;
    line-height: 20px;
    opacity: .8;
    color: #fff;
    z-index: 10;
    background: #000;
    cursor: default;
    user-select: none;
    white-space: nowrap;
  }

  .hz-m-wrap .hz-m-info a {
    text-decoration: underline;
    cursor: pointer;
    color: #fff;
    word-break: break-word;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .hz-m-wrap .hz-m-info a:hover {
    text-decoration: underline;
  }

  .hz-m-wrap .hz-u-link {
    color: #333
  }

  .hz-m-wrap .hz-u-link:hover {
    text-decoration: none;
  }

  .hz-m-wrap .hz-m-box {
    position: relative;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 6px #000;
    background: #3bd4fc;
    font-size: 12px;
    cursor: pointer;
    opacity: .6;
  }

  .hz-m-wrap .hz-m-box:hover {
    background: #19b2da;
  }

  .hz-m-wrap .hz-m-box:hover .hz-u-close {
    display: block
  }

  .hz-m-wrap .hz-m-box .hz-u-index {
    position: absolute;
    top: 0;
    left: 0;
    width: 18px;
    height: 18px;
    line-height: 16px;
    color: #fff;
    font-size: 12px;
    background: #000;
    user-select: none;
    text-align: center;
  }

  .hz-m-wrap .hz-m-box .hz-u-close {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    width: 18px;
    height: 18px;
    line-height: 16px;
    color: #fff;
    font-size: 18px;
    background: #000;
    user-select: none;
    text-align: center;
  }

  .hz-m-wrap .hz-m-box .ha-u-edit {
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;
    height: 24px;
    background: url(//haitao.nos.netease.com/049e5b9c-8b72-4a75-9b34-5dcece11ab19.svg) no-repeat;
    background-size: 100% 100%;
  }

  .hz-m-wrap .hz-m-box .hz-u-tip {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    user-select: none;
    text-align: center;
  }

  .hz-m-wrap .hz-m-box .hz-u-square {
    position: absolute;
    width: 8px;
    height: 8px;
    opacity: .5;
    user-select: none;
    background-color: #fff;
    border: 1px solid #25c3eb;
  }

  .hz-m-wrap .hz-m-box .hz-u-square-tl {
    top: -5px;
    left: -5px;
    cursor: nw-resize;
  }

  .hz-m-wrap .hz-m-box .hz-u-square-tc {
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    cursor: n-resize;
  }

  .hz-m-wrap .hz-m-box .hz-u-square-tr {
    top: -5px;
    right: -5px;
    cursor: ne-resize;
  }

  .hz-m-wrap .hz-m-box .hz-u-square-cl {
    top: 50%;
    left: -5px;
    transform: translateY(-50%);
    cursor: w-resize;
  }

  .hz-m-wrap .hz-m-box .hz-u-square-cr {
    top: 50%;
    right: -5px;
    transform: translateY(-50%);
    cursor: w-resize;
  }

  .hz-m-wrap .hz-m-box .hz-u-square-bl {
    bottom: -5px;
    left: -5px;
    cursor: sw-resize;
  }

  .hz-m-wrap .hz-m-box .hz-u-square-bc {
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    cursor: s-resize;
  }

  .hz-m-wrap .hz-m-box .hz-u-square-br {
    bottom: -5px;
    right: -5px;
    cursor: se-resize;
  }

  .hz-m-wrap .hz-m-bridge {
    display: none;
    cursor: default;
  }

  .hz-m-wrap .hz-m-bridge li {
    position: absolute;
    width: 36px;
    height: 36px;
    background: transparent;
  }

  .hz-m-wrap .hz-m-bridge .hz-u-bridge-tl {
    top: -18px;
    left: -18px;
  }

  .hz-m-wrap .hz-m-bridge .hz-u-bridge-tr {
    top: -18px;
    right: -18px;
  }

  .hz-m-wrap .hz-m-bridge .hz-u-bridge-bl {
    bottom: -18px;
    left: -18px;
  }

  .hz-m-wrap .hz-m-bridge .hz-u-bridge-br {
    bottom: -18px;
    right: -18px;
  }

  .hz-m-wrap .hz-j-hidden li {
    display: none
  }

  /*  查看态时图片 hover 样式控制 */
  .hz-m-view .hz-m-area {
    cursor: default;
  }

  .hz-m-view .hz-m-info a {
    text-decoration: none;
  }
</style>
