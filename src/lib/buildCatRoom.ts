/**
 * Pixel art cat room
 *
 * Orange Pusheen-style cat (44s loop):
 *   sleep → walk right to desk → code → drink coffee → walk left → sleep
 *
 * Room layout: [Bed + TV] [Window] [Bookshelf] [Desk + Monitor]
 */

const PX = 5

// ── Pixel renderer ────────────────────────────────────────────────────────────

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

// ── Orange Pusheen-style cat ───────────────────────────────────────────────────

const C: Record<string, string> = {
  K: '#1a0800',  // dark brown outline
  O: '#ff9944',  // orange fur
  o: '#cc5500',  // dark stripe / shadow
  W: '#fff0d0',  // cream belly / muzzle
  e: '#1a0800',  // eyes
  N: '#ff8899',  // nose
  T: '#ee8833',  // tail
}

// Walking frame A — right foot forward (10×14)
const WA = [
  '..OK..KO..',  // ears
  '.OoK..KoO.',  // ear base + dark inner
  'KOOOOOOOOK',  // top of head
  'KOoOOOOoOK', // stripe 1
  'KOOoOOoOOK', // stripe 2
  'KOeOOOOeOK', // eyes (single pixel, Pusheen style)
  'KOOoWNWoOK', // muzzle + nose
  'KOOOOOOOOK',  // lower face / chin
  'KOoWWWWoOK', // upper body / belly
  'KOoWWWWoOK', // belly
  'KOoWWWWoOK', // lower belly
  '.KOOOOOOK.',  // body bottom (rounded)
  '.KOK..KOK.',  // legs — frame A (right foot forward)
  '..KK...KK.',  // feet — frame A
]

// Walking frame B — left foot forward (10×14)
const WB = [
  '..OK..KO..',
  '.OoK..KoO.',
  'KOOOOOOOOK',
  'KOoOOOOoOK',
  'KOOoOOoOOK',
  'KOeOOOOeOK',
  'KOOoWNWoOK',
  'KOOOOOOOOK',
  'KOoWWWWoOK',
  'KOoWWWWoOK',
  'KOoWWWWoOK',
  '.KOOOOOOK.',
  '..KOK.KOK.',  // legs — frame B (left foot forward)
  '...KK..KK.',  // feet — frame B
]

// Sitting (10×13) — at desk
const SI = [
  '..OK..KO..',
  '.OoK..KoO.',
  'KOOOOOOOOK',
  'KOoOOOOoOK',
  'KOOoOOoOOK',
  'KOeOOOOeOK',
  'KOOoWNWoOK',
  'KOOOOOOOOK',
  'KOoWWWWoOK',
  'KOoWWWWoOK',
  '.KOOOOOOK.',
  '.KOK.KOK..',  // front paws sitting
  '.KoooooKT.',  // tail (wiggles separately)
]

// Sleeping (10×8) — lying flat, closed eyes
const SL = [
  '..KOOOOOK.',  // head (side view)
  '.KOOOOOOOK',
  '.KO--O--OK',  // closed eyes
  '.KOOOOOOOK',
  '.KOOoWNOOK',  // muzzle + nose
  'KOOOOOOOOK',  // body
  'KOoWWWWoOK',  // belly
  '.KoooooKT.',  // tail
]

const CS: Record<string, string> = { ...C, '-': '#664400' }  // eyelid line

const WA_L = mirror(WA)
const WB_L = mirror(WB)

// ── Room layout constants ──────────────────────────────────────────────────────

const BED_X  = 15    // bed left edge
const BED_W  = 150   // bed width
const TV_X   = BED_X + 16  // TV left edge = 31
const TV_Y   = 10    // TV top
const TV_W   = 100   // TV width
const TV_H   = 68    // TV height

// ── Scene type ─────────────────────────────────────────────────────────────────

export type RoomScene = 'dubai' | 'italy' | 'paris' | 'night'

// ── Window scene builder ───────────────────────────────────────────────────────

