import {commonDanmuOptions} from "../assets/constant"

export default {
  watch: {
    /**
     * 监听弹幕
     */
    danmu(val) {
      let len = val.length - 1
      if (!val[len]) throw new Error('传入的弹幕为空')
      if (typeof val[len] === 'string') {
        const danmuOptions = {...commonDanmuOptions}
        danmuOptions.id = `${Date.now()}`
        danmuOptions.txt = val[len]
        this.player.danmu.sendComment(danmuOptions)
      } else {
      }
    }
  },
}