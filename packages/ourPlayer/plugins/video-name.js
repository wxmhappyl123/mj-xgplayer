import Player from 'xgplayer'

let videoName = function (player) {
  const util = Player.util, // 内置工具函数
    root = player.root, // 播放器实例根元素DOM
    videoName = player.config.customConfig.videoName // 视频名称
  const videoNameHtml = `
        <div style="
        width: 200px;
        height: 40px;
        background: linear-gradient(90deg, rgba(120, 120, 120, 0.5), transparent);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        position: absolute;
        left: 0;
        top: 0;
        color: #ffffffa1;
        font-size: 18px;
        ">
        <span style="line-height: 38px;" class="video-name-text">${videoName}</span>
        </div>` // 关闭按钮样式
  const videoNameDom = util.createDom('inphase-video-name', videoNameHtml, {}, 'video-name') // 创建按钮标签元素
  root.appendChild(videoNameDom) // 加入根元素
}
Player.install('video-name', videoName)
