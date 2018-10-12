let CANVAS_WIDTH = 1024
let CANVAS_HEIGHT = 768
let RADIUS = 8
let MARGIN_TOP = 60
let MARGIN_LEFT = 30

let balls = []
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]

const render = (hours, minutes, seconds, cxt) => {
  renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt)
  renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt)
  renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1) , MARGIN_TOP , 10 , cxt)
  renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt)
  renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), cxt)
  renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1) , MARGIN_TOP , 10 , cxt)
  renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt)
  renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt)
  for( let i = 0 ; i < balls.length ; i ++ ){
    cxt.fillStyle = balls[i].color

    cxt.beginPath()
    cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true)
    cxt.closePath()

    cxt.fill()
  }
}

const renderDigit = (x, y, num, cxt) => {
  // cxt.save()
  cxt.fillStyle = 'rgb(0, 102, 153)'

  for (let i = 0; i < digit[num].length; i++) {
    for (let j = 0; j < digit[num][i].length; j++) {
      if (digit[num][i][j] === 1) {
        cxt.beginPath()
        cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI)
        cxt.closePath()

        cxt.fill()
      }
    }
  }
}

const addBalls = (x, y, num) => {
  for (let i = 0; i < digit[num].length; i++) {
    for (let j = 0; j < digit[num][i].length; j++) {
      if (digit[num][i][j] === 1) {
        let aBall = {
          x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
          y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
          g: 0.1 + Math.random() * 0.01,
          vx: Math.pow(-1, Math.ceil(Math.random() * 2)) * 1.1,
          vy: -2.5,
          color: colors[Math.floor(Math.random() * colors.length)]
        }
        balls.push(aBall)
      }
    }
  }
}

const updateBalls = () => {
  for (let i = 0; i < balls.length; i++) {
    balls[i].x += balls[i].vx;
    balls[i].y += balls[i].vy;
    balls[i].vy += balls[i].g;

    if (balls[i].y >= CANVAS_HEIGHT - RADIUS) {
      balls[i].y = CANVAS_HEIGHT - RADIUS
      balls[i].vy = 0 - (balls[i].vy * 0.75)
    }
    if (balls[i].x + RADIUS < 0 || balls[i].x - RADIUS > CANVAS_WIDTH) {
      balls.splice(i, 1)
    }
  }
  console.log(balls.length)
}

const updata = () => {
  let time = new Date()
  let _time_ = {
    hours: time.getHours(),
    minutes: time.getMinutes(),
    seconds: time.getSeconds()
  }
  return () => {
    let time = new Date()
    if (_time_.hours !== time.getHours()) {
      if (parseInt(_time_.hours / 10) !== parseInt(time.getHours() / 10)) {
        addBalls(MARGIN_LEFT + 0 * (RADIUS + 1) , MARGIN_TOP , parseInt(_time_.hours / 10))
      }
      if (parseInt(_time_.hours % 10) !== parseInt(time.getHours() % 10)) {
        addBalls(MARGIN_LEFT + 15 * (RADIUS + 1) , MARGIN_TOP , parseInt(_time_.hours % 10))
      }
      _time_.hours = time.getHours()
    }
    if (_time_.minutes !== time.getMinutes()) {
      if (parseInt(_time_.minutes / 10) !== parseInt(time.getMinutes() / 10)) {
        addBalls(MARGIN_LEFT + 39 * (RADIUS + 1) , MARGIN_TOP , parseInt(_time_.minutes / 10))
      }
      if (parseInt(_time_.minutes % 10) !== parseInt(time.getMinutes() % 10)) {
        addBalls(MARGIN_LEFT + 54 * (RADIUS + 1) , MARGIN_TOP , parseInt(_time_.minutes % 10))
      }
      _time_.minutes = time.getMinutes()
    }
    if (_time_.seconds !== time.getSeconds()) {
      if (parseInt(_time_.seconds / 10) !== parseInt(time.getSeconds() / 10)) {
        addBalls(MARGIN_LEFT + 78 * (RADIUS + 1) , MARGIN_TOP , parseInt(_time_.seconds / 10))
      }
      if (parseInt(_time_.seconds % 10) !== parseInt(time.getSeconds() % 10)) {
        addBalls(MARGIN_LEFT + 93 * (RADIUS + 1) , MARGIN_TOP , parseInt(_time_.seconds % 10))
      }
      _time_.seconds = time.getSeconds()
    }
    updateBalls()
    return _time_
  }
}



window.onload = () => {
  CANVAS_WIDTH = document.body.clientWidth
  CANVAS_HEIGHT = document.body.clientHeight

  MARGIN_LEFT = Math.round(CANVAS_WIDTH / 10)
  RADIUS = Math.round(CANVAS_WIDTH * 4 / 5 / 108) - 1
  MARGIN_TOP = Math.round(CANVAS_HEIGHT / 5)

  let canvas = document.getElementById('canvas')
  let context = canvas.getContext('2d')

  canvas.width = CANVAS_WIDTH
  canvas.height = CANVAS_HEIGHT

  let getTime = updata()

  let animate = () => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    render(getTime().hours, getTime().minutes, getTime().seconds, context)
    window.requestAnimationFrame(animate)
  }

  window.requestAnimationFrame(animate)
}
