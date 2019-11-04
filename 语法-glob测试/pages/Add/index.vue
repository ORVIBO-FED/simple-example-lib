<!----------------------------------------------------------------------------------
about：添加设备页面
author：马兆铿
date：2019-09-19
----------------------------------------------------------------------------------->

<template>
  <!--可添加遥控列表-->
  <scroller
      class="add"
      :show-scrollbar="false"
  >
    <text class="add__title">请选择电器类型</text>
    <div class="add__content">
      <div
          v-for="item in deviceList"
          class="add__item"
          :key="item.name"
      >
        <div
            class="add__item-inner"
            @click="onClickDevice(item)"
        >
          <image
              :src="`/src/assets/img/scene/${item.name}.png`"
              class="add__item-img"
          ></image>
        </div>
        <text class="add__content-text text-align-center">{{item.chName.split('遥控器')[0]}}</text>
      </div>
    </div>
  </scroller>
</template>

<script>
  import { code_device } from '../../const/device'

  export default {
    name: 'Add',
    data () {
      return {
        deviceList: code_device
      }
    },
    methods: {
      /* ----------------------------------------- 绑定方法 ----------------------------------------- */
      /**
       * 设备点击
       * @param item 设备类型
       */
      onClickDevice (item) {
        const { name, deviceType, chName, kookongDeviceType } = item
        console.log(item)

        let path = {
          'topbox': '/add/choose-province',
        }[name]
        // 默认
        if (path === undefined) {
          path = '/add/choose-brand'
        }
        // 跳转到页面
        this.$router.push({
          path,
          query: {
            ...this.$route.query,
            deviceType,
            kookongDeviceType,
            typeName: name,
            chName
          }
        })
      }
      /* ----------------------------------------- 自定义方法 ----------------------------------------- */

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/style/var";

  .add {
    box-sizing: border-box;
    padding: 38px 35px;
  }

  .add__title {
    margin-bottom: 36px;
    color: #8A8A8F;
    font-size: @font-size-S;
    text-align: center;
  }

  .add__content {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .add__item {
    margin-bottom: 36px;
    width: 264 + 74px;
    box-sizing: border-box;
    position: relative;
    transition: opacity 200ms;
    justify-content: center;
    align-items: center;

    &:active {
      opacity: .8;
    }
  }

  .add__item-inner {
    margin: 0 auto;
    width: 264px;
    border-radius: 18px;
    border-width: 1px;
    border-color: rgba(229, 229, 232, 1);
    align-items: center;
    display: block;
  }

  .add__content-text {
    margin: 20px 0 0;
    text-align: center;
    font-size: @font-size-XS;
  }

  .add__item-img {
    margin: 50px auto;
    width: 84px;
    height: 54px;
  }
</style>
