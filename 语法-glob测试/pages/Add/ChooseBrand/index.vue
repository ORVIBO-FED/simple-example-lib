<!----------------------------------------------------------------------------------
about：添加设备-品牌选择页面
author：马兆铿
date：2019-09-25
----------------------------------------------------------------------------------->

<template>
  <scroller class="brand">
    <wxc-searchbar
        class="brand__search"
        :placeholder="`搜索${$route.query.chName || ''}品牌...`"
        @wxcSearchbarInputOnInput="onInputSearch"
    />
    <div
        v-for="item in list"
        :key="item.initial"
    >
      <text class="brand__title">{{item.initial}}</text>
      <wxc-cell
          v-for="subItem in item.brandList"
          :key="subItem.brandId"
          :title="subItem.cname"
          :has-arrow="true"
          :desc="subItem.ename"
          @wxcCellClicked="onClickBrandCell(subItem.brandId, subItem.cname)"
      />
    </div>
  </scroller>
</template>

<script>
  import { WxcCell, WxcLoading, WxcSearchbar } from 'weex-ui'
  import { kookong_fetchBrand, kookong_fetchIPTVIdList } from '../../../api/kookong'

  export default {
    name: 'Brand',
    components: { WxcSearchbar, WxcCell, WxcLoading },
    data () {
      console.log(this.$route)
      return {
        searchText: '',
        list: [],
        originList: [], // 用于记录，用于搜索
        sortedList: [],
        isShowLoading: false,
        deviceHeight: WXEnvironment.deviceHeight * 0.62 + 'px'
      }
    },
    created () {
      this.queryBrandList()
    },
    methods: {
      /* ----------------------------------------- 绑定方法 ----------------------------------------- */
      /**
       * 即时输入修改
       */
      onInputSearch (e) {
        const val = e.value
        this.searchText = val

        // 判断是有单词，不论大小写
        function hasStrCase (mainStr) {
          return function (subStr) {
            return mainStr.toLowerCase().indexOf(subStr.toLowerCase()) > -1
          }
        }

        if (val) {
          this.list = [{
            initial: '搜索结果',
            // 支持大小写混合写
            brandList: this.originList.filter(item => hasStrCase(item.cname)(val) || hasStrCase(item.ename)(val))
          }]
        } else {
          this.list = this.sortedList
        }
      },

      /**
       * 点击品牌跳转
       */
      onClickBrandCell (brandId, brandName) {
        const { uid, deviceId, kookongDeviceType, typeName, chName, deviceType, spId, isIPTV } = this.$route.query

        this.$router.push({
          path: `/add/choose-panel/${typeName}`,
          query: { uid, deviceId, kookongDeviceType, deviceType, chName, brandId, brandName, spId, isIPTV }
        })
      },

      /* ----------------------------------------- 自定义方法 ----------------------------------------- */
      /**
       * 获取品牌下所有的遥控的 rid 的集合
       */
      queryBrandList () {
        const { kookongDeviceType, spId, isIPTV } = this.$route.query
        console.log('isIPTV', isIPTV)
        this.isShowLoading = true

        const params = {
          deviceType: kookongDeviceType // 后台参数名不一样
        }
        if (isIPTV) {
          params.spId = spId
        }
        const brandFetch = isIPTV
          ? kookong_fetchIPTVIdList
          : kookong_fetchBrand
        brandFetch(params).then(res => {
          this.isShowLoading = false
          this.originList = res
          this.list = this.brandListSort(res)
          this.sortedList = this.list
        })
      },

      /**
       * 品牌排序
       */
      brandListSort (list) {
        // 根据其 initial（首字母）来分成几个子列表
        const initialList = list.map(item => item.initial)
        let noRepeatInitialList = Array.from(new Set(initialList)).sort() // 去重并排序

        // 拆分列表
        const res = noRepeatInitialList.map(initial => Object({
          initial,
          brandList: list.filter(item => item.initial === initial)
        }))

        // 增加 initial：常见品牌
        res.unshift({
          initial: '常见品牌',
          brandList: list.slice(0, 10)
        })

        console.log(res)
        return res
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../../assets/style/var";

  .brand__search {
    position: sticky;
  }
  .brand__title{
    padding: 40px 0 20px 30px;
    background-color: @color-bg;
    font-size: @font-size-S;
    color: @font-color-aid;
  }
</style>