function buildWindowScene(wx: number, wy: number, ww: number, wh: number, scene: RoomScene): string {
  const out: string[] = []

  if (scene === 'dubai') {
    // Sunset sky layers (top=deep blue → bottom=golden orange)
    const skyColors = ['#1a1a6a','#3030a0','#6040c0','#c04060','#e06030','#f08020','#f0a020','#ffd060']
    const layerH = Math.ceil(wh / skyColors.length)
    skyColors.forEach((c, i) => out.push(`<rect x="${wx}" y="${wy + i * layerH}" width="${ww}" height="${layerH + 1}" fill="${c}"/>`))
    // Burj Khalifa silhouette
    const bkX = wx + ww - 28
    out.push(`<rect x="${bkX + 9}" y="${wy + 4}" width="3" height="58" fill="#20204a"/>`)        // spire
    out.push(`<rect x="${bkX + 5}" y="${wy + 40}" width="12" height="7" fill="#20204a"/>`)       // tier 1
    out.push(`<rect x="${bkX + 2}" y="${wy + 50}" width="18" height="8" fill="#20204a"/>`)       // tier 2
    out.push(`<rect x="${bkX}" y="${wy + 60}" width="22" height="${wh - 60}" fill="#20204a"/>`) // base
    // Other skyscrapers
    const skyBlds = [
      {x:wx+4,w:10,h:50},{x:wx+16,w:7,h:60},{x:wx+25,w:12,h:45},
      {x:wx+39,w:9,h:55},{x:wx+50,w:8,h:48},{x:wx+60,w:13,h:52},
    ]
    skyBlds.forEach(b => {
      const top = wy + wh - b.h
      out.push(`<rect x="${b.x}" y="${top}" width="${b.w}" height="${b.h}" fill="#20204a"/>`)
      for (let ry = top + 3; ry < wy + wh - 2; ry += 6) {
        for (let rx = b.x + 2; rx < b.x + b.w - 1; rx += 4) {
          out.push(`<rect x="${rx}" y="${ry}" width="2" height="3" fill="#ffd080" opacity="0.45"/>`)
        }
      }
    })
    // Desert sand dunes at bottom
    const sandY = wy + wh - 16
    out.push(`<rect x="${wx}" y="${sandY}" width="${ww}" height="16" fill="#c8a040"/>`)
    out.push(`<ellipse cx="${wx + 28}" cy="${sandY}" rx="38" ry="10" fill="#d4b055"/>`)
    out.push(`<ellipse cx="${wx + 82}" cy="${sandY + 2}" rx="32" ry="8" fill="#b89035"/>`)

  } else if (scene === 'italy') {
    // Bright Mediterranean blue sky
    out.push(`<rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="#5aaaf0"/>`)
    // Sky gradient (lighter at horizon)
    out.push(`<rect x="${wx}" y="${wy + Math.floor(wh * 0.4)}" width="${ww}" height="${Math.floor(wh * 0.15)}" fill="#80c8ff" opacity="0.4"/>`)
    // Sun
    out.push(`<circle cx="${wx + 28}" cy="${wy + 18}" r="13" fill="#fff8a0" opacity="0.98"/>`)
    out.push(`<circle cx="${wx + 28}" cy="${wy + 18}" r="18" fill="#fff080" opacity="0.2"/>`)
    // Fluffy clouds
    out.push(`<ellipse cx="${wx + 72}" cy="${wy + 16}" rx="18" ry="7" fill="#fff" opacity="0.85"/>`)
    out.push(`<ellipse cx="${wx + 62}" cy="${wy + 17}" rx="11" ry="6" fill="#fff" opacity="0.75"/>`)
    out.push(`<ellipse cx="${wx + 84}" cy="${wy + 17}" rx="10" ry="5" fill="#fff" opacity="0.8"/>`)
    // Calm sea (bottom 40%)
    const seaY = wy + Math.floor(wh * 0.55)
    out.push(`<rect x="${wx}" y="${seaY}" width="${ww}" height="${wh - Math.floor(wh * 0.55)}" fill="#1e6abf"/>`)
    out.push(`<rect x="${wx}" y="${seaY}" width="${ww}" height="4" fill="#4488cc" opacity="0.5"/>`)
    // Sea shimmer lines
    for (let i = 0; i < 6; i++) {
      out.push(`<rect x="${wx + 5 + i * 16}" y="${seaY + 8 + i * 3}" width="10" height="1.5" fill="#88ccff" opacity="0.55"/>`)
    }
    // Colorful Amalfi cliffside buildings (left stack)
    const houseData = [
      {c:'#ff9944',yOff:22,xOff:2,w:16},{c:'#ffcc55',yOff:32,xOff:0,w:14},
      {c:'#ff6655',yOff:18,xOff:18,w:15},{c:'#ee8844',yOff:28,xOff:16,w:14},
      {c:'#ffddaa',yOff:15,xOff:34,w:13},
    ]
    houseData.forEach(d => {
      const hx = wx + d.xOff, hy = wy + d.yOff, hh = seaY - hy
      out.push(`<rect x="${hx}" y="${hy}" width="${d.w}" height="${hh}" fill="${d.c}"/>`)
      // Roof
      out.push(`<rect x="${hx}" y="${hy}" width="${d.w}" height="5" fill="#b04020" opacity="0.7"/>`)
      // Windows
      for (let wy2 = hy + 8; wy2 < seaY - 10; wy2 += 12) {
        out.push(`<rect x="${hx + 3}" y="${wy2}" width="4" height="5" fill="#1a3a6a" opacity="0.65"/>`)
        if (d.w > 13) out.push(`<rect x="${hx + 9}" y="${wy2}" width="4" height="5" fill="#1a3a6a" opacity="0.65"/>`)
      }
    })

  } else if (scene === 'paris') {
    // Bright Paris blue sky
    out.push(`<rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="#7ec8f5"/>`)
    // Sky gradient (lighter near horizon)
    out.push(`<rect x="${wx}" y="${wy + Math.floor(wh * 0.45)}" width="${ww}" height="${Math.floor(wh * 0.15)}" fill="#aaddf8" opacity="0.45"/>`)
    // Sun (bright, top-right)
    out.push(`<circle cx="${wx + ww - 24}" cy="${wy + 16}" r="12" fill="#fffbe0" opacity="0.98"/>`)
    out.push(`<circle cx="${wx + ww - 24}" cy="${wy + 16}" r="18" fill="#fff8a0" opacity="0.18"/>`)
    // Fluffy clouds
    out.push(`<ellipse cx="${wx + 30}" cy="${wy + 14}" rx="16" ry="6" fill="#fff" opacity="0.9"/>`)
    out.push(`<ellipse cx="${wx + 20}" cy="${wy + 15}" rx="10" ry="5" fill="#fff" opacity="0.8"/>`)
    out.push(`<ellipse cx="${wx + 42}" cy="${wy + 15}" rx="9" ry="5" fill="#fff" opacity="0.85"/>`)
    out.push(`<ellipse cx="${wx + 74}" cy="${wy + 20}" rx="12" ry="5" fill="#fff" opacity="0.75"/>`)
    out.push(`<ellipse cx="${wx + 64}" cy="${wy + 21}" rx="8" ry="4" fill="#fff" opacity="0.7"/>`)
    // Seine river (bottom 30%)
    const seineY = wy + Math.floor(wh * 0.68)
    out.push(`<rect x="${wx}" y="${seineY}" width="${ww}" height="${wh - Math.floor(wh * 0.68)}" fill="#5aacdc"/>`)
    // River shimmer
    for (let i = 0; i < 5; i++) {
      out.push(`<rect x="${wx + 6 + i * 18}" y="${seineY + 4 + i * 2}" width="12" height="1.5" fill="#c8eaff" opacity="0.5"/>`)
    }
    // Quai (riverbank) — stone path
    const quaiY = seineY - 10
    out.push(`<rect x="${wx}" y="${quaiY}" width="${ww}" height="10" fill="#c4b090"/>`)
    // Parisian Haussmann buildings (cream/pale stone)
    const hausData = [
      {x:wx, w:32, h:60, c:'#f5e8c8'}, {x:wx+34, w:28, h:52, c:'#ede0b8'},
      {x:wx+64, w:30, h:58, c:'#f0e4c0'},
    ]
    hausData.forEach(d => {
      const hx = d.x, hy = quaiY - d.h, hh = d.h
      out.push(`<rect x="${hx}" y="${hy}" width="${d.w}" height="${hh}" fill="${d.c}"/>`)
      // Mansard roof (dark grey)
      out.push(`<rect x="${hx}" y="${hy}" width="${d.w}" height="10" fill="#6a7080"/>`)
      // Roof dormer windows
      for (let di = 0; di < 2; di++) {
        const dox = hx + 5 + di * 12
        out.push(`<rect x="${dox}" y="${hy + 1}" width="6" height="6" fill="#4a90c8" opacity="0.7" rx="1"/>`)
      }
      // Windows rows
      for (let wy2 = hy + 14; wy2 < quaiY - 8; wy2 += 13) {
        for (let wx2 = hx + 4; wx2 < hx + d.w - 4; wx2 += 10) {
          out.push(`<rect x="${wx2}" y="${wy2}" width="5" height="7" fill="#4a7db0" opacity="0.6" rx="1"/>`)
          // Balcony ledge
          out.push(`<rect x="${wx2 - 1}" y="${wy2 + 7}" width="7" height="1.5" fill="#8a7a60" opacity="0.7"/>`)
        }
      }
    })
    // Eiffel Tower (center-right, iconic silhouette)
    const etX = wx + ww - 50, etBase = quaiY
    // Base legs
    out.push(`<polygon points="${etX},${etBase} ${etX+6},${etBase-28} ${etX+9},${etBase-28}" fill="#5a6070"/>`)
    out.push(`<polygon points="${etX+22},${etBase} ${etX+13},${etBase-28} ${etX+16},${etBase-28}" fill="#5a6070"/>`)
    // First platform
    out.push(`<rect x="${etX+5}" y="${etBase-30}" width="12" height="4" fill="#4e5a68"/>`)
    // Middle section
    out.push(`<polygon points="${etX+6},${etBase-30} ${etX+9},${etBase-56} ${etX+13},${etBase-56} ${etX+16},${etBase-30}" fill="#5a6070"/>`)
    // Second platform
    out.push(`<rect x="${etX+8}" y="${etBase-58}" width="6" height="3" fill="#4e5a68"/>`)
    // Top spire
    out.push(`<polygon points="${etX+9},${etBase-58} ${etX+11},${etBase-85} ${etX+13},${etBase-58}" fill="#5a6070"/>`)
    // Antenna tip
    out.push(`<rect x="${etX+10.5}" y="${etBase-95}" width="1.5" height="12" fill="#6a7080"/>`)
    // Tower lattice lines
    for (let li = 0; li < 3; li++) {
      const ly = etBase - 10 - li * 9
      out.push(`<line x1="${etX+1+li*2}" y1="${ly}" x2="${etX+21-li*2}" y2="${ly}" stroke="#4a5560" stroke-width="0.8" opacity="0.6"/>`)
    }

  } else {
    // Night city (original)
    out.push(`<rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="#06080e"/>`)
    const stars: [number,number][] = [
      [wx+8,wy+6],[wx+20,wy+4],[wx+44,wy+10],[wx+66,wy+3],[wx+86,wy+8],
      [wx+16,wy+20],[wx+52,wy+16],[wx+78,wy+22],[wx+8,wy+32],[wx+38,wy+28],
      [wx+68,wy+30],[wx+90,wy+18],[wx+28,wy+42],[wx+58,wy+38],[wx+84,wy+40],
      [wx+5,wy+50],[wx+45,wy+55],[wx+72,wy+48],[wx+100,wy+35],[wx+15,wy+62],
    ]
    stars.forEach(([sx,sy]) => out.push(`<rect x="${sx}" y="${sy}" width="2" height="2" fill="#ffe8a0" opacity="0.65"/>`))
    const moonX = wx + 72, moonY = wy + 50
    out.push(`<circle cx="${moonX}" cy="${moonY}" r="15" fill="#ffd060" opacity="0.9"/>`)
    out.push(`<circle cx="${moonX+7}" cy="${moonY-4}" r="11" fill="#06080e"/>`)
    const cityY = wy + Math.floor(wh * 0.62)
    out.push(`<rect x="${wx}" y="${cityY}" width="${ww}" height="${wh - Math.floor(wh * 0.62)}" fill="#080a14"/>`)
    const blds: {x:number,w:number,h:number}[] = [
      {x:wx+2,w:10,h:38},{x:wx+14,w:7,h:52},{x:wx+23,w:12,h:44},
      {x:wx+37,w:9,h:58},{x:wx+48,w:7,h:32},{x:wx+57,w:11,h:47},
      {x:wx+70,w:9,h:40},{x:wx+81,w:8,h:35},{x:wx+91,w:15,h:42},
    ]
    blds.forEach(b => {
      const top = cityY - b.h + (wh - Math.floor(wh * 0.62))
      out.push(`<rect x="${b.x}" y="${top}" width="${b.w}" height="${b.h}" fill="#0e1022"/>`)
      for (let wy2 = top + 4; wy2 < cityY + 2; wy2 += 7) {
        for (let wx2 = b.x + 1; wx2 < b.x + b.w - 1; wx2 += 4) {
          if ((wx2 + wy2) % 13 < 7) out.push(`<rect x="${wx2}" y="${wy2}" width="2" height="3" fill="#ffe880" opacity="0.55"/>`)
        }
      }
    })
  }

  return out.join('\n')
}

