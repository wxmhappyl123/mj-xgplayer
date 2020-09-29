<template>
  <div class="video-content">
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
  /*引入西瓜播放器及其支持的插件*/

  import Player from 'xgplayer'
  import 'xgplayer'
  import 'xgplayer-mp4'
  import HlsJsPlayer from 'xgplayer-hls.js'
  import FlvJsPlayer from 'xgplayer-flv.js'

  /*插件*/

  // 关闭按钮
  import './plugins/closeVideo'
  // 移动端错误处理
  import './plugins/mobile-error'
  // PC端错误处理
  import './plugins/pc-error'
  // 视频名称
  import './plugins/video-name'

  /*自定义样式(暂未开放)*/
  // import '../assets/css/.xgplayer/skin/index.js'

  /*常量*/

  import {
    deleteVideoMap,
    props
  } from './assets/constant'

  /*混入逻辑*/

  // 清晰度
  import definition from './mixins/definition'
  // 播放器监听事件
  import events from './mixins/events'
  // 播放器暴露的方法
  import methods from './mixins/methods'
  // 工具函数
  import utils from './mixins/utils'
  // 单个视频源
  import player from './mixins/player'
  // 多个视频源
  import players from './mixins/players'
  // 分屏
  import screenSplit from './mixins/screen-split'

  export default {
    name: "inphasePlayer",
    mixins: [
      definition,
      events,
      methods,
      utils,
      player,
      players,
      screenSplit
    ],
    props,
    data() {
      return {
        // logo宽度
        logoWidth: 0,
        // 默认logo
        logo: require('./assets/img/logo.png'),
        // 删除视频数据存放映射
        deleteVideoMap
      }
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
    methods: {
      /**
       * @description 处理相同的配置
       * @param videoOptions {Object} - 配置对象
       * @return {null}
       */
      handleSamePlayerOptions(videoOptions) {
        // 在手机模式下或者直播状态下忽略默认error插件
        if (!Player.sniffer.os.isPc || this.live) {
          videoOptions.customConfig.live = true
        }
        // 直播模式下，不显示下载按钮
        videoOptions.download = this.live ? false : this.download
        videoOptions.screenShot = this.screenShot
        videoOptions.autoplay = this.autoplay
        videoOptions.definitionActive = this.definitionActive
        videoOptions.defaultPlaybackRate = this.defaultPlaybackRate
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
