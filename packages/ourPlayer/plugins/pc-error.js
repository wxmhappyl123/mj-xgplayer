import Player from 'xgplayer'
let flag = true
let pcError = function (player) {
  if (!player.config.customConfig.live) {
    flag = true
    const root = player.root
    const util = Player.util

    const error = util.createDom('xg-error', '<span class="xgplayer-error-text">请<span class="xgplayer-error-refresh">刷新</span>试试</span>', {}, 'xgplayer-error')
    player.once('ready', () => {
      root.appendChild(error)
    });

    const text = error.querySelector('.xgplayer-error-text')
    let refresh = null
    const onError = () => {
      if (player.config.lang && player.config.lang === 'zh-cn') {
        text.innerHTML = player.config.errorTips || `请<span class="xgplayer-error-refresh">刷新</span>试试`
      } else {
        text.innerHTML = player.config.errorTips || `please try to <span class="xgplayer-error-refresh">refresh</span>`
      }
      util.addClass(player.root, 'xgplayer-is-error')
      refresh = error.querySelector('.xgplayer-error-refresh')
      if (refresh) {
        ['touchend', 'click'].forEach(item => {
          refresh.addEventListener(item, function (e) {
            e.preventDefault()
            e.stopPropagation()
            player.autoplay = true
            player.once('playing', () => {
              util.removeClass(player.root, 'xgplayer-is-error')
            })
            player.src = player.config.url
            player.emit('playing', {
              msg: 'pcError',
              rootId: root.id
            })
            player.hasReload = true
            player.hasClosed = false
          })
        })
      }
    }
    const onDestroy = () => {
      player.off('error', onError)
      player.off('destroy', onDestroy)
    }
    player.on('error', onError)
    player.once('destroy', onDestroy)
  } else {
    flag = false
  }
}
if (flag) Player.install('pcError', pcError)