// ── Room builder ──────────────────────────────────────────────────────────────

function buildRoom(w: number, h: number, accent: string, scene: RoomScene = 'night'): string {
  const floorY = h - 40
  const out: string[] = []

  // ── Wall color per scene ──
  const wallColor   = scene === 'dubai'  ? '#f5e8c8'
                    : scene === 'italy'  ? '#f2e0c4'
                    : scene === 'paris'  ? '#f7f0e8'
                    : '#1a1228'
  const wallLine    = scene === 'dubai'  ? '#e8d8a8'
                    : scene === 'italy'  ? '#e8d0b0'
                    : scene === 'paris'  ? '#ede5d8'
                    : '#221840'
  const floorColor  = scene === 'dubai'  ? '#d0bc88'
                    : scene === 'italy'  ? '#b85030'
                    : scene === 'paris'  ? '#c8b888'
                    : '#2a1a08'
  const floorLine   = scene === 'dubai'  ? '#bca870'
                    : scene === 'italy'  ? '#a04028'
                    : scene === 'paris'  ? '#b8a870'
                    : '#3a2810'
  const floorEdge   = scene === 'dubai'  ? '#c8b078'
                    : scene === 'italy'  ? '#c05840'
                    : scene === 'paris'  ? '#c0b080'
                    : '#3a2010'

  out.push(`<rect width="${w}" height="${floorY}" fill="${wallColor}"/>`)
  for (let y = 0; y < floorY; y += 14) {
    out.push(`<rect x="0" y="${y}" width="${w}" height="1" fill="${wallLine}" opacity="0.35"/>`)
  }

  // ── Floor ──
  out.push(`<rect y="${floorY}" width="${w}" height="${h - floorY}" fill="${floorColor}"/>`)
  for (let x = 0; x < w; x += 80) {
    out.push(`<line x1="${x}" y1="${floorY}" x2="${x + 20}" y2="${h}" stroke="${floorLine}" stroke-width="1" opacity="0.5"/>`)
  }
  out.push(`<rect y="${floorY}" width="${w}" height="3" fill="${floorEdge}" opacity="0.8"/>`)

  // ── Bed (left side) ──
  const bedTop = floorY - 50

  // Headboard
  out.push(`<rect x="${BED_X}" y="${bedTop - 42}" width="22" height="92" fill="#3a2010" rx="3"/>`)
  out.push(`<rect x="${BED_X + 5}" y="${bedTop - 36}" width="12" height="32" fill="#2a1408" rx="2"/>`)
  out.push(`<rect x="${BED_X + 5}" y="${bedTop - 2}" width="12" height="22" fill="#2a1408" rx="2"/>`)

  // Bed frame
  out.push(`<rect x="${BED_X + 20}" y="${bedTop}" width="${BED_W}" height="50" fill="#3a2010" rx="2"/>`)

  // Mattress
  out.push(`<rect x="${BED_X + 22}" y="${bedTop + 3}" width="${BED_W - 6}" height="47" fill="#e8ddc8" rx="2"/>`)
  // Quilting lines
  for (let qx = BED_X + 30; qx < BED_X + BED_W + 12; qx += 22) {
    out.push(`<line x1="${qx}" y1="${bedTop + 3}" x2="${qx}" y2="${bedTop + 50}" stroke="#d4c8a8" stroke-width="1" opacity="0.4"/>`)
  }
  for (let qy = bedTop + 14; qy < bedTop + 48; qy += 16) {
    out.push(`<line x1="${BED_X + 22}" y1="${qy}" x2="${BED_X + BED_W + 16}" y2="${qy}" stroke="#d4c8a8" stroke-width="1" opacity="0.4"/>`)
  }

  // Pillow
  out.push(`<rect x="${BED_X + 26}" y="${bedTop + 6}" width="44" height="22" fill="#f8f4e8" rx="4"/>`)
  out.push(`<ellipse cx="${BED_X + 48}" cy="${bedTop + 17}" rx="16" ry="7" fill="#f0ead8" opacity="0.5"/>`)

  // Blanket (accent colored)
  out.push(`<rect x="${BED_X + 72}" y="${bedTop + 3}" width="${BED_W - 56}" height="47" fill="${accent}" opacity="0.55" rx="2"/>`)
  out.push(`<rect x="${BED_X + 72}" y="${bedTop + 3}" width="${BED_W - 56}" height="10" fill="${accent}" opacity="0.8" rx="2"/>`)
  for (let bqx = BED_X + 80; bqx < BED_X + BED_W + 12; bqx += 20) {
    out.push(`<line x1="${bqx}" y1="${bedTop + 3}" x2="${bqx}" y2="${bedTop + 50}" stroke="#000" stroke-width="1" opacity="0.08"/>`)
  }

  // Footboard
  out.push(`<rect x="${BED_X + BED_W + 16}" y="${bedTop}" width="14" height="50" fill="#3a2010" rx="2"/>`)

  // ── TV on wall above bed (dark/off state) ──
  const scx = TV_X + 5, scy = TV_Y + 5, scw = TV_W - 10, sch = TV_H - 12
  // Wall mount arm
  out.push(`<rect x="${TV_X + TV_W / 2 - 2}" y="${TV_Y + TV_H}" width="4" height="16" fill="#222"/>`)
  // Bezel
  out.push(`<rect x="${TV_X}" y="${TV_Y}" width="${TV_W}" height="${TV_H}" fill="#0d0d14" rx="4"/>`)
  out.push(`<rect x="${TV_X}" y="${TV_Y}" width="${TV_W}" height="${TV_H}" fill="none" stroke="#333" stroke-width="1.5" rx="4"/>`)
  // Screen (off = very dark)
  out.push(`<rect x="${scx}" y="${scy}" width="${scw}" height="${sch}" fill="#040408" rx="2"/>`)
  // LED indicator
  out.push(`<circle cx="${TV_X + TV_W - 7}" cy="${TV_Y + TV_H - 7}" r="2" fill="#440000" opacity="0.8"/>`)

  // ── Window (center-left, above bookshelf area) ──
  const wx = 195, wy = 8, ww = 108, wh = floorY - 16
  const frameColor = '#3a2010'
  const frameInner = '#2a1408'
  // Frame
  out.push(`<rect x="${wx - 5}" y="${wy - 5}" width="${ww + 10}" height="${wh + 10}" fill="${frameColor}"/>`)
  out.push(`<rect x="${wx - 3}" y="${wy - 3}" width="${ww + 6}" height="${wh + 6}" fill="${frameInner}"/>`)
  // Scene content
  out.push(buildWindowScene(wx, wy, ww, wh, scene))
  // Window sill
  out.push(`<rect x="${wx - 6}" y="${wy + wh - 2}" width="${ww + 12}" height="8" fill="${frameColor}"/>`)
  // Window cross dividers
  out.push(`<rect x="${wx + Math.floor(ww / 2) - 2}" y="${wy}" width="4" height="${wh}" fill="${frameInner}"/>`)
  out.push(`<rect x="${wx}" y="${wy + Math.floor(wh / 2) - 2}" width="${ww}" height="4" fill="${frameInner}"/>`)

  // ── Bookshelf (center-right of window) ──
  const bx = 325, by = 18, bw = 78, bh = floorY - 18
  out.push(`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="#1c0c04"/>`)
  out.push(`<rect x="${bx}" y="${by}" width="8" height="${bh}" fill="#3a1c08"/>`)
  out.push(`<rect x="${bx + bw - 8}" y="${by}" width="8" height="${bh}" fill="#3a1c08"/>`)
  out.push(`<rect x="${bx}" y="${by}" width="${bw}" height="8" fill="#3a1c08"/>`)
  out.push(`<rect x="${bx + 2}" y="${by}" width="2" height="${bh}" fill="${accent}" opacity="0.25"/>`)

  const shelfYs = [by + 50, by + 100, by + 148]
  shelfYs.forEach(sy => {
    out.push(`<rect x="${bx}" y="${sy}" width="${bw}" height="6" fill="#2a1408"/>`)
    out.push(`<rect x="${bx}" y="${sy}" width="${bw}" height="2" fill="${accent}" opacity="0.2"/>`)
  })

  const books1 = [
    {x:bx+10,w:9,h:32,f:'#8b0a1a'},{x:bx+21,w:11,h:39,f:'#0a2880'},
    {x:bx+34,w:10,h:35,f:'#0a6830'},{x:bx+46,w:12,h:40,f:'#806010'},{x:bx+60,w:9,h:34,f:'#580a80'},
  ]
  const books2 = [
    {x:bx+10,w:12,h:37,f:'#0a5888'},{x:bx+24,w:9,h:33,f:'#881a08'},
    {x:bx+35,w:11,h:39,f:'#083870'},{x:bx+48,w:13,h:36,f:'#406010'},
  ]
  const books3 = [
    {x:bx+10,w:10,h:34,f:'#8b0a1a'},{x:bx+22,w:9,h:38,f:'#1a3888'},
    {x:bx+33,w:11,h:35,f:'#0a6830'},{x:bx+46,w:10,h:40,f:'#804010'},
  ]

  ;[
    [books1, by + 8],
    [books2, shelfYs[0] + 6],
    [books3, shelfYs[1] + 6],
  ].forEach(([books, baseY]) => {
    ;(books as {x:number,w:number,h:number,f:string}[]).forEach(b => {
      const by2 = (baseY as number) + (44 - b.h)
      out.push(`<rect x="${b.x}" y="${by2}" width="${b.w}" height="${b.h}" fill="${b.f}"/>`)
      out.push(`<rect x="${b.x + 1}" y="${by2 + 3}" width="2" height="${b.h - 6}" fill="#fff" opacity="0.07"/>`)
    })
  })

  // Small plant on top of shelf
  const plantX = bx + 54, plantY = by - 18
  out.push(`<rect x="${plantX + 4}" y="${plantY + 8}" width="10" height="14" fill="#3a2010" rx="2"/>`)
  out.push(`<rect x="${plantX + 5}" y="${plantY + 6}" width="8" height="4" fill="#2a1408"/>`)
  out.push(`<ellipse cx="${plantX + 9}" cy="${plantY + 2}" rx="9" ry="8" fill="#1a6020"/>`)
  out.push(`<ellipse cx="${plantX + 3}" cy="${plantY + 6}" rx="6" ry="5" fill="#1a7025"/>`)
  out.push(`<ellipse cx="${plantX + 15}" cy="${plantY + 5}" rx="7" ry="5" fill="#158020"/>`)

  // ── Desk (right side) ──
  const dx = w - 340, dw = 320, dtop = floorY - 42
  out.push(`<rect x="${dx}" y="${dtop}" width="${dw}" height="14" fill="#2a1408"/>`)
  out.push(`<rect x="${dx}" y="${dtop}" width="${dw}" height="3" fill="${accent}" opacity="0.5"/>`)
  out.push(`<rect x="${dx}" y="${dtop + 11}" width="${dw}" height="3" fill="#1a0c04" opacity="0.8"/>`)
  out.push(`<rect x="${dx}" y="${dtop + 14}" width="${dw}" height="${floorY - dtop - 14}" fill="#1e1008"/>`)
  // Legs
  out.push(`<rect x="${dx + 14}" y="${floorY}" width="16" height="22" fill="#1e1008"/>`)
  out.push(`<rect x="${dx + dw - 30}" y="${floorY}" width="16" height="22" fill="#1e1008"/>`)
  out.push(`<rect x="${dx + 14}" y="${floorY + 18}" width="16" height="4" fill="${accent}" opacity="0.35"/>`)
  out.push(`<rect x="${dx + dw - 30}" y="${floorY + 18}" width="16" height="4" fill="${accent}" opacity="0.35"/>`)
  // Under-desk LED strip
  out.push(`<rect x="${dx}" y="${dtop + 12}" width="${dw}" height="2" fill="${accent}" opacity="0.12"/>`)

  // ── Monitor ──
  const monX = dx + 48, monY = dtop - 102, monW = 164, monH = 98
  // Stand
  out.push(`<rect x="${monX + monW / 2 - 28}" y="${dtop - 4}" width="56" height="5" fill="#0f0f18"/>`)
  out.push(`<rect x="${monX + monW / 2 - 10}" y="${dtop - 22}" width="20" height="20" fill="#0f0f18"/>`)
  // Bezel
  out.push(`<rect x="${monX}" y="${monY}" width="${monW}" height="${monH}" fill="#0a0a12" rx="6"/>`)
  out.push(`<rect x="${monX}" y="${monY}" width="${monW}" height="${monH}" fill="none" stroke="${accent}" stroke-width="1.5" rx="6" opacity="0.55"/>`)
  // Screen
  const mscx = monX + 7, mscy = monY + 6, mscw = monW - 14, msch = monH - 18
  out.push(`<rect x="${mscx}" y="${mscy}" width="${mscw}" height="${msch}" fill="#0d1117" rx="3"/>`)
  // Editor tab bar
  out.push(`<rect x="${mscx}" y="${mscy}" width="${mscw}" height="11" fill="#161b22" rx="3"/>`)
  out.push(`<rect x="${mscx}" y="${mscy + 8}" width="${mscw}" height="3" fill="#161b22"/>`)
  out.push(`<rect x="${mscx}" y="${mscy + 11}" width="${mscw}" height="1" fill="#30363d"/>`)
  // Active tab (index.ts)
  out.push(`<rect x="${mscx + 2}" y="${mscy + 1}" width="42" height="10" fill="#0d1117" rx="1"/>`)
  out.push(`<rect x="${mscx + 2}" y="${mscy + 11}" width="42" height="1" fill="${accent}" opacity="0.9"/>`)
  out.push(`<rect x="${mscx + 5}" y="${mscy + 3}" width="5" height="5" fill="#4ec9b0" rx="1" opacity="0.85"/>`)
  out.push(`<rect x="${mscx + 12}" y="${mscy + 4}" width="28" height="3" fill="#8b949e" rx="1"/>`)
  // Line number gutter
  const gutW = 16
  out.push(`<rect x="${mscx}" y="${mscy + 12}" width="${gutW}" height="${msch - 12}" fill="#0d1117"/>`)
  out.push(`<rect x="${mscx + gutW}" y="${mscy + 12}" width="1" fill="#21262d" height="${msch - 12}"/>`)
  for (let ln = 0; ln < 9; ln++) {
    out.push(`<rect x="${mscx + 4}" y="${mscy + 15 + ln * 7}" width="8" height="3" fill="#484f58" rx="1" opacity="0.7"/>`)
  }
  // Code area background
  const cx = mscx + gutW + 4, cy = mscy + 13
  // Syntax-highlighted code lines (VS Code Dark+ style)
  // kw=blue, str=orange, fn=yellow, typ=teal, cmt=green, dim=gray
  const kwC = '#569cd6', str_ = '#ce9178', fn_ = '#dcdcaa'
  const typC = '#4ec9b0', cmt = '#6a9955', dim = '#8b949e'
  // Line 1: import { useState } from 'react'
  out.push(`<rect x="${cx}" y="${cy}" width="22" height="3" fill="${kwC}" rx="1"/>`)
  out.push(`<rect x="${cx+24}" y="${cy}" width="28" height="3" fill="${fn_}" rx="1"/>`)
  out.push(`<rect x="${cx+54}" y="${cy}" width="14" height="3" fill="${kwC}" rx="1"/>`)
  out.push(`<rect x="${cx+70}" y="${cy}" width="20" height="3" fill="${str_}" rx="1"/>`)
  // Line 2: comment
  out.push(`<rect x="${cx}" y="${cy+7}" width="60" height="3" fill="${cmt}" rx="1" opacity="0.8"/>`)
  // Line 3: const App = () => {
  out.push(`<rect x="${cx}" y="${cy+14}" width="18" height="3" fill="${kwC}" rx="1"/>`)
  out.push(`<rect x="${cx+20}" y="${cy+14}" width="16" height="3" fill="${fn_}" rx="1"/>`)
  out.push(`<rect x="${cx+38}" y="${cy+14}" width="10" height="3" fill="${dim}" rx="1"/>`)
  out.push(`<rect x="${cx+50}" y="${cy+14}" width="14" height="3" fill="${kwC}" rx="1"/>`)
  // Line 4:   const [data] = useState(null)
  out.push(`<rect x="${cx+8}" y="${cy+21}" width="18" height="3" fill="${kwC}" rx="1"/>`)
  out.push(`<rect x="${cx+28}" y="${cy+21}" width="22" height="3" fill="${dim}" rx="1"/>`)
  out.push(`<rect x="${cx+52}" y="${cy+21}" width="26" height="3" fill="${fn_}" rx="1"/>`)
  // Line 5:   return (
  out.push(`<rect x="${cx+8}" y="${cy+28}" width="20" height="3" fill="${kwC}" rx="1"/>`)
  out.push(`<rect x="${cx+30}" y="${cy+28}" width="6" height="3" fill="${dim}" rx="1"/>`)
  // Line 6:     <Component
  out.push(`<rect x="${cx+16}" y="${cy+35}" width="6" height="3" fill="${dim}" rx="1"/>`)
  out.push(`<rect x="${cx+24}" y="${cy+35}" width="32" height="3" fill="${typC}" rx="1"/>`)
  // Line 7:       prop={value}
  out.push(`<rect x="${cx+24}" y="${cy+42}" width="14" height="3" fill="${fn_}" rx="1"/>`)
  out.push(`<rect x="${cx+40}" y="${cy+42}" width="4" height="3" fill="${dim}" rx="1"/>`)
  out.push(`<rect x="${cx+46}" y="${cy+42}" width="16" height="3" fill="${str_}" rx="1"/>`)
  // Line 8:     />
  out.push(`<rect x="${cx+16}" y="${cy+49}" width="8" height="3" fill="${dim}" rx="1"/>`)
  // Line 9: cursor line
  out.push(`<rect x="${cx}" y="${cy+56}" width="30" height="3" fill="${kwC}" rx="1" opacity="0.4"/>`)
  // Cursor blink
  out.push(`<rect x="${cx+32}" y="${cy+55}" width="4" height="5" fill="${accent}" opacity="0.9">
  <animate attributeName="opacity" values="0.9;0;0.9" keyTimes="0;0.5;1" dur="0.9s" repeatCount="indefinite"/>
</rect>`)
  // LED
  out.push(`<circle cx="${monX + monW / 2}" cy="${monY + monH - 5}" r="2.5" fill="${accent}" opacity="0.8">
  <animate attributeName="opacity" values="0.8;0.2;0.8" dur="3.2s" repeatCount="indefinite"/>
</circle>`)

  // ── Keyboard ──
  const kx = dx + 38, ky = dtop + 16, kw = 148, kh = 24
  out.push(`<rect x="${kx}" y="${ky}" width="${kw}" height="${kh}" fill="#0c0c16" rx="4"/>`)
  out.push(`<rect x="${kx}" y="${ky}" width="${kw}" height="${kh}" fill="none" stroke="${accent}" stroke-width="1" rx="4" opacity="0.4"/>`)
  for (let row = 0; row < 3; row++) {
    const keys = row === 0 ? 13 : row === 1 ? 12 : 11
    const rowW = kw - 12
    const keyW = Math.floor(rowW / keys) - 1
    const offX = row === 1 ? 4 : row === 2 ? 8 : 0
    for (let col = 0; col < keys; col++) {
      const isAcc = (row === 1 && col === keys - 1) || (row === 2 && col === 0)
      out.push(`<rect x="${kx + 6 + offX + col * (keyW + 1)}" y="${ky + 5 + row * 7}" width="${keyW}" height="5" fill="${isAcc ? accent + '44' : '#18182a'}" rx="1"/>`)
    }
  }

  // ── Coffee cup (on desk right side) ──
  const cupX = dx + 224, cupY = dtop + 4
  out.push(`<ellipse cx="${cupX + 14}" cy="${cupY + 25}" rx="20" ry="5" fill="#3a2010"/>`)
  out.push(`<rect x="${cupX + 4}" y="${cupY + 8}" width="20" height="17" fill="#2a1408" rx="3"/>`)
  out.push(`<ellipse cx="${cupX + 14}" cy="${cupY + 8}" rx="10" ry="4" fill="#3a2010"/>`)
  out.push(`<ellipse cx="${cupX + 14}" cy="${cupY + 8}" rx="8" ry="3" fill="#6a3010"/>`)
  out.push(`<path d="M ${cupX + 24} ${cupY + 10} Q ${cupX + 32} ${cupY + 10} ${cupX + 32} ${cupY + 18} Q ${cupX + 32} ${cupY + 24} ${cupX + 24} ${cupY + 24}" stroke="#3a2010" stroke-width="3" fill="none"/>`)
  for (let si = 0; si < 2; si++) {
    const sx = cupX + 8 + si * 8
    out.push(`<path d="M ${sx} ${cupY + 4} Q ${sx - 3} ${cupY - 2} ${sx} ${cupY - 8}" stroke="#ffe8a0" stroke-width="1.5" fill="none" opacity="0.5">
  <animate attributeName="opacity" values="0.5;0.1;0.5" dur="${1.8 + si * 0.5}s" repeatCount="indefinite"/>
</path>`)
  }

  // ── Ceiling lamp ──
  const lx = Math.floor(w * 0.55)
  out.push(`<line x1="${lx}" y1="0" x2="${lx}" y2="12" stroke="#555" stroke-width="2"/>`)
  out.push(`<path d="M ${lx - 18} 22 Q ${lx} 28 ${lx + 18} 22 Q ${lx + 14} 14 ${lx - 14} 14 Z" fill="#ccc"/>`)
  out.push(`<polygon points="${lx - 15},26 ${lx + 15},26 ${lx + 55},${floorY} ${lx - 55},${floorY}" fill="#ffe8a0" opacity="0.055"/>`)
  out.push(`<ellipse cx="${lx}" cy="28" rx="14" ry="5" fill="#fff8e0" opacity="0.65"/>`)

  return out.join('\n')
}

