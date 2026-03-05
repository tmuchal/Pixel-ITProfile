/**
 * Pixel art cozy IT cat room — complete redesign
 *
 * - 5px pixel unit → cat is 50×50px (visible!)
 * - 200px tall room → real depth
 * - Left-walk uses mirrored bitmaps (no scaleX CSS hack)
 * - Detailed room: window/moon, bookshelf, desk, monitor
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
// At 5px each: 50×50px — clearly visible

const C: Record<string, string> = {
  O: '#ff8c3a',  // orange body
  o: '#c96800',  // dark stripe
  W: '#fff5e0',  // cream belly/muzzle
  E: '#28c459',  // eye iris
  e: '#082808',  // pupil
  N: '#ff3060',  // nose
}

// Walking frame A — right-facing
const WA = [
  '.OO....OO.',
  '.OOOOOOOO.',
  '.OEeOOEeO.',
  '.OOooOooO.',
  '.OoWNNWoO.',
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
  '.OoWNNWoO.',
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
  '.OoWNNWoO.',
  '.OOOOOOOO.',
  '.OWWWWWOO.',
  'OOOOOOOOOO',
  'OOOOOOOOOO',
  '.OOOOOOOO.',
  '.oooooooo.',  // tail curled
]

// Sleeping — 10×8, curled up
const SL = [
  '..OOOOOO..',
  '.OOOOOOOO.',
  '.OOooOooO.',  // closed squinting eyes
  '.OOOOOOOO.',
  '.OoWNNWoO.',
  'OOOOOOOOOO',
  '.OOOOOOOO.',
  '.oooooooo.',  // tail
]

// Left-facing versions (mirrored — no CSS scaleX hack needed)
const WA_L = mirror(WA)
const WB_L = mirror(WB)

// ── Room builder ────────────────────────────────────────────────────────────

function buildRoom(w: number, h: number, accent: string): string {
  const floorY = h - 40
  const out: string[] = []

  // ── Background wall ──
  out.push(`<rect width="${w}" height="${floorY}" fill="#14102a"/>`)
  // Subtle wall gradient lines for depth
  for (let y = 0; y < floorY; y += 10) {
    out.push(`<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="#1a1635" stroke-width="1"/>`)
  }

  // ── Floor ──
  out.push(`<rect y="${floorY}" width="${w}" height="${h - floorY}" fill="#3a1e0c"/>`)
  // Floor plank lines
  for (let x = 0; x < w; x += 80) {
    out.push(`<line x1="${x}" y1="${floorY}" x2="${x}" y2="${h}" stroke="#2a1308" stroke-width="2"/>`)
  }
  // Floor highlight (edge between wall and floor)
  out.push(`<rect y="${floorY}" width="${w}" height="3" fill="#502a14" opacity="0.7"/>`)

  // ── Window (left) ──
  const wx = 18, wy = 10, ww = 118, wh = floorY - 14
  // Outer frame
  out.push(`<rect x="${wx - 5}" y="${wy - 5}" width="${ww + 10}" height="${wh + 10}" fill="#7a5030"/>`)
  // Night sky
  out.push(`<rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="#03091c"/>`)
  // Window cross dividers
  const wcx = wx + Math.floor(ww / 2), wcy = wy + Math.floor(wh / 2)
  out.push(`<rect x="${wcx - 3}" y="${wy}" width="6" height="${wh}" fill="#7a5030"/>`)
  out.push(`<rect x="${wx}" y="${wcy - 3}" width="${ww}" height="6" fill="#7a5030"/>`)
  // Crescent moon (top-right quadrant of window)
  const mx = wx + Math.floor(ww * 0.72), my = wy + Math.floor(wh * 0.2)
  out.push(`<circle cx="${mx}" cy="${my}" r="18" fill="#fff9d0" opacity="0.95"/>`)
  out.push(`<circle cx="${mx + 10}" cy="${my - 5}" r="15" fill="#03091c"/>`)
  // Stars
  const stars = [
    [wx + 14, wy + 16], [wx + 34, wy + 30], [wx + 22, wy + 56],
    [wx + 8,  wy + 78], [wx + 48, wy + 70], [wx + 30, wy + 100],
    [wx + 60, wy + 120],[wx + 10, wy + 130],[wx + 50, wy + 140],
    // top-right quadrant
    [wx + 76, wy + 22], [wx + 100, wy + 40],[wx + 90, wy + 65],
  ]
  stars.forEach(([sx, sy]) => {
    if (sy < wy + wh && sx < wx + ww) {
      const s = Math.random() > 0.6 ? 3 : 2
      out.push(`<rect x="${sx}" y="${sy}" width="${s}" height="${s}" fill="#fffbe8" opacity="0.85"/>`)
    }
  })
  // Soft moonlight glow on floor
  out.push(`<ellipse cx="${wx + ww / 2}" cy="${floorY + 8}" rx="38" ry="7" fill="#fff8c0" opacity="0.05"/>`)
  // Window sill
  out.push(`<rect x="${wx - 6}" y="${wy + wh - 2}" width="${ww + 12}" height="8" fill="#8a6040"/>`)

  // ── Bookshelf (center-left) ──
  const bx = 158, by = 32, bw = 88, bh = floorY - 32
  // Back panel
  out.push(`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="#3d2510"/>`)
  // Side panels
  out.push(`<rect x="${bx}" y="${by}" width="6" height="${bh}" fill="#5a3820"/>`)
  out.push(`<rect x="${bx + bw - 6}" y="${by}" width="6" height="${bh}" fill="#5a3820"/>`)
  // Top panel
  out.push(`<rect x="${bx}" y="${by}" width="${bw}" height="8" fill="#6a4428"/>`)
  // Shelves
  const shelfY = [by + 52, by + 104]
  shelfY.forEach(sy => {
    out.push(`<rect x="${bx}" y="${sy}" width="${bw}" height="7" fill="#6a4428"/>`)
  })
  // Books row 1 (top, y=by+8 to by+52)
  const books1 = [
    { x: bx + 8,  w: 14, h: 36, fill: '#a31515' },
    { x: bx + 24, w: 12, h: 42, fill: '#155a9a' },
    { x: bx + 38, w: 16, h: 34, fill: '#1a7a1a' },
    { x: bx + 56, w: 13, h: 40, fill: '#8a6a10' },
    { x: bx + 71, w: 11, h: 38, fill: '#6a1a6a' },
  ]
  books1.forEach(b => {
    out.push(`<rect x="${b.x}" y="${by + 8 + (44 - b.h)}" width="${b.w}" height="${b.h}" fill="${b.fill}"/>`)
    out.push(`<rect x="${b.x + 1}" y="${by + 8 + (44 - b.h) + 2}" width="${b.w - 2}" height="2" fill="#ffffff22"/>`)
  })
  // Books row 2
  const books2 = [
    { x: bx + 8,  w: 16, h: 40, fill: '#2a6a6a' },
    { x: bx + 26, w: 12, h: 35, fill: '#8a3010' },
    { x: bx + 40, w: 15, h: 42, fill: '#204080' },
    { x: bx + 57, w: 18, h: 38, fill: '#507020' },
  ]
  books2.forEach(b => {
    out.push(`<rect x="${b.x}" y="${shelfY[0] + 7 + (44 - b.h)}" width="${b.w}" height="${b.h}" fill="${b.fill}"/>`)
    out.push(`<rect x="${b.x + 1}" y="${shelfY[0] + 7 + (44 - b.h) + 2}" width="${b.w - 2}" height="2" fill="#ffffff22"/>`)
  })
  // Books row 3 + small plant
  const books3 = [
    { x: bx + 8,  w: 13, h: 36, fill: '#901515' },
    { x: bx + 23, w: 11, h: 42, fill: '#304090' },
    { x: bx + 36, w: 14, h: 38, fill: '#207040' },
  ]
  books3.forEach(b => {
    out.push(`<rect x="${b.x}" y="${shelfY[1] + 7 + (44 - b.h)}" width="${b.w}" height="${b.h}" fill="${b.fill}"/>`)
    out.push(`<rect x="${b.x + 1}" y="${shelfY[1] + 7 + (44 - b.h) + 2}" width="${b.w - 2}" height="2" fill="#ffffff22"/>`)
  })
  // Tiny plant on shelf
  const plx = bx + 58, ply = shelfY[1] + 7
  out.push(`<rect x="${plx + 2}" y="${ply - 16}" width="8" height="16" fill="#2a6e1a"/>`)
  out.push(`<rect x="${plx}" y="${ply - 28}" width="14" height="14" fill="#3a8e22" rx="5"/>`)
  out.push(`<rect x="${plx + 2}" y="${ply}" width="10" height="12" fill="#6a3010"/>`)

  // ── Desk (right side) ──
  const dx = w - 248, dw = 230, dtop = floorY - 38
  // Desktop surface
  out.push(`<rect x="${dx}" y="${dtop}" width="${dw}" height="10" fill="#7a4e28"/>`)
  out.push(`<rect x="${dx}" y="${dtop}" width="${dw}" height="10" fill="none" stroke="#5a3410" stroke-width="1"/>`)
  // Desk body
  out.push(`<rect x="${dx}" y="${dtop + 10}" width="${dw}" height="${floorY - dtop - 10}" fill="#6a3e1a"/>`)
  // Desk legs
  out.push(`<rect x="${dx + 10}" y="${floorY}" width="12" height="16" fill="#5a3010"/>`)
  out.push(`<rect x="${dx + dw - 22}" y="${floorY}" width="12" height="16" fill="#5a3010"/>`)

  // ── Monitor ──
  const monX = dx + 30, monY = dtop - 88, monW = 120, monH = 88
  // Stand
  out.push(`<rect x="${monX + monW / 2 - 8}" y="${dtop - 12}" width="16" height="12" fill="#252535"/>`)
  out.push(`<rect x="${monX + monW / 2 - 22}" y="${dtop - 4}" width="44" height="4" fill="#252535"/>`)
  // Monitor body
  out.push(`<rect x="${monX}" y="${monY}" width="${monW}" height="${monH}" fill="#1a1a2e" rx="4"/>`)
  out.push(`<rect x="${monX}" y="${monY}" width="${monW}" height="${monH}" fill="none" stroke="#2e2e4e" stroke-width="2" rx="4"/>`)
  // Screen area
  const scx = monX + 7, scy = monY + 7, scw = monW - 14, sch = monH - 18
  out.push(`<rect x="${scx}" y="${scy}" width="${scw}" height="${sch}" fill="#060e1a" rx="2"/>`)
  // Screen glow tint
  out.push(`<rect x="${scx}" y="${scy}" width="${scw}" height="${sch}" fill="${accent}" opacity="0.05" rx="2"/>`)
  // Code lines
  const lines = [
    { w: 60, c: accent },
    { w: 40, c: '#4488ff' },
    { w: 75, c: accent },
    { w: 50, c: '#aaaacc' },
    { w: 65, c: '#44ccaa' },
    { w: 35, c: '#4488ff' },
    { w: 55, c: accent },
    { w: 42, c: '#aaaacc' },
  ]
  lines.forEach((l, i) => {
    out.push(`<rect x="${scx + 8}" y="${scy + 6 + i * 7}" width="${l.w}" height="3" fill="${l.c}" opacity="0.85" rx="1"/>`)
  })
  // Blinking cursor
  out.push(
    `<rect x="${scx + 8}" y="${scy + 6 + lines.length * 7}" width="5" height="6" fill="${accent}" opacity="0.9">
  <animate attributeName="opacity" values="0.9;0;0.9" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"/>
</rect>`
  )
  // Power LED
  out.push(`<circle cx="${monX + monW / 2}" cy="${monY + monH - 5}" r="2.5" fill="${accent}" opacity="0.9">
  <animate attributeName="opacity" values="0.9;0.3;0.9" dur="3s" repeatCount="indefinite"/>
</circle>`)

  // ── Keyboard ──
  const kx = dx + 18, ky = dtop + 12, kw = 120, kh = 20
  out.push(`<rect x="${kx}" y="${ky}" width="${kw}" height="${kh}" fill="#1e1e34" rx="3"/>`)
  out.push(`<rect x="${kx}" y="${ky}" width="${kw}" height="${kh}" fill="none" stroke="#2e2e44" stroke-width="1" rx="3"/>`)
  for (let row = 0; row < 3; row++) {
    const keys = row === 0 ? 12 : row === 1 ? 11 : 10
    const rowW = kw - 8
    const keyW = Math.floor(rowW / keys) - 1
    const offsetX = row === 1 ? 3 : row === 2 ? 6 : 0
    for (let col = 0; col < keys; col++) {
      out.push(
        `<rect x="${kx + 4 + offsetX + col * (keyW + 1)}" y="${ky + 3 + row * 6}" width="${keyW}" height="4" fill="#282848" rx="1"/>`
      )
    }
  }

  // ── Coffee cup ──
  const cupX = dx + dw - 44, cupY = dtop + 6
  out.push(`<rect x="${cupX}" y="${cupY}" width="24" height="22" fill="#a0522d" rx="2"/>`)
  out.push(`<rect x="${cupX + 2}" y="${cupY + 2}" width="20" height="18" fill="#7a3820" rx="1"/>`)
  // Steam
  out.push(`<path d="M ${cupX + 8} ${cupY - 4} Q ${cupX + 6} ${cupY - 9} ${cupX + 10} ${cupY - 14}" stroke="#888" stroke-width="1.5" fill="none" opacity="0.5">
  <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite"/>
</path>`)
  out.push(`<path d="M ${cupX + 16} ${cupY - 6} Q ${cupX + 14} ${cupY - 12} ${cupX + 18} ${cupY - 18}" stroke="#888" stroke-width="1.5" fill="none" opacity="0.4">
  <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2.5s" repeatCount="indefinite"/>
</path>`)
  // Handle
  out.push(`<path d="M ${cupX + 24} ${cupY + 5} Q ${cupX + 32} ${cupY + 5} ${cupX + 32} ${cupY + 13} Q ${cupX + 32} ${cupY + 20} ${cupX + 24} ${cupY + 20}" stroke="#a0522d" stroke-width="3" fill="none"/>`)

  // ── Ceiling lamp ──
  const lx = Math.floor(w / 2)
  out.push(`<line x1="${lx}" y1="0" x2="${lx}" y2="14" stroke="#555" stroke-width="3"/>`)
  out.push(`<path d="M ${lx - 22} 14 L ${lx - 14} 30 L ${lx + 14} 30 L ${lx + 22} 14 Z" fill="#666"/>`)
  out.push(`<ellipse cx="${lx}" cy="30" rx="14" ry="5" fill="#ffe8a0" opacity="0.95"/>`)
  // Warm cone of light
  out.push(
    `<polygon points="${lx - 50},${floorY} ${lx + 50},${floorY} ${lx + 16},32 ${lx - 16},32" fill="#ffe8a0" opacity="0.04"/>`
  )

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

/* Z bubbles */
.z1{animation:zf 3s ease-out infinite}
.z2{animation:zf 3s ease-out .9s infinite}
.z3{animation:zf 3s ease-out 1.8s infinite}
@keyframes zf{0%{transform:translate(0,0);opacity:0}15%{opacity:.9}100%{transform:translate(10px,-22px);opacity:0}}`
}

// ── Main export ─────────────────────────────────────────────────────────────

export function buildCatRoomContent(w: number, h: number, accent: string): string {
  const floorY = h - 40
  const catH  = WA.length * PX       // 50px  (10 rows)
  const sitH  = SI.length * PX       // 55px  (11 rows)
  const sleepH = SL.length * PX      // 40px  (8 rows)
  const catW  = WA[0].length * PX    // 50px  (10 cols)

  // Cat floor positions
  const catFloor   = floorY           // bottom of walking/sitting cat
  const walkY      = catFloor - catH  // top of walking cat
  const sitY       = catFloor - sitH  // top of sitting cat
  const sleepY     = catFloor - sleepH + 5  // sleeping (slightly raised, curled)

  // Walk path: bookshelf ends ~x=246, desk starts ~x=w-248
  const walkStartX = 260
  const walkEndX   = w - 248 - catW  // cat's left edge when right against desk

  // Sleeping position: under window (window is ~x=18 to x=136)
  const sleepX = 28

  // Desk position for sitting cat
  const deskSitX = walkEndX

  // Animation: 5s walk + 12s desk + 5s walk back + 12s sleep = 34s
  const DUR = 34
  const t1 = 5   / DUR * 100   // ~14.7%
  const t2 = 17  / DUR * 100   // ~50%
  const t3 = 22  / DUR * 100   // ~64.7%

  const css = buildCSS(DUR, t1, t2, t3, walkStartX, walkEndX)

  const room = buildRoom(w, h, accent)

  // Walk right
  const walkR = `<g class="wr">
  <g class="fa">${bmp(WA, C, 0, walkY)}</g>
  <g class="fb">${bmp(WB, C, 0, walkY)}</g>
