# 起步
安装西瓜视频
```
 npm i xgplayer
```
安装hls插件
```
 npm i xgplayer-hls.js
```
安装mp4插件
```
npm i xgplayer-mp4
```
安装flv插件
```
npm i xgplayer-flv.js
```
将整个`ourPlayer`文件夹放入组件目录`components`下，使用该组件
```js
import InphasePlayer from '../components/ourPlayer'
```
在`main.js`中引入`iconfont`文件
```js
import './ourPlayer/assets/iconfont/iconfont.css'
```
如果需要自定义样式，安装以下`loader`（自定义样式功能暂未开放）
```
npm i node-sass sass-loader raw-loader
```
# API
## 属性
### 分屏数
- 配置项：`split-screen`
- 类型: Number
- 默认值：1
- 参考值：1 | 4 | 9 | 16
- 描述：传入参考值以外的值控制台会报错，值默认回到1。

### 视频源
- 配置项：`video-url`
- 类型: String
- 默认值：''
- 描述：单个视频源。不支持分屏功能。该参数不能与`video-list`混用，否则可能会有意料之外的错误。

### 视频数据
- 配置项：`video-list`
- 类型: Array< Object >
- 默认值：[]
- 参考数据结构：
```
[
    {
        url: '', // 摄像头视频或直播流url
        definitionList: [ //  清晰度数据
           {
              name: '标清', // 渲染为清晰度切换播放栏选项
              url: ''
           }，
           {
              name: '高清',
              url: ''
           }，
           {
              name: '超清',
              url: ''
           }
        ],
        poster: '' // 封面图
    }
]
```
- 描述：多个视频源。支持分屏功能。
        该参数不能与`video-url`混用，否则可能会有意料之外的错误。
        
### 清晰度
- 配置项：`definition-list`
- 类型: Array < Object >
- 默认值：[]
- 参考数据结构：
```
第①种方式：
[
  {
     name: '标清', // 渲染为清晰度切换播放栏选项
     url: ''
  }，
  {
     name: '高清',
     url: ''
  }，
  {
     name: '超清',
     url: ''
  }
]
```
- 描述：仅在通过`video-url`传入单个视频源时使用。
        切换`video-url`时，需要同时切换该选项，保持视频源与该视频源清晰度资源同步。
        多个视频源需要通过新增对象属性`definitionList`来使用。
        
### 清晰度触发方式
- 配置项：`definition-active`
- 类型：String
- 默认值：'hover'
- 参考值：'hover' | 'click'
- 描述：通过不同的触发方式来显示清晰度切换列表。

### 直播
- 配置项：`live`
- 类型: Boolean
- 默认值：false
- 参考值：true | false
- 描述：开启直播，支持直播视频流。组件只能通过该参数判断当前视频源是否为
        直播流，所以请根据当前业务进行严格区分，否则会有意料之外的结果。

### 截屏
- 配置项：`screen-shot`
- 类型: Boolean
- 默认值：true
- 参考值：true | false
- 描述：是否开启截屏功能。

### 封面图
- 配置项：`poster`
- 类型: String
- 默认值：''
- 描述：当播放器初始化后在用户点击播放按钮前显示的图像。
        多个视频源需要通过新增对象属性`poster`来使用。

### 下载
- 配置项：`download`
- 类型: Boolean
- 默认值：true
- 参考值：true | false
- 描述：是否开启下载功能。

### 自动播放
- 配置项：`autoplay`
- 类型：Boolean
- 默认值：true
- 参考值：true | false
- 描述：是否开启自动播放功能。

### 跨域
- 配置项：`cross-origin`
- 类型：Boolean
- 默认值：true
- 参考值：true | false
- 描述：是否跨域。

### 唯一视频播放
- 配置项：`only-one-play`
- 类型：Boolean
- 默认值：false
- 参考值：true | false
- 描述：在同一个页面是否只允许播放一个视频。仅支持通过`video-url`传入的视频源。


