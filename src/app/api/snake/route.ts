/**
 * /api/snake
 * Returns a standalone pixel art snake animation SVG.
 * Great for placing on top of GitHub contribution graphs!
 *
 * Query params:
 *  theme      - color theme (default: matrix)
 *  color      - snake body color
 *  head_color - snake head color
 *  food_color - food dot color
 *  speed      - slow | normal | fast (default: normal)
 *  width      - card width (default: 800)
 *  height     - card height (default: 60)
 */
import { NextRequest, NextResponse } from 'next/server'
import { getTheme } from '@/lib/themes'
import type { ThemeName } from '@/lib/types'

export const runtime = 'edge'
export const revalidate = 86400

export async function GET(req: NextRequest): Promise<NextResponse> {
  const p = req.nextUrl.searchParams

  const theme = getTheme(p.get('theme') as ThemeName)
  const snakeColor = p.get('color') || theme.snake
  const headColor = p.get('head_color') || theme.snakeHead
  const foodColor = p.get('food_color') || theme.food
  const speed = p.get('speed') === 'slow' ? 10 : p.get('speed') === 'fast' ? 4 : 7
  const w = Math.min(parseInt(p.get('width') || '800', 10), 1200)
  const h = Math.min(parseInt(p.get('height') || '60', 10), 200)
  const snakeY = Math.floor(h / 2) - 4

  const sz = 8
  const wave = [0, 2, 3, 2, 0, -2, -3, -2, 0, 1]
  const gap = sz + 2
  const segs = wave.slice(1).map((dy, i) => {
    const x = -((i + 1) * gap) - 2
    const s = i === wave.length - 2 ? sz - 2 : sz
    return `<rect x="${x}" y="${snakeY + dy}" width="${s}" height="${s}" fill="${snakeColor}" rx="1"/>`
  })

  // Food dots spread evenly
  const foodCount = 8
  const foodDots = Array.from({ length: foodCount }, (_, i) => {
    const fx = Math.round((w / (foodCount + 1)) * (i + 1))
    const delay = (i / foodCount) * speed
    return `<rect x="${fx}" y="${snakeY + 1}" width="6" height="6" fill="${foodColor}" rx="1" opacity="0.9" style="animation:food-eat ${speed}s ${delay.toFixed(2)}s linear infinite"/>`
  })

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<style>
@keyframes sn-move {
  0%   { transform: translateX(-130px); }
  100% { transform: translateX(${w + 140}px); }
}
@keyframes food-eat {
  0%,79%{ opacity:1; } 80%,94%{ opacity:0; } 95%,100%{ opacity:1; }
}
.sn { animation: sn-move ${speed}s linear infinite; }
</style>
${foodDots.join('\n')}
<g class="sn">
  <rect x="0" y="${snakeY}" width="${sz + 2}" height="${sz + 2}" fill="${headColor}" rx="1"/>
  <rect x="${sz - 1}" y="${snakeY + 2}" width="2" height="2" fill="#000"/>
  <rect x="${sz - 1}" y="${snakeY + sz - 2}" width="2" height="2" fill="#000"/>
  ${segs.join('\n  ')}
</g>
</svg>`

  return new NextResponse(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=43200, s-maxage=86400',
    },
  })
}
