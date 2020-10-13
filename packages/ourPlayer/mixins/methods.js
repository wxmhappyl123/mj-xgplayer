export default {
  methods: {
    /**
     * @description 暂停同时满足正在播放与未暂停两个条件的播放器
     */
    videoPause() {
      if (this.player.hasStart && !this.player.paused) {
        this.player.pause()
      }
    },
    /**
     * @description 销毁所有分屏实例
     */
    destroyPlayers() {
      if (this.players.length) {
        this.players.forEach(player => {
          player.src = ''
          player.config.url = ''
          player.destroy()
          player = null
        })
        this.players = []
      }

    },
    /**
     * @description 销毁视频实例
     */
    destroyPlayer() {
      if (this.player) {
        this.player.src = ''
        this.player.config.url = ''
        this.player.destroy()
        this.player = null
      }

    },
  }
}