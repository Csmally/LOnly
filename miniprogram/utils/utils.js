const app = getApp()
const DB = wx.cloud.database().collection('localInfolist');
let allFunc = function(_this){
  console.log('9898成功引用')
  if(app.globalData.openid&&app.globalData.openid!=''){
    _this.setData({
      notLLL: app.globalData.notLLL
    })
  }else {
    app.notLLLCallback = openid => {
      if(openid!=''){
        _this.setData({ 
          notLLL: app.globalData.notLLL
        })
      }
    }
  }
  getLocalInfo(_this)
}
let getLocalInfo = function(_this) {
  wx.getSetting({
    success: res => {
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            _this.setData({
              avatarUrl: res.userInfo.avatarUrl,
              userInfo: res.userInfo
            })
          }
        })
      }
      console.log('9898返回结果',res)
      if (res.authSetting['scope.userLocation'] != true) {
        console.log('9898返回结果--没有',res)
        wx.authorize({
          scope: 'scope.userLocation',
          success() {
            console.log('9898走允许了')
            getLocationNum(_this)
          }
        })
      }else {
        getLocationNum(_this)
      }
      console.log('9898返回改变结果',res)
    }
  })
}
//获取位置信息
let getLocationNum = function(_this){
  console.log('9898开始拿位置信息了')
  let i = setInterval(function() {
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
      success: function(res) {
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })            
        let longitude = res.longitude
        let latitude = res.latitude
        loadCity(longitude, latitude,_this)
        clearInterval(i)
      },
      fail: function() {
        wx.showToast({
          title: '手机定位未打开',
          icon: 'none',
          duration: 2000 
        })
      },
      complete: function() {
        
      }
    })
  }, 2000)
}
let loadCity = function(longitude, latitude,_this) {
  //请求的地址是腾讯地图，参考文档https://lbs.qq.com/service/webService/webServiceGuide/webServiceOverview
  wx.request({
    url:'https://apis.map.qq.com/ws/geocoder/v1/?location='+latitude + ','+longitude +'&key=SSSBZ-SQZK6-U3XSL-EPA5P-6VNK6-ANF4P&get_poi=1',
    data: {},
    header: {
      'Content-Type': 'application/json'
    },
    success: function(res) {
      console.log('9898腾讯地图返回数据',res)
      app.globalData.location = res.data.result.address_component
      let localInfo = res.data.result.address
      console.log('9898破译地址',localInfo)
      console.log('9898日期',changeDate())
      //腾讯云数据库可能有数据存取限制，后期可能会收费，后期需要打开以下代码即可把位置信息
      //存入数据库，位置信息对应的表名是 localInfolist
      // DB.add({
      //   data:{
      //     time: changeDate(),
      //     localInfo: localInfo 
      //   }
      // })
    },
    fail: function() {  
      console.log("失败")
    },
    complete: function() {
      // complete  
    }
  })
}
//转换日期格式
let changeDate = function() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth()+1;    //js从0开始取 
  let date1 = date.getDate(); 
  let hour = date.getHours(); 
  let minutes = date.getMinutes(); 
  let second = date.getSeconds();
  return year+"年"+month+"月"+date1+"日"+hour+"时"+minutes +"分"+second+"秒"
}

export { allFunc, getLocalInfo, getLocationNum, loadCity }