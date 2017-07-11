# MakeCode_H5

粘贴商品链接，生成二维码。微信扫码拉起小程序。

### concurrently

安装concurrently  可以同时运行两个命令（gulp&webpack）
```
 "scripts": {
    "ng": "ng",
    "sass": "gulp",
    "dev": "webpack-dev-server --inline --progress --port 8080 --host 0.0.0.0",
    "start": "concurrently \"npm run dev\" \"npm run sass\"",
    "build": "rimraf dist && webpack --config config/webpack.prod.js --progress --profile --bail",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  }
```

```
npm install concurrently -g
```


### 打包

bulild 时 需要将src/base.config.ts  Api修改为线上配置   'Api': 'http://api.6city.com'