// ── CSS Animations ─────────────────────────────────────────────────────────────

// t1=sleep끝/walk_r시작, t2=walk_r끝/코딩시작, t3=코딩끝/커피시작, t4=커피끝/walk_l시작, t5=walk_l끝/sleep시작
// travel = deskX - sleepX (px)
function buildCSS(dur: number, t1: number, t2: number, t3: number, t4: number, t5: number, travel: number): string {
  const e = (n: number) => n.toFixed(2)
  const mid = (a: number, b: number) => ((a + b) / 2).toFixed(2)
  return `
/* Sleeping: 0→t1, t5→end */
.sl{animation:sl-v ${dur}s step-end infinite}
@keyframes sl-v{0%{opacity:1}${e(t1)}%{opacity:1}${e(t1+0.01)}%{opacity:0}${e(t5)}%{opacity:0}${e(t5+0.01)}%{opacity:1}100%{opacity:1}}

/* Walk right: t1→t2 (position animates sleepX → deskX) */
.wk-r{animation:wkr-v ${dur}s step-end infinite,wkr-x ${dur}s linear infinite}
@keyframes wkr-v{0%{opacity:0}${e(t1)}%{opacity:0}${e(t1+0.01)}%{opacity:1}${e(t2)}%{opacity:1}${e(t2+0.01)}%{opacity:0}100%{opacity:0}}
@keyframes wkr-x{0%{transform:translateX(0)}${e(t1)}%{transform:translateX(0)}${e(t2)}%{transform:translateX(${travel}px)}100%{transform:translateX(${travel}px)}}

/* Walk left: t4→t5 (position animates deskX → sleepX) */
.wk-l{animation:wkl-v ${dur}s step-end infinite,wkl-x ${dur}s linear infinite}
@keyframes wkl-v{0%{opacity:0}${e(t4)}%{opacity:0}${e(t4+0.01)}%{opacity:1}${e(t5)}%{opacity:1}${e(t5+0.01)}%{opacity:0}100%{opacity:0}}
@keyframes wkl-x{0%{transform:translateX(${travel}px)}${e(t4)}%{transform:translateX(${travel}px)}${e(t5)}%{transform:translateX(0)}100%{transform:translateX(0)}}

/* Walk frame toggle (A and B alternate at 0.4s) */
.wf-a{animation:wftog 0.4s step-end infinite}
.wf-b{animation:wftog 0.4s step-end 0.2s infinite}
@keyframes wftog{0%,50%{opacity:1}50.01%,100%{opacity:0}}

/* At desk (coding): t2→t3 */
.ds{animation:ds-v ${dur}s step-end infinite}
@keyframes ds-v{0%{opacity:0}${e(t2)}%{opacity:0}${e(t2+0.01)}%{opacity:1}${e(t3)}%{opacity:1}${e(t3+0.01)}%{opacity:0}100%{opacity:0}}

/* Coffee: t3→t4 */
.cf-cat{animation:cf-cat-v ${dur}s step-end infinite}
@keyframes cf-cat-v{0%{opacity:0}${e(t3)}%{opacity:0}${e(t3+0.01)}%{opacity:1}${e(t4)}%{opacity:1}${e(t4+0.01)}%{opacity:0}100%{opacity:0}}
.cf{animation:cf-v ${dur}s step-end infinite,cf-y ${dur}s ease-in-out infinite}
@keyframes cf-v{0%{opacity:0}${e(t3)}%{opacity:0}${e(t3+0.01)}%{opacity:1}${e(t4)}%{opacity:1}${e(t4+0.01)}%{opacity:0}100%{opacity:0}}
@keyframes cf-y{${e(t3)}%{transform:translateY(0)}${mid(t3,t4)}%{transform:translateY(-10px) rotate(-15deg)}${e(t4)}%{transform:translateY(0)}}

/* Tail wag */
.tw{animation:tw 1.1s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:0 50%}
@keyframes tw{from{transform:rotate(-18deg)}to{transform:rotate(12deg)}}

/* Zzz bubbles */
.z1{animation:zf 3.5s ease-out infinite}
.z2{animation:zf 3.5s ease-out 1.1s infinite}
.z3{animation:zf 3.5s ease-out 2.2s infinite}
@keyframes zf{0%{transform:translate(0,0);opacity:0}15%{opacity:.9}100%{transform:translate(8px,-24px);opacity:0}}

/* Keyboard impact sparks */
.ht{animation:htf 1.4s ease-out infinite}
.ht2{animation:htf 1.4s ease-out .7s infinite}
.ht3{animation:htf 1.4s ease-out 0.35s infinite}
@keyframes htf{0%{transform:translate(0,0);opacity:0}15%{opacity:1}100%{transform:translate(6px,-24px);opacity:0}}

/* Monitor logos: Claude t2→mid(t2,t3), OpenClaw mid→t3 */
.mon-claude{animation:mon-cl ${dur}s step-end infinite}
.mon-openclaw{animation:mon-oc ${dur}s step-end infinite}
@keyframes mon-cl{0%{opacity:0}${e(t2)}%{opacity:0}${e(t2+0.01)}%{opacity:1}${mid(t2,t3)}%{opacity:1}${e(parseFloat(mid(t2,t3))+0.01)}%{opacity:0}100%{opacity:0}}
@keyframes mon-oc{0%{opacity:0}${mid(t2,t3)}%{opacity:0}${e(parseFloat(mid(t2,t3))+0.01)}%{opacity:1}${e(t3)}%{opacity:1}${e(t3+0.01)}%{opacity:0}100%{opacity:0}}`
}

