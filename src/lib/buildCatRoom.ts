/**
 * Pixel art Paris cat room — bright warm desert atmosphere
 *
 * - 5px pixel unit → cat is 50×50px (visible!)
 * - 200px tall room → real depth
 * - Eiffel Tower visible through window in daytime
 * - Warm desert/Mediterranean palette: sandy, terracotta, passionate
 * - Cute kawaii cat with blush cheeks
 */

const PX = 5

// ── Pixel renderer ─────────────────────────────────────────────────────────

function bmp(
  rows: string[],
  pal: Record<string, string>,
  ox: number,
  oy: number,
): string {
  const out: string[] = []
  rows.forEach((row, ry) => {
    row.split('').forEach((ch, cx) => {
      const fill = pal[ch]
      if (fill) out.push(
        `<rect x="${ox + cx * PX}" y="${oy + ry * PX}" width="${PX}" height="${PX}" fill="${fill}"/>`
      )
    })
  })
  return out.join('')
}

function mirror(rows: string[]): string[] {
  return rows.map(r => r.split('').reverse().join(''))
}

// ── Cat sprites (10 cols × 10 rows) ────────────────────────────────────────
// Kawaii style with blush cheeks — vibrant orange cat, big green eyes

const C: Record<string, string> = {
  O: '#ff7028',  // vibrant orange body
  o: '#cc4808',  // dark stripe
  W: '#fff5e0',  // cream belly/muzzle
  E: '#22cc55',  // bright green eye
  e: '#083808',  // pupil
  N: '#ff2060',  // hot pink nose
  B: '#ffbbaa',  // blush cheek
  T: '#ff9055',  // lighter orange tail tip
}

// Walking frame A — right-facing with cute blush
const WA = [
  '.OO....OO.',
  '.OOOOOOOO.',
  '.OEeOOEeO.',
  '.OOooOooO.',
  '.OBWNNWBo.',
  '.OOOOOOOO.',
  'OOOOOOOOOO',
  '.OWWWWWOO.',
  '.OOO..OOO.',
  '..OO..OO..',
]

// Walking frame B — right-facing (alternate legs)
const WB = [
  '.OO....OO.',
  '.OOOOOOOO.',
  '.OEeOOEeO.',
  '.OOooOooO.',
  '.OBWNNWBo.',
  '.OOOOOOOO.',
  'OOOOOOOOOO',
  '.OWWWWWOO.',
  '..OOO.OOO.',
  '..OO..OO..',
]

// Sitting — right-facing (looking at monitor), 10×11
const SI = [
  '.OO....OO.',
  '.OOOOOOOO.',
  '.OEeOOEeO.',
  '.OOooOooO.',
  '.OBWNNWBo.',
  '.OOOOOOOO.',
  '.OWWWWWOO.',
  'OOOOOOOOOO',
  'OOOOOOOOOO',
  '.OOOOOOOO.',
  '.ToooooTT.',  // tail curled with tip
]

// Sleeping — 10×8, curled up
const SL = [
  '..OOOOOO..',
  '.OOOOOOOO.',
  '.OO--O--O.',  // closed squinting eyes (dashes = closed)
  '.OOOOOOOO.',
  '.OBWNNWBo.',
  'OOOOOOOOOO',
  '.OOOOOOOO.',
  '.ToooooTT.',  // tail with tip
]

// Sleeping palette override — closed eyes
const CS: Record<string, string> = {
  ...C,
  '-': '#cc4808',  // closed eye line (same as stripe)
}

// Left-facing versions (mirrored — no CSS scaleX hack needed)
const WA_L = mirror(WA)
const WB_L = mirror(WB)

// ── Eiffel Tower ────────────────────────────────────────────────────────────

