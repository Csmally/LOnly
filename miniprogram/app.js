//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'cloud1-7gxpsw7i3b71f7cf',
        traceUser: true,
      })
    }

    wx.cloud.callFunction({name:'login',data:{}}).then(res=>{
      // if(res.result.openid=='o7MH55Z1mCAftFRsQWEkA1lGukuM'||res.result.openid=='o7MH55cmTNBJFas252BXav_OvoLE'){
      if(res.result.openid=='o7MH55Z1mCAftFRsQWEkA1lGukuM'){
        this.globalData.openid = res.result.openid
        this.globalData.notLLL = false
        if (this.notLLLCallback){
          this.notLLLCallback(res.result.openid);
       }
      }else{
        this.globalData.openid = res.result.openid
        this.globalData.notLLL = true
        if (this.notLLLCallback){
          this.notLLLCallback(res.result.openid);
       }
      }
    })
  },
  globalData:{
    openid:'',
    notLLL:''
  }
})
