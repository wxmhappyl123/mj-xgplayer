const path = require('path')
function resolve(videoName) {
  return require(`../video/${videoName}.mp4`)
}
export default [
  {
    definitionList: [ //  清晰度数据
      {
        name: '标清', // 渲染为清晰度切换播放栏选项
        url: 'http://vfx.mtime.cn/Video/2019/03/18/mp4/190318231014076505.mp4'
      },
      {
        name: '高清',
        url: 'http://vfx.mtime.cn/Video/2019/03/18/mp4/190318231014076505.mp4'
      },
      {
        name: '超清',
        url: 'http://vfx.mtime.cn/Video/2019/03/18/mp4/190318231014076505.mp4'
      }
    ],
    cameraId: '1002',
    name: '叶问4',
    url: resolve('叶问4'),
    // url: 'http://vfx.mtime.cn/Video/2019/03/18/mp4/190318231014076505.mp4',
    danmu: {
      comments: [
        {
          duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
          id: '1', //弹幕id，需唯一
          start: 3000, //弹幕出现时间，毫秒
          txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
        },
        {
          duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
          id: '2', //弹幕id，需唯一
          start: 3500, //弹幕出现时间，毫秒
          txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
        },

      ]

    },
  },
  {
    definitionList: [ //  清晰度数据
      {
        name: '标清', // 渲染为清晰度切换播放栏选项
        url: ''
      },
      {
        name: '高清',
        url: ''
      },
      {
        name: '超清',
        url: ''
      }
    ],
    cameraId: '1005',
    name: '惊奇队长',
    url: resolve('惊奇队长'),
    // url: 'http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4',
    danmu: {
      comments: [
        {
          duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
          id: '1', //弹幕id，需唯一
          start: 3000, //弹幕出现时间，毫秒
          txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
        },
        {
          duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
          id: '2', //弹幕id，需唯一
          start: 3500, //弹幕出现时间，毫秒
          txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
        },

      ]

    },
  },
  {
    definitionList: [ //  清晰度数据
      {
        name: '标清', // 渲染为清晰度切换播放栏选项
        url: ''
      },
      {
        name: '高清',
        url: ''
      },
      {
        name: '超清',
        url: ''
      }
    ],
    cameraId: '1005',
    name: '玩具总动员',
    url: resolve('玩具总动员'),
    // url: 'http://vfx.mtime.cn/Video/2019/03/19/mp4/190319212559089721.mp4',
    danmu: {
      comments: [
        {
          duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
          id: '1', //弹幕id，需唯一
          start: 3000, //弹幕出现时间，毫秒
          txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
        },
        {
          duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
          id: '2', //弹幕id，需唯一
          start: 3500, //弹幕出现时间，毫秒
          txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
        },

      ]

    },
  },
  {
    definitionList: [ //  清晰度数据
      {
        name: '标清', // 渲染为清晰度切换播放栏选项
        url: ''
      },
      {
        name: '高清',
        url: ''
      },
      {
        name: '超清',
        url: ''
      }
    ],
    cameraId: '1005',
    name: '紧急救援',
    url: resolve('紧急救援'),
    // url: 'http://vfx.mtime.cn/Video/2019/03/19/mp4/190319222227698228.mp4',
    danmu: {
      comments: [
        {
          duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
          id: '1', //弹幕id，需唯一
          start: 3000, //弹幕出现时间，毫秒
          txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
        },
        {
          duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
          id: '2', //弹幕id，需唯一
          start: 3500, //弹幕出现时间，毫秒
          txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
        },

      ]

    },
  },
  {
    definitionList: [ //  清晰度数据
      {
        name: '标清', // 渲染为清晰度切换播放栏选项
        url: ''
      },
      {
        name: '高清',
        url: ''
      },
      {
        name: '超清',
        url: ''
      }
    ],
    cameraId: '1005',
    name: '莱昂纳多',
    url: resolve('莱昂纳多'),
    // url: 'http://vfx.mtime.cn/Video/2019/03/21/mp4/190321153853126488.mp4',
    danmu: {
      comments: [
        {
          duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
          id: '1', //弹幕id，需唯一
          start: 3000, //弹幕出现时间，毫秒
          txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
        },
        {
          duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
          id: '2', //弹幕id，需唯一
          start: 3500, //弹幕出现时间，毫秒
          txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', //弹幕文字内容
        },

      ]

    },
  },
]
