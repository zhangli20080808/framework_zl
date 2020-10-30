class Event {
  constructor () {
    this.events = {}
  }

  on (event, f) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(f)
  }

  off (event, f) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(item => f != item)
    }
  }

  dispatch (event, ...arg) {
    if (this.events[event]) {
      this.events[event].forEach(item => {
        item.call(this, ...arg)
      })
    }
  }
}

class Drag extends Event {
  constructor (el) {
    super()
    this.el = el
    this.startMouse = {}
    let move = (e) => {
      this.move(e)
    }
    this.el.addEventListener('mousedown', (e) => {
      this.start(e)
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', (e) => {
        this.end(e)
        document.removeEventListener('mousemove', move)
      }, { once: true })
    })
  }

  start (e) {
    this.startMouse = {
      x: e.clientX,
      y: e.clientY
    }
    this.dispatch('dragstart', e)
  }

  move (e) {
    let nowMouse = {
      x: e.clientX,
      y: e.clientY
    }
    let dis = {
      x: nowMouse.x - this.startMouse.x,
      y: nowMouse.y - this.startMouse.y
    }
    this.dispatch('dragmove', { ...e, type: 'dragmove' }, dis, nowMouse)
  }

  end (e) {
    this.dispatch('dragend', { ...e, type: 'dragend' })
  }
}

class DragEl extends Drag {
  constructor (...arg) {
    super(...arg)
    this.startOffset = {}
    this.boomEls = []
    this.on('dragstart', (e) => {
      this.dragStart(e)
    })
    this.on('dragmove', (e, dis, now) => {
      this.dragMove(e, dis, now)
    })
  }

  dragStart (e) {
    this.startOffset = {
      x: parseFloat(getComputedStyle(this.el)['left']),
      y: parseFloat(getComputedStyle(this.el)['top'])
    }
  }

  dragMove (e, dis, now) {
    let nowOffset = {
      x: this.startOffset.x + dis.x,
      y: this.startOffset.y + dis.y
    }
    this.el.style.left = nowOffset.x + 'px'
    this.el.style.top = nowOffset.y + 'px'
  }
}

class DragSelect extends Drag {
  constructor (...arg) {
    super(...arg)
    this.select = null
    this.on('dragstart', (e) => {
      this.dragStart(e)
    })
    this.on('dragmove', (e, dis, now) => {
      this.dragMove(e, dis, now)
    })
    this.on('dragend', (e, dis, now) => {
      this.dragEnd(e)
    })
  }

  dragStart (e) {
    this.select = document.createElement('div')
    this.select.className = 'selectBox'
    document.body.appendChild(this.select)
  }

  dragMove (e, dis, now) {
    this.select.style.width = Math.abs(dis.x) + 'px'
    this.select.style.height = Math.abs(dis.y) + 'px'
    this.select.style.left = Math.min(now.x, this.startMouse.x) + 'px'
    this.select.style.top = Math.min(now.y, this.startMouse.y) + 'px'
  }

  dragEnd (e) {
    this.select.remove()
  }
}