/**
 * Pixel art cat room — shared SVG content builder.
 * Returns the inner SVG content (style + elements), no outer <svg> tag.
 * Meant to be embedded inside another SVG with a <g> or nested <svg>.
 */

const PX = 4  // pixel unit size

// ── Pixel art renderer ────────────────────────────────────────────────────────

function bmp(
  rows: string[],
  palette: Record<string, string>,
  ox: number,
  oy: number,
): string {
  const rects: string[] = []
  rows.forEach((row, ry) => {
    row.split('').forEach((ch, cx) => {
      const fill = palette[ch]
      if (fill) {
        rects.push(
          `<rect x="${ox + cx * PX}" y="${oy + ry * PX}" width="${PX}" height="${PX}" fill="${fill}"/>`
        )
      }
    })
  })
  return rects.join('\n')
}

// ── Cat palette & bitmaps ─────────────────────────────────────────────────────

const CAT: Record<string, string> = {
  O: '#ff8c3a',  // orange body
  o: '#b85a00',  // dark stripe / outline
  W: '#fff3d0',  // white belly / muzzle
  E: '#22bb55',  // eye iris
  e: '#113300',  // pupil
  N: '#ff4466',  // nose
}

const HEAD = [
  'Oo....oO',
  'OOOOOOOO',
  'OOEeOEeO',
  'OOooOooO',
  'OWWNNWWO',
  'OOOOOOOO',
]

const HEAD_SLEEP = [
  'Oo....oO',
  'OOOOOOOO',
  'OOooOooO',
  'OOooOooO',
  'OWWNNWWO',
  'OOOOOOOO',
]

const WALK_A_BODY = [
  'OWWWWWOO',
  'OOO.OOOO',
  '.OO..OO.',
]

const WALK_B_BODY = [
  'OWWWWWOO',
  'OOOO.OOO',
  '.OO..OO.',
]

const SIT_BODY = [
  'OWWWWWOO',
  'OOOOOOOO',
  'OOOOOOOO',
]

const SLEEP_BODY = [
  'OWWWWWOO',
  'OO....OO',
  '.oooooo.',
]

const TAIL_SIT = [
  'OOoo....',
  '..OOoo..',
  '....OOOO',
]

const TAIL_SLEEP = [
  'OOoo....',
  '..OOoo..',
  '....OOoo',
]

function catPose(
  head: string[],
  body: string[],
  ox: number,
  oy: number,
  tail?: string[],
  tailOx = 0,
  tailOy = 0,
): string {
  const parts = [
    bmp(head, CAT, ox, oy),
    bmp(body, CAT, ox, oy + head.length * PX),
  ]
  if (tail) parts.push(bmp(tail, CAT, tailOx, tailOy))
  return parts.join('\n')
}

// ── Room background ───────────────────────────────────────────────────────────

