<!----------------------------------------------------------------------------------
about：首页
author：马兆铿
date：2019-08-01
----------------------------------------------------------------------------------->

<template>
  <div class="home">
    <text class="home__title text-align-center">{{hardwareInfo.deviceName}}</text>
    <wxc-button
        type="blue"
        text="添加设备"
        :btn-style="btnStyle.blue"
        @wxcButtonClicked="onClickAdd"
    />
    <!-- 有设备 -->
    <device-item
        v-for="item in list"
        :value="item"
        :key="item.deviceId"
    />
  </div>
</template>

<script>
  import DeviceItem from './components/DeviceItem'
  import { ali_queryDeviceList } from '../../api/aligenius'
  import { code_device } from '../../const/device'
  import { Icon } from '../../components'
  import { WxcButton } from 'weex-ui'
  import { btnStyle } from '../../assets/style/wxc-reset'

  export default {
    name: 'Home',
    components: { DeviceItem, Icon, WxcButton },
    data () {
      return {
        btnStyle,
        list: [],
        hardwareInfo: {} // 硬件信息
      }
    },
    created () {
      this.queryRemoteList()
    },
    methods: {
      /* ----------------------------------------- 绑定方法 ----------------------------------------- */
      /**
       * 增加点击
       */
      onClickAdd () {
        const { uid, deviceId } = this.hardwareInfo
        this.$router.push({
          path: '/add',
          query: { uid, deviceId }
        })
      },

      /* ----------------------------------------- 自定义方法 ----------------------------------------- */
      /**
       * 获取数据列表
       */
      queryRemoteList () {
        // 天猫精灵获取设备列表
        ali_queryDeviceList().then(res => {
          console.log(res)
          // 数据列表
          this.list = res.filter(item => {
            const device = code_device.find(device => device.deviceType === item.deviceType)
            if (device) {
              item.typeName = device.name
              return item
            }
          })

          // 硬件信息
          this.hardwareInfo = res.find(item => item.deviceType === 30)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import "../../assets/style/common";
  @import "../../assets/style/var";

  .home__title {
    font-size: 40px;
  }
</style>
