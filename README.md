## 概述

Todo App 是 mbaas 小程序的一个经典案例，本示例演示如何结合小程序客户端程序和 Mbaas后端服务，完成一个小程序的开发，使其同时具备客户端和后端的能力，可以作为一个完成程序使用。

## 环境准备

* Nodejs 10 或以上版本

## 使用步骤

1. 安装 SDK：在小程序的项目的 client 目录通过 npm 命令安装 SDK。（需要预先安装 Nodejs）
    
    ```
    npm install mbaas-js-sdk-alipay
    ```
    
  
2. 关联云服务：点击小程序开发者工具左侧导航第 4 个 tab 进入云服务栏目，关联应用。
    ![截图](https://cdn.nlark.com/yuque/0/2018/png/84303/1536762551947-cfc8ac0d-06d9-4f80-b707-7b827cc408c2.png)

3. 前往云控制台(clouddev.console.aliyun.com)，申请应用并获取 `appKey`, `secret` 和 `envId`，并填入到 client/app.js 中相应的位置。
    
4. 预览小程序：刷新预览，可以读取初始信息并且可以正常操作使用，可以认为我们已经将小程序跑起来了。
    ![截图](https://cdn.nlark.com/yuque/0/2018/png/84303/1536985350442-fc2f8bf3-7b17-4ea5-95aa-5b8dc7182435.png)

5. 调用服务：调用`const sdk = require('mbaas-js-sdk-alipay')`，可以直接调用对应服务实现程序功能。在本示例的小程序中，可以找到以下服务调用的对应处理。
    * 数据存储：`sdk.db`
    * 文件存储：`sdk.file`

## 资源