function buildRoom(w: number, h: number, accentColor: string): string {
  const floorY = h - 38
  const parts: string[] = []

  // Wall
  parts.push(`<rect width="${w}" height="${floorY}" fill="#16102a"/>`)
  for (let y = 0; y < floorY; y += 8) {
    parts.push(`<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="#1e1638" stroke-width="1"/>`)
  }

  // Floor
  parts.push(`<rect y="${floorY}" width="${w}" height="${h - floorY}" fill="#3d2010"/>`)
  for (let x = 0; x < w; x += 80) {
    parts.push(`<line x1="${x}" y1="${floorY}" x2="${x}" y2="${h}" stroke="#2a1508" stroke-width="1.5"/>`)
  }
  parts.push(`<rect y="${floorY}" width="${w}" height="3" fill="#4e2a14" opacity="0.6"/>`)

  // Window (left)
  const wx = 30, wy = 10, ww = 100, wh = floorY - 10
  parts.push(`<rect x="${wx - 4}" y="${wy - 4}" width="${ww + 8}" height="${wh + 8}" fill="#6b4520"/>`)
  parts.push(`<rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="#050916"/>`)
  parts.push(`<line x1="${wx + ww / 2}" y1="${wy}" x2="${wx + ww / 2}" y2="${wy + wh}" stroke="#6b4520" stroke-width="4"/>`)
  parts.push(`<line x1="${wx}" y1="${wy + wh / 2}" x2="${wx + ww}" y2="${wy + wh / 2}" stroke="#6b4520" stroke-width="4"/>`)
  // Crescent moon
  parts.push(`<circle cx="${wx + 72}" cy="${wy + 22}" r="13" fill="#fff8c0" opacity="0.9"/>`)
  parts.push(`<circle cx="${wx + 80}" cy="${wy + 18}" r="11" fill="#050916"/>`)
  // Stars
  ;[
    [wx + 15, wy + 14], [wx + 36, wy + 26], [wx + 20, wy + 50],
    [wx + 56, wy + 60], [wx + 76, wy + 52], [wx + 10, wy + 72],
    [wx + 42, wy + 80], [wx + 82, wy + 78], [wx + 88, wy + 36],
  ].forEach(([sx, sy]) => {
    parts.push(`<rect x="${sx}" y="${sy}" width="2" height="2" fill="#fffff0" opacity="0.8"/>`)
  })

  // Plant
  const plx = 150
  parts.push(`<rect x="${plx}" y="${floorY - 18}" width="20" height="18" fill="#7a3b1e"/>`)
  parts.push(`<rect x="${plx - 2}" y="${floorY - 20}" width="24" height="4" fill="#8d4524"/>`)
  parts.push(`<rect x="${plx + 9}" y="${floorY - 34}" width="4" height="16" fill="#2a6e1a"/>`)
  parts.push(`<rect x="${plx + 1}" y="${floorY - 42}" width="16" height="12" fill="#3a8e22" rx="6"/>`)
  parts.push(`<rect x="${plx + 5}" y="${floorY - 52}" width="12" height="12" fill="#3a8e22" rx="5"/>`)
  parts.push(`<rect x="${plx - 4}" y="${floorY - 50}" width="14" height="10" fill="#2d7518" rx="5"/>`)

  // Desk
  const dx = w - 240, dw = 220, dh = 36
  parts.push(`<rect x="${dx}" y="${floorY - dh}" width="${dw}" height="8" fill="#7a4520"/>`)
  parts.push(`<rect x="${dx}" y="${floorY - dh + 8}" width="${dw}" height="${dh - 8}" fill="#6a3a18"/>`)
  parts.push(`<rect x="${dx + 8}" y="${floorY}" width="10" height="12" fill="#5a3010"/>`)
  parts.push(`<rect x="${dx + dw - 18}" y="${floorY}" width="10" height="12" fill="#5a3010"/>`)

  // Monitor
  const mx = dx + 30, my = Math.max(12, floorY - dh - 68)
  parts.push(`<rect x="${mx + 22}" y="${floorY - dh - 8}" width="16" height="8" fill="#2a2a3a"/>`)
  parts.push(`<rect x="${mx + 10}" y="${floorY - dh - 4}" width="36" height="4" fill="#2a2a3a"/>`)
  parts.push(`<rect x="${mx}" y="${my}" width="100" height="72" fill="#1e1e2e" rx="3"/>`)
  parts.push(`<rect x="${mx}" y="${my}" width="100" height="72" fill="none" stroke="#333350" stroke-width="2" rx="3"/>`)
  parts.push(`<rect x="${mx + 6}" y="${my + 6}" width="88" height="58" fill="#0a0e1e" rx="2"/>`)
  parts.push(`<rect x="${mx + 6}" y="${my + 6}" width="88" height="58" fill="${accentColor}" opacity="0.04" rx="2"/>`)

  const lc = [accentColor, '#4488ff', accentColor, '#aaaacc', accentColor, '#4488ff', accentColor]
  const lw = [55, 30, 70, 45, 60, 25, 50]
  lc.forEach((c, i) => {
    parts.push(`<rect x="${mx + 10}" y="${my + 10 + i * 7}" width="${lw[i]}" height="3" fill="${c}" opacity="0.8" rx="1"/>`)
  })
  parts.push(
    `<rect x="${mx + 10}" y="${my + 10 + 7 * 7}" width="5" height="6" fill="${accentColor}" opacity="0.9">
  <animate attributeName="opacity" values="0.9;0;0.9" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"/>
</rect>`
  )

  // Keyboard
  const kx = dx + 20, ky = floorY - dh + 10
  parts.push(`<rect x="${kx}" y="${ky}" width="100" height="18" fill="#222236" rx="2"/>`)
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 10; col++) {
      parts.push(
        `<rect x="${kx + 4 + col * 9}" y="${ky + 3 + row * 7}" width="7" height="5" fill="#2e2e48" rx="1"/>`
      )
    }
  }

  // Ceiling lamp
  const lx = w / 2
  parts.push(`<line x1="${lx}" y1="0" x2="${lx}" y2="12" stroke="#444" stroke-width="3"/>`)
  parts.push(`<ellipse cx="${lx}" cy="16" rx="20" ry="7" fill="#555"/>`)
  parts.push(`<ellipse cx="${lx}" cy="16" rx="16" ry="5" fill="#ffe0a0" opacity="0.9"/>`)
  parts.push(
    `<polygon points="${lx - 40},${floorY} ${lx + 40},${floorY} ${lx + 22},18 ${lx - 22},18" fill="#ffe0a0" opacity="0.04"/>`
  )

  return parts.join('\n')
}

// ── Exported builder ──────────────────────────────────────────────────────────

