import {videoStyleOptions} from "../assets/constant"

export default {
  data() {
    return {
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
  },
  computed: {
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
  },
  methods: {
    /**
     * @description 设置视频配置参数宽高
     * @return {null}
     */
    setVideoView() {
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
    },
    /**
     * @description 设置分屏样式
     * @return {null}
     */
    setScreenStyle() {
      this.setVideoView()
      this.videoStyles = videoStyleOptions[`${this.splitScreenNum}`]
    },
  }
}