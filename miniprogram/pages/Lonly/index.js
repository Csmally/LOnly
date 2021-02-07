//index.js

import { allFunc, getLocationNum } from '../../utils/utils'
const app = getApp()

Page({
  data: {
    avatarUrl: '',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    modal:'',
    notLLL:'',
  },
  onLoad: function() {
    allFunc(this)
  },
  onShow: function() {

  },
  onHide:function() {
    console.log('9898第二个隐藏方法')
    app.globalData.isFromLonly = true
  },
  onReady: function() {
    
  },

  //获取用户信息
  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  //自定义方法
})
