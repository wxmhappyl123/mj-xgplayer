export default {
  methods: {
    /**
     * @description 处理播放器注册事件
     * @param player {Object} - 播放器实例
     * @param length {number | boolean} - 数组长度
     */
    handlePlayerEvents(player, length) {
      const logoBoxDom = document.getElementById(`logoBox${typeof length === 'number' ? length : 1}-${this.hashStr}`)

      // 视频加载失败时触发
      player.on('error', () => {
        this.$emit('play-error', player.error)
      })
      // 视频播放时触发
      // 监听play事件会导致已经播放的视频暂停，但后续视频无法播放
      player.on('playing', ({msg, rootId}) => {
        let videoFixDom = null, deleteIndex = null

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

        if (msg) {
          videoFixDom = [...document.querySelectorAll('.video-fix')]
          deleteIndex = videoFixDom.findIndex(item => item.id === rootId)
        }


        // 监听通过关闭按钮传递的事件
        if (msg === 'closeVideo') {
          if (this.live) logoBoxDom.style.display = 'block'

          // 不改变现有坐标顺序情况下，清空该坐标视频信息
          // 如果不是单个视频源使用方法，才能执行以下逻辑
          if (!this.videoUrl.length) {
            // 加入删除调用映射
            this.deleteVideoMap[deleteIndex] = this.videoList[deleteIndex]
            this.videoList[deleteIndex] = null
          }
        }
        // 刷新时，将被清空的视频源数据插入相应位置
        if (msg === 'pcError') {
          if (!this.videoUrl.length) {
            this.videoList[deleteIndex] = this.deleteVideoMap[deleteIndex]
            this.deleteVideoMap[deleteIndex] = null
          }
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
     */
    onPlayerDestroy(player) {
      ['error', 'playing', 'destroy'].forEach(event => {
        player.off(event, () => {})
      })
    },
  }
}