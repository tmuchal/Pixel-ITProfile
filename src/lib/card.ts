/**
 * Pixel IT Profile Card Generator
 *
 * Generates a pixel-art style SVG profile card with:
 * - Neon glow effects (SVG filter)
 * - Pixel art cat room animation at the bottom
 * - Typing reveal animation for name/role (SVG SMIL)
 * - Responsive badge layout with auto-wrap
 * - 9 themes, fully customizable colors
 */
import type { ProfileOptions, GithubStats } from './types'
import { getTheme } from './themes'
import { buildCatRoomContent } from './buildCatRoom'

const FONT = `'Courier New','Courier','Lucida Console',monospace`

// ── Utils ─────────────────────────────────────────────────────────────────────

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const r = Math.round

// Estimate SVG monospace character width for layout calculations
const charW = (fontSize: number): number => fontSize * 0.6

// ── SVG Filters ───────────────────────────────────────────────────────────────

function buildDefs(): string {
  return `<defs>
  <!-- Neon glow: used on borders, badges, snake -->
  <filter id="glow" x="-25%" y="-25%" width="150%" height="150%">
    <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur"/>
    <feMerge><feMergeNode in="blur"/><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <!-- Subtle glow for secondary elements -->
  <filter id="glow-sm" x="-15%" y="-15%" width="130%" height="130%">
    <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur"/>
    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <!-- Scanline texture -->
  <pattern id="scanlines" x="0" y="0" width="2" height="4" patternUnits="userSpaceOnUse">
    <rect x="0" y="0" width="2" height="1" fill="#ffffff" opacity="0.03"/>
  </pattern>
</defs>`
}

// ── Pixel Art Border ──────────────────────────────────────────────────────────

function buildBorder(w: number, h: number, color: string, label?: string): string {
  const c = 10  // corner square size
  const parts: string[] = [
    // Outer border with glow
    `<rect x="1" y="1" width="${w - 2}" height="${h - 2}" fill="none" stroke="${color}" stroke-width="1.5" filter="url(#glow)"/>`,
    // Inner subtle border
    `<rect x="5" y="5" width="${w - 10}" height="${h - 10}" fill="none" stroke="${color}" stroke-width="0.5" opacity="0.2" stroke-dasharray="4,4"/>`,
    // Corner blocks (pixel art corners)
    `<rect x="0" y="0" width="${c}" height="${c}" fill="${color}" filter="url(#glow)"/>`,
    `<rect x="${w - c}" y="0" width="${c}" height="${c}" fill="${color}" filter="url(#glow)"/>`,
    `<rect x="0" y="${h - c}" width="${c}" height="${c}" fill="${color}" filter="url(#glow)"/>`,
    `<rect x="${w - c}" y="${h - c}" width="${c}" height="${c}" fill="${color}" filter="url(#glow)"/>`,
    // Inner corner accents (pixel decorations)
    `<rect x="${c}" y="0" width="4" height="2" fill="${color}" opacity="0.6"/>`,
    `<rect x="0" y="${c}" width="2" height="4" fill="${color}" opacity="0.6"/>`,
    `<rect x="${w - c - 4}" y="0" width="4" height="2" fill="${color}" opacity="0.6"/>`,
    `<rect x="${w - 2}" y="${c}" width="2" height="4" fill="${color}" opacity="0.6"/>`,
    `<rect x="${c}" y="${h - 2}" width="4" height="2" fill="${color}" opacity="0.6"/>`,
    `<rect x="0" y="${h - c - 4}" width="2" height="4" fill="${color}" opacity="0.6"/>`,
    `<rect x="${w - c - 4}" y="${h - 2}" width="4" height="2" fill="${color}" opacity="0.6"/>`,
    `<rect x="${w - 2}" y="${h - c - 4}" width="2" height="4" fill="${color}" opacity="0.6"/>`,
  ]

  // Optional label in top-left corner (like a terminal window title)
  if (label) {
    const lw = label.length * 7 + 16
    parts.push(
      `<rect x="16" y="-1" width="${lw}" height="12" fill="${color}"/>`,
      `<text x="24" y="9" font-family="${FONT}" font-size="9" fill="#000" font-weight="bold">${esc(label)}</text>`,
    )
  }

  return parts.join('\n')
}

// ── Divider ───────────────────────────────────────────────────────────────────

