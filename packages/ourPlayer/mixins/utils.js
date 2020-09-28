import {videoSuffixReg} from '../assets/constant'
export default {
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
  },
  methods: {
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
     * @description 切换视频源相关参数
     * @param index {Number} - 首个关闭的视频数组下标
     * @return {null}
     */
    toggleVideo(index) {
      const firstClosedPlayer = this.players[index]
      const pop = this.videoList.pop()
      const videoNameTexts = document.querySelectorAll('.video-name-text')
      let currTextDom
      firstClosedPlayer.config.url = pop.url
      firstClosedPlayer.config.customConfig.videoName = pop.name
      firstClosedPlayer.start(pop.url)
      currTextDom = [...videoNameTexts].find((dom, i) => i === index)
      currTextDom.innerText = pop.name
      // 找到之后播放同时切换清晰度视频源
      firstClosedPlayer.emit('resourceReady', this.filterDefinition(pop.definitionList, pop.url))
      // 同步播放器实例与视频数组的对应关系
      this.videoList.splice(index, 1, pop)
      // 清空该索引上被记录清空的对象
      this.deleteVideoMap[index] = null
    },
  }
}