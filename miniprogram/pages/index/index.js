//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    isShow:'',
    modal:''
  },

  onLoad: function() {
    if(app.globalData.openid&&app.globalData.openid!=''){
      // this.setData({ isShow: app.globalData.openid=='o7MH55Z1mCAftFRsQWEkA1lGukuM'||app.globalData.openid=='o7MH55cmTNBJFas252BXav_OvoLE'?true:false })
      this.setData({
        isShow: app.globalData.openid=='o7MH55Z1mCAftFRsQWEkA1lGukuM'?true:false,
        modal: app.globalData.openid=='o7MH55Z1mCAftFRsQWEkA1lGukuM'?'':'show'
      })
    }else {
      app.notLLLCallback = openid => {
        if(openid!=''){
          // this.setData({ isShow: app.globalData.openid=='o7MH55Z1mCAftFRsQWEkA1lGukuM'||app.globalData.openid=='o7MH55cmTNBJFas252BXav_OvoLE'?true:false })
          this.setData({
            isShow: app.globalData.openid=='o7MH55Z1mCAftFRsQWEkA1lGukuM'?true:false,
            modal: app.globalData.openid=='o7MH55Z1mCAftFRsQWEkA1lGukuM'?'':'show'
          })
        }
      }
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  //自定义方法
  hideModal(e) {
    this.setData({
      modal: ''
    })
  },

  dianji(){
    console.log('9898地址',this.data)
  }
})