### 默认倍速
- 配置项：`default-playback-rate`
- 类型：Number
- 默认值：1
- 参考值：0.5 | 0.75 | 1 | 1.5 | 2
- 描述：设置默认倍速。

### 弹幕(暂未支持)
- 配置项：`danmu`
- 类型：Array< Object > | Array< String >
- 默认值：[]
- 参考数据结构：
```
第①种方式
[
  {   
      duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
      start: 3000, //弹幕出现时间，毫秒
      prior: true, //该条弹幕优先显示，默认false
      color: true, //该条弹幕为彩色弹幕，默认false
      txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
      style: {  //弹幕自定义样式
               color: '#ff9500',
               fontSize: '20px',
               border: 'solid 1px #ff9500',
               borderRadius: '50px',
               padding: '5px 11px',
               backgroundColor: 'rgba(255, 255, 255, 0.1)'
             },
      mode: 'scroll' //显示模式，top顶部居中，bottom底部居中，scroll滚动，默认为scroll
  }
]
或第②种方式
[
  '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕',
  '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕',
  '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕'
]
```
- 描述：仅适用于单个视频源添加弹幕内容。使用第①种方式，数组元素为对象，可以对弹幕进行详细配置。
  使用第②种方式，数组元素为字符串，可以快捷得添加默认配置的弹幕。
  
### 默认logo
- 配置项：`show-default-logo`
- 类型：Boolean
- 默认值：true
- 参考值：true | false
- 描述：是否开启默认logo功能。

## 插槽
### 默认logo
- 描述：通过`#logo`或`v-slot:logo`具名插槽插入logo图片，
  可自定义大小，会自动垂直水平居中，在视频开始播放之后消失。
  如果不传logo图片，会显示默认logo。
  如果不需要该功能，可通过`showDefaultLogo`属性关闭。
- 使用方法：
```html
<inphase-player>
   <template #logo>
       <img :src="logo" alt="logo" width="80px" height="80px">
   </template>
</inphase-player>
```

## 事件
### 监听视频重复
- 配置项：`repeat-video`
- 返回类型：Object
- 返回值：重复的视频对象
- 描述：当传入重复视频时，该事件触发。仅针对多个数据源生效。

### 监听视频播放错误
- 配置项：`play-error`
- 返回类型：(Object, String)
- 返回值：第一个参数为出错的当前视频配置对象，第二个参数为错误信息
- 描述：当视频播放出错时，该事件触发。

# 功能详细及注意事项
### 分屏
1. 通过url对比，重复的视频不会播放，不会占用分屏板块，同时会触发`repeat-video`自定义事件
2. 当前分屏数全部播放视频后，后续再添加视频，只替换最后一块屏
3. 当分屏较多时，切到较少分屏时，超出较少分屏数的视频会被销毁
4. 当替换视频时，原理为重新拉流，并非将该视频实例销毁了重建，后者会导致重建的播放器无法显示播放栏

### 关闭视频
1. 点击视频右上角的`×`可清除当前视频信息，但视频实例未销毁
2. 清除视频之后，再新增视频将会从头到尾依次增加，中间有未清除的视频会自动跳过

### 清晰度
1. 该数组中第一个参数必须为`标清`视频对象，后续清晰度对象则可传可不传。
2. 当不传入`标清url`时，默认标清为当前传入`url`。
3. `标清`之外的清晰度若不传入`url`，则播放器上对应清晰度字样不会显示。
4. 如果视频地址列表只有一个地址，清晰度切换控件也会自动关闭。

### 切换视频
1. 在同一块屏幕上，如果已经播放过一个特定格式的视频源，
   那么切换时不能切换到另一种格式的视频源，必须为同一种格式。
2. 如果一块屏幕从未播放过或者通过上述**分屏**板块第3项操作销毁，
    那么则支持切换不同格式的视频。

### 唯一视频播放
1. 当一个页面有多个该组件播放视频，播放其中一个，另外的视频会自动暂停，避免干扰当前播放的视频。
2. 通过组件自带分屏功能实现的多个视频播放不支持该属性。
