/**
 * Pixel art Dubai cat room — vibrant desert luxury
 *
 * - 5px pixel unit → cat is 50×50px (visible!)
 * - 200px tall room → real depth
 * - Dubai skyline + Burj Khalifa + desert sand dunes through window
 * - Warm luxury palette: ivory, gold, sand, blazing sky
 * - Energetic, lively atmosphere
 * - Kawaii cat with blush cheeks + hearts when coding
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
// Kawaii orange cat — blush cheeks, bright eyes

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

// Walking frame A — right-facing with blush
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

// Walking frame B
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

// Sitting — 10×11
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
  '.ToooooTT.',
]

// Sleeping — 10×8
const SL = [
  '..OOOOOO..',
  '.OOOOOOOO.',
  '.OO--O--O.',
  '.OOOOOOOO.',
  '.OBWNNWBo.',
  'OOOOOOOOOO',
  '.OOOOOOOO.',
  '.ToooooTT.',
]

const CS: Record<string, string> = {
  ...C,
  '-': '#cc4808',
}

const WA_L = mirror(WA)
const WB_L = mirror(WB)

// ── Burj Khalifa ────────────────────────────────────────────────────────────

function drawBurjKhalifa(cx: number, baseY: number, h: number, color: string): string {
  const out: string[] = []
  const tY = baseY - h

  // Spire (top 12% — very thin needle)
  const spH = Math.floor(h * 0.12)
  out.push(`<rect x="${cx - 1}" y="${tY}" width="2" height="${spH}" fill="${color}"/>`)
  // Needle tip
  out.push(`<rect x="${cx}" y="${tY - 8}" width="1" height="9" fill="${color}"/>`)

  // Upper taper (12%-28%)
  const utY = tY + spH
  const utH = Math.floor(h * 0.16)
  // Hexagonal cross-section drawn as stepped trapezoid
  out.push(`<polygon points="${cx - 3},${utY} ${cx + 3},${utY} ${cx + 5},${utY + utH} ${cx - 5},${utY + utH}" fill="${color}"/>`)

  // Section 1 (28%-44%) — stepped setback
  const s1Y = utY + utH
  const s1H = Math.floor(h * 0.16)
  const s1W = 12
  out.push(`<rect x="${cx - s1W / 2}" y="${s1Y}" width="${s1W}" height="${s1H}" fill="${color}"/>`)
  // Setback notches (Y-shape wings barely visible at this scale)
  out.push(`<rect x="${cx - s1W / 2 - 3}" y="${s1Y + Math.floor(s1H * 0.2)}" width="3" height="${Math.floor(s1H * 0.3)}" fill="${color}"/>`)
  out.push(`<rect x="${cx + s1W / 2}" y="${s1Y + Math.floor(s1H * 0.2)}" width="3" height="${Math.floor(s1H * 0.3)}" fill="${color}"/>`)

  // Section 2 (44%-60%) — wider stepped platform
  const s2Y = s1Y + s1H
  const s2H = Math.floor(h * 0.16)
  const s2W = 16
  out.push(`<rect x="${cx - s2W / 2}" y="${s2Y}" width="${s2W}" height="${s2H}" fill="${color}"/>`)
  out.push(`<rect x="${cx - s2W / 2 - 4}" y="${s2Y + Math.floor(s2H * 0.1)}" width="4" height="${Math.floor(s2H * 0.5)}" fill="${color}"/>`)
  out.push(`<rect x="${cx + s2W / 2}" y="${s2Y + Math.floor(s2H * 0.1)}" width="4" height="${Math.floor(s2H * 0.5)}" fill="${color}"/>`)

  // Section 3 (60%-76%) — main lower body
  const s3Y = s2Y + s2H
  const s3H = Math.floor(h * 0.16)
  const s3W = 20
  out.push(`<rect x="${cx - s3W / 2}" y="${s3Y}" width="${s3W}" height="${s3H}" fill="${color}"/>`)
  out.push(`<rect x="${cx - s3W / 2 - 5}" y="${s3Y + Math.floor(s3H * 0.05)}" width="5" height="${Math.floor(s3H * 0.6)}" fill="${color}"/>`)
  out.push(`<rect x="${cx + s3W / 2}" y="${s3Y + Math.floor(s3H * 0.05)}" width="5" height="${Math.floor(s3H * 0.6)}" fill="${color}"/>`)

  // Base (76%-100%) — wide base block
  const s4Y = s3Y + s3H
  const s4H = baseY - s4Y
  const s4W = 26
  out.push(`<rect x="${cx - s4W / 2}" y="${s4Y}" width="${s4W}" height="${s4H}" fill="${color}"/>`)

  // Glass window glints on tower (bright streaks)
  const glintColor = '#c8e8ff'
  out.push(`<rect x="${cx - 1}" y="${utY + 4}" width="1" height="${Math.floor(utH * 0.4)}" fill="${glintColor}" opacity="0.4"/>`)
  out.push(`<rect x="${cx - 2}" y="${s1Y + 4}" width="1" height="${Math.floor(s1H * 0.4)}" fill="${glintColor}" opacity="0.4"/>`)
  out.push(`<rect x="${cx - 3}" y="${s2Y + 4}" width="1" height="${Math.floor(s2H * 0.4)}" fill="${glintColor}" opacity="0.35"/>`)

  return out.join('\n')
}

// ── Dubai Skyline ────────────────────────────────────────────────────────────

function drawDubaiSkyline(wx: number, wy: number, ww: number, wh: number, skyY: number): string {
  const out: string[] = []
  const bColor = '#1a2030'  // dark navy silhouette for glass towers
  const bColor2 = '#0f1820' // darker for depth

  // Buildings from left to right (various modern skyscraper shapes)
  // Far left — medium tower
  const b1X = wx + 5, b1W = 10, b1H = 42, b1Top = skyY - b1H
  out.push(`<rect x="${b1X}" y="${b1Top}" width="${b1W}" height="${b1H}" fill="${bColor2}"/>`)
  // Antenna
  out.push(`<rect x="${b1X + 4}" y="${b1Top - 8}" width="2" height="10" fill="${bColor2}"/>`)
  // Window grid
  for (let wy2 = b1Top + 4; wy2 < skyY - 4; wy2 += 7) {
    for (let wx2 = b1X + 2; wx2 < b1X + b1W - 2; wx2 += 4) {
      out.push(`<rect x="${wx2}" y="${wy2}" width="2" height="4" fill="#ffe8a0" opacity="0.6"/>`)
    }
  }

  // Second tower (stepped)
  const b2X = wx + 18, b2H = 55
  const b2Top = skyY - b2H
  out.push(`<rect x="${b2X}" y="${b2Top}" width="8" height="${b2H}" fill="${bColor}"/>`)
  out.push(`<rect x="${b2X - 4}" y="${b2Top + 20}" width="16" height="${b2H - 20}" fill="${bColor}"/>`)
  for (let wy2 = b2Top + 4; wy2 < skyY - 3; wy2 += 6) {
    out.push(`<rect x="${b2X + 1}" y="${wy2}" width="4" height="3" fill="#a0d8ff" opacity="0.3"/>`)
  }

  // Twin towers style (left of Burj)
  const b3X = wx + 36, b3H = 62
  const b3Top = skyY - b3H
  out.push(`<rect x="${b3X}" y="${b3Top}" width="9" height="${b3H}" fill="${bColor}"/>`)
  out.push(`<rect x="${b3X + 12}" y="${b3Top + 8}" width="9" height="${b3H - 8}" fill="${bColor}"/>`)
  // Bridge between twins
  out.push(`<rect x="${b3X}" y="${b3Top + 28}" width="21" height="4" fill="${bColor}"/>`)

  // Burj Khalifa — CENTER STAR (tall!)
  const burjCX = wx + Math.floor(ww / 2)
  const burjH = Math.floor(wh * 0.80)
  out.push(drawBurjKhalifa(burjCX, skyY, burjH, bColor))

  // Right side towers
  // Curved tower (like Cayan/Infinity Tower)
  const b5X = wx + ww - 56, b5H = 68, b5Top = skyY - b5H
  out.push(`<rect x="${b5X}" y="${b5Top}" width="10" height="${b5H}" fill="${bColor}"/>`)
  // Slight taper
  out.push(`<rect x="${b5X - 2}" y="${b5Top + 30}" width="14" height="${b5H - 30}" fill="${bColor}"/>`)
  for (let wy2 = b5Top + 3; wy2 < skyY - 3; wy2 += 6) {
    out.push(`<rect x="${b5X + 2}" y="${wy2}" width="3" height="3" fill="#ffe8a0" opacity="0.5"/>`)
  }

  // Wide tower right
  const b6X = wx + ww - 40, b6H = 52, b6Top = skyY - b6H
  out.push(`<rect x="${b6X}" y="${b6Top}" width="14" height="${b6H}" fill="${bColor2}"/>`)
  out.push(`<rect x="${b6X + 5}" y="${b6Top - 10}" width="4" height="12" fill="${bColor2}"/>`)
  for (let wy2 = b6Top + 4; wy2 < skyY - 3; wy2 += 7) {
    for (let wx2 = b6X + 2; wx2 < b6X + 12; wx2 += 4) {
      out.push(`<rect x="${wx2}" y="${wy2}" width="2" height="4" fill="#a0d8ff" opacity="0.35"/>`)
    }
  }

  // Far right short tower
  const b7X = wx + ww - 20, b7H = 38, b7Top = skyY - b7H
  out.push(`<rect x="${b7X}" y="${b7Top}" width="18" height="${b7H}" fill="${bColor}"/>`)
  out.push(`<rect x="${b7X + 6}" y="${b7Top - 6}" width="5" height="8" fill="${bColor}"/>`)

  return out.join('\n')
}

// ── Room builder ────────────────────────────────────────────────────────────

function buildRoom(w: number, h: number, accent: string): string {
  const floorY = h - 40
  const out: string[] = []

  // ── Ivory luxury wall ──
  out.push(`<rect width="${w}" height="${floorY}" fill="#f5ead5"/>`)
  // Subtle warm texture
  for (let y = 0; y < floorY; y += 10) {
    out.push(`<rect x="0" y="${y}" width="${w}" height="1" fill="#e8d8b8" opacity="0.35"/>`)
  }
  // Warm light wash from window
  out.push(`<rect x="0" y="0" width="180" height="${floorY}" fill="#ffe890" opacity="0.12"/>`)
  // Gold wall trim strips (luxury detail)
  out.push(`<rect x="0" y="${floorY - 8}" width="${w}" height="2" fill="#c8960a" opacity="0.5"/>`)
  out.push(`<rect x="0" y="6" width="${w}" height="2" fill="#c8960a" opacity="0.3"/>`)

  // ── Marble-look floor ──
  out.push(`<rect y="${floorY}" width="${w}" height="${h - floorY}" fill="#e8dcc8"/>`)
  // Marble veins
  for (let x = 0; x < w; x += 60) {
    out.push(`<line x1="${x}" y1="${floorY}" x2="${x + 20}" y2="${h}" stroke="#d4c4a8" stroke-width="1" opacity="0.6"/>`)
  }
  out.push(`<rect y="${floorY}" width="${w}" height="3" fill="#ddd0b8" opacity="0.7"/>`)

  // ── Window (left) — Dubai skyline view ──
  const wx = 16, wy = 8, ww = 122, wh = floorY - 12
  const wcx = wx + Math.floor(ww / 2)
  const wcy = wy + Math.floor(wh / 2)

  // Gold window frame
  out.push(`<rect x="${wx - 7}" y="${wy - 7}" width="${ww + 14}" height="${wh + 14}" fill="#b88010"/>`)
  out.push(`<rect x="${wx - 5}" y="${wy - 5}" width="${ww + 10}" height="${wh + 10}" fill="#d4a020"/>`)

  // Sky — blazing Dubai blue, bright and hot
  out.push(`<rect x="${wx}" y="${wy}" width="${ww}" height="${Math.floor(wh * 0.50)}" fill="#1a90e8"/>`)
  // Horizon haze (heat shimmer)
  out.push(`<rect x="${wx}" y="${wy + Math.floor(wh * 0.40)}" width="${ww}" height="${Math.floor(wh * 0.25)}" fill="#f0c830"/>`)
  out.push(`<rect x="${wx}" y="${wy + Math.floor(wh * 0.45)}" width="${ww}" height="${Math.floor(wh * 0.12)}" fill="#f8d840" opacity="0.6"/>`)

  // Desert sand dunes (lower 30% of window)
  const duneY = wy + Math.floor(wh * 0.66)
  // Back dune (lighter)
  out.push(`<ellipse cx="${wx + 30}" cy="${duneY + 8}" rx="36" ry="14" fill="#e8c060"/>`)
  out.push(`<ellipse cx="${wx + ww - 20}" cy="${duneY + 10}" rx="32" ry="12" fill="#ddb850"/>`)
  // Front dunes (richer sand)
  out.push(`<ellipse cx="${wx + 15}" cy="${duneY + 22}" rx="28" ry="18" fill="#d4a030"/>`)
  out.push(`<ellipse cx="${wx + 70}" cy="${duneY + 20}" rx="40" ry="16" fill="#c89820"/>`)
  out.push(`<ellipse cx="${wx + ww - 5}" cy="${duneY + 24}" rx="30" ry="16" fill="#d4a030"/>`)
  // Sand ground
  out.push(`<rect x="${wx}" y="${duneY + 18}" width="${ww}" height="${wy + wh - duneY - 18}" fill="#c89020"/>`)
  // Sand highlight ridges
  out.push(`<line x1="${wx + 8}" y1="${duneY + 12}" x2="${wx + 30}" y2="${duneY + 8}" stroke="#e8d060" stroke-width="1.5" opacity="0.5"/>`)
  out.push(`<line x1="${wx + 55}" y1="${duneY + 16}" x2="${wx + 85}" y2="${duneY + 11}" stroke="#e8d060" stroke-width="1.5" opacity="0.5"/>`)

  // Dubai skyline
  const skylineBaseY = duneY + 10
  out.push(drawDubaiSkyline(wx, wy, ww, wh, skylineBaseY))

  // Blazing hot sun (upper left)
  const sunX = wx + 20, sunY = wy + Math.floor(wh * 0.14)
  out.push(`<circle cx="${sunX}" cy="${sunY}" r="14" fill="#fff060" opacity="0.98"/>`)
  out.push(`<circle cx="${sunX}" cy="${sunY}" r="20" fill="#ffe820" opacity="0.3"/>`)
  out.push(`<circle cx="${sunX}" cy="${sunY}" r="26" fill="#ffcc00" opacity="0.14"/>`)
  // Sun rays
  ;[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].forEach(deg => {
    const rad = (deg * Math.PI) / 180
    const x1 = sunX + Math.cos(rad) * 20, y1 = sunY + Math.sin(rad) * 20
    const x2 = sunX + Math.cos(rad) * 30, y2 = sunY + Math.sin(rad) * 30
    out.push(`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#ffe840" stroke-width="2" opacity="0.6"/>`)
  })

  // Heat shimmer lines (animated)
  for (let i = 0; i < 3; i++) {
    const hx = wx + 25 + i * 30, hy = duneY - 8
    out.push(`<line x1="${hx}" y1="${hy}" x2="${hx + 6}" y2="${hy - 10}" stroke="#ffe8a0" stroke-width="1" opacity="0.3">
  <animate attributeName="opacity" values="0.3;0;0.3" dur="${1.5 + i * 0.4}s" repeatCount="indefinite"/>
</line>`)
  }

  // Window frame cross dividers (gold)
  out.push(`<rect x="${wcx - 3}" y="${wy}" width="6" height="${wh}" fill="#b88010"/>`)
  out.push(`<rect x="${wx}" y="${wcy - 3}" width="${ww}" height="6" fill="#b88010"/>`)

  // Sand-colored light on floor
  out.push(`<polygon points="${wx},${floorY} ${wx + ww},${floorY} ${wx + ww + 35},${h} ${wx - 35},${h}" fill="#ffe880" opacity="0.14"/>`)

  // Window sill (gold marble)
  out.push(`<rect x="${wx - 8}" y="${wy + wh - 2}" width="${ww + 16}" height="10" fill="#c89830"/>`)

  // ── Gold silk curtains (luxury Dubai style) ──
  // Left curtain
  out.push(`<rect x="${wx - 7}" y="${wy - 7}" width="16" height="${wh + 14}" fill="#c8920a" opacity="0.9"/>`)
  // Curtain folds
  for (let cy = wy + 15; cy < wy + wh - 8; cy += 20) {
    out.push(`<line x1="${wx - 7}" y1="${cy}" x2="${wx + 9}" y2="${cy + 10}" stroke="#e8b020" stroke-width="2" opacity="0.4"/>`)
    out.push(`<line x1="${wx - 7}" y1="${cy + 12}" x2="${wx + 6}" y2="${cy + 5}" stroke="#a07008" stroke-width="1" opacity="0.3"/>`)
  }
  // Curtain sheen
  out.push(`<rect x="${wx - 4}" y="${wy}" width="3" height="${wh}" fill="#e8c030" opacity="0.25"/>`)
  // Right curtain
  out.push(`<rect x="${wx + ww - 9}" y="${wy - 7}" width="16" height="${wh + 14}" fill="#c8920a" opacity="0.9"/>`)
  for (let cy = wy + 15; cy < wy + wh - 8; cy += 20) {
    out.push(`<line x1="${wx + ww - 9}" y1="${cy + 10}" x2="${wx + ww + 7}" y2="${cy}" stroke="#e8b020" stroke-width="2" opacity="0.4"/>`)
  }
  out.push(`<rect x="${wx + ww + 6}" y="${wy}" width="3" height="${wh}" fill="#e8c030" opacity="0.25"/>`)
  // Curtain rod (gold)
  out.push(`<rect x="${wx - 10}" y="${wy - 12}" width="${ww + 20}" height="7" fill="#c8a020" rx="3"/>`)

  // ── Bookshelf (center) — dark luxury wood with gold trim ──
  const bx = 164, by = 28, bw = 90, bh = floorY - 28
  out.push(`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="#2a1808"/>`)
  out.push(`<rect x="${bx}" y="${by}" width="7" height="${bh}" fill="#5a3010"/>`)
  out.push(`<rect x="${bx + bw - 7}" y="${by}" width="7" height="${bh}" fill="#5a3010"/>`)
  // Gold trim on edges
  out.push(`<rect x="${bx + 2}" y="${by}" width="2" height="${bh}" fill="#c89020" opacity="0.5"/>`)
  out.push(`<rect x="${bx + bw - 4}" y="${by}" width="2" height="${bh}" fill="#c89020" opacity="0.5"/>`)
  out.push(`<rect x="${bx}" y="${by}" width="${bw}" height="10" fill="#5a3010"/>`)
  // Gold shelf top strip
  out.push(`<rect x="${bx}" y="${by}" width="${bw}" height="3" fill="#c89020" opacity="0.7"/>`)

  const shelfY = [by + 54, by + 108]
  shelfY.forEach(sy => {
    out.push(`<rect x="${bx}" y="${sy}" width="${bw}" height="8" fill="#4a2808"/>`)
    out.push(`<rect x="${bx}" y="${sy}" width="${bw}" height="2" fill="#c89020" opacity="0.5"/>`)
  })

  // Books — rich jewel tones
  const books1 = [
    { x: bx + 9,  w: 13, h: 38, fill: '#8b0a1a' },
    { x: bx + 24, w: 12, h: 44, fill: '#0a2880' },
    { x: bx + 38, w: 15, h: 36, fill: '#0a6830' },
    { x: bx + 55, w: 13, h: 42, fill: '#806010' },
    { x: bx + 70, w: 12, h: 40, fill: '#580a80' },
  ]
  books1.forEach(b => {
    out.push(`<rect x="${b.x}" y="${by + 10 + (46 - b.h)}" width="${b.w}" height="${b.h}" fill="${b.fill}"/>`)
    // Gold spine label
    out.push(`<rect x="${b.x + 2}" y="${by + 10 + (46 - b.h) + 3}" width="${b.w - 4}" height="2" fill="#c89020" opacity="0.5"/>`)
  })

  const books2 = [
    { x: bx + 9,  w: 15, h: 42, fill: '#0a5888' },
    { x: bx + 26, w: 11, h: 38, fill: '#881a08' },
    { x: bx + 39, w: 14, h: 44, fill: '#083870' },
    { x: bx + 55, w: 17, h: 40, fill: '#406010' },
  ]
  books2.forEach(b => {
    out.push(`<rect x="${b.x}" y="${shelfY[0] + 8 + (46 - b.h)}" width="${b.w}" height="${b.h}" fill="${b.fill}"/>`)
    out.push(`<rect x="${b.x + 2}" y="${shelfY[0] + 8 + (46 - b.h) + 3}" width="${b.w - 4}" height="2" fill="#c89020" opacity="0.5"/>`)
  })

  const books3 = [
    { x: bx + 9,  w: 12, h: 38, fill: '#8b0a1a' },
    { x: bx + 23, w: 10, h: 44, fill: '#1a3888' },
    { x: bx + 35, w: 14, h: 40, fill: '#0a6830' },
  ]
  books3.forEach(b => {
    out.push(`<rect x="${b.x}" y="${shelfY[1] + 8 + (46 - b.h)}" width="${b.w}" height="${b.h}" fill="${b.fill}"/>`)
    out.push(`<rect x="${b.x + 2}" y="${shelfY[1] + 8 + (46 - b.h) + 3}" width="${b.w - 4}" height="2" fill="#c89020" opacity="0.5"/>`)
  })

  // Gold ornament on shelf 3
  const ornX = bx + 58, ornY = shelfY[1] + 8
  // Traditional Arabic vase/lantern
  out.push(`<rect x="${ornX + 4}" y="${ornY - 28}" width="8" height="28" fill="#c89020" rx="2"/>`)
  out.push(`<ellipse cx="${ornX + 8}" cy="${ornY - 28}" rx="10" ry="5" fill="#c89020"/>`)
  out.push(`<rect x="${ornX + 2}" y="${ornY - 14}" width="12" height="3" fill="#e8b030"/>`)
  out.push(`<rect x="${ornX + 5}" y="${ornY - 30}" width="6" height="4" fill="#e8b030"/>`)
  out.push(`<rect x="${ornX + 6}" y="${ornY - 34}" width="4" height="6" fill="#c89020"/>`)

  // ── Desk (right side) — dark luxury wood + gold accents ──
  const dx = w - 250, dw = 232, dtop = floorY - 40
  // Desktop — dark ebony-style
  out.push(`<rect x="${dx}" y="${dtop}" width="${dw}" height="12" fill="#2a1808"/>`)
  out.push(`<rect x="${dx}" y="${dtop}" width="${dw}" height="3" fill="#c89020" opacity="0.6"/>`)
  out.push(`<rect x="${dx}" y="${dtop + 9}" width="${dw}" height="3" fill="#c89020" opacity="0.3"/>`)
  out.push(`<rect x="${dx}" y="${dtop + 12}" width="${dw}" height="${floorY - dtop - 12}" fill="#1e1008"/>`)
  // Desk legs with gold feet
  out.push(`<rect x="${dx + 12}" y="${floorY}" width="14" height="18" fill="#1e1008"/>`)
  out.push(`<rect x="${dx + 12}" y="${floorY + 14}" width="14" height="4" fill="#c89020" opacity="0.7"/>`)
  out.push(`<rect x="${dx + dw - 26}" y="${floorY}" width="14" height="18" fill="#1e1008"/>`)
  out.push(`<rect x="${dx + dw - 26}" y="${floorY + 14}" width="14" height="4" fill="#c89020" opacity="0.7"/>`)

  // ── Ultrawide curved monitor (Dubai tech vibes) ──
  const monX = dx + 18, monY = dtop - 96, monW = 152, monH = 94
  // Stand
  out.push(`<rect x="${monX + monW / 2 - 26}" y="${dtop - 5}" width="52" height="5" fill="#1a1a20"/>`)
  out.push(`<rect x="${monX + monW / 2 - 9}" y="${dtop - 18}" width="18" height="16" fill="#1a1a20"/>`)
  // Monitor bezel (slim)
  out.push(`<rect x="${monX}" y="${monY}" width="${monW}" height="${monH}" fill="#101018" rx="6"/>`)
  out.push(`<rect x="${monX}" y="${monY}" width="${monW}" height="${monH}" fill="none" stroke="#c89020" stroke-width="1.5" rx="6" opacity="0.5"/>`)
  // Screen
  const scx = monX + 7, scy = monY + 6, scw = monW - 14, sch = monH - 18
  out.push(`<rect x="${scx}" y="${scy}" width="${scw}" height="${sch}" fill="#06080e" rx="3"/>`)
  // Warm screen glow
  out.push(`<rect x="${scx}" y="${scy}" width="${scw}" height="${sch}" fill="${accent}" opacity="0.05" rx="3"/>`)

  // Code on screen — warm gold syntax highlighting
  const codeLines = [
    { indent: 0,  w: 55, color: '#ff8c30' },   // keyword
    { indent: 10, w: 72, color: '#ffd060' },   // identifier
    { indent: 10, w: 48, color: '#60c8ff' },   // string
    { indent: 10, w: 80, color: '#ffd060' },
    { indent: 10, w: 60, color: '#ff8c30' },
    { indent: 20, w: 50, color: '#c0e8ff' },
    { indent: 20, w: 68, color: '#ffd060' },
    { indent: 20, w: 42, color: '#80ff90' },   // comment
    { indent: 10, w: 35, color: '#80ff90' },
    { indent: 0,  w: 14, color: '#ff8c30' },
  ]
  codeLines.forEach((l, i) => {
    out.push(`<rect x="${scx + 6 + l.indent}" y="${scy + 4 + i * 7}" width="${l.w}" height="3.5" fill="${l.color}" opacity="0.9" rx="1"/>`)
  })
  // Cursor blink
  out.push(`<rect x="${scx + 6}" y="${scy + 4 + codeLines.length * 7}" width="5" height="6" fill="${accent}" opacity="0.9">
  <animate attributeName="opacity" values="0.9;0;0.9" keyTimes="0;0.5;1" dur="0.9s" repeatCount="indefinite"/>
</rect>`)
  // LED indicator (gold)
  out.push(`<circle cx="${monX + monW / 2}" cy="${monY + monH - 5}" r="2.5" fill="#ffd030" opacity="0.9">
  <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2.8s" repeatCount="indefinite"/>
</circle>`)

  // ── Keyboard — sleek dark with gold enter key ──
  const kx = dx + 16, ky = dtop + 14, kw = 138, kh = 22
  out.push(`<rect x="${kx}" y="${ky}" width="${kw}" height="${kh}" fill="#101018" rx="3"/>`)
  out.push(`<rect x="${kx}" y="${ky}" width="${kw}" height="${kh}" fill="none" stroke="#c89020" stroke-width="1" rx="3" opacity="0.5"/>`)
  for (let row = 0; row < 3; row++) {
    const keys = row === 0 ? 13 : row === 1 ? 12 : 11
    const rowW = kw - 10
    const keyW = Math.floor(rowW / keys) - 1
    const offsetX = row === 1 ? 4 : row === 2 ? 7 : 0
    for (let col = 0; col < keys; col++) {
      // Gold accents on a few keys
      const isGold = (row === 1 && col === keys - 1) || (row === 2 && col === 0)
      const kFill = isGold ? '#4a3808' : '#1e1828'
      out.push(`<rect x="${kx + 5 + offsetX + col * (keyW + 1)}" y="${ky + 4 + row * 7}" width="${keyW}" height="5" fill="${kFill}" rx="1"/>`)
    }
  }

  // ── Arabic-style tea set (instead of coffee) ──
  const cupX = dx + dw - 50, cupY = dtop + 3
  // Tray
  out.push(`<ellipse cx="${cupX + 16}" cy="${cupY + 28}" rx="22" ry="5" fill="#b88010" opacity="0.8"/>`)
  // Dallah (Arabic coffee pot)
  out.push(`<polygon points="${cupX + 4},${cupY + 4} ${cupX + 2},${cupY + 26} ${cupX + 16},${cupY + 28} ${cupX + 20},${cupY + 10} ${cupX + 12},${cupY + 4}" fill="#c89020"/>`)
  out.push(`<rect x="${cupX + 6}" y="${cupY + 4}" width="12" height="4" fill="#e8b030"/>`)
  // Spout
  out.push(`<path d="M ${cupX + 4} ${cupY + 12} Q ${cupX - 4} ${cupY + 10} ${cupX - 6} ${cupY + 14}" stroke="#c89020" stroke-width="3" fill="none"/>`)
  // Handle
  out.push(`<path d="M ${cupX + 20} ${cupY + 8} Q ${cupX + 28} ${cupY + 8} ${cupX + 28} ${cupY + 16} Q ${cupX + 28} ${cupY + 22} ${cupX + 20} ${cupY + 22}" stroke="#b88010" stroke-width="2.5" fill="none"/>`)
  // Small cup (finjan)
  out.push(`<rect x="${cupX + 22}" y="${cupY + 14}" width="12" height="10" fill="#c89020" rx="2"/>`)
  out.push(`<ellipse cx="${cupX + 28}" cy="${cupY + 14}" rx="5" ry="2" fill="#e8c030"/>`)
  // Steam
  out.push(`<path d="M ${cupX + 10} ${cupY} Q ${cupX + 8} ${cupY - 6} ${cupX + 12} ${cupY - 12}" stroke="#ffe8a0" stroke-width="1.5" fill="none" opacity="0.5">
  <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2.2s" repeatCount="indefinite"/>
</path>`)

  // ── UAE flag on desk ──
  const flagX = dx + dw - 92, flagY = dtop - 26
  out.push(`<line x1="${flagX + 2}" y1="${flagY - 18}" x2="${flagX + 2}" y2="${dtop - 2}" stroke="#6a4010" stroke-width="2"/>`)
  // UAE flag stripes: green top, white middle, black bottom + red left stripe
  out.push(`<rect x="${flagX + 2}" y="${flagY - 18}" width="6" height="18" fill="#00732f"/>`)
  out.push(`<rect x="${flagX + 8}" y="${flagY - 18}" width="22" height="6" fill="#00732f"/>`)
  out.push(`<rect x="${flagX + 8}" y="${flagY - 12}" width="22" height="6" fill="#ffffff"/>`)
  out.push(`<rect x="${flagX + 8}" y="${flagY - 6}" width="22" height="6" fill="#000000"/>`)

  // ── Ornate ceiling chandelier ──
  const lx = Math.floor(w / 2 + 50)
  out.push(`<line x1="${lx}" y1="0" x2="${lx}" y2="12" stroke="#c89020" stroke-width="3"/>`)
  // Chandelier body
  out.push(`<ellipse cx="${lx}" cy="20" rx="20" ry="8" fill="#c89020"/>`)
  out.push(`<ellipse cx="${lx}" cy="20" rx="16" ry="5" fill="#e8b030"/>`)
  // Hanging crystal teardrops
  const drops = [-14, -8, 0, 8, 14]
  drops.forEach(dx2 => {
    const dropY = 28 + Math.abs(dx2) * 0.5
    out.push(`<line x1="${lx + dx2}" y1="28" x2="${lx + dx2}" y2="${dropY + 8}" stroke="#c89020" stroke-width="1"/>`)
    out.push(`<ellipse cx="${lx + dx2}" cy="${dropY + 12}" rx="3" ry="5" fill="#ffe8a0" opacity="0.85"/>`)
  })
  // Warm golden glow
  out.push(`<ellipse cx="${lx}" cy="40" rx="20" ry="6" fill="#ffe090" opacity="0.9"/>`)
  out.push(`<polygon points="${lx - 65},${floorY} ${lx + 65},${floorY} ${lx + 22},42 ${lx - 22},42" fill="#ffe090" opacity="0.08"/>`)

  // ── Wall art — Dubai skyline painting ──
  const picX = w - 196, picY = 16, picW = 52, picH = 44
  out.push(`<rect x="${picX - 2}" y="${picY - 2}" width="${picW + 4}" height="${picH + 4}" fill="#c89020"/>`)
  out.push(`<rect x="${picX}" y="${picY}" width="${picW}" height="${picH}" fill="#1a3060"/>`)
  // Mini Dubai skyline in painting
  const pSkyY = picY + Math.floor(picH * 0.75)
  // Mini Burj Khalifa
  const pCX = picX + picW / 2
  out.push(`<rect x="${pCX - 1}" y="${picY + 4}" width="2" height="${pSkyY - picY - 4}" fill="#8090a8"/>`)
  out.push(`<rect x="${pCX - 3}" y="${pSkyY - 18}" width="6" height="18" fill="#8090a8"/>`)
  out.push(`<rect x="${pCX - 6}" y="${pSkyY - 10}" width="12" height="10" fill="#8090a8"/>`)
  // Side buildings
  out.push(`<rect x="${picX + 6}" y="${pSkyY - 14}" width="8" height="14" fill="#6080a0"/>`)
  out.push(`<rect x="${picX + 16}" y="${pSkyY - 20}" width="8" height="20" fill="#7090b0"/>`)
  out.push(`<rect x="${picX + picW - 14}" y="${pSkyY - 16}" width="8" height="16" fill="#6080a0"/>`)
  out.push(`<rect x="${picX + picW - 24}" y="${pSkyY - 22}" width="8" height="22" fill="#7090b0"/>`)
  // Sand ground in painting
  out.push(`<rect x="${picX}" y="${pSkyY}" width="${picW}" height="${picH - Math.floor(picH * 0.75)}" fill="#c09030"/>`)
  // Stars/lights in painting sky
  ;[[picX + 8, picY + 8], [picX + 24, picY + 6], [picX + 38, picY + 10], [picX + 46, picY + 7]].forEach(([sx, sy]) => {
    out.push(`<rect x="${sx}" y="${sy}" width="2" height="2" fill="#ffe8a0" opacity="0.8"/>`)
  })
  // Gold picture title strip
  out.push(`<rect x="${picX}" y="${picY + picH - 8}" width="${picW}" height="8" fill="#c89020" opacity="0.8"/>`)

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

/* Z bubbles — warm gold */
.z1{animation:zf 3s ease-out infinite}
.z2{animation:zf 3s ease-out .9s infinite}
.z3{animation:zf 3s ease-out 1.8s infinite}
@keyframes zf{0%{transform:translate(0,0);opacity:0}15%{opacity:.9}100%{transform:translate(10px,-22px);opacity:0}}

