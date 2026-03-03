import type { ProfileOptions, GithubStats } from './types'
import { getTheme } from './themes'

const FONT = `'Courier New','Courier','Lucida Console',monospace`

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function px(n: number): number {
  return Math.round(n)
}

// ── Snake shape (static wavy body) ────────────────────────────────────────────
function buildSnake(
  snakeY: number,
  bodyColor: string,
  headColor: string,
  sz: number,
): string {
  // Y offsets create a sine-wave slither pattern
  const wave = [0, 2, 3, 2, 0, -2, -3, -2, 0, 1, 2]
  const gap = sz + 2

  const segs = wave.slice(1).map((dy, i) => {
    const x = -((i + 1) * gap) - 2
    const y = snakeY + dy
    const s = i === wave.length - 2 ? sz - 2 : sz // smaller tail
    return `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="${bodyColor}" rx="1"/>`
  })

  return `<g class="sn">
  <rect x="0" y="${snakeY}" width="${sz + 2}" height="${sz + 2}" fill="${headColor}" rx="1"/>
  <rect x="${sz - 1}" y="${snakeY + 2}" width="2" height="2" fill="#000"/>
  <rect x="${sz - 1}" y="${snakeY + sz - 2}" width="2" height="2" fill="#000"/>
  ${segs.join('\n  ')}
</g>`
}

// ── Pixel art corner border ────────────────────────────────────────────────────
function buildBorder(w: number, h: number, color: string): string {
  const c = 8
  return [
    `<rect x="0" y="0" width="${w}" height="${h}" fill="none" stroke="${color}" stroke-width="2"/>`,
    `<rect x="0"     y="0"      width="${c}" height="${c}" fill="${color}"/>`,
    `<rect x="${w - c}" y="0"   width="${c}" height="${c}" fill="${color}"/>`,
    `<rect x="0"     y="${h - c}" width="${c}" height="${c}" fill="${color}"/>`,
    `<rect x="${w - c}" y="${h - c}" width="${c}" height="${c}" fill="${color}"/>`,
    `<rect x="4" y="4" width="${w - 8}" height="${h - 8}" fill="none" stroke="${color}" stroke-width="0.5" stroke-dasharray="3,3" opacity="0.35"/>`,
  ].join('\n')
}

function buildDivider(y: number, w: number, pad: number, color: string): string {
  return `<rect x="${pad}" y="${y}" width="${w - pad * 2}" height="1" fill="${color}" opacity="0.25"/>`
}

// ── Default pixel avatar (initials in pixel blocks) ────────────────────────────
function buildDefaultAvatar(x: number, y: number, size: number, color: string, bg: string, initials: string): string {
  return [
    `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${bg}"/>`,
    `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="1"/>`,
    `<text x="${x + size / 2}" y="${y + size / 2 + 7}" font-family="${FONT}" font-size="${size * 0.4}" fill="${color}" text-anchor="middle" font-weight="bold">${esc(initials.slice(0, 2).toUpperCase())}</text>`,
  ].join('\n')
}

// ── Stats row ──────────────────────────────────────────────────────────────────
function buildStats(
  stats: GithubStats,
  y: number,
  w: number,
  pad: number,
  textColor: string,
  subColor: string,
): string {
  const items = [
    { icon: '★', label: 'Stars', value: stats.totalStars.toLocaleString() },
    { icon: '⟳', label: 'Commits', value: stats.totalCommits.toLocaleString() },
    { icon: '⌥', label: 'PRs', value: stats.totalPRs.toLocaleString() },
    { icon: '◈', label: 'Repos', value: stats.contributedTo.toLocaleString() },
  ]
  const colW = (w - pad * 2) / items.length
  return items
    .map((item, i) => {
      const ix = pad + 8 + colW * i
      return [
        `<text x="${ix}" y="${y + 13}" font-family="${FONT}" font-size="10" fill="${subColor}">${item.icon} ${item.label}</text>`,
        `<text x="${ix}" y="${y + 30}" font-family="${FONT}" font-size="14" font-weight="bold" fill="${textColor}">${item.value}</text>`,
      ].join('\n')
    })
    .join('\n')
}

