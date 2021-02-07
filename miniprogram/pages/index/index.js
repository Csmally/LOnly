//index.js
import { allFunc, getLocationNum } from '../../utils/utils'
const app = getApp()

Page({
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    isShow:'',
    modal:'',
    notLLL:'',
    loadFuncDo:false,
    showFuncDo:false,
    hideFuncDo:false
  },

  onLoad: function() {
    allFunc(this)
    this.setData({
      loadFuncDo: true
    })
  },
  onShow: function() {
    if(this.data.loadFuncDo==true&&this.data.showFuncDo==true&&app.globalData.isFromLonly==false){
      console.log('9898重复进来',this.data.loadFuncDo,this.data.showFuncDo,app.globalData.isFromLonly)
      getLocationNum(this)
    }
  },
  onHide: function() {
    app.globalData.isFromLonly = false
  },
  onReady: function() {
    this.setData({
      showFuncDo:true
    })
  },

  //自定义方法

  dianji(){
    console.log('9898地址',this.data)
  }
})