// ── Main export ────────────────────────────────────────────────────────────────

export function buildCatRoomContent(w: number, h: number, accent: string, scene: RoomScene = 'paris'): string {
  const floorY  = h - 40
  const sitH    = SI.length * PX      // 13 × 5 = 65
  const sleepH  = SL.length * PX      // 8 × 5 = 40
  const walkH   = WA.length * PX      // 14 × 5 = 70
  const catW    = SI[0].length * PX   // 10 × 5 = 50

  const sitY    = floorY - sitH
  const sleepY  = floorY - sleepH - 8
  const walkY   = floorY - walkH

  // Cat positions
  const sleepX  = 26          // in bed (left side)
  const deskX   = w - 262     // at desk (right side, near keyboard)
  const travel  = deskX - sleepX  // walk distance in px

  // Animation timeline (44s: sleep→walk_r→code→coffee→walk_l→sleep)
  const DUR = 44
  const t1 = 5  / DUR * 100  // sleep 끝 / walk right 시작
  const t2 = 8  / DUR * 100  // walk right 끝 / 코딩 시작
  const t3 = 21 / DUR * 100  // 코딩 끝 / 커피 시작
  const t4 = 26 / DUR * 100  // 커피 끝 / walk left 시작
  const t5 = 29 / DUR * 100  // walk left 끝 / sleep 시작

  const css  = buildCSS(DUR, t1, t2, t3, t4, t5, travel)
  const room = buildRoom(w, h, accent, scene)

  // Monitor screen (on the desk monitor)
  const monX = deskX + 2, monY = 8, monW = 138, monH = 78

  // ── Claude logo on monitor ──
  const claudeLogo = `<g class="mon-claude">
  <rect x="${monX+2}" y="${monY+2}" width="${monW-4}" height="${monH-4}" fill="#0a0a0a" rx="3"/>
  <text x="${monX+monW/2}" y="${monY+18}" font-family="monospace" font-size="8" fill="#ff6b35" text-anchor="middle" font-weight="bold">◆ CLAUDE ◆</text>
  <text x="${monX+monW/2}" y="${monY+30}" font-family="monospace" font-size="6" fill="#ff9955" text-anchor="middle">Anthropic</text>
  <rect x="${monX+10}" y="${monY+36}" width="${monW-20}" height="1" fill="#ff6b35" opacity="0.4"/>
  <text x="${monX+monW/2}" y="${monY+48}" font-family="monospace" font-size="6" fill="#aaffaa" text-anchor="middle">&gt; analyzing...</text>
  <text x="${monX+monW/2}" y="${monY+58}" font-family="monospace" font-size="6" fill="#88cc88" text-anchor="middle">&gt; output ready_</text>
</g>`

  // ── OpenClaw logo on monitor ──
  const openclawLogo = `<g class="mon-openclaw">
  <rect x="${monX+2}" y="${monY+2}" width="${monW-4}" height="${monH-4}" fill="#0a0a0a" rx="3"/>
  <text x="${monX+monW/2}" y="${monY+18}" font-family="monospace" font-size="8" fill="#10a37f" text-anchor="middle" font-weight="bold">✦ OPENCLAW ✦</text>
  <text x="${monX+monW/2}" y="${monY+30}" font-family="monospace" font-size="6" fill="#1dc9a0" text-anchor="middle">model: gpt-claw</text>
  <rect x="${monX+10}" y="${monY+36}" width="${monW-20}" height="1" fill="#10a37f" opacity="0.4"/>
  <text x="${monX+monW/2}" y="${monY+48}" font-family="monospace" font-size="6" fill="#aaffee" text-anchor="middle">&gt; processing...</text>
  <text x="${monX+monW/2}" y="${monY+58}" font-family="monospace" font-size="6" fill="#88ddcc" text-anchor="middle">&gt; tokens: 9999_</text>
</g>`

  // ── 1. 잠자기 (bed) ──
  const sleeping = `<g class="sl" transform="translate(${sleepX},0)">
  ${bmp(SL, CS, 0, sleepY)}
  <text class="z1" x="${catW+6}"  y="${sleepY-2}"  font-family="monospace" font-size="11" fill="${accent}" font-weight="bold">z</text>
  <text class="z2" x="${catW+14}" y="${sleepY-11}" font-family="monospace" font-size="14" fill="${accent}" font-weight="bold">z</text>
  <text class="z3" x="${catW+22}" y="${sleepY-22}" font-family="monospace" font-size="17" fill="${accent}" font-weight="bold">Z</text>
</g>`

  // ── 2. 걷기 오른쪽 (sleep pos → desk) ──
  const walkRight = `<g transform="translate(${sleepX},0)">
  <g class="wk-r">
    <g class="wf-a">${bmp(WA, C, 0, walkY)}</g>
    <g class="wf-b">${bmp(WB, C, 0, walkY)}</g>
  </g>
</g>`

  // ── 3. 코딩 (desk) ──
  const coding = `<g class="ds" transform="translate(${deskX},0)">
  ${bmp(SI.slice(0,-1), C, 0, sitY)}
  <g class="tw">${bmp([SI[SI.length-1]], C, catW, sitY+(SI.length-1)*PX)}</g>
  <text class="ht"  x="${catW-8}"  y="${sitY-6}"  font-family="monospace" font-size="14" fill="${accent}" font-weight="bold">!</text>
  <text class="ht2" x="${catW+4}"  y="${sitY-4}"  font-family="monospace" font-size="11" fill="#ffaa20" font-weight="bold">!</text>
  <text class="ht3" x="${catW-2}"  y="${sitY-14}" font-family="monospace" font-size="9"  fill="#fff" opacity="0.8">✦</text>
</g>`

  // ── 4. 커피 (desk) ──
  const coffeeCat = `<g class="cf-cat" transform="translate(${deskX},0)">
  ${bmp(SI.slice(0,-1), C, 0, sitY)}
  <g class="tw">${bmp([SI[SI.length-1]], C, catW, sitY+(SI.length-1)*PX)}</g>
</g>`

  const coffeeCup = `<g class="cf" transform="translate(${deskX+30},${sitY+12})">
  <rect x="0" y="4" width="20" height="14" fill="#2a1408" rx="3"/>
  <ellipse cx="10" cy="4" rx="9" ry="3.5" fill="#3a2010"/>
  <ellipse cx="10" cy="4" rx="7" ry="2.5" fill="#6b3010"/>
  <path d="M20 6 Q26 6 26 12 Q26 18 20 18" stroke="#3a2010" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <ellipse cx="10" cy="4" rx="5" ry="1.5" fill="#8b4513" opacity="0.8"/>
  <text x="28" y="4" font-family="monospace" font-size="10" fill="#ffcc88">☕</text>
</g>`

  // ── 5. 걷기 왼쪽 (desk → sleep pos) ──
  const walkLeft = `<g transform="translate(${sleepX},0)">
  <g class="wk-l">
    <g class="wf-a">${bmp(WA_L, C, 0, walkY)}</g>
    <g class="wf-b">${bmp(WB_L, C, 0, walkY)}</g>
  </g>
</g>`

  return `<style>${css}</style>
${room}
${claudeLogo}
${openclawLogo}
${sleeping}
${walkRight}
${coding}
${coffeeCat}
${coffeeCup}
${walkLeft}`
}
