import {commonVideoOptions} from "../assets/constant"

export default {
  data() {
    return {
      // 播放器实例对象数组
      players: []
    }
  },
  computed: {
    /**
     *  监听视频数组的变化
     */
    localVideoList() {
      const len = this.videoList.length
      // 处理视频源混用，两者同时存在，抛出错误
      if (len !== 0 && this.videoUrl !== '') {
        throw new Error('video-list 与 video-url 不能混用')
      }
      // 当视频数组为空时，跳出函数，避免报错
      if (len === 0) {
        return []
      }
      // 关闭视频后，当前位置视频信息被清空，避免报错
      if (!this.videoList[len - 1]) return []

      const lastVideoUrl = this.videoList[len - 1].url
      // 判断视频源是否符合支持的格式
      if (!this.suffixParser(lastVideoUrl)) throw new Error('仅支持mp4, m3u8, flv格式视频或直播流')

      // 新加入的视频url，如果是重复的，则不加入
      const flagIndex = this.videoList.findIndex(item => (item ? item.url : '') === lastVideoUrl)
      // 找出第一个无视频源播放器实例索引, 同时满足被关闭的标记和未播放
      const firstClosedPlayerIndex = this.videoList.findIndex(item => item === null)
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
        const filterLen = this.videoList.length
        const lastVideo = this.videoList[filterLen - 1]
        this.initVideos(lastVideo, filterLen)
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
     * @description 初始化多个视频源
     * @param videoMsg {Object} - 视频源对象
     * @param length {Number} - 数组下标
     */
    initVideos(videoMsg, length) {

      const videoOptions = {...commonVideoOptions, ...this.xgConfig}
      // flv格式视频需要开启直播选项
      if (this.suffixParser(videoMsg.url) === '.flv') {
        videoOptions.flvOptionalConfig = {
          type: 'flv',
          isLive: this.live,
          enableWorker: true
        }
      } else if (this.suffixParser(videoMsg.url) === '.m3u8') {
        videoOptions.isLive = this.live
      }
      videoOptions.id = `${length}videoID-${this.hashStr}`

      videoOptions.url = videoMsg.url
      videoOptions.poster = videoMsg.poster
      videoOptions.definitionList = videoMsg.definitionList
      videoOptions.customConfig.videoName = videoMsg.name

      // 相同的配置统一处理
      this.handleSamePlayerOptions(videoOptions)
      this.createPlayers(videoOptions, length)
    },
    /**
     * @description 创建多个视频对象
     * @param options {Object} - 配置对象
     * @param length {Number} - 数组下标
     */
    createPlayers(options, length) {
      // 视频名称dom
      const videoNameTexts = document.querySelectorAll('.video-name-text')
      const currPlayer = this.players[length - 1]
      // 同时满足该实例存在,正在播放，改变了分屏数,避免切换分屏时最后一块屏幕重新加载
      if (currPlayer && currPlayer.hasStart && this.hasChangeSplitNum) return this.hasChangeSplitNum = false
      let currTextDom = null
      // 当前player实例已存在，则重新拉流
      if (currPlayer) {
        // 同时更改视频配置中的url，避免点击重试按钮时会播放拉之前的流的bug
        currPlayer.config.url = options.url
        currPlayer.config.customConfig.videoName = options.customConfig.videoName
        if (this.live) {
          currPlayer.src = options.url
        } else {
          currPlayer.start(options.url)
        }
        if (videoNameTexts) {
          // 找到当前替换的那个视频名称dom
          currTextDom = [...videoNameTexts].find((dom, index) => index === length - 1)
          currTextDom.innerText = options.customConfig.videoName
        }
      } else {
        this.players[length - 1] = this.distinguishPlayerType(this.suffixParser(options.url), options)
      }
      // 处理播放器监听事件
      this.handlePlayerEvents(this.players[length - 1], length)
      // 处理视频清晰度
      this.emitDefinition(options, length)
    }
  }
}