function drawEiffelTower(
  cx: number, baseY: number, towerH: number, color: string, skyColor: string
): string {
  const tY = baseY - towerH
  const out: string[] = []

  // === SPIRE (top 18%) ===
  const spireH = Math.floor(towerH * 0.18)
  out.push(`<rect x="${Math.floor(cx - 2)}" y="${tY}" width="4" height="${spireH}" fill="${color}"/>`)
  // Antenna tip
  out.push(`<rect x="${Math.floor(cx - 1)}" y="${tY - 6}" width="2" height="7" fill="${color}"/>`)

  // === UPPER OBSERVATION DECK (18%-26%) ===
  const d1Y = tY + spireH
  const d1H = Math.floor(towerH * 0.06)
  const d1W = 16
  out.push(`<rect x="${Math.floor(cx - d1W / 2)}" y="${d1Y}" width="${d1W}" height="${d1H}" fill="${color}"/>`)

  // === UPPER BODY (26%-50%) ===
  const ubY = d1Y + d1H
  const ubH = Math.floor(towerH * 0.24)
  const ubTopW = 18
  const ubBotW = 22
  // Tapered shape (trapezoid via polygon)
  out.push(`<polygon points="${cx - ubTopW / 2},${ubY} ${cx + ubTopW / 2},${ubY} ${cx + ubBotW / 2},${ubY + ubH} ${cx - ubBotW / 2},${ubY + ubH}" fill="${color}"/>`)
  // Open arch in upper body (sky shows through)
  const archH = Math.floor(ubH * 0.48)
  const archW = ubTopW - 6
  out.push(`<rect x="${Math.floor(cx - archW / 2)}" y="${ubY + Math.floor(ubH * 0.30)}" width="${archW}" height="${archH}" fill="${skyColor}" opacity="0.85"/>`)

  // === FIRST OBSERVATION DECK (50%-58%) ===
  const d2Y = ubY + ubH
  const d2H = Math.floor(towerH * 0.07)
  const d2W = 36
  out.push(`<rect x="${Math.floor(cx - d2W / 2)}" y="${d2Y}" width="${d2W}" height="${d2H}" fill="${color}"/>`)

  // === LOWER BODY — TWO LEGS (58%-100%) ===
  const legY = d2Y + d2H
  const legH = baseY - legY

  // Left leg (polygon — tapers outward at bottom)
  const llTopX = Math.floor(cx - 10)
  const llBotX = Math.floor(cx - 26)
  out.push(`<polygon points="${llTopX},${legY} ${llTopX - 6},${legY} ${llBotX - 6},${baseY} ${llBotX},${baseY}" fill="${color}"/>`)

  // Right leg
  const rlTopX = Math.floor(cx + 10)
  const rlBotX = Math.floor(cx + 26)
  out.push(`<polygon points="${rlTopX},${legY} ${rlTopX + 6},${legY} ${rlBotX + 6},${baseY} ${rlBotX},${baseY}" fill="${color}"/>`)

  // Sky arch between legs
  const archLegH = Math.floor(legH * 0.55)
  const archLegW = 20
  out.push(`<rect x="${Math.floor(cx - archLegW / 2)}" y="${legY}" width="${archLegW}" height="${archLegH}" fill="${skyColor}" opacity="0.85"/>`)

  // Bottom connector (solid base between legs)
  out.push(`<rect x="${llBotX}" y="${baseY - Math.floor(legH * 0.18)}" width="${rlBotX - llBotX + 12}" height="${Math.floor(legH * 0.18)}" fill="${color}"/>`)

  // Inner leg diagonal bracing
  out.push(`<polygon points="${llTopX - 3},${legY + Math.floor(legH * 0.28)} ${llTopX + 2},${legY + Math.floor(legH * 0.28)} ${llBotX + 4},${baseY - Math.floor(legH * 0.18)} ${llBotX},${baseY - Math.floor(legH * 0.18)}" fill="${color}"/>`)
  out.push(`<polygon points="${rlTopX + 3},${legY + Math.floor(legH * 0.28)} ${rlTopX - 2},${legY + Math.floor(legH * 0.28)} ${rlBotX - 4},${baseY - Math.floor(legH * 0.18)} ${rlBotX},${baseY - Math.floor(legH * 0.18)}" fill="${color}"/>`)

  return out.join('\n')
}

// ── Room builder ────────────────────────────────────────────────────────────

