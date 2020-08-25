<template>
  <div class="demo">
    <div class="left-tree">
      <ul>
        <li v-for="item of videoData" :key="item.id" @click="toggleCamera(item)">
          <span>{{item.cameraName}}</span>
        </li>
      </ul>
    </div>

    <div class="right-play">
      <div class="grid-content">
        <div style="padding-left: 10vw;">
          <i class="iconfont icon-fenpingfangshi2" title="一屏" @click="toggleSplitScreen(1)"></i>
          <i class="iconfont icon-fenpin2" title="四屏" @click="toggleSplitScreen(4)"></i>
          <i class="iconfont icon-fenpingfangshi" title="九屏" @click="toggleSplitScreen(9)"></i>
          <i class="iconfont icon-fenpingfangshi1" title="十六屏" @click="toggleSplitScreen(16)"></i>
        </div>
        <div class="danmu-input">
          <el-input placeholder="请输入弹幕" v-model="danmuText" size="small" style="width: 50vw;">
            <el-button slot="append" icon="el-icon-edit" @click="ejectDanmu"></el-button>
          </el-input>
        </div>
      </div>
      <div class="play-content">
        <!--多个视频源测试-->
        <inphase-player
          :live="false"
          :split-screen="splitScreen"
          :video-list="videoList"
          :screen-shot="true"
          :download="true"
          :autoplay="true"
          :cross-origin="true"
          definition-active="hover"
          :default-playback-rate="1"
          @repeat-video="onRepeatVideo"
          @play-error="onPlayError"
        >
          <template #logo>
            <img :src="logo" alt="logo" width="80px" height="80px">
          </template>
        </inphase-player>

        <!--单个视频源测试-->
       <!-- <inphase-player
          :live="false"
          :video-url="url"
          :definition-list="definitionList"
          :poster="poster"
        >
          <template #logo>
            <img :src="logo" alt="logo" width="80px" height="80px">
          </template>
        </inphase-player>-->

      </div>
    </div>
  </div>
</template>

<script>
  // 引入inphase视频组件
  import InphasePlayer from '.'
  // 测试视频数据
  import m3u8VideoData from './assets/data/m3u8VideoData'
  import mp4VideoData from './assets/data/mp4VideoData'
  export default {
    name: "demo",
    components: {
      InphasePlayer
    },
    data() {
      return {
        logo: require('./assets/img/logo.png'),
        url: '',
        splitScreen: 1,
        // 与播放器内部数据数组指向同一地址
        videoList: [],
        // 测试视频数据
        videoData: [],
        // 单个视频清晰度数据
        definitionList: [
           {name: '高清', url: ''},
           {name: '超清', url: ''}
        ],
        // 弹幕数据
        danmu: [],
        // 弹幕内容
        danmuText: '',
        // 封面图
        poster: require('./assets/img/截图 (1).png')
      }
    },
    created() {
        // this.videoData = m3u8VideoData
        this.videoData = mp4VideoData
    },
    methods: {
      /**
       * @description 切换分屏数
       * @param num {Number} - 分屏数
       * @return {null}
       */
      toggleSplitScreen(num) {
        this.splitScreen = num
      },
      /**
       * @description 选择播放视频
       * @param item {Object} -  视频对象
       * @return  {null}
       */
      toggleCamera(item) {
        // 多个视频源播放
        this.videoList.push(item)
        // 单个视频源切换,需要同时切换清晰度列表
        /*this.url = item.url
        this.definitionList = item.definitionList*/
      },
      /**
       * @description 处理视频重复
       * @param repeatItem {Object} - 重复的视频对象
       * @return  {null}
       */
      onRepeatVideo(repeatItem) {
        // console.log(repeatItem)
      },
      /**
       * @description 处理视频播放错误
       * @param currItem {Object} - 出错的当前视频配置对象
       * @return {null}
       */
      onPlayError(currItem) {
        // console.log(currItem)
      },
      /**
       * @description 发送弹幕
       * @return {null}
       */
      ejectDanmu() {
        /*// 弹幕发送快捷方式
        this.danmu.push(this.danmuText)
        // 弹幕详细配置
        this.danmuText = ''*/

      }
    },
  }
</script>

<style lang="less" scoped>
  .demo {
    width: 100%;
    height: 100vh;
    display: flex;

    .left-tree {
      width: 15%;
      height: 100%;
      background-color: #f1f1f1;

      ul {
        .active-camera {
          color: #669ff3;
        }

        li {
          height: 35px;
          line-height: 35px;

          span {
            cursor: pointer;
          }
        }
      }
    }

    .right-play {
      width: 85%;
      height: 100%;

      .grid-content {
        height: 40px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .play-content {
        width: 100%;
        height: 90vh;
        /*background-color: #cecece;*/
      }

    }
  }
</style>
