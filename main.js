// Main button for the visitor's OS. The other one stays as a link below.
const MAC = 'https://github.com/juan-ramirez-dev/random-english-terms/releases/latest/download/Lexio-macos.dmg'
const WIN = 'https://github.com/juan-ramirez-dev/random-english-terms/releases/latest/download/Lexio-windows-setup.exe'

const t = (key, vars) => I18N.t(key, vars)

const ua = navigator.userAgent
const isWindows = /Windows/i.test(ua)
const isMac = /Macintosh|Mac OS X/i.test(ua) && !/iPhone|iPad/i.test(ua)

const primary = document.getElementById('primary')
const primaryLabel = document.getElementById('primary-label')
const secondary = document.getElementById('secondary')

function paintDownload() {
  if (isWindows) {
    primary.href = WIN
    primaryLabel.textContent = t('download.windows')
    secondary.href = MAC
    secondary.textContent = t('download.otherMac')
    return
  }
  primaryLabel.textContent = t('download.mac')
  if (isMac) {
    secondary.textContent = t('download.otherWindows')
    return
  }
  document.getElementById('other').hidden = false
  secondary.href = WIN
  secondary.textContent = t('download.windows')
}

const calm = matchMedia('(prefers-reduced-motion: reduce)').matches
// ?record: the demo waits at 0 for scripts/record-demo.mjs to drive it.
const recording = new URLSearchParams(location.search).has('record')

// Sections that slide in on scroll.
const revealer = new IntersectionObserver(
  entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.add('is-in')
      revealer.unobserve(entry.target)
    }
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
)
document.querySelectorAll('[data-reveal]').forEach(el => revealer.observe(el))

// Only runs what's on screen, with the tab visible.
function whileVisible(el, onChange) {
  let visible = false
  const update = () => onChange(visible && !document.hidden)
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    update()
  }).observe(el)
  document.addEventListener('visibilitychange', update)
}

function restart(el, cls) {
  el.classList.remove(cls)
  void el.offsetWidth
  el.classList.add(cls)
}

// One card per decision, top first. Out cards fly to their side.
function paintDeck(cards, index, sides) {
  cards.forEach((card, i) => {
    if (i < index) {
      card.dataset.out = sides[i]
      delete card.dataset.depth
    } else {
      delete card.dataset.out
      card.dataset.depth = String(Math.min(i - index, 3))
    }
  })
}

/* ---------- Hero: a swipe session that never ends ---------- */

const heroDeck = document.getElementById('hero-deck')
const heroCards = [...heroDeck.children]
const HERO_SIDES = ['right', 'left', 'right', 'right', 'left']
// The session looks already started: card 3 of 12.
const HERO_FIRST = 3
const HERO_TOTAL = 12

const hero = {
  step: document.getElementById('hero-step'),
  known: document.getElementById('hero-known'),
  learn: document.getElementById('hero-learn'),
  toast: document.getElementById('toast'),
  toastTitle: document.getElementById('toast-title'),
  toastKind: document.getElementById('toast-kind'),
}

let heroIndex = 0

function paintHero() {
  paintDeck(heroCards, heroIndex, HERO_SIDES)
  const shown = Math.min(heroIndex, heroCards.length - 1)
  hero.step.textContent = t('swipe.step', { i: HERO_FIRST + shown, n: HERO_TOTAL })
}

// The flown cards come back as a fresh stack, fading in rather than flying back.
function resetHero() {
  heroDeck.classList.add('is-reset')
  heroIndex = 0
  paintHero()
  void heroDeck.offsetWidth
  heroDeck.classList.remove('is-reset')
}

function swipeHero() {
  const side = HERO_SIDES[heroIndex]
  const learn = side === 'right'
  restart(learn ? hero.learn : hero.known, 'is-tap')

  hero.toastTitle.textContent = heroCards[heroIndex].querySelector('.phrase').textContent
  hero.toastKind.textContent = t(learn ? 'toast.learn' : 'toast.known')
  hero.toast.toggleAttribute('data-known', !learn)
  hero.toast.classList.add('is-on')

  setTimeout(() => {
    heroIndex++
    paintHero()
    if (heroIndex === heroCards.length) setTimeout(resetHero, 700)
  }, 250)
  setTimeout(() => hero.toast.classList.remove('is-on'), 2000)
}

