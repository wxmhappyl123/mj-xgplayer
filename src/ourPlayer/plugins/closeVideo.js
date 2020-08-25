import Player from 'xgplayer'

let closeVideo = function (player) {
  const util = Player.util, // 内置工具函数
    root = player.root // 播放器实例根元素DOM
  const isPc = Player.sniffer.os.isPc // 是否在PC端
  let hasClosedByBtn = false // 是否通过关闭按钮关闭
  const closeBtnHtml = `
        <div style="width: 36px;height: 36px;border-radius: 25px;background: rgba(175, 175, 175, 0.19);cursor: pointer;">
            <div style="width: 26px;height: 3px;background: #fff;border-radius: 10px;transform: rotate(45deg) translate(15px, 7px);"></div>
            <div style="width: 26px;height: 3px;background: #fff;border-radius: 10px;transform: rotate(-45deg) translate(-6px, 12px);"></div>
        </div>` // 关闭按钮样式
  const closeBtnDom = util.createDom('inphase-close', closeBtnHtml, {}, 'close-wrapper') // 创建按钮标签元素
  root.appendChild(closeBtnDom) // 加入根元素
  const closeWrappers = document.querySelectorAll('.close-wrapper')
  /*
  * 修改按钮位置样式
  * */
  closeWrappers.forEach(closeWrapper => {
    // 防止被弹幕挡住
    if (!closeWrapper.style.zIndex) closeWrapper.style.zIndex = '999'
    if (closeWrapper.style.position !== 'absolute') {
      closeWrapper.style.position = 'absolute'
      closeWrapper.style.top = '10px'
      closeWrapper.style.right = '10px'
      closeWrapper.style.display = 'none'
    }
  })

  function showCurrCloseBtn(display) {
    closeWrappers.forEach(closeWrapper => {
      // 仅针对当前关闭按钮
      if (player.root.id === closeWrapper.parentNode.id)
        closeWrapper.style.display = display
    })
  }

  if (isPc) {
    // 鼠标移入时，按钮出现
    root.addEventListener('mouseenter', function (e) {
      e.preventDefault()
      e.stopPropagation()
      // 开始播放之后显示
      if (player.hasStart && !hasClosedByBtn) {
        showCurrCloseBtn('block')
        player.controls.style.display = 'flex'
      }
    })
    // 鼠标移出时，按钮消失
    root.addEventListener('mouseleave', function (e) {
      e.preventDefault()
      e.stopPropagation()
      // 开始播放之后显示
      if (player.hasStart && !hasClosedByBtn) {
        showCurrCloseBtn('none')
        player.controls.style.display = 'none'
      }

    })
  }

  // 点击按钮清除视频源
  ['touchend', 'click'].forEach(item => {
    closeBtnDom.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      player.src = ''
      player.emit('playing', {
        msg: 'closeVideo',
        rootId: root.id
      })
      if (isPc) player.controls.style.display = 'none'
      player.hasClosed = true
      hasClosedByBtn = true
      showCurrCloseBtn('none')
    })
  })

  player.on('play', function () {
    if (isPc) {
      player.controls.style.display = 'flex'
      hasClosedByBtn = false
    } else {
      // 移动端视频开始播放就出现，点击关闭之后消失
      showCurrCloseBtn('block')
    }
  })

  player.once('destroy', function () {
    if (isPc) {
      // 组件销毁时移除事件
      ['mouseenter', 'mouseleave'].forEach(item => {
        root.removeEventListener(item, () => {
        })
      })
    }
    ['touchend', 'click'].forEach(item => {
      closeBtnDom.removeEventListener(item, () => {
      })
    })
    player.off('destroy', () => {
    })
    player.off('play', () => {
    })
  })
}
Player.install('closeVideo', closeVideo)