</g>`

  // At desk (sitting, facing monitor — sitting cat faces right by default)
  const atDesk = `<g class="ds" transform="translate(${deskSitX},0)">
  ${bmp(SI.slice(0, -1), C, 0, sitY)}
  <g class="tw">${bmp([SI[SI.length - 1]], C, catW, sitY + (SI.length - 1) * PX)}</g>
</g>`

  // Walk left (mirrored bitmaps — no CSS scaleX needed)
  const walkL = `<g class="wl">
  <g class="fa">${bmp(WA_L, C, 0, walkY)}</g>
  <g class="fb">${bmp(WB_L, C, 0, walkY)}</g>
</g>`

  // Sleeping
  const sleeping = `<g class="sl" transform="translate(${sleepX},0)">
  ${bmp(SL, C, 0, sleepY)}
  <text class="z1" x="${catW + 6}" y="${sleepY - 2}" font-family="monospace" font-size="11" fill="#9999aa" font-weight="bold">z</text>
  <text class="z2" x="${catW + 14}" y="${sleepY - 10}" font-family="monospace" font-size="14" fill="#7777aa" font-weight="bold">z</text>
  <text class="z3" x="${catW + 22}" y="${sleepY - 20}" font-family="monospace" font-size="17" fill="#5555aa" font-weight="bold">Z</text>
</g>`

  return `<style>${css}</style>
${room}
${walkR}
${atDesk}
${walkL}
${sleeping}`
}