function buildRoom(w: number, h: number, accent: string): string {
  const floorY = h - 40
  const out: string[] = []

  // ── Warm sandy background wall ──
  out.push(`<rect width="${w}" height="${floorY}" fill="#f0d890"/>`)
  // Warm wall texture (subtle horizontal bands)
  for (let y = 0; y < floorY; y += 8) {
    out.push(`<rect x="0" y="${y}" width="${w}" height="1" fill="#e8c870" opacity="0.3"/>`)
  }
  // Warm sunlight glow from window (left) and right ambient
  out.push(`<rect x="0" y="0" width="160" height="${floorY}" fill="#ffe88a" opacity="0.10"/>`)
  out.push(`<rect x="${w - 160}" y="0" width="160" height="${floorY}" fill="#ffe060" opacity="0.08"/>`)

  // ── Terracotta floor ──
  out.push(`<rect y="${floorY}" width="${w}" height="${h - floorY}" fill="#c8703a"/>`)
  for (let x = 0; x < w; x += 70) {
    out.push(`<line x1="${x}" y1="${floorY}" x2="${x}" y2="${h}" stroke="#a85820" stroke-width="2"/>`)
  }
  // Floor edge highlight
  out.push(`<rect y="${floorY}" width="${w}" height="4" fill="#e08840" opacity="0.6"/>`)

  // ── Window (left) — Paris daytime view ──
  const wx = 16, wy = 8, ww = 122, wh = floorY - 12
  const wcx = wx + Math.floor(ww / 2)
  const wcy = wy + Math.floor(wh / 2)
  const skyColor = '#5ab8f5'

  // Window outer frame (warm dark wood)
  out.push(`<rect x="${wx - 6}" y="${wy - 6}" width="${ww + 12}" height="${wh + 12}" fill="#8a5020"/>`)

  // Sky — bright blue top, golden warm horizon
  out.push(`<rect x="${wx}" y="${wy}" width="${ww}" height="${Math.floor(wh * 0.55)}" fill="${skyColor}"/>`)
  out.push(`<rect x="${wx}" y="${wy + Math.floor(wh * 0.45)}" width="${ww}" height="${Math.floor(wh * 0.35)}" fill="#e8d060"/>`)
  out.push(`<rect x="${wx}" y="${wy + Math.floor(wh * 0.40)}" width="${ww}" height="${Math.floor(wh * 0.18)}" fill="#f0b840" opacity="0.5"/>`)

  // Paris rooftops (distant silhouette)
  const roofY = wy + Math.floor(wh * 0.72)
  const roofColor = '#4a3820'
  out.push(`<rect x="${wx}" y="${roofY - 12}" width="18" height="${wh - Math.floor(wh * 0.72) + 12}" fill="${roofColor}"/>`)
  out.push(`<rect x="${wx + 4}" y="${roofY - 22}" width="10" height="12" fill="${roofColor}"/>`)
  out.push(`<rect x="${wx + ww - 22}" y="${roofY - 16}" width="22" height="${wh - Math.floor(wh * 0.72) + 16}" fill="${roofColor}"/>`)
  out.push(`<rect x="${wx + ww - 18}" y="${roofY - 26}" width="12" height="12" fill="${roofColor}"/>`)
  // Window lights on buildings
  out.push(`<rect x="${wx + 7}" y="${roofY - 8}" width="4" height="5" fill="#ffe088" opacity="0.9"/>`)
  out.push(`<rect x="${wx + ww - 16}" y="${roofY - 10}" width="5" height="6" fill="#ffe088" opacity="0.9"/>`)
  out.push(`<rect x="${wx + ww - 8}" y="${roofY - 10}" width="5" height="6" fill="#ffe088" opacity="0.9"/>`)

  // Ground / road
  out.push(`<rect x="${wx}" y="${roofY + 6}" width="${ww}" height="${wy + wh - roofY - 6}" fill="#8a7050"/>`)

  // Tree line (lush Parisian)
  out.push(`<ellipse cx="${wx + 34}" cy="${roofY - 4}" rx="9" ry="7" fill="#3a8a22"/>`)
  out.push(`<ellipse cx="${wx + 50}" cy="${roofY - 6}" rx="7" ry="9" fill="#2a7a18"/>`)
  out.push(`<ellipse cx="${wx + 66}" cy="${roofY - 3}" rx="8" ry="6" fill="#3a8a22"/>`)

  // ── EIFFEL TOWER (center of window) ──
  const towCX = wx + Math.floor(ww / 2)
  const towBaseY = roofY + 4
  const towH = Math.floor(wh * 0.70)
  out.push(drawEiffelTower(towCX, towBaseY, towH, '#2a1a0a', skyColor))

  // Bright sun (upper-right quadrant)
  const sunX = wx + Math.floor(ww * 0.76), sunY = wy + Math.floor(wh * 0.13)
  out.push(`<circle cx="${sunX}" cy="${sunY}" r="13" fill="#ffe860" opacity="0.95"/>`)
  out.push(`<circle cx="${sunX}" cy="${sunY}" r="18" fill="#ffdd40" opacity="0.28"/>`)
  out.push(`<circle cx="${sunX}" cy="${sunY}" r="23" fill="#ffcc20" opacity="0.12"/>`)
  // Sun rays
  const rayAngles = [0, 45, 90, 135, 180, 225, 270, 315]
  rayAngles.forEach(deg => {
    const rad = (deg * Math.PI) / 180
    const x1 = sunX + Math.cos(rad) * 19
    const y1 = sunY + Math.sin(rad) * 19
    const x2 = sunX + Math.cos(rad) * 27
    const y2 = sunY + Math.sin(rad) * 27
    out.push(`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#ffe860" stroke-width="2.5" opacity="0.7"/>`)
  })

  // Fluffy clouds
  out.push(`<ellipse cx="${wx + 22}" cy="${wy + 18}" rx="14" ry="8" fill="white" opacity="0.9"/>`)
  out.push(`<ellipse cx="${wx + 30}" cy="${wy + 14}" rx="10" ry="7" fill="white" opacity="0.9"/>`)
  out.push(`<ellipse cx="${wx + 14}" cy="${wy + 20}" rx="9" ry="6" fill="white" opacity="0.85"/>`)
  out.push(`<ellipse cx="${wx + 58}" cy="${wy + 24}" rx="10" ry="6" fill="white" opacity="0.7"/>`)
  out.push(`<ellipse cx="${wx + 66}" cy="${wy + 20}" rx="8" ry="5" fill="white" opacity="0.7"/>`)

  // Window frame cross dividers
  out.push(`<rect x="${wcx - 3}" y="${wy}" width="6" height="${wh}" fill="#8a5020"/>`)
  out.push(`<rect x="${wx}" y="${wcy - 3}" width="${ww}" height="6" fill="#8a5020"/>`)

  // Warm sunlight cast on floor
  out.push(`<polygon points="${wx},${floorY} ${wx + ww},${floorY} ${wx + ww + 30},${h} ${wx - 30},${h}" fill="#ffe880" opacity="0.12"/>`)

  // Window sill
  out.push(`<rect x="${wx - 7}" y="${wy + wh - 2}" width="${ww + 14}" height="10" fill="#a06030"/>`)

  // ── Warm passionate orange-red curtains ──
  // Left curtain
  out.push(`<rect x="${wx - 6}" y="${wy - 6}" width="14" height="${wh + 12}" fill="#cc3a18" opacity="0.88"/>`)
  for (let cy2 = wy + 20; cy2 < wy + wh - 10; cy2 += 18) {
    out.push(`<line x1="${wx - 6}" y1="${cy2}" x2="${wx + 8}" y2="${cy2 + 9}" stroke="#ff5530" stroke-width="1.5" opacity="0.4"/>`)
  }
  // Right curtain
  out.push(`<rect x="${wx + ww - 8}" y="${wy - 6}" width="14" height="${wh + 12}" fill="#cc3a18" opacity="0.88"/>`)
  for (let cy2 = wy + 20; cy2 < wy + wh - 10; cy2 += 18) {
    out.push(`<line x1="${wx + ww - 8}" y1="${cy2 + 9}" x2="${wx + ww + 6}" y2="${cy2}" stroke="#ff5530" stroke-width="1.5" opacity="0.4"/>`)
  }

  // ── Bookshelf (center) — warm honey wood ──
  const bx = 164, by = 28, bw = 90, bh = floorY - 28
  // Back panel
  out.push(`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="#7a4510"/>`)
  // Side panels
  out.push(`<rect x="${bx}" y="${by}" width="7" height="${bh}" fill="#c88030"/>`)
  out.push(`<rect x="${bx + bw - 7}" y="${by}" width="7" height="${bh}" fill="#c88030"/>`)
  // Top panel
  out.push(`<rect x="${bx}" y="${by}" width="${bw}" height="9" fill="#d89040"/>`)
  // Shelves
  const shelfY = [by + 54, by + 108]
  shelfY.forEach(sy => {
    out.push(`<rect x="${bx}" y="${sy}" width="${bw}" height="8" fill="#d89040"/>`)
  })

  // Books row 1 — warm vibrant colors
  const books1 = [
    { x: bx + 9,  w: 14, h: 38, fill: '#cc2020' },
    { x: bx + 25, w: 12, h: 44, fill: '#2050cc' },
    { x: bx + 39, w: 16, h: 36, fill: '#20aa30' },
    { x: bx + 57, w: 13, h: 42, fill: '#d08010' },
    { x: bx + 72, w: 11, h: 40, fill: '#9020cc' },
  ]
  books1.forEach(b => {
    out.push(`<rect x="${b.x}" y="${by + 9 + (46 - b.h)}" width="${b.w}" height="${b.h}" fill="${b.fill}"/>`)
    out.push(`<rect x="${b.x + 1}" y="${by + 9 + (46 - b.h) + 2}" width="${b.w - 2}" height="2" fill="#ffffff33"/>`)
    out.push(`<rect x="${b.x + 2}" y="${by + 9 + (46 - b.h) + 6}" width="${b.w - 4}" height="1" fill="#ffffff22"/>`)
  })

  // Books row 2
  const books2 = [
    { x: bx + 9,  w: 16, h: 42, fill: '#20aaaa' },
    { x: bx + 27, w: 12, h: 38, fill: '#cc5010' },
    { x: bx + 41, w: 15, h: 44, fill: '#2050cc' },
    { x: bx + 58, w: 18, h: 40, fill: '#70aa10' },
  ]
  books2.forEach(b => {
    out.push(`<rect x="${b.x}" y="${shelfY[0] + 8 + (46 - b.h)}" width="${b.w}" height="${b.h}" fill="${b.fill}"/>`)
    out.push(`<rect x="${b.x + 1}" y="${shelfY[0] + 8 + (46 - b.h) + 2}" width="${b.w - 2}" height="2" fill="#ffffff33"/>`)
  })

  // Books row 3 + desert cactus
  const books3 = [
    { x: bx + 9,  w: 13, h: 38, fill: '#cc2020' },
    { x: bx + 24, w: 11, h: 44, fill: '#3050cc' },
    { x: bx + 37, w: 14, h: 40, fill: '#20aa50' },
  ]
  books3.forEach(b => {
    out.push(`<rect x="${b.x}" y="${shelfY[1] + 8 + (46 - b.h)}" width="${b.w}" height="${b.h}" fill="${b.fill}"/>`)
    out.push(`<rect x="${b.x + 1}" y="${shelfY[1] + 8 + (46 - b.h) + 2}" width="${b.w - 2}" height="2" fill="#ffffff33"/>`)
  })

  // Desert cactus on shelf 3
  const plx = bx + 60, ply = shelfY[1] + 8
  out.push(`<rect x="${plx}" y="${ply - 14}" width="16" height="14" fill="#e08040" rx="2"/>`)
  out.push(`<rect x="${plx + 1}" y="${ply - 13}" width="14" height="12" fill="#c86030" rx="1"/>`)
  out.push(`<rect x="${plx + 5}" y="${ply - 36}" width="6" height="24" fill="#2a8a20"/>`)
  out.push(`<rect x="${plx + 1}" y="${ply - 28}" width="4" height="8" fill="#2a8a20"/>`)
  out.push(`<rect x="${plx + 1}" y="${ply - 30}" width="8" height="4" fill="#2a8a20"/>`)
  out.push(`<rect x="${plx + 11}" y="${ply - 24}" width="4" height="6" fill="#2a8a20"/>`)
  out.push(`<rect x="${plx + 5}" y="${ply - 26}" width="10" height="4" fill="#2a8a20"/>`)
  out.push(`<line x1="${plx + 8}" y1="${ply - 34}" x2="${plx + 10}" y2="${ply - 38}" stroke="#f0d070" stroke-width="1"/>`)
  out.push(`<line x1="${plx + 6}" y1="${ply - 30}" x2="${plx + 4}" y2="${ply - 33}" stroke="#f0d070" stroke-width="1"/>`)
  out.push(`<line x1="${plx + 12}" y1="${ply - 26}" x2="${plx + 15}" y2="${ply - 29}" stroke="#f0d070" stroke-width="1"/>`)

  // ── Desk (right side) — warm golden wood ──
  const dx = w - 250, dw = 232, dtop = floorY - 40
  // Desktop surface
  out.push(`<rect x="${dx}" y="${dtop}" width="${dw}" height="12" fill="#d89040"/>`)
  out.push(`<rect x="${dx}" y="${dtop}" width="${dw}" height="12" fill="none" stroke="#b87030" stroke-width="1"/>`)
  // Wood grain
  for (let gx = dx + 20; gx < dx + dw - 10; gx += 30) {
    out.push(`<line x1="${gx}" y1="${dtop}" x2="${gx + 10}" y2="${dtop + 12}" stroke="#c07828" stroke-width="1" opacity="0.4"/>`)
  }
  out.push(`<rect x="${dx}" y="${dtop + 12}" width="${dw}" height="${floorY - dtop - 12}" fill="#c07828"/>`)
  // Desk legs
  out.push(`<rect x="${dx + 12}" y="${floorY}" width="14" height="18" fill="#a06020"/>`)
  out.push(`<rect x="${dx + dw - 26}" y="${floorY}" width="14" height="18" fill="#a06020"/>`)

  // ── Monitor ──
  const monX = dx + 32, monY = dtop - 92, monW = 124, monH = 92
  // Stand
  out.push(`<rect x="${monX + monW / 2 - 24}" y="${dtop - 5}" width="48" height="5" fill="#303040"/>`)
  out.push(`<rect x="${monX + monW / 2 - 8}" y="${dtop - 16}" width="16" height="14" fill="#303040"/>`)
  // Monitor body
  out.push(`<rect x="${monX}" y="${monY}" width="${monW}" height="${monH}" fill="#1a1820" rx="5"/>`)
  out.push(`<rect x="${monX}" y="${monY}" width="${monW}" height="${monH}" fill="none" stroke="#4a3a30" stroke-width="2" rx="5"/>`)
  // Screen area
  const scx = monX + 8, scy = monY + 8, scw = monW - 16, sch = monH - 20
  out.push(`<rect x="${scx}" y="${scy}" width="${scw}" height="${sch}" fill="#0a0818" rx="3"/>`)
  out.push(`<rect x="${scx}" y="${scy}" width="${scw}" height="${sch}" fill="${accent}" opacity="0.04" rx="3"/>`)

  // Syntax-highlighted code on screen
  const codeLines = [
    { indent: 0,  w: 50, color: '#ff6b2a' },   // fn keyword
    { indent: 10, w: 65, color: '#f5c842' },   // code
    { indent: 10, w: 42, color: '#5ab8f5' },   // string
    { indent: 10, w: 70, color: '#f5c842' },
    { indent: 10, w: 55, color: '#ff6b2a' },
    { indent: 20, w: 45, color: '#aaddff' },   // nested
    { indent: 20, w: 60, color: '#f5c842' },
    { indent: 10, w: 35, color: '#88ffaa' },   // comment
    { indent: 0,  w: 12, color: '#ff6b2a' },   // closing bracket
  ]
  codeLines.forEach((l, i) => {
    out.push(`<rect x="${scx + 6 + l.indent}" y="${scy + 5 + i * 7}" width="${l.w}" height="3.5" fill="${l.color}" opacity="0.88" rx="1"/>`)
  })
  // Blinking cursor
  out.push(
    `<rect x="${scx + 6}" y="${scy + 5 + codeLines.length * 7}" width="5" height="6" fill="${accent}" opacity="0.9">
  <animate attributeName="opacity" values="0.9;0;0.9" keyTimes="0;0.5;1" dur="0.9s" repeatCount="indefinite"/>
</rect>`
  )
  // Monitor LED
  out.push(`<circle cx="${monX + monW / 2}" cy="${monY + monH - 5}" r="2.5" fill="${accent}" opacity="0.9">
  <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2.8s" repeatCount="indefinite"/>
</circle>`)

  // ── Keyboard — dark with warm accents ──
  const kx = dx + 20, ky = dtop + 14, kw = 126, kh = 22
  out.push(`<rect x="${kx}" y="${ky}" width="${kw}" height="${kh}" fill="#1a1620" rx="3"/>`)
  out.push(`<rect x="${kx}" y="${ky}" width="${kw}" height="${kh}" fill="none" stroke="#3a2a18" stroke-width="1" rx="3"/>`)
  for (let row = 0; row < 3; row++) {
    const keys = row === 0 ? 12 : row === 1 ? 11 : 10
    const rowW = kw - 10
    const keyW = Math.floor(rowW / keys) - 1
    const offsetX = row === 1 ? 4 : row === 2 ? 7 : 0
    for (let col = 0; col < keys; col++) {
      const isAccent = (row === 0 && col === 0) || (row === 2 && col === 5)
      const keyFill = isAccent ? '#3a1808' : '#282038'
      out.push(
        `<rect x="${kx + 5 + offsetX + col * (keyW + 1)}" y="${ky + 4 + row * 7}" width="${keyW}" height="5" fill="${keyFill}" rx="1"/>`
      )
    }
  }

  // ── Coffee cup — ceramic warm style ──
  const cupX = dx + dw - 46, cupY = dtop + 4
  out.push(`<ellipse cx="${cupX + 14}" cy="${cupY + 26}" rx="18" ry="4" fill="#c87a3a"/>`)
  out.push(`<rect x="${cupX}" y="${cupY + 4}" width="28" height="22" fill="#f0e8d8" rx="3"/>`)
  out.push(`<rect x="${cupX + 2}" y="${cupY + 6}" width="24" height="18" fill="#e0d0b8" rx="2"/>`)
  out.push(`<ellipse cx="${cupX + 14}" cy="${cupY + 6}" rx="11" ry="3" fill="#5a2a0a"/>`)
  out.push(`<ellipse cx="${cupX + 14}" cy="${cupY + 6}" rx="8" ry="2" fill="#7a3a10" opacity="0.6"/>`)
  // Steam
  out.push(`<path d="M ${cupX + 9} ${cupY - 2} Q ${cupX + 7} ${cupY - 8} ${cupX + 11} ${cupY - 14}" stroke="#f0d090" stroke-width="1.5" fill="none" opacity="0.5">
  <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite"/>
</path>`)
  out.push(`<path d="M ${cupX + 18} ${cupY - 4} Q ${cupX + 16} ${cupY - 11} ${cupX + 20} ${cupY - 18}" stroke="#f0d090" stroke-width="1.5" fill="none" opacity="0.4">
  <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2.6s" repeatCount="indefinite"/>
</path>`)
  out.push(`<path d="M ${cupX + 28} ${cupY + 8} Q ${cupX + 38} ${cupY + 8} ${cupX + 38} ${cupY + 16} Q ${cupX + 38} ${cupY + 24} ${cupX + 28} ${cupY + 24}" stroke="#c87a3a" stroke-width="3" fill="none"/>`)

  // ── Small French flag on desk (detail) ──
  const flagX = dx + dw - 88, flagY = dtop - 24
  out.push(`<line x1="${flagX + 2}" y1="${flagY - 20}" x2="${flagX + 2}" y2="${dtop - 2}" stroke="#8a6030" stroke-width="2"/>`)
  out.push(`<rect x="${flagX + 2}" y="${flagY - 20}" width="8" height="14" fill="#002395"/>`)
  out.push(`<rect x="${flagX + 10}" y="${flagY - 20}" width="8" height="14" fill="#f0f0f0"/>`)
  out.push(`<rect x="${flagX + 18}" y="${flagY - 20}" width="8" height="14" fill="#ed2939"/>`)

  // ── Warm ceiling lamp (lantern style) ──
  const lx = Math.floor(w / 2 + 60)
  out.push(`<line x1="${lx}" y1="0" x2="${lx}" y2="16" stroke="#8a6030" stroke-width="3"/>`)
  out.push(`<path d="M ${lx - 24} 16 L ${lx - 16} 34 L ${lx + 16} 34 L ${lx + 24} 16 Z" fill="#c87028"/>`)
  out.push(`<path d="M ${lx - 24} 16 L ${lx + 24} 16" stroke="#a05020" stroke-width="2"/>`)
  // Warm glow
  out.push(`<ellipse cx="${lx}" cy="34" rx="16" ry="5" fill="#ffe090" opacity="0.95"/>`)
  out.push(`<polygon points="${lx - 60},${floorY} ${lx + 60},${floorY} ${lx + 18},36 ${lx - 18},36" fill="#ffe090" opacity="0.07"/>`)

  // ── Wall painting — framed Eiffel Tower artwork ──
  const picX = w - 194, picY = 18, picW = 50, picH = 44
  out.push(`<rect x="${picX}" y="${picY}" width="${picW}" height="${picH}" fill="#f8d898"/>`)
  out.push(`<rect x="${picX}" y="${picY}" width="${picW}" height="${picH}" fill="none" stroke="#c08030" stroke-width="3"/>`)
  // Sky in painting
  out.push(`<rect x="${picX + 3}" y="${picY + 3}" width="${picW - 6}" height="${Math.floor(picH * 0.55)}" fill="#78c8f5"/>`)
  out.push(`<rect x="${picX + 3}" y="${picY + Math.floor(picH * 0.50)}" width="${picW - 6}" height="${Math.floor(picH * 0.43)}" fill="#e8c050"/>`)
  // Tiny Eiffel Tower in painting
  const pTowCX = picX + picW / 2
  const pTowH = 26
  out.push(drawEiffelTower(pTowCX, picY + picH - 5, pTowH, '#2a1a08', '#78c8f5'))

  return out.join('\n')
}

// ── CSS animations ──────────────────────────────────────────────────────────

function buildCSS(
  dur: number,
  t1: number, t2: number, t3: number,
  walkStartX: number, walkEndX: number,
): string {
  const e = (n: number) => n.toFixed(2)
  return `
/* Walk right */
.wr{animation:wr-p ${dur}s linear infinite,wr-v ${dur}s step-end infinite}
@keyframes wr-p{0%{transform:translateX(${walkStartX}px)}${e(t1)}%{transform:translateX(${walkEndX}px)}100%{transform:translateX(${walkEndX}px)}}
@keyframes wr-v{0%{opacity:1}${e(t1)}%{opacity:1}${e(t1 + 0.01)}%{opacity:0}100%{opacity:0}}

/* At desk */
.ds{animation:ds-v ${dur}s step-end infinite}
@keyframes ds-v{0%{opacity:0}${e(t1)}%{opacity:0}${e(t1 + 0.01)}%{opacity:1}${e(t2)}%{opacity:1}${e(t2 + 0.01)}%{opacity:0}100%{opacity:0}}

/* Walk left */
.wl{animation:wl-p ${dur}s linear infinite,wl-v ${dur}s step-end infinite}
@keyframes wl-p{0%{transform:translateX(${walkEndX}px)}${e(t2)}%{transform:translateX(${walkEndX}px)}${e(t3)}%{transform:translateX(${walkStartX}px)}100%{transform:translateX(${walkStartX}px)}}
@keyframes wl-v{0%{opacity:0}${e(t2)}%{opacity:0}${e(t2 + 0.01)}%{opacity:1}${e(t3)}%{opacity:1}${e(t3 + 0.01)}%{opacity:0}100%{opacity:0}}

/* Sleeping */
.sl{animation:sl-v ${dur}s step-end infinite}
@keyframes sl-v{0%{opacity:0}${e(t3)}%{opacity:0}${e(t3 + 0.01)}%{opacity:1}100%{opacity:1}}

/* Leg alternation */
.fa{animation:fa .45s step-end infinite}
.fb{animation:fb .45s step-end infinite}
@keyframes fa{0%,49%{opacity:1}50%,100%{opacity:0}}
@keyframes fb{0%,49%{opacity:0}50%,100%{opacity:1}}

/* Tail wag */
.tw{animation:tw .7s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:0 50%}
@keyframes tw{from{transform:rotate(-18deg)}to{transform:rotate(12deg)}}

/* Z bubbles (warm color) */
.z1{animation:zf 3s ease-out infinite}
.z2{animation:zf 3s ease-out .9s infinite}
.z3{animation:zf 3s ease-out 1.8s infinite}
@keyframes zf{0%{transform:translate(0,0);opacity:0}15%{opacity:.9}100%{transform:translate(10px,-22px);opacity:0}}

/* Heart float — cat happy coding */
.ht{animation:htf 2s ease-out infinite}
.ht2{animation:htf 2s ease-out 1s infinite}
@keyframes htf{0%{transform:translate(0,0);opacity:0}20%{opacity:0.9}100%{transform:translate(4px,-18px);opacity:0}}`
}