function buildDivider(y: number, w: number, pad: number, color: string, label?: string): string {
  const parts = [
    `<line x1="${pad}" y1="${y}" x2="${w - pad}" y2="${y}" stroke="${color}" stroke-width="1" opacity="0.3"/>`,
  ]
  if (label) {
    const lw = label.length * 7 + 14
    parts.push(
      `<rect x="${pad + 12}" y="${y - 7}" width="${lw}" height="14" fill="${color}" opacity="0.1"/>`,
      `<text x="${pad + 19}" y="${y + 4}" font-family="${FONT}" font-size="9" fill="${color}" opacity="0.8">${esc(label)}</text>`,
    )
  }
  return parts.join('\n')
}

// ── Default Avatar (pixel art robot face) ─────────────────────────────────────

function buildDefaultAvatar(x: number, y: number, size: number, accent: string, bg: string, initials: string): string {
  const s = 4  // pixel block size for the avatar art
  const cols = Math.floor(size / s)
  const rows = Math.floor(size / s)

  // Simple pixel art face pattern (12x12 grid, upscaled to size)
  const face = [
    '000000000000',
    '001111111100',
    '011111111110',
    '011001100110',  // eyebrows
    '011001100110',
    '011111111110',  // nose bridge
    '011011011110',  // eyes
    '011111111110',
    '011100011110',  // smile
    '011011011110',
    '011111111110',
    '000111111000',
  ]

  const ps = Math.floor(size / face.length)
  const parts: string[] = [
    `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${bg}"/>`,
    `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="none" stroke="${accent}" stroke-width="1"/>`,
  ]

  face.forEach((row, ry) => {
    row.split('').forEach((cell, cx) => {
      if (cell === '1') {
        parts.push(
          `<rect x="${x + cx * ps}" y="${y + ry * ps}" width="${ps}" height="${ps}" fill="${accent}" opacity="0.9"/>`
        )
      }
    })
  })

  // Initials overlay (subtle)
  parts.push(
    `<text x="${x + size / 2}" y="${y + size / 2 + 5}" font-family="${FONT}" font-size="${size * 0.3}" fill="#000" text-anchor="middle" font-weight="bold" opacity="0.4">${esc(initials.slice(0, 2).toUpperCase())}</text>`,
  )

  return parts.join('\n')
}

// ── Typing Reveal Animation ───────────────────────────────────────────────────
// Uses SVG SMIL to expand clip rect width, revealing text character by character

function buildTypingText(
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fill: string,
  delay: number,
  id: string,
  fontWeight?: string,
): string {
  const textWidth = text.length * charW(fontSize) + 20
  const dur = Math.max(0.4, text.length * 0.07)
  return `<clipPath id="clip-${id}">
  <rect x="${x}" y="${y - fontSize - 2}" width="0" height="${fontSize + 6}">
    <animate attributeName="width" from="0" to="${r(textWidth)}" dur="${dur.toFixed(2)}s" begin="${delay.toFixed(2)}s" fill="freeze" calcMode="linear"/>
  </rect>
</clipPath>
<text x="${x}" y="${y}" font-family="${FONT}" font-size="${fontSize}" fill="${fill}"${fontWeight ? ` font-weight="${fontWeight}"` : ''} clip-path="url(#clip-${id})">${esc(text)}</text>`
}

// ── Badge info type ───────────────────────────────────────────────────────────

interface BadgeInfo { x: number; w: number; mid: number }

// ── Stats row ─────────────────────────────────────────────────────────────────

function buildStats(
  stats: GithubStats,
  y: number,
  w: number,
  pad: number,
  textColor: string,
  subColor: string,
  accent: string,
): string {
  const items = [
    { icon: '★', label: 'Stars',   value: stats.totalStars },
    { icon: '⟳', label: 'Commits', value: stats.totalCommits },
    { icon: '⌥', label: 'PRs',     value: stats.totalPRs },
    { icon: '◈', label: 'Repos',   value: stats.contributedTo },
  ]
  const max = Math.max(...items.map(i => i.value), 1)
  const colW = r((w - pad * 2) / items.length)
  const barW = r(colW * 0.7)
  const barH = 4

  return items.map((item, i) => {
    const ix = pad + 8 + colW * i
    const progress = r((item.value / max) * barW)
    return [
      // Label + icon
      `<text x="${ix}" y="${y + 13}" font-family="${FONT}" font-size="10" fill="${subColor}">${item.icon} ${item.label}</text>`,
      // Progress bar background
      `<rect x="${ix}" y="${y + 18}" width="${barW}" height="${barH}" fill="${subColor}" opacity="0.15" rx="1"/>`,
      // Progress bar fill (animated grow-in)
      `<rect x="${ix}" y="${y + 18}" width="0" height="${barH}" fill="${accent}" opacity="0.7" rx="1">
    <animate attributeName="width" from="0" to="${progress}" dur="1s" begin="0.5s" fill="freeze" calcMode="easeOut"/>
  </rect>`,
      // Value
      `<text x="${ix}" y="${y + 36}" font-family="${FONT}" font-size="14" font-weight="bold" fill="${textColor}">${item.value.toLocaleString()}</text>`,
    ].join('\n')
  }).join('\n')
}