export function buildCatRoomContent(w: number, h: number, accentColor: string): string {
  const floorY = h - 38
  const catH = 9 * PX   // 36px
  const catW = 8 * PX   // 32px
  const catY = floorY - catH

  const catStartX = 186   // near plant
  const catDeskX  = w - 300  // in front of desk

  // Loop: 4s walk right + 10s at desk + 4s walk left + 10s sleep = 28s
  const DUR = 28
  const t1 = +(4 / DUR * 100).toFixed(2)
  const t2 = +(14 / DUR * 100).toFixed(2)
  const t3 = +(18 / DUR * 100).toFixed(2)

  const wlStart = catDeskX + catW
  const wlEnd   = catStartX + catW

  const css = `
.wr{animation:wr-p ${DUR}s linear infinite,wr-s ${DUR}s linear infinite;transform-box:fill-box;transform-origin:0 0}
@keyframes wr-p{0%{transform:translateX(${catStartX}px)}${t1}%{transform:translateX(${catDeskX}px)}100%{transform:translateX(${catDeskX}px)}}
@keyframes wr-s{0%{opacity:1}${t1}%{opacity:1}${t1 + 0.1}%{opacity:0}100%{opacity:0}}

.ds{animation:ds-s ${DUR}s linear infinite}
@keyframes ds-s{0%{opacity:0}${t1}%{opacity:0}${t1 + 0.1}%{opacity:1}${t2}%{opacity:1}${t2 + 0.1}%{opacity:0}100%{opacity:0}}

.wl{animation:wl-p ${DUR}s linear infinite,wl-s ${DUR}s linear infinite;transform-box:fill-box;transform-origin:0 0}
@keyframes wl-p{0%{transform:translateX(${wlStart}px) scaleX(-1)}${t2}%{transform:translateX(${wlStart}px) scaleX(-1)}${t3}%{transform:translateX(${wlEnd}px) scaleX(-1)}100%{transform:translateX(${wlEnd}px) scaleX(-1)}}
@keyframes wl-s{0%{opacity:0}${t2}%{opacity:0}${t2 + 0.1}%{opacity:1}${t3}%{opacity:1}${t3 + 0.1}%{opacity:0}100%{opacity:0}}

.sl{animation:sl-s ${DUR}s linear infinite}
@keyframes sl-s{0%{opacity:0}${t3}%{opacity:0}${t3 + 0.1}%{opacity:1}100%{opacity:1}}

.fa{animation:leg-a 0.4s step-end infinite}
.fb{animation:leg-b 0.4s step-end infinite}
@keyframes leg-a{0%,49%{opacity:1}50%,100%{opacity:0}}
@keyframes leg-b{0%,49%{opacity:0}50%,100%{opacity:1}}

.tw{animation:tw 0.6s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:0 50%}
@keyframes tw{from{transform:rotate(-15deg)}to{transform:rotate(10deg)}}

.z1{animation:zf 2.8s ease-in-out infinite}
.z2{animation:zf 2.8s ease-in-out 0.9s infinite}
.z3{animation:zf 2.8s ease-in-out 1.8s infinite}
@keyframes zf{0%{transform:translate(0,0);opacity:0}20%{opacity:.9}100%{transform:translate(8px,-20px);opacity:0}}`

  const walkR = `<g class="wr">
  <g class="fa">${catPose(HEAD, WALK_A_BODY, 0, catY)}</g>
  <g class="fb">${catPose(HEAD, WALK_B_BODY, 0, catY)}</g>
</g>`

  const atDesk = `<g class="ds" transform="translate(${catDeskX},0)">
  ${catPose(HEAD, SIT_BODY, 0, catY)}
  <g class="tw">${bmp(TAIL_SIT, CAT, catW, catY + 5 * PX)}</g>
</g>`

  const walkL = `<g class="wl">
  <g class="fa">${catPose(HEAD, WALK_A_BODY, 0, catY)}</g>
  <g class="fb">${catPose(HEAD, WALK_B_BODY, 0, catY)}</g>
</g>`

  const sleeping = `<g class="sl" transform="translate(${catStartX},0)">
  ${catPose(HEAD_SLEEP, SLEEP_BODY, 0, catY)}
  ${bmp(TAIL_SLEEP, CAT, catW, catY + 6 * PX)}
  <text class="z1" x="${catW + 10}" y="${catY - 4}" font-family="monospace" font-size="10" fill="#aaa" font-weight="bold">z</text>
  <text class="z2" x="${catW + 18}" y="${catY - 10}" font-family="monospace" font-size="13" fill="#888" font-weight="bold">z</text>
  <text class="z3" x="${catW + 26}" y="${catY - 18}" font-family="monospace" font-size="16" fill="#666" font-weight="bold">Z</text>
</g>`

  return `<style>${css}</style>
${buildRoom(w, h, accentColor)}
${walkR}
${atDesk}
${walkL}
${sleeping}`
}