// ── Main card generator ────────────────────────────────────────────────────────
export function generateProfileCard(
  options: ProfileOptions,
  stats?: GithubStats,
  avatarBase64?: string,
): string {
  const theme = getTheme(options.theme)
  const bg = options.bg_color || theme.bg
  const accent = options.accent_color || theme.accent
  const textColor = options.text_color || theme.text
  const borderColor = options.border_color || theme.border
  const snakeColor = options.snake_color || theme.snake
  const foodColor = options.food_color || theme.food

  const showAvatar = options.show_avatar !== false
  const showDomains = options.show_domains !== false
  const showStats = options.show_stats === true && !!stats
  const showSnake = options.show_snake !== false

  const w = options.layout === 'compact' ? 600 : 800
  const pad = 20

  // Parse domains
  const domains = (options.domains || '')
    .split(',')
    .map(d => d.trim())
    .filter(Boolean)

  // === Height calculation ===
  let h = pad + 8               // top padding
  h += 75                       // header row (avatar + name + role + bio)
  h += 18                       // divider + gap

  const hasDomains = showDomains && domains.length > 0
  if (hasDomains) {
    h += 18   // section label + gap
    h += 28   // badges row
    h += 16   // gap below badges
  }

  if (showSnake) h += 36       // snake section
  if (showStats) {
    h += 4    // divider
    h += 45   // stats row
  }
  h += pad                      // bottom padding

  const snakeDur = options.snake_speed === 'slow' ? 10 : options.snake_speed === 'fast' ? 4 : 7

  // === Build SVG ===
  const out: string[] = []

  out.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="Pixel IT Profile">`)

  // ── CSS animations ──
  out.push(`<style>
@keyframes sn-move {
  0%   { transform: translateX(-130px); }
  100% { transform: translateX(${w + 140}px); }
}
@keyframes food-eat {
  0%,79% { opacity:1; r:3; }
  80%,94% { opacity:0; r:0; }
  95%,100% { opacity:1; r:3; }
}
@keyframes blink {
  0%,49%{ opacity:1; } 50%,100%{ opacity:0; }
}
.sn { animation: sn-move ${snakeDur}s linear infinite; }
.blink { animation: blink 1s step-end infinite; }
</style>`)

  // ── Background ──
  out.push(`<rect width="${w}" height="${h}" fill="${bg}"/>`)

  // Subtle pixel noise lines (decorative scanlines)
  for (let iy = 0; iy < h; iy += 4) {
    out.push(`<rect x="0" y="${iy}" width="${w}" height="1" fill="#ffffff" opacity="0.015"/>`)
  }

  // ── Border ──
  out.push(buildBorder(w, h, borderColor))

  // Blinking cursor top-right
  out.push(`<text class="blink" x="${w - pad - 4}" y="${pad + 14}" font-family="${FONT}" font-size="13" fill="${accent}" text-anchor="end">█</text>`)

  // ── HEADER ──────────────────────────────────────────────────────────────────
  let curY = pad + 8
  let textStartX = pad + 10

  const avatarSize = 64

  if (showAvatar) {
    if (avatarBase64) {
      out.push(`<clipPath id="ac"><rect x="${textStartX}" y="${curY}" width="${avatarSize}" height="${avatarSize}"/></clipPath>`)
      out.push(`<image href="${avatarBase64}" x="${textStartX}" y="${curY}" width="${avatarSize}" height="${avatarSize}" clip-path="url(#ac)" style="image-rendering:pixelated"/>`)
      out.push(`<rect x="${textStartX}" y="${curY}" width="${avatarSize}" height="${avatarSize}" fill="none" stroke="${borderColor}" stroke-width="1"/>`)
    } else {
      const initials = (options.name || options.username || '?').trim()
      out.push(buildDefaultAvatar(textStartX, curY, avatarSize, accent, theme.bg2, initials))
    }
    textStartX += avatarSize + 14
  }

  // Name
  const nameStr = esc(options.name || options.username || 'Anonymous')
  out.push(`<text x="${textStartX}" y="${curY + 22}" font-family="${FONT}" font-size="20" font-weight="bold" fill="${textColor}">${nameStr}</text>`)

  // Username (top right)
  if (options.username) {
    out.push(`<text x="${w - pad - 10}" y="${curY + 14}" font-family="${FONT}" font-size="10" fill="${theme.subtext}" text-anchor="end">@${esc(options.username)}</text>`)
  }

  // Role badge
  if (options.role) {
    const roleStr = esc(options.role)
    const roleW = roleStr.length * 8.5 + 20
    const roleY = curY + 30
    out.push(`<rect x="${textStartX}" y="${roleY}" width="${roleW}" height="22" fill="${theme.badge}"/>`)
    out.push(`<rect x="${textStartX}" y="${roleY}" width="${roleW}" height="22" fill="none" stroke="${accent}" stroke-width="1"/>`)
    out.push(`<text x="${textStartX + 10}" y="${roleY + 15}" font-family="${FONT}" font-size="12" fill="${accent}">${roleStr}</text>`)
  }

  // Bio / slogan
  const bio = options.bio || options.slogan
  if (bio) {
    out.push(`<text x="${textStartX}" y="${curY + 72}" font-family="${FONT}" font-size="11" fill="${theme.subtext}">"${esc(bio)}"</text>`)
  }

  curY += 80

  // ── DIVIDER ──
  out.push(buildDivider(curY, w, pad, borderColor))
  curY += 14

  // ── DOMAINS + SNAKE ─────────────────────────────────────────────────────────
  if (hasDomains) {
    out.push(`<text x="${pad + 10}" y="${curY + 12}" font-family="${FONT}" font-size="11" fill="${accent}">▶ IT DOMAINS</text>`)
    curY += 18

    // Compute badge layout
    const badgeH = 26
    const bPadX = 12
    const bGap = 10
    const bFontSize = 11
    let bx = pad + 10

    interface BadgeInfo { x: number; w: number }
    const badgeInfos: BadgeInfo[] = []

    domains.forEach(domain => {
      const bw = px(domain.length * bFontSize * 0.65 + bPadX * 2)
      badgeInfos.push({ x: bx, w: bw })
      bx += bw + bGap
    })

    // Draw badges
    domains.forEach((domain, i) => {
      const { x: bx, w: bw } = badgeInfos[i]
      out.push(`<rect x="${bx}" y="${curY}" width="${bw}" height="${badgeH}" fill="${theme.badge}"/>`)
      out.push(`<rect x="${bx}" y="${curY}" width="${bw}" height="${badgeH}" fill="none" stroke="${accent}" stroke-width="1"/>`)
      out.push(`<text x="${bx + bw / 2}" y="${curY + 17}" font-family="${FONT}" font-size="${bFontSize}" fill="${accent}" text-anchor="middle">${esc(domain)}</text>`)
    })

    // Food dots between badges (at snake Y level)
    const snakeY = curY + px(badgeH / 2) - 4
    for (let i = 0; i < badgeInfos.length - 1; i++) {
      const { x: bx, w: bw } = badgeInfos[i]
      const nextBx = badgeInfos[i + 1].x
      const fx = bx + bw + px((nextBx - bx - bw) / 2) - 3
      const delay = ((i + 1) / (badgeInfos.length + 1)) * snakeDur
      out.push(`<rect x="${fx}" y="${snakeY + 1}" width="6" height="6" fill="${foodColor}" rx="1" opacity="0.9" style="animation:food-eat ${snakeDur}s ${delay.toFixed(2)}s linear infinite"/>`)
    }

    // Snake on top of badges
    out.push(buildSnake(snakeY, snakeColor, theme.snakeHead, 8))

    curY += badgeH + 16
  }

  // ── STANDALONE SNAKE SECTION ─────────────────────────────────────────────────
  if (showSnake) {
    out.push(buildDivider(curY, w, pad, borderColor))
    curY += 10

    const snakeY = curY + 10

    // Food dots spread across width
    const foodCount = 6
    const foodSpan = w - pad * 2 - 20
    for (let i = 0; i < foodCount; i++) {
      const fx = pad + 10 + px((foodSpan / (foodCount - 1)) * i)
      const delay = (i / (foodCount - 1)) * snakeDur
      out.push(`<rect x="${fx}" y="${snakeY + 1}" width="6" height="6" fill="${foodColor}" rx="1" opacity="0.8" style="animation:food-eat ${snakeDur}s ${delay.toFixed(2)}s linear infinite"/>`)
    }

    out.push(buildSnake(snakeY, snakeColor, theme.snakeHead, 8))

    curY += 36
  }

  // ── STATS SECTION ────────────────────────────────────────────────────────────
  if (showStats && stats) {
    out.push(buildDivider(curY, w, pad, borderColor))
    curY += 6
    out.push(buildStats(stats, curY, w, pad, textColor, theme.subtext))
    curY += 40
  }

  out.push('</svg>')

  return out.join('\n')
}
