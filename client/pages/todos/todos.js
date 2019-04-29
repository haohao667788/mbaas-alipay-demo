const app = getApp();
const sdk = require('mbaas-js-sdk-alipay');

Page({
  data: {
    user: {},
    todos:[],
  },

  onLoad() {
    sdk.login((err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      this.loadTodoList();
      app.globalData.inited = true;
    });
  },

  onShow() {
    if (app.globalData.inited) {
      this.loadTodoList();
    }
  },

  onTodoChanged(e) {
    if(this.deleting) return;

    const ids = e.detail.value;
    let changeTarget = null;

    for (const todo of this.data.todos) {
      if (todo.completed && !ids.includes(todo.objectId)) {
        changeTarget = {
          _id: todo.objectId,
          completed: false,
        }
      }
      if (!todo.completed && ids.includes(todo.objectId)) {
        changeTarget = {
          _id: todo.objectId,
          completed: true,
        }
      }
    }

    if (changeTarget) {
      this.changeComplete(changeTarget._id, changeTarget.completed).then(res => {
        if(res.success) {
          this.loadTodoList();
        }
      });
    }
  },

  deleteIcon(e){
    this.deleting = true;
    const id = e.currentTarget.dataset.id;

    this.deleteById(id).then(res => {
      if(res.success) {
        this.loadTodoList();
      }
    });

    setTimeout(()=>{
      this.deleting = false;
    },100);
  },

  addTodo() {
    my.navigateTo({ url: '../add-todo/add-todo' });
  },

  // 获得数据并加载当前用户 todo 列表
  loadTodoList(){
    sdk.db('todos').get((err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      this.setData({ todos: res.results });
    });
  },

  // 删除当前的列表
  deleteById(_id){
    const that = this;
    return new Promise(function (resolve, reject) {
      // 确认和删除图片
      my.confirm({
        title: '删除 todo',
        content: '是否确认删除?',
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        success: (result) => {
          if (result.confirm) {
            sdk.db('todos').deleteById(_id, (err, res) => {
              if (err) {
                reject({ success: false });
                return;
              }
              resolve({ success: true });
            });
          }
        },
      });
    });
  },

  // 根据 id 改变当前 todo 状态
  changeComplete(_id, completed){
    return new Promise(function (resolve, reject) {
      sdk.db('todos').updateById(_id, {
        completed,
        completeTime: completed ? { __type: 'Date', iso: new Date() } : null,
      }, (err, res) => {
        if (err) {
          reject({ success: false });
          return;
        }
        resolve({ success: true });
      });
    });
  }
});
