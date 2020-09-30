import {commonVideoOptions} from "../assets/constant"

export default {
  data() {
    return {
      // 单个播放器对象
      player: null,
    }
  },
  watch: {
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
  },
  methods: {
    /**
     * @description 初始化单个视频源
     * @param url {String} - 视频源地址
     */
    initVideo(url) {
      const videoOptions = {...commonVideoOptions}
      // flv格式视频需要开启直播选项
      if (this.suffixParser(url) === '.flv') videoOptions.isLive = this.live
      videoOptions.id = `1videoID-${this.hashStr}`
      videoOptions.url = url
      videoOptions.poster = this.poster
      videoOptions.customConfig.videoName = this.videoName
      this.handleSamePlayerOptions(videoOptions)
      this.createPlayer(videoOptions)
    },
    /**
     * @description 创建单个视频对象
     * @param options {Object} - 配置对象
     */
    createPlayer(options) {
      const videoNameText = document.querySelector('.video-name-text')
      // 当前player实例已存在，则重新拉流
      if (this.player) {
        // 解决重载会回到最初视频源的bug
        this.player.config.url = options.url
        this.player.config.customConfig.videoName = this.videoName
        // 重新起播，解决重播会回到最初视频源的bug
        this.player.start(options.url)
        videoNameText.innerText = this.videoName
      } else {
        this.player = this.distinguishPlayerType(this.suffixParser(options.url), options)
      }
      // 处理播放器监听事件
      this.handlePlayerEvents(this.player, false)
      // 处理视频清晰度
      this.emitDefinition(options, 1)
    },
  }
}