/**
 * /api/cat
 * Returns a standalone pixel art cat room animation SVG.
 * A cozy IT room with a cat that walks, works at the desk, and sleeps.
 *
 * Query params:
 *  theme  - accent color theme (default: matrix)
 *  width  - card width (default: 800, max 1200)
 *  height - card height (default: 150, max 300)
 */
import { NextRequest, NextResponse } from 'next/server'
import { getTheme } from '@/lib/themes'
import { buildCatRoomContent } from '@/lib/buildCatRoom'
import type { RoomScene } from '@/lib/buildCatRoom'
import type { ThemeName } from '@/lib/types'

export const runtime = 'edge'
export const revalidate = 86400

export async function GET(req: NextRequest): Promise<NextResponse> {
  const sp = req.nextUrl.searchParams
  const theme = getTheme(sp.get('theme') as ThemeName)
  const scene = (sp.get('scene') || 'paris') as RoomScene
  const w = Math.min(parseInt(sp.get('width') || '800', 10), 1200)
  const h = Math.min(parseInt(sp.get('height') || '150', 10), 300)

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
${buildCatRoomContent(w, h, theme.accent, scene)}
</svg>`

  return new NextResponse(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=0, s-maxage=86400',
    },
  })
}
