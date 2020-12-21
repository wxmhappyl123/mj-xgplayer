<template>
  <div class="mobile-demo">
    <div class="player-wrapper">
      <inphase-player
        v-for="video in videoData"
        :video-url="video.url"
        :only-one-play="true"
        :key="video.cameraName"
      >
       <!-- <template #logo>
          <img :src="logo" alt="logo" width="80px" height="80px">
        </template>-->
      </inphase-player>
    </div>
  </div>
</template>

<script>
  // 引入inphase视频组件
  import InphasePlayer from '..'
  // 测试视频数据
  import m3u8VideoData from '../assets/data/m3u8VideoData'
  // import mp4VideoData from './assets/data/mp4VideoData'

  export default {
    name: "mobileDemo",
    components: {
      InphasePlayer
    },
    data() {
      return {
        // 视频源数组
        videoData: [],
        // 默认logo
        logo: require('../assets/img/logo.png'),
      }
    },
    created() {
      // this.videoData = mp4VideoData.slice(0, 5)
    },
    methods: {},
  }
</script>

<style scoped>
  .mobile-demo {
    width: 100vw;
    height: 100vh;
  }

  .player-wrapper {
    width: 100%;
    height: 30vh;
  }
</style>
