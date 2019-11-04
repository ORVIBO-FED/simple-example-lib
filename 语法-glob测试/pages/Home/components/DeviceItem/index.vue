<!----------------------------------------------------------------------------------
about：首页-设备列表
author：马兆铿
date：2019-08-01
----------------------------------------------------------------------------------->

<template>
  <div class="device-item">
    <dof-cell
        :title="value.deviceName"
        @click="onClickCell(value)"
        has-arrow
    >
      <icon
          slot="itemImg"
          type="channel"
      />
    </dof-cell>
  </div>
</template>

<script>
  import { Icon } from '../../../../components'
  import { DofCell } from '../../../../common'

  export default {
    name: 'DeviceItem',
    props: {
      value: { default: () => {} }
    },
    components: { DofCell, Icon },
    data () {
      return {}
    },
    methods: {
      /* ----------------------------------------- 绑定方法 ----------------------------------------- */
      /**
       * 开关点击
       */
      onClickPower () {
        console.log('ON/OFF')
      },

      /**
       * 点击
       */
      onClickCell (value) {
        const { deviceType, typeName, deviceId, irDeviceId, uid } = value
        this.$router.push({
          path: `/control/${value.typeName}`,
          query: {
            typeName,
            deviceType,
            deviceId,
            irDeviceId,
            uid,
            isShowExtra: true,
            isShowTime: true
          }
        })
      },

      /* ----------------------------------------- 自定义方法 ----------------------------------------- */
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
