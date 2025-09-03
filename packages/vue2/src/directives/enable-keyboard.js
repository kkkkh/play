const enableKeyboard = {
  name: 'enable-keyboard',
  inserted(el, binding) {
    // 事件处理函数，阻止除回车外所有键输入
    const target =
      el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea'
        ? el
        : el.querySelector('input, textarea')

    if (!target) return

    el._target_ = target
    el._previousValue = target.value // web端与client 有一些区别
    el._lastInputTime = 0
    el._scanBuffer = []

    el._disableInputHandler = (event) => {
      if (binding.value) return // 允许输入

      // 屏蔽 Ctrl+V（Windows / Linux）
      if (event.ctrlKey && (event.key === 'v' || event.key === 'V')) {
        event.preventDefault()
      }

      // 屏蔽 Cmd+V（Mac）
      if (event.metaKey && (event.key === 'v' || event.key === 'V')) {
        event.preventDefault()
      }

      if (event.key === 'Backspace' || event.key === 'Delete') {
        event.preventDefault()
      }
    }

    el._beforeInputHandler = (event) => {
      // debugger
      if (binding.value) return // 允许输入

      const now = Date.now()
      const diff = now - (el._lastInputTime || 0)

      el._lastInputTime = now

      // 插入文本（用户打字/中文输入/扫描枪逐字）
      if (event.inputType === 'insertCompositionText') {
        console.log('insertCompositionText', event.data)
        event.preventDefault()

        return
      }

      if (event.inputType === 'insertText' && event.data) {
        console.log('insertText', event.data)

        el._scanBuffer.push(event.data)

        // 如果间隔太大（>30ms），认为是人工输入，重置缓冲
        if (diff > 30) {
          el._scanBuffer = [event.data]
        }
        console.log('全部禁掉')
        // 全部禁掉
        event.preventDefault()
      }

      // 粘贴 / 扫描枪一次性写入，允许
      if (event.inputType === 'insertFromPaste') {
        event.preventDefault()

        return
      }

      // 换行（通常扫描枪会自动发 Enter）
      if (event.inputType === 'insertLineBreak') {
        // 这里排除一种情况，就是：输入一个键，然后就按回车，至少是已经连续6个了，那就是扫描枪输入
        if (el._scanBuffer.length >= 6) {
          // ✅ 认为是扫描枪输入
          console.log('✅ 扫描枪输入:', el._scanBuffer.join(''))
          // 手动控制显示
          console.log('insertLineBreak', el._scanBuffer.join(''))
          el._target_.value = el._scanBuffer.join('')
          el._target_.dispatchEvent(new Event('input', { bubbles: true }))
          el._previousValue = el._target_.value
        } else {
          // ⛔ 人工输入回车，禁止
          event.preventDefault()
        }
        el._scanBuffer = []
      }
    }

    el._disableContextMenuHandler = (event) => {
      event.stopPropagation()
      event.preventDefault()
    }

    el._compositionEndHandler = (event) => {
      event.preventDefault()
      event.stopPropagation()
      console.log('compositionEnd', el._previousValue)
      el._target_.value = el._previousValue
    }

    el._inputHandler = () => {
      el._previousValue = el._target_.value
    }

    if (binding.value) {
      el._target_.addEventListener('input', el._inputHandler)
    } else {
      el._target_.addEventListener('keydown', el._disableInputHandler)
      el._target_.addEventListener('beforeinput', el._beforeInputHandler)
      el._target_.addEventListener('contextmenu', el._disableContextMenuHandler)
      el._target_.addEventListener('compositionend', el._compositionEndHandler)
    }
  },
  update(el, binding) {
    if (!binding.value) {
      el._target_?.addEventListener('keydown', el._disableInputHandler)
      el._target_?.addEventListener('beforeinput', el._beforeInputHandler)
      el._target_?.addEventListener('contextmenu', el._disableContextMenuHandler)
      el._target_?.addEventListener('compositionend', el._compositionEndHandler)
      el._target_?.removeEventListener('input', el._inputHandler)
    } else if (binding.value) {
      el._target_?.addEventListener('input', el._inputHandler)
      // 允许输入，移除事件处理
      el._target_?.removeEventListener('keydown', el._disableInputHandler)
      el._target_?.removeEventListener('beforeinput', el._beforeInputHandler)
      el._target_?.removeEventListener('contextmenu', el._disableContextMenuHandler)
      el._target_?.removeEventListener('compositionend', el._compositionEndHandler)
    }
  },
  unbind(el) {
    if (el._disableInputHandler) {
      el._target_?.removeEventListener('keydown', el._disableInputHandler)
      el._disableInputHandler = undefined
    }

    if (el._beforeInputHandler) {
      el._target_?.removeEventListener('beforeinput', el._beforeInputHandler)
      el._beforeInputHandler = undefined
    }

    if (el._disableContextMenuHandler) {
      el._target_?.removeEventListener('contextmenu', el._disableContextMenuHandler)
      el._disableContextMenuHandler = undefined
    }

    if (el._compositionEndHandler) {
      el._target_?.removeEventListener('compositionend', el._compositionEndHandler)
      el._compositionEndHandler = undefined
    }

    if (el._inputHandler) {
      el._target_?.removeEventListener('input', el._inputHandler)
      el._inputHandler = undefined
    }

    el._target_ = null
    el._previousValue = null
    el._lastInputTime = null
    el._scanBuffer = null
  },
}

export default enableKeyboard