if (!calm) {
  let timer = 0
  const tick = () => {
    swipeHero()
    timer = setTimeout(tick, 2800)
  }

  whileVisible(document.getElementById('app'), on => {
    clearTimeout(timer)
    if (on) timer = setTimeout(tick, heroIndex === 0 ? 2400 : 1200)
  })
}

/* ---------- 3D tilt of the mock with the mouse ---------- */

const stage = document.querySelector('.stage')
const app = document.getElementById('app')

if (!calm && matchMedia('(pointer: fine)').matches) {
  stage.addEventListener('pointermove', e => {
    const r = stage.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    app.style.setProperty('--ry', `${x * 10}deg`)
    app.style.setProperty('--rx', `${y * -8}deg`)
  })
  stage.addEventListener('pointerleave', () => {
    app.style.setProperty('--ry', '0deg')
    app.style.setProperty('--rx', '0deg')
  })
}

/* ---------- Progress: phrases that level up ---------- */

const board = document.getElementById('board')
const roundButton = document.getElementById('round')
const boardStreak = document.getElementById('board-streak')
const lanes = Object.fromEntries([...board.querySelectorAll('.lane')].map(lane => [lane.dataset.level, lane]))

const BOARD_START = {
  new: ['break the ice', 'come up with', 'by the way'],
  learning: ['figure out', 'touch base'],
  mastered: ['on the same page'],
}
// One move per round. After the last one everything goes back to the start.
const MOVES = [
  ['figure out', 'mastered'],
  ['break the ice', 'learning'],
  ['touch base', 'mastered'],
  ['come up with', 'learning'],
  ['by the way', 'learning'],
  ['break the ice', 'mastered'],
]
const STREAK_START = 4

const tiles = new Map()
for (const [level, phrases] of Object.entries(BOARD_START)) {
  for (const phrase of phrases) {
    const li = document.createElement('li')
    li.textContent = phrase
    lanes[level].querySelector('ul').append(li)
    tiles.set(phrase, li)
  }
}

let move = 0
let streak = STREAK_START

function paintBoard() {
  for (const lane of Object.values(lanes)) {
    lane.querySelector('.lane-head b').textContent = lane.querySelectorAll('li').length
  }
  boardStreak.textContent = t('progress.streak', { n: streak })
}

// FLIP: measure, move in the DOM, animate from the old position.
function moveTiles(change) {
  const all = [...tiles.values()]
  const first = new Map(all.map(tile => [tile, tile.getBoundingClientRect()]))
  change()
  for (const tile of all) {
    const from = first.get(tile)
    const to = tile.getBoundingClientRect()
    const dx = from.left - to.left
    const dy = from.top - to.top
    if (!dx && !dy) continue
    tile.classList.add('is-moving')
    tile
      .animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], {
        duration: calm ? 1 : 700,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      })
      .finished.then(() => tile.classList.remove('is-moving'))
  }
  paintBoard()
}

function playRound() {
  if (move === MOVES.length) {
    moveTiles(() => {
      for (const [level, phrases] of Object.entries(BOARD_START)) {
        lanes[level].querySelector('ul').append(...phrases.map(phrase => tiles.get(phrase)))
      }
    })
    move = 0
    streak = STREAK_START
    paintBoard()
    return
  }
  const [phrase, level] = MOVES[move++]
  moveTiles(() => lanes[level].querySelector('ul').append(tiles.get(phrase)))
  streak++
  paintBoard()
  restart(boardStreak.parentElement, 'is-bump')
}

let boardOn = false
let rounds = 0

function syncBoard() {
  clearInterval(rounds)
  if (boardOn && !calm) rounds = setInterval(playRound, 2400)
}

roundButton.addEventListener('click', () => {
  playRound()
  syncBoard()
})

whileVisible(board, on => {
  boardOn = on
  syncBoard()
})

/* ---------- How it works demo ---------- */

