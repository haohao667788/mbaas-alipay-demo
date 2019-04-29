const app = getApp();
const sdk = require('mbaas-js-sdk-alipay');

Page({
  data: {
    inputValue: '',
    iconUrl: ''
  },

  onBlur(e) {
    this.setData({
      inputValue: e.detail.value,
    });
  },

  add() {
    // 如果任务名称没有填，则进行提示
    if (this.data.inputValue == '') {
      my.alert({
        title: '添加失败',
        content: '请填写任务名称。',
        buttonText: '我知道了',
      });

    // 正常情况，写入数据存储
    } else {
      this.addTodo().then(res => {
        if(res.success) {
          my.navigateBack();
        } else {
          my.showToast({
            content: '请求失败，请重试'
          });
        }
      });
    }
  },

  // 选择图片并上传
  uploadImg() {
    my.chooseImage({
      chooseImage: 1,
      success: res => {
        const path = res.apFilePaths[0];
        sdk.file().uploadFile(path, (err, res) => {
          if (err) {
            console.error(err);
            return;
          }
          sdk.file().getTempUrl(res.objectId, (err, res) => {
            this.setData({
              iconUrl: res.url
            });
          });
        });
      },
    });
  },

  // 写入数据库 obj，当前用户增加一条 todo
  addTodo(){
    return new Promise((resolve, reject) => {
      sdk.db('todos').add({
        text: this.data.inputValue,
        iconUrl: this.data.iconUrl ? this.data.iconUrl : null,
        completed: false,
        createTime: { __type: 'Date', iso: new Date() },
        completeTime: null,
      }, (err, res) => {
        if (err) {
          console.error(err);
          reject({ success: false });
          return;
        }
        console.log('my success');
        resolve({ success: true });
      });
    });
  }
});