/* Gold star sparkle when coding */
.ht{animation:htf 2s ease-out infinite}
.ht2{animation:htf 2s ease-out 1s infinite}
@keyframes htf{0%{transform:translate(0,0);opacity:0}20%{opacity:0.95}100%{transform:translate(5px,-20px);opacity:0}}`
}

// ── Main export ─────────────────────────────────────────────────────────────

export function buildCatRoomContent(w: number, h: number, accent: string): string {
  const floorY = h - 40
  const catH   = WA.length * PX
  const sitH   = SI.length * PX
  const sleepH = SL.length * PX
  const catW   = WA[0].length * PX

  const catFloor  = floorY
  const walkY     = catFloor - catH
  const sitY      = catFloor - sitH
  const sleepY    = catFloor - sleepH + 5

  const walkStartX = 264
  const walkEndX   = w - 250 - catW
  const sleepX = 30
  const deskSitX = walkEndX

  const DUR = 34
  const t1 = 5   / DUR * 100
  const t2 = 17  / DUR * 100
  const t3 = 22  / DUR * 100

  const css = buildCSS(DUR, t1, t2, t3, walkStartX, walkEndX)
  const room = buildRoom(w, h, accent)

  const walkR = `<g class="wr">
  <g class="fa">${bmp(WA, C, 0, walkY)}</g>
  <g class="fb">${bmp(WB, C, 0, walkY)}</g>