// Everything comes from render(t): pausing or jumping to a step only changes t.
const demoScreen = document.getElementById('screen')
const s = {
  title: document.getElementById('s-title'),
  text: document.getElementById('s-text'),
  save: document.getElementById('s-save'),
  reading: document.getElementById('s-reading'),
  pick: document.getElementById('s-pick'),
  step: document.getElementById('s-step'),
  cards: [...demoScreen.querySelectorAll('.s-card')],
  known: document.getElementById('s-known'),
  learn: document.getElementById('s-learn'),
  start: document.getElementById('s-start'),
  option: document.getElementById('s-option'),
  gap: document.getElementById('s-gap'),
  streak: document.getElementById('s-streak'),
  streakPill: document.getElementById('s-streak-pill'),
  navPractice: document.getElementById('s-nav-practice'),
  navMaterial: document.getElementById('s-nav-material'),
  cursor: document.getElementById('s-cursor'),
  play: document.getElementById('demo-play'),
  chapters: [...document.querySelectorAll('.chapter')],
}

// The meeting transcript. The marked parts are what Lexio finds.
const READING = [
  ['Thanks for joining. Before we '],
  ['wrap up', 'phrasal'],
  [", let's make sure we're "],
  ['on the same page', 'idiom'],
  ['. We still need to '],
  ['figure out', 'phrasal'],
  [' the budget. '],
  ['As far as I know', 'expression'],
  [', design will '],
  ['make a decision', 'collocation'],
  [' by Friday.'],
]
const READING_TEXT = READING.map(([text]) => text).join('')

s.reading.replaceChildren(
  ...READING.map(([text, type]) => {
    if (!type) return text
    const mark = document.createElement('mark')
    mark.dataset.type = type
    mark.textContent = text
    return mark
  }),
)
const marks = [...s.reading.querySelectorAll('mark')]

const END = 22000
const SCENES = [
  [0, 'add'],
  [5400, 'material'],
  [10200, 'swipe'],
  [15200, 'practice'],
]
const CHAPTERS = SCENES.map(([start]) => start)
// With "reduce motion": the moment that best sums up each step.
const STILLS = [4300, 9000, 13300, 20800]
// Each swipe: the button is pressed, then the card leaves.
const SWIPES = [11200, 12400, 13600]
const SWIPE_SIDES = ['right', 'left', 'right']
const CLICKS = [4600, 9300, ...SWIPES, 17600, 19400]

const clamp = x => Math.min(Math.max(x, 0), 1)

function setFlag(name, on) {
  if (demoScreen.hasAttribute(name) !== on) demoScreen.toggleAttribute(name, on)
}

function setText(el, text) {
  if (el.textContent !== text) el.textContent = text
}

function typed(text, t, from, to) {
  return text.slice(0, Math.round(clamp((t - from) / (to - from)) * text.length))
}

const cursorTargets = {
  save: () => s.save,
  pick: () => s.pick,
  known: () => s.known,
  learn: () => s.learn,
  start: () => s.start,
  option: () => s.option,
}

function placeCursor(target) {
  const box = demoScreen.getBoundingClientRect()
  let x = box.width * 0.78
  let y = box.height * 0.82
  if (target) {
    const r = cursorTargets[target]().getBoundingClientRect()
    x = r.left - box.left + r.width * 0.55
    y = r.top - box.top + r.height * 0.6
  }
  s.cursor.style.setProperty('--x', `${Math.round(x)}px`)
  s.cursor.style.setProperty('--y', `${Math.round(y)}px`)
}

function cursorAt(t) {
  const on = (a, b) => t >= a && t < b
  if (on(3600, 5000)) return 'save'
  if (on(8400, 9800)) return 'pick'
  const next = SWIPES.findIndex(at => t >= at - 900 && t < at + 300)
  if (next !== -1) return SWIPE_SIDES[next] === 'right' ? 'learn' : 'known'
  if (on(16600, 17950)) return 'start'
  if (on(18700, 19800)) return 'option'
  return null
}

let streakShown = null

