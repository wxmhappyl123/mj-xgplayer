export default {
  methods: {
    /**
     * @description 触发清晰度设置
     * @param options {Object} - 配置对象
     * @param length {Number} - 数组下标
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