</g>`

  const atDesk = `<g class="ds" transform="translate(${deskSitX},0)">
  ${bmp(SI.slice(0, -1), C, 0, sitY)}
  <g class="tw">${bmp([SI[SI.length - 1]], C, catW, sitY + (SI.length - 1) * PX)}</g>
  <text class="ht" x="${catW - 8}" y="${sitY - 4}" font-family="monospace" font-size="11" fill="#ffd030">★</text>
  <text class="ht2" x="${catW + 4}" y="${sitY - 2}" font-family="monospace" font-size="8" fill="#ffaa20">✦</text>
</g>`

  const walkL = `<g class="wl">
  <g class="fa">${bmp(WA_L, C, 0, walkY)}</g>
  <g class="fb">${bmp(WB_L, C, 0, walkY)}</g>
</g>`

  const sleeping = `<g class="sl" transform="translate(${sleepX},0)">
  ${bmp(SL, CS, 0, sleepY)}
  <text class="z1" x="${catW + 6}" y="${sleepY - 2}" font-family="monospace" font-size="11" fill="#e8b030" font-weight="bold">z</text>
  <text class="z2" x="${catW + 14}" y="${sleepY - 10}" font-family="monospace" font-size="14" fill="#f0c020" font-weight="bold">z</text>
  <text class="z3" x="${catW + 22}" y="${sleepY - 20}" font-family="monospace" font-size="17" fill="#ffd010" font-weight="bold">Z</text>
</g>`

  return `<style>${css}</style>
${room}
${walkR}
${atDesk}
${walkL}
${sleeping}`
}
