import Player from 'xgplayer'
const sniffer = Player.sniffer
// 在手机模式下执行，将源代码reload改为replay,解决微信端播放器劫持
if (!sniffer.os.isPc) {
  const error = function (player) {
    let util = Player.util
    let error = util.createDom('xg-error', '<em class="xgplayer-error-text">请<span class="xgplayer-error-refresh">刷新</span>试试</em>', {}, 'xgplayer-error')
    player.root.appendChild(error)
    let text = error.querySelector('.xgplayer-error-text')
    let refresh = null

    function errorFunc () {
      // player.controls.style.display = 'none'
      text.innerHTML = `请<span class="xgplayer-error-refresh">刷新</span>试试`

      util.addClass(player.root, 'xgplayer-is-error')
      refresh = error.querySelector('.xgplayer-error-refresh')
      if (refresh) {
        ['touchend', 'click'].forEach(item => {
          refresh.addEventListener(item, function (e) {
            e.preventDefault()
            e.stopPropagation()
            let p = e.target || e.srcElement
            if (p && p.tagName.toLocaleLowerCase() === 'span') {
              player.controls.style.display = 'flex'
              player.replay()
            }
          })
        })
      }
    }
    player.on('error', errorFunc)

    function onCanplay () {
      util.removeClass(player.root, 'xgplayer-is-error')
    }
    player.on('canplay', onCanplay)
    player.on('error', () =>{})
    function onDestroy () {
      player.off('error', () => {})
      player.off('destroy', onDestroy)
      player.off('canplay', onCanplay)
    }
    player.once('destroy', onDestroy)
  }
  Player.install('videoError', error)
}