// ── Section header ────────────────────────────────────────────────────────────

function buildSectionHeader(x: number, y: number, label: string, accent: string): string {
  return [
    `<text x="${x}" y="${y}" font-family="${FONT}" font-size="10" fill="${accent}" opacity="0.6">▶</text>`,
    `<text x="${x + 14}" y="${y}" font-family="${FONT}" font-size="10" fill="${accent}">${esc(label)}</text>`,
  ].join('\n')
}

// ── Main Card Generator ───────────────────────────────────────────────────────

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

  const showAvatar = options.show_avatar !== false
  const showDomains = options.show_domains !== false
  const showStats = options.show_stats === true && !!stats
  const showCat = options.show_snake !== false  // reuses show_snake param for backwards compat

  const w = options.layout === 'compact' ? 600 : 800
  const pad = 22

  // Parse + validate domains (max 8 to prevent layout overflow)
  const domains = (options.domains || '')
    .split(',')
    .map(d => d.trim())
    .filter(Boolean)
    .slice(0, 8)

  // ── Compute badge layout (with two-row wrap) ──────────────────────────────
  const badgeFontSize = 11
  const badgeH = 26
  const badgePadX = 14
  const badgeGap = 10
  const maxBadgeRowW = w - pad * 2 - 20

  interface BadgeLayout extends BadgeInfo { row: number; y: number }
  const badgeLayouts: BadgeLayout[] = []

  let rowX = 0
  let rowIndex = 0
  const rowH = badgeH + 8  // per-row height inc. gap

  domains.forEach(domain => {
    const bw = r(domain.length * charW(badgeFontSize) + badgePadX * 2)
    if (rowX + bw > maxBadgeRowW && rowX > 0 && rowIndex < 1) {
      rowIndex++
      rowX = 0
    }
    badgeLayouts.push({
      x: pad + 10 + rowX,
      w: bw,
      mid: pad + 10 + rowX + bw / 2,
      row: rowIndex,
      y: 0,  // will be set later relative to section start
    })
    rowX += bw + badgeGap
  })

  const numBadgeRows = rowIndex + 1
  const domainsH = domains.length > 0 ? (16 + numBadgeRows * rowH + 8) : 0  // label + rows + gap

  // ── Height calculation ────────────────────────────────────────────────────
  let h = pad + 10     // top padding
  h += 80              // header (avatar height)
  h += 14              // divider + gap

  const catRoomH = 200
  const hasDomains = showDomains && domains.length > 0
  if (hasDomains) h += domainsH
  if (showCat) h += catRoomH + 14  // room + divider
  if (showStats) h += 52
  h += pad             // bottom padding

  // ── Build SVG ─────────────────────────────────────────────────────────────
  const out: string[] = []

  const windowTitle = ` PIXEL.IT.PROFILE `

  out.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="Pixel IT Profile — ${esc(options.name || options.username || 'User')}">`)

  // ── CSS Animations ──
  out.push(`<style>
@keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-2px)} }
.blink { animation: blink 1s step-end infinite }
.float { animation: float 3s ease-in-out infinite }
</style>`)

  // ── Background ──
  out.push(buildDefs())
  out.push(`<rect width="${w}" height="${h}" fill="${bg}"/>`)
  // Scanline overlay
  out.push(`<rect width="${w}" height="${h}" fill="url(#scanlines)"/>`)

  // ── Border ──
  out.push(buildBorder(w, h, borderColor, windowTitle))

  // ── Blinking cursor (top-right, decorative) ──
  out.push(`<text class="blink" x="${w - pad - 2}" y="${pad + 12}" font-family="${FONT}" font-size="12" fill="${accent}" text-anchor="end" filter="url(#glow)">█</text>`)

  // ── HEADER ───────────────────────────────────────────────────────────────
  let curY = pad + 14
  let nameX = pad + 12

  const avatarSize = 68

  if (showAvatar) {
    const ax = pad + 12
    const ay = curY
    if (avatarBase64) {
      out.push(`<clipPath id="ac"><rect x="${ax}" y="${ay}" width="${avatarSize}" height="${avatarSize}"/></clipPath>`)
      out.push(`<image href="${avatarBase64}" x="${ax}" y="${ay}" width="${avatarSize}" height="${avatarSize}" clip-path="url(#ac)" style="image-rendering:pixelated"/>`)
      out.push(`<rect x="${ax}" y="${ay}" width="${avatarSize}" height="${avatarSize}" fill="none" stroke="${borderColor}" stroke-width="1.5" filter="url(#glow)"/>`)
      // Pixel corner accents on avatar
      const c2 = 5
      ;[
        [ax, ay], [ax + avatarSize - c2, ay],
        [ax, ay + avatarSize - c2], [ax + avatarSize - c2, ay + avatarSize - c2],
      ].forEach(([px_, py]) => {
        out.push(`<rect x="${px_}" y="${py}" width="${c2}" height="${c2}" fill="${accent}" opacity="0.8"/>`)
      })
    } else {
      const initials = (options.name || options.username || '?')
      out.push(buildDefaultAvatar(ax, ay, avatarSize, accent, theme.bg2, initials))
    }
    nameX = ax + avatarSize + 16
  }

  // Name with typing animation
  const nameStr = options.name || options.username || 'Anonymous'
  out.push(buildTypingText(nameStr, nameX, curY + 22, 21, textColor, 0.1, 'nm', 'bold'))

  // Username (top-right, smaller)
  if (options.username) {
    out.push(
      `<text x="${w - pad - 12}" y="${curY + 14}" font-family="${FONT}" font-size="10" fill="${theme.subtext}" text-anchor="end">@${esc(options.username)}</text>`,
    )
  }

  // Role badge with glow
  if (options.role) {
    const roleStr = esc(options.role)
    const roleW = r(options.role.length * charW(12.5) + 22)
    const roleY = curY + 30
    out.push([
      `<rect x="${nameX}" y="${roleY}" width="${roleW}" height="24" fill="${theme.badge}"/>`,
      `<rect x="${nameX}" y="${roleY}" width="${roleW}" height="24" fill="none" stroke="${accent}" stroke-width="1" filter="url(#glow-sm)"/>`,
      `<text x="${nameX + 11}" y="${roleY + 16}" font-family="${FONT}" font-size="12.5" fill="${accent}">${roleStr}</text>`,
    ].join('\n'))
  }

  // Bio / slogan with typing animation
  const bio = options.bio || options.slogan
  if (bio) {
    const bioDelay = 0.5 + nameStr.length * 0.07
    out.push(buildTypingText(`"${bio}"`, nameX, curY + 74, 11, theme.subtext, bioDelay, 'bio'))
  }

  curY += 86

  // ── DIVIDER ──
  out.push(buildDivider(curY, w, pad, borderColor))
  curY += 14

  // ── DOMAINS ───────────────────────────────────────────────────────────────
  if (hasDomains) {
    out.push(buildSectionHeader(pad + 10, curY + 11, 'IT DOMAINS', accent))
    curY += 18

    // Set absolute Y for each badge row
    badgeLayouts.forEach(bl => {
      bl.y = curY + bl.row * rowH
    })

    // Draw all badges
    badgeLayouts.forEach((bl, i) => {
      const domain = domains[i]
      out.push([
        `<rect x="${bl.x}" y="${bl.y}" width="${bl.w}" height="${badgeH}" fill="${theme.badge}"/>`,
        `<rect x="${bl.x}" y="${bl.y}" width="${bl.w}" height="${badgeH}" fill="none" stroke="${accent}" stroke-width="1" filter="url(#glow-sm)"/>`,
        `<text x="${bl.mid}" y="${bl.y + 17}" font-family="${FONT}" font-size="${badgeFontSize}" fill="${accent}" text-anchor="middle">${esc(domain)}</text>`,
      ].join('\n'))
    })

    curY += numBadgeRows * rowH + 10
  }

  // ── CAT ROOM SECTION ──────────────────────────────────────────────────────
  if (showCat) {
    out.push(buildDivider(curY, w, pad, borderColor, ' CAT.ROOM '))
    curY += 14
    // Embed cat room as nested SVG (clips to card width)
    out.push(`<svg x="0" y="${curY}" width="${w}" height="${catRoomH}" viewBox="0 0 ${w} ${catRoomH}">`)
    out.push(buildCatRoomContent(w, catRoomH, accent, options.scene ?? 'paris'))
    out.push('</svg>')
    curY += catRoomH
  }

  // ── STATS SECTION ────────────────────────────────────────────────────────
  if (showStats && stats) {
    out.push(buildDivider(curY, w, pad, borderColor, ' GITHUB STATS '))
    curY += 8
    out.push(buildStats(stats, curY, w, pad, textColor, theme.subtext, accent))
    curY += 44
  }

  out.push('</svg>')
  return out.join('\n')
}
