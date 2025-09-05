import type { DirectiveBinding, ObjectDirective } from 'vue'

// 给元素扩展事件处理器
interface InputElementWithHandler extends HTMLInputElement {
  _disableInputHandler?: (event: KeyboardEvent) => void
  _beforeInputHandler?: (event: InputEvent) => void
  _disableContextMenuHandler?: (event: MouseEvent) => void
  _compositionEndHandler?: (event: CompositionEvent) => void
  _inputHandler?: () => void
  _target?: InputElementWithHandler | null
  _lastInputTime?: number | null
  _scanBuffer?: string[] | null
  _previousValue?: string | null
}

const enableKeyboard: ObjectDirective<InputElementWithHandler, boolean> = {
  mounted(el, binding: DirectiveBinding<boolean>) {
    const _target: InputElementWithHandler | null =
      el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea'
        ? el
        : el.querySelector('input, textarea')

    if (!_target) return
    el._target = _target
    el._lastInputTime = 0
    el._scanBuffer = []

    // 键盘事件处理：这里只保留 Enter（避免阻塞 input 事件）
    el._disableInputHandler = (event: KeyboardEvent) => {
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
    el._compositionEndHandler = (event) => {
      console.log('compositionEnd', event)
      event.preventDefault()
      event.stopPropagation()
      console.log('compositionEnd', el._previousValue)
      el._target!.value = el._previousValue || ''
      el._target!.dispatchEvent(new Event('input', { bubbles: true }))
    }

    el._inputHandler = () => {
      el._previousValue = el._target!.value
    }
    // beforeinput 处理：区分人工输入 / 扫描枪
    el._beforeInputHandler = (event: InputEvent) => {
      // debugger
      if (binding.value) return // 允许输入

      const now = Date.now()
      const diff = now - (el._lastInputTime || 0)

      el._lastInputTime = now

      if (event.inputType === 'insertCompositionText') {
        console.log('insertCompositionText', event.data)
        event.preventDefault()

        return
      }


      // 插入文本（用户打字/中文输入/扫描枪逐字）
      if (event.inputType === 'insertText' && event.data) {
        el._scanBuffer!.push(event.data)

        // 如果间隔太大（>30ms），认为是人工输入，重置缓冲
        if (diff > 30) {
          el._scanBuffer = [event.data]
        }
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
        if (el._scanBuffer!.length >= 6) {
          // ✅ 认为是扫描枪输入
          console.log('✅ 扫描枪输入:', el._scanBuffer!.join(''))
          // 手动控制显示
          el._target!.value = el._scanBuffer!.join('')
          el._target!.dispatchEvent(new Event('input', { bubbles: true }))
          el._previousValue = el._scanBuffer!.join('')
        } else {
          // ⛔ 人工输入回车，禁止
          event.preventDefault()
        }
        el._scanBuffer = []
      }
    }

    el._disableContextMenuHandler = (event: MouseEvent) => {
      event.stopPropagation()
      event.preventDefault()
    }

    if (!binding.value) {
      _target.addEventListener('keydown', el._disableInputHandler)
      _target.addEventListener('beforeinput', el._beforeInputHandler)
      _target.addEventListener('contextmenu', el._disableContextMenuHandler)
      _target.addEventListener('compositionend', el._compositionEndHandler)
    }else{
      _target.addEventListener('input', el._inputHandler)
    }
  },
  updated(el, binding: DirectiveBinding<boolean>) {
    if (!el._target) return

    if (binding.value) {
      el._target.addEventListener('input', el._inputHandler!)
      el._target.removeEventListener('keydown', el._disableInputHandler!)
      el._target.removeEventListener('beforeinput', el._beforeInputHandler!)
      el._target.removeEventListener('contextmenu', el._disableContextMenuHandler!)
      el._target.removeEventListener('compositionend', el._compositionEndHandler!)
    } else {
      el._target.removeEventListener('input', el._inputHandler!)
      el._target.addEventListener('keydown', el._disableInputHandler!)
      el._target.addEventListener('beforeinput', el._beforeInputHandler!)
      el._target.addEventListener('contextmenu', el._disableContextMenuHandler!)
      el._target.addEventListener('compositionend', el._compositionEndHandler!)
    }
  },
  unmounted(el) {
    if (el._disableInputHandler) {
      el._target?.removeEventListener('keydown', el._disableInputHandler)
      el._disableInputHandler = undefined
    }

    if (el._beforeInputHandler) {
      el._target?.removeEventListener('beforeinput', el._beforeInputHandler)
      el._beforeInputHandler = undefined
    }

    if (el._disableContextMenuHandler) {
      el._target?.removeEventListener('contextmenu', el._disableContextMenuHandler)
      el._disableContextMenuHandler = undefined
    }

    if (el._compositionEndHandler) {
      el._target?.removeEventListener('compositionend', el._compositionEndHandler)
      el._compositionEndHandler = undefined
    }

    if (el._inputHandler) {
      el._target?.removeEventListener('input', el._inputHandler)
      el._inputHandler = undefined
    }

    el._target = null
    el._previousValue = null
    el._scanBuffer = null
    el._lastInputTime = null
  },
}

export default enableKeyboard
