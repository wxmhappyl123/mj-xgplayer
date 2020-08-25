<template>
  <div class="video-content">
    <!--

    在模板中使用计算属性localVideoList，目的只是能触发逻辑，界面上不用出现，所以隐藏起来
    如果使用监听选项watch，监听传入的视频数组，因为代码中包含改变数组的逻辑，整块watch代码会无限循环

    -->
    <p style="display: none;">{{localVideoList.length}}</p>
    <div
      class="video-fix"
      :style="videoStyles"
      v-for="item of splitScreenNum"
      :key="item"
      :id="`${item}videoID-${hashStr}`"
    >
      <div class="logo-box"
           :id="`logoBox${item}-${hashStr}`"
           :style="{marginLeft: `-${logoWidth / 2}px`, marginTop: `-${logoWidth / 2}px`}"
           v-if="showDefaultLogo">
        <slot name="logo">
          <!--默认logo-->
          <img :src="logo" alt="logo">
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
  // 引入西瓜播放器
  import Player from 'xgplayer'
  import 'xgplayer'
  import 'xgplayer-mp4'
  import HlsJsPlayer from 'xgplayer-hls.js'
  import FlvJsPlayer from 'xgplayer-flv.js'
  // 执行插件
  import './plugins/closeVideo'
  import './plugins/error'
  // 自定义样式
  // import '../assets/css/.xgplayer/skin/index.js'

  /*
  * 常量
  */
  // 视频源后缀名正则
  const videoSuffixReg = /(\.mp4|\.m3u8|\.flv)$/i
  // 分屏样式参数
  const videoStyleOptions = {
    1: 'width: 100% !important;height: 100% !important;',
    4: 'width: 49% !important;height: 49% !important;',
    9: 'width: 33% !important;height: 33% !important;',
    16: 'width: 24% !important;height: 24% !important;',
  }
  // 视频参数
  const commonVideoOptions = {
    id: '', // 播放器容器DOM的ID
    url: '', // 视频源
    width: 0, // 宽度
    height: 0, // 高度
    isLive: false, // flv格式视频流是否开启直播
    playsinline: true, // 开启ios和微信的内联模式
    screenShot: true,// 是否开启截图
    autoplay: true, // 是否自动播放
    crossOrigin: true, // 是否跨域
    download: true, //是否下载视频
    pip: false, // 是否开启画中画
    definitionActive: 'hover', // 修改清晰度控件的触发方式
    poster: '', // 封面图
    playbackRate: [0.5, 0.75, 1, 1.5, 2], // 倍速播放
    defaultPlaybackRate: 1.5, // 默认倍速
    ignores: [], // 忽略内部插件
    /*danmu: {
      comments: [
        {
          duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
          id: '1', //弹幕id，需唯一
          start: 1000, //弹幕出现时间，毫秒
          prior: false, //该条弹幕优先显示，默认false
          color: true, //该条弹幕为彩色弹幕，默认false
          txt: '我是一条孤独的弹幕~~~', //弹幕文字内容
          style: {  //弹幕自定义样式
            color: '#ff9500',
            fontSize: '20px',
          }
        },{
          duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
          id: '2', //弹幕id，需唯一
          start: 1000, //弹幕出现时间，毫秒
          prior: false, //该条弹幕优先显示，默认false
          color: true, //该条弹幕为彩色弹幕，默认false
          txt: '我是一条孤独的弹幕~~~', //弹幕文字内容
          style: {  //弹幕自定义样式
            color: '#ff9500',
            fontSize: '20px',
          }
        },
        {
          duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
          id: '3', //弹幕id，需唯一
          start: 1000, //弹幕出现时间，毫秒
          prior: false, //该条弹幕优先显示，默认false
          color: true, //该条弹幕为彩色弹幕，默认false
          txt: '我是一条孤独的弹幕~~~', //弹幕文字内容
          style: {  //弹幕自定义样式
            color: '#ff9500',
            fontSize: '20px',
          }
        },
        {
          duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
          id: '4', //弹幕id，需唯一
          start: 1000, //弹幕出现时间，毫秒
          prior: false, //该条弹幕优先显示，默认false
          color: true, //该条弹幕为彩色弹幕，默认false
          txt: '我是一条孤独的弹幕~~~', //弹幕文字内容
          style: {  //弹幕自定义样式
            color: '#ff9500',
            fontSize: '20px',
          }
        }

      ],  //弹幕数组
      area: {  //弹幕显示区域
        start: 0, //区域顶部到播放器顶部所占播放器高度的比例
        end: 1 //区域底部到播放器顶部所占播放器高度的比例
      },
    },*/
  }
  // 弹幕参数
  const commonDanmuOptions = {
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

  export default {
    name: "inphasePlayer",
    props: {
      /**
       * 是否为直播
       * */
      live: {
        type: Boolean,
        default: false
      },
      /**
       * 是否开启截屏
       * */
      screenShot: {
        type: Boolean,
        default: true
      },
      /**
       * 封面图
       * */
      poster: {
        type: String,
        default: ''
      },
      /**
       * 是否开启下载
       * */
      download: {
        type: Boolean,
        default: true
      },
      /**
       * 是否开启画中画
       * */
      pip: {
        type: Boolean,
        default: false
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
       * 是否开启自动播放
       */
      autoplay: {
        type: Boolean,
        default: true
      },
      /**
       * 是否开启跨域
       */
      crossOrigin: {
        type: Boolean,
        default: true
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
       * 清晰度列表触发方式
       */
      definitionActive: {
        type: String,
        validator: function (value) {
          // 这个值必须匹配下列数字中的一个
          return ['hover', 'click'].indexOf(value) !== -1
        },
        default: 'hover'
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
       * 默认倍速
       */
      defaultPlaybackRate: {
        type: Number,
        validator: function (value) {
          // 这个值必须匹配下列数字中的一个
          return [0.5, 0.75, 1, 1.5, 2].indexOf(value) !== -1
        },
        default: 1
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
    },
    data() {
      return {
        // logo宽度
        logoWidth: 50,
        // 默认logo
        logo: require('./assets/img/logo.png'),
        // 单个播放器对象
        player: null,
        // 播放器实例对象数组
        players: [],
        // 容器宽度
        clientWidth: '',
        // 容器高度
        clientHeight: '',
        // 容器尺寸样式
        videoStyles: '',
      }
    },
    watch: {
      /**
       * 监听分屏数变化
       */
      splitScreenNum(val) {
        let len = this.videoList.length
        if (len > val) {
          this.videoList.splice(val, len - val)
          this.players.forEach((player, index) => {
            if (index >= val) {
              player.destroy()
            }
          })
          this.players.splice(val, len - val)
        }
        this.setScreenStyle()
      },
      /**
       * 监听传入的单个视频源
       */
      videoUrl(val) {
        if (this.videoList.length !== 0) throw new Error('video-list 与 video-url 不能混用')
        // 更新后的值为空时，直接跳出循环
        if (!val) return
        // 判断视频源是否符合支持的格式
        if (!this.suffixParser(val)) throw new Error('仅支持mp4, m3u8, flv格式视频或直播流')
        this.initVideo(val)
      },
      /**
       * 监听弹幕
       */
      /*danmu(val) {
        let len = val.length - 1
        if (!val[len]) throw new Error('传入的弹幕为空')
        if (typeof val[len] === 'string') {
          const danmuOptions = {...commonDanmuOptions}
          danmuOptions.id = `${Date.now()}`
          danmuOptions.txt = val[len]
          this.player.danmu.sendComment(danmuOptions)
        } else {
        }
      }*/
    },
    mounted() {
      // 初始化视频样式
      this.setScreenStyle()
      if (!this.videoUrl) return
      // 初始化时，外部url符合支持格式，则直接播放
      if (this.suffixParser(this.videoUrl)) {
        this.initVideo(this.videoUrl)
      } else {
        throw new Error('仅支持mp4, m3u8, flv格式视频或直播流')
      }
    },
    computed: {
      /**
       * 生成hash值
       */
      hashStr() {
        let hash = 8
        const dictionary = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        const len = dictionary.length
        let randomStr = ''
        for (let i = 0; i < hash; i++) {
          randomStr += dictionary[this.createRandomNum(0, len)]
        }
        return randomStr
      },
      /**
       * 处理分屏数
       */
      splitScreenNum() {
        if ([1, 4, 9, 16].indexOf(this.splitScreen) > -1) {
          return this.splitScreen
        } else {
          return 1
        }
      },
      /**
       *  监听视频数组的变化
       */
      localVideoList() {
        let len = this.videoList.length

        // 处理视频源混用，两者同时存在，抛出错误
        if (len !== 0 && this.videoUrl !== '') {
          throw new Error('video-list 与 video-url 不能混用')
        }
        // 当视频数组为空时，跳出函数，避免报错
        if (len === 0) {
          return []
        }
        let lastVideoUrl = this.videoList[len - 1].url

        // 判断视频源是否符合支持的格式
        if (!this.suffixParser(lastVideoUrl)) throw new Error('仅支持mp4, m3u8, flv格式视频或直播流')

        // 新加入的视频url，如果是重复的，则不加入
        let flagIndex = this.videoList.findIndex(item => (item ? item.url : '') === lastVideoUrl)
        // 找出第一个无视频源播放器实例索引
        const firstClosedPlayerIndex = this.players.findIndex(player => player.hasClosed ? !(player.hasClosed = false) : false)
        // 如果找到的坐标就是新加入视频的坐标，则没有重复
        if (flagIndex === len - 1) {
          // 替换首个通过按钮关闭的视频源信息
          if (firstClosedPlayerIndex > -1) {
            this.toggleVideo(firstClosedPlayerIndex)
            return []
          }

          // 当数组长度超过当前分屏数时，用新元素替换原数组最后一位元素
          if (len > this.splitScreenNum) {
            this.videoList[this.splitScreenNum - 1] = this.videoList.pop()
          }
          this.initVideos(this.videoList[this.videoList.length - 1], this.videoList.length)
          return []

        } else {
          // 触发视频重复事件
          this.$emit('repeat-video', this.videoList.pop())
        }
        return []
      }
    },
    methods: {
      /**
       * @description 切换视频源相关参数
       * @param index {Number} - 首个关闭的视频数组下标
       * @return {null}
       */
      toggleVideo(index) {
        const firstClosedPlayer = this.players[index]
        const pop = this.videoList.pop()
        firstClosedPlayer.src = pop.url
        firstClosedPlayer.config.url = pop.url
        // 找到之后播放同时切换清晰度视频源
        firstClosedPlayer.emit('resourceReady', this.filterDefinition(pop.definitionList, pop.url))
        // 同步播放器实例与视频数组的对应关系
        this.videoList.splice(index, 1, pop)
      },
      /**
       * @description 暂停同时满足正在播放与未暂停两个条件的播放器
       * @return {null}
       */
      videoPause() {
        if (this.player.hasStart && !this.player.paused) {
          this.player.pause()
        }
      },
      /**
       * @description 生成从最小范围至最大范围的随机数，不包括最大范围
       * @param min {Number} - 最小范围
       * @param max {Number} - 最大范围
       * @return {Number} - 随机数
       */
      createRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min)) + min
      },
      /**
       * @description 处理相同的配置
       * @param videoOptions {Object} - 配置对象
       * @return {null}
       */
      handleSamePlayerOptions(videoOptions) {
        // 在手机模式下或者直播状态下忽略默认error插件
        if (!Player.sniffer.os.isPc || this.live) videoOptions.ignores = ['error']
        // 直播模式下，不显示下载按钮
        videoOptions.download = this.live ? false : this.download
        videoOptions.screenShot = this.screenShot
        videoOptions.autoplay = this.autoplay
        videoOptions.crossOrigin = this.crossOrigin
        videoOptions.definitionActive = this.definitionActive
        videoOptions.defaultPlaybackRate = this.defaultPlaybackRate
      },
      /**
       * @description 处理播放器注册事件
       * @param player {Object} -  播放器实例
       * @param logoBoxDom {Object} -  默认logo Dom对象
       * @return {null}
       */
      handlePlayerEvents(player, logoBoxDom) {
        // 视频加载失败时触发
        player.on('error', () => {
          this.$emit('play-error', player.error)
        })
        // 视频播放时触发
        // 监听play事件会导致已经播放的视频暂停，但后续视频无法播放
        player.on('playing', ({msg, rootId}) => {
          logoBoxDom.style.display = 'none'
          // 移动端同一页面是否只能播放一个视频
          if (this.onlyOnePlay) {
            this.$parent.$children.forEach(component => {
              // 暂停当前播放视频之外的视频
              if (component._uid !== this._uid && component.$options.name === 'inphasePlayer') {
                component.videoPause()
              }
            })
          }
          // 监听通过关闭按钮传递的事件
          if (msg === 'closeVideo') {
            if (this.live) logoBoxDom.style.display = 'block'
            // 伪数组转化为数组
            const videoFixDom = [...document.querySelectorAll('.video-fix')]
            const deleteIndex = videoFixDom.findIndex(item => item.id === rootId)
            // 不改变现有坐标顺序情况下，清空该坐标视频信息
            this.videoList[deleteIndex] = null
          }

        })
        // 实例销毁后注销事件
        player.once('destroy', () => {
          this.onPlayerDestroy(player)
        })

      },
      /**
       * @description 注销播放器实例事件
       * @param player {Object} - 播放器实例
       * @return {null}
       */
      onPlayerDestroy(player) {
        player.off('error', () => {
        })
        player.off('playing', () => {
        })
        player.off('destroy', () => {
        })
      },
      /**
       * @description 根据不同的视频源格式创建不同的player实例
       * @param suffix {String} - 视频源后缀名
       * @param options {Object} - 配置对象
       * @return {Object} - player实例
       */
      distinguishPlayerType(suffix, options) {
        if (suffix === '.mp4') {
          return new Player(options)
        } else if (suffix === '.m3u8') {
          return new HlsJsPlayer(options)
        } else if (suffix === '.flv') {
          return new FlvJsPlayer(options)
        }
      },
      /**
       * @description 解析视频类型
       * @param url {String} - 视频源
       * @return {String} - 对应的后缀名或空字符串
       */
      suffixParser(url) {
        const result = videoSuffixReg.exec(url)
        // 统一处理为小写
        return result ? result[0].toLowerCase() : ''
      },
      /**
       * @description 设置视频配置参数宽高
       * @return {null}
       */
      setVideoView() {
        const videoDom = document.getElementById(`1videoID-${this.hashStr}`)
        const logoBoxDom = document.getElementById(`logoBox1-${this.hashStr}`)
        // 初始化时取首张图片的宽度
        // 播放首个视频后，首张图片会被隐藏，宽度为0
        // 如果logoWidth已经初始化，则不再修改其宽度
        if (!this.logoWidth) {
          // 当外部传入slot时，logo位置表现没问题
          // 当没有传入slot，使用默认分发内容时，会获取不到正确的logo宽度
          // 默认分发内容的dom渲染此时还未进行，只有使用setTimeout在下一个调用栈获取
          if (this.$slots.logo) {
            this.logoWidth = logoBoxDom.clientWidth
          } else {
            window.setTimeout(() => {
              this.logoWidth = logoBoxDom.clientWidth
            }, 0)
          }

        }
        this.clientWidth = videoDom.clientWidth
        this.clientHeight = videoDom.clientHeight
      },
      /**
       * @description 设置分屏样式
       * @return {null}
       */
      setScreenStyle() {
        this.setVideoView()
        this.videoStyles = videoStyleOptions[`${this.splitScreenNum}`]
      },
      /**
       * @description 初始化多个视频源
       * @param videoMsg {Object} - 视频源对象
       * @param length {Number} - 数组下标
       * @return {null}
       */
      initVideos(videoMsg, length) {
        const videoOptions = {...commonVideoOptions}
        // flv格式视频需要开启直播选项
        if (this.suffixParser(videoMsg.url) === '.flv') videoOptions.isLive = this.live
        videoOptions.id = `${length}videoID-${this.hashStr}`
        videoOptions.url = videoMsg.url
        videoOptions.poster = videoMsg.poster
        videoOptions.definitionList = videoMsg.definitionList
        // 相同的配置统一处理
        this.handleSamePlayerOptions(videoOptions)
        this.createPlayers(videoOptions, length)
      },
      /**
       * @description 初始化单个视频源
       * @param url {String} - 视频源地址
       * @return {null}
       */
      initVideo(url) {
        const videoOptions = {...commonVideoOptions}
        // flv格式视频需要开启直播选项
        if (this.suffixParser(url) === '.flv') videoOptions.isLive = this.live
        videoOptions.id = `1videoID-${this.hashStr}`
        videoOptions.url = url
        videoOptions.poster = this.poster
        this.handleSamePlayerOptions(videoOptions)
        this.createPlayer(videoOptions)
      },
      /**
       * @description 创建多个视频对象
       * @param options {Object} - 配置对象
       * @param length {Number} - 数组下标
       * @return {null}
       */
      createPlayers(options, length) {
        const logoBoxDom = document.getElementById(`logoBox${length}-${this.hashStr}`)
        const currPlayer = this.players[length - 1]
        // 当前player实例已存在，则重新拉流
        if (currPlayer) {
          currPlayer.src = options.url
          // 同时更改视频配置中的url，避免点击重试按钮时会播放拉之前的流的bug
          currPlayer.config.url = options.url
        } else {
          this.players[length - 1] = this.distinguishPlayerType(this.suffixParser(options.url), options)
        }
        // 处理播放器监听事件
        this.handlePlayerEvents(this.players[length - 1], logoBoxDom)
        // 处理视频清晰度
        this.emitDefinition(options, length)
      },
      /**
       * @description 创建单个视频对象
       * @param options {Object} - 配置对象
       * @return {null}
       */
      createPlayer(options) {
        const logoBoxDom = document.getElementById(`logoBox1-${this.hashStr}`)
        // 当前player实例已存在，则重新拉流
        if (this.player) {
          this.player.src = options.url
          this.player.config.url = options.url
        } else {
          this.player = this.distinguishPlayerType(this.suffixParser(options.url), options)
        }
        // 处理播放器监听事件
        this.handlePlayerEvents(this.player, logoBoxDom)
        // 处理视频清晰度
        this.emitDefinition(options, 1)
      },
      /**
       * @description 触发清晰度设置
       * @param options {Object} - 配置对象
       * @param length {Number} - 数组下标
       * @return {null}
       */
      emitDefinition(options, length) {
        /*
           * 开启多个视频源清晰度切换功能，
           * 需要同时满足
           * props中的definitionList为空，
           * options中definitionList不为空,
           * 否则控制台报错。
           * 开启单个视频源则反之。
           * */
        const singleDefinitionListLen = this.definitionList ? this.definitionList.length : 0
        const multiDefinitionListLen = options.definitionList ? options.definitionList.length : 0

        if (!singleDefinitionListLen && multiDefinitionListLen) {
          // 多个视频源
          let filterList = this.filterDefinition(options.definitionList, options.url)
          this.players[length - 1].emit('resourceReady', filterList)
        } else if (singleDefinitionListLen && !multiDefinitionListLen) {
          // 单个视频源
          let filterList = this.filterDefinition(this.definitionList, this.videoUrl)
          this.player.emit('resourceReady', filterList)
        } else if (singleDefinitionListLen && multiDefinitionListLen) {
          throw new Error('不能同时传入单个和多个视频源所需要的definitionList')
        }
      },
      /**
       * @description 过滤清晰度数组
       * @param definitionList {Array} - 清晰度数组
       * @param url {String} - 视频源
       * @return {Array} - 过滤后的清晰度数组
       */
      filterDefinition(definitionList, url) {
        if (Array.isArray(definitionList)) {
          // 默认当前url为标清资源
          if (!definitionList[0].url) {
            definitionList[0].url = url
          }
          // 过滤没有url资源的清晰度
          return definitionList.filter(item => !!item.url)
        }
      }
    }
  }
</script>

<style scoped>
  .video-content {
    width: 100%;
    height: 100%;
    /*background-color: red;*/
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .video-fix {
    position: relative;
    background-color: #000;
  }

  /deep/ .xgplayer-skin-default .xgplayer-definition .name {
    right: 0;
  }

  .logo-box {
    position: absolute;
    left: 50%;
    top: 50%;
  }

</style>