// ── Main export ─────────────────────────────────────────────────────────────

export function buildCatRoomContent(w: number, h: number, accent: string): string {
  const floorY = h - 40
  const catH   = WA.length * PX        // 50px  (10 rows)
  const sitH   = SI.length * PX        // 55px  (11 rows)
  const sleepH = SL.length * PX        // 40px  (8 rows)
  const catW   = WA[0].length * PX     // 50px  (10 cols)

  // Cat floor positions
  const catFloor  = floorY
  const walkY     = catFloor - catH
  const sitY      = catFloor - sitH
  const sleepY    = catFloor - sleepH + 5

  // Walk path: bookshelf ~x=164+90=254, desk starts ~x=w-250
  const walkStartX = 264
  const walkEndX   = w - 250 - catW

  // Sleeping position: under window
  const sleepX = 30

  // Desk sitting position
  const deskSitX = walkEndX

  // Animation: 5s walk + 12s desk + 5s walk back + 12s sleep = 34s
  const DUR = 34
  const t1 = 5   / DUR * 100
  const t2 = 17  / DUR * 100
  const t3 = 22  / DUR * 100

  const css = buildCSS(DUR, t1, t2, t3, walkStartX, walkEndX)
  const room = buildRoom(w, h, accent)

  // Walk right
  const walkR = `<g class="wr">
  <g class="fa">${bmp(WA, C, 0, walkY)}</g>
  <g class="fb">${bmp(WB, C, 0, walkY)}</g>
</g>`

  // At desk (sitting, facing monitor, happy hearts floating)
  const atDesk = `<g class="ds" transform="translate(${deskSitX},0)">
  ${bmp(SI.slice(0, -1), C, 0, sitY)}
  <g class="tw">${bmp([SI[SI.length - 1]], C, catW, sitY + (SI.length - 1) * PX)}</g>
  <text class="ht" x="${catW - 8}" y="${sitY - 4}" font-family="monospace" font-size="10" fill="#ff4488">♥</text>
  <text class="ht2" x="${catW + 2}" y="${sitY - 2}" font-family="monospace" font-size="8" fill="#ff88aa">♡</text>
</g>`

  // Walk left (mirrored bitmaps)
  const walkL = `<g class="wl">
  <g class="fa">${bmp(WA_L, C, 0, walkY)}</g>
  <g class="fb">${bmp(WB_L, C, 0, walkY)}</g>
</g>`

  // Sleeping (warm z colors, using CS palette for closed eyes)
  const sleeping = `<g class="sl" transform="translate(${sleepX},0)">
  ${bmp(SL, CS, 0, sleepY)}
  <text class="z1" x="${catW + 6}" y="${sleepY - 2}" font-family="monospace" font-size="11" fill="#dd8830" font-weight="bold">z</text>
  <text class="z2" x="${catW + 14}" y="${sleepY - 10}" font-family="monospace" font-size="14" fill="#ee9920" font-weight="bold">z</text>
  <text class="z3" x="${catW + 22}" y="${sleepY - 20}" font-family="monospace" font-size="17" fill="#ff8810" font-weight="bold">Z</text>
</g>`

  return `<style>${css}</style>
${room}
${walkR}
${atDesk}
${walkL}
${sleeping}`
}
