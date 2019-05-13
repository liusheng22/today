#### 百度地图API：
 ```
    <!-- 百度地图 - start -->
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=91bc04aac3d665927d8c64750da556a9"></script>
    <!-- 百度地图 - end -->
``` 

#### 和风天气API：
```js
    let WeatherApi = https://free-api.heweather.net/s6/weather/now
```

## 项目挫折：
#### 1、安装cordova插件总是报错( `nable to verify the first certificate` )
    + 解决方法一：
        - 取消ssl验证：`npm config set strict-ssl false`
        - 如果还不成功，将npm源更换为国内镜像
            · `npm config set registry http://registry.cnpmjs.org/`
            · `npm config set registry http://registry.npm.taobao.org/`
    + 解决方法二：
        - 升级：`npm install npm -g --ca=null`
        - 或者：`npm config set ca=""`

#### 2、用codova插件中的storage可以set值，却不能get值(值为`undefined`)
    解决方法：将其封装为promise
```js
    setUserId(uid: string): void {
        this.storage.set('uid', uid);
    }

    getUserId(): Promise<string> {
        return this.storage.get('uid').then((value) => {
            return value;
        });
    };
```

#### 3、项目打包
    打包浏览器端：
        ionic cordova platform add browser --verbose
        ionic cordova build browser --verbose
    安卓打包：
        ionic cordova platform add android --verbose
        ionic cordova build android --verbose
    打包体积更小 更快：
        ionic cordova build android --prod --release

#### 4、项目安装 `app-version` 的插件，打包完后会闪退
    ionic cordova plugin add cordova-plugin-app-version
    原来安装v4：cnpm install @ionic-native/app-version
    现在安装v3：cnpm install --save @ionic-native/app-version@4
    版本号为：
        pack.json => "@ionic-native/app-version": "^4.20.0",