function render(t) {
  const on = (a, b = Infinity) => t >= a && t < b

  setFlag('data-fade', t < 250 || t >= END - 450)
  const scene = SCENES.findLast(([start]) => t >= start)[1]
  if (demoScreen.dataset.scene !== scene) demoScreen.dataset.scene = scene
  s.navPractice.classList.toggle('is-active', scene === 'practice')
  s.navMaterial.classList.toggle('is-active', scene !== 'practice')

  // 1. Paste
  setText(s.title, typed(I18N.t('demo.textTitle'), t, 400, 1300))
  setText(s.text, typed(READING_TEXT, t, 1500, 4200))
  s.title.classList.toggle('is-typing', on(400, 1400))
  s.text.classList.toggle('is-typing', on(1400, 4400))
  s.save.classList.toggle('is-press', on(4600, 4900))
  setText(s.save, I18N.t(on(4600) ? 'add.saving' : 'add.save'))

  // 2. Find
  marks.forEach((mark, i) => mark.classList.toggle('is-on', t >= 6000 + i * 500))
  s.pick.classList.toggle('is-press', on(9300, 9600))

  // 3. Swipe
  const swiped = SWIPES.filter(at => t >= at + 200).length
  paintDeck(s.cards, swiped, SWIPE_SIDES)
  setText(s.step, I18N.t('swipe.step', { i: swiped + 1, n: 5 }))
  s.learn.classList.toggle('is-press', on(SWIPES[0], SWIPES[0] + 250) || on(SWIPES[2], SWIPES[2] + 250))
  s.known.classList.toggle('is-press', on(SWIPES[1], SWIPES[1] + 250))

  // 4. Practice
  s.start.classList.toggle('is-press', on(17600, 17900))
  setFlag('data-exercise', on(17900))
  s.option.classList.toggle('is-press', on(19400, 19600))
  const correct = on(19500)
  setFlag('data-correct', correct)
  setText(s.gap, correct ? 'figure out' : '______')
  const streak = String(on(20000) ? 5 : 4)
  if (streak !== streakShown) {
    if (streakShown === '4' && streak === '5' && !calm) restart(s.streakPill, 'is-bump')
    streakShown = streak
    setText(s.streak, streak)
  }

  placeCursor(cursorAt(t))

  const current = CHAPTERS.findLastIndex(start => t >= start)
  s.chapters.forEach((el, i) => {
    const end = CHAPTERS[i + 1] ?? END
    const p = calm ? Number(i === current) : clamp((t - CHAPTERS[i]) / (end - CHAPTERS[i]))
    el.querySelector('.chapter-bar b').style.setProperty('--p', p.toFixed(3))
    if (i === current) el.setAttribute('aria-current', 'step')
    else el.removeAttribute('aria-current')
  })
}

let time = calm ? STILLS[0] : 0
let playing = !calm && !recording
let inView = false
let raf = 0
let last = 0

function frame(now) {
  const prev = time
  time += last ? Math.min(now - last, 100) : 0
  last = now
  if (time >= END) time = 0
  else if (CLICKS.some(c => prev < c && c <= time)) restart(s.cursor, 'is-click')
  render(time)
  raf = requestAnimationFrame(frame)
}

function syncDemo() {
  cancelAnimationFrame(raf)
  last = 0
  if (playing && inView) raf = requestAnimationFrame(frame)
  s.play.setAttribute('aria-pressed', String(playing))
  s.play.setAttribute('aria-label', I18N.t(playing ? 'demo.pause' : 'demo.play'))
}

s.chapters.forEach((el, i) =>
  el.addEventListener('click', () => {
    time = calm ? STILLS[i] : CHAPTERS[i]
    playing = !calm
    render(time)
    syncDemo()
  }),
)

if (!calm && !recording) {
  s.play.hidden = false
  s.play.addEventListener('click', () => {
    playing = !playing
    syncDemo()
  })
}

addEventListener('resize', () => render(time))
render(time)
whileVisible(demoScreen, visible => {
  inView = visible
  syncDemo()
})

/* ---------- Language ---------- */

function paintLanguage() {
  paintDownload()
  paintHero()
  paintBoard()
  syncDemo()
  render(time)
}

paintLanguage()
I18N.onChange(paintLanguage)

/* ---------- Recording ---------- */

// The recorder seeks the demo frame by frame. The clock is virtual, so clicks
// and CSS transitions still look like they do live.
if (recording) {
  window.lexioDemo = {
    end: END,
    seek(t) {
      if (CLICKS.some(c => time < c && c <= t)) restart(s.cursor, 'is-click')
      time = t
      render(time)
    },
  }
}
