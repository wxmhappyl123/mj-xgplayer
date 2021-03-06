// 视频源后缀名正则
export const videoSuffixReg = /(\.mp4|\.m3u8|\.flv)$/i
// 分屏样式参数
export const videoStyleOptions = {
  1: 'width: 100% !important;height: 100% !important;',
  4: 'width: 49% !important;height: 49% !important;',
  9: 'width: 33% !important;height: 33% !important;',
  16: 'width: 24% !important;height: 24% !important;',
}
// 被删除的视频索引
export const deleteVideoMap = Array(16).fill(null)
// 视频参数
export const commonVideoOptions = {
  id: '', // 播放器容器DOM的ID
  url: '', // 视频源
  width: 0, // 宽度
  height: 0, // 高度
  playsinline: true, // 开启ios和微信的内联模式
  poster: '', // 封面图
  ignores: ['error'], // 忽略内部插件
  customConfig: {
    videoName: '', // 视频名称
    live: false
  },
  lang: 'zh-cn', // 语言
}
// 弹幕参数
export const commonDanmuOptions = {
  duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
  id: '1', //弹幕id，需唯一
  start: 1000, //弹幕出现时间，毫秒
  prior: false, //该条弹幕优先显示，默认false
  color: true, //该条弹幕为彩色弹幕，默认false
  txt: '我是一条孤独的弹幕~~~', //弹幕文字内容
  style: {  //弹幕自定义样式
    color: '#ff9500',
    fontSize: '20px',
  },
  mode: 'scroll' //显示模式，top顶部居中，bottom底部居中，scroll滚动，默认为scroll
}

export const props = {
  /**
   * 是否为直播
   * */
  live: {
    type: Boolean,
    default: false
  },
  xgConfig: {
    type: Object,
    default() {
      return {}
    }
  },
  /**
   * 封面图
   * */
  poster: {
    type: String,
    default: ''
  },
  /**
   *  分屏数
   * */
  splitScreen: {
    type: Number,
    validator: function (value) {
      // 这个值必须匹配下列数字中的一个
      return [1, 4, 9, 16].indexOf(value) !== -1
    },
    default: 1
  },
  /**
   *  视频数据
   * */
  videoList: {
    type: Array,
    default() {
      return []
    }
  },
  /**
   *  单个视频源
   */
  videoUrl: {
    type: String,
    default: ''
  },
  /**
   * 单个视频源名称
   */
  videoName: {
    type: String,
    default: ''
  },
  /**
   * 清晰度数据
   */
  definitionList: {
    type: Array,
    default() {
      return []
    }
  },
  /**
   * 弹幕数据
   */
  danmu: {
    type: Array,
    default() {
      return []
    }
  },
  /**
   * 同一个页面是否只允许一个视频播放
   */
  onlyOnePlay: {
    type: Boolean,
    default: false
  },
  /**
   * 是否展示默认logo
   */
  showDefaultLogo: {
    type: Boolean,
    default: true
  }
}