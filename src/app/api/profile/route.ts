import { NextRequest, NextResponse } from 'next/server'
import { generateProfileCard } from '@/lib/card'
import { fetchGithubStats, fetchAvatarAsBase64 } from '@/lib/github'
import type { ProfileOptions, ThemeName, LayoutType } from '@/lib/types'

export const runtime = 'edge'
export const revalidate = 3600

function bool(val: string | null, fallback: boolean): boolean {
  if (val === null) return fallback
  return val === 'true' || val === '1'
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const p = req.nextUrl.searchParams

  const options: ProfileOptions = {
    username:    p.get('username')    ?? undefined,
    name:        p.get('name')        ?? undefined,
    role:        p.get('role')        ?? undefined,
    domains:     p.get('domains')     ?? undefined,
    bio:         p.get('bio')         ?? undefined,
    slogan:      p.get('slogan')      ?? undefined,
    theme:       (p.get('theme')      ?? 'matrix') as ThemeName,
    bg_color:    p.get('bg_color')    ?? undefined,
    text_color:  p.get('text_color')  ?? undefined,
    accent_color:p.get('accent_color')?? undefined,
    border_color:p.get('border_color')?? undefined,
    layout:      (p.get('layout')     ?? 'wide') as LayoutType,
    show_avatar: bool(p.get('show_avatar'), true),
    show_domains:bool(p.get('show_domains'), true),
    show_stats:  bool(p.get('show_stats'), false),
    show_snake:  bool(p.get('show_snake'), true),
    github:      p.get('github')      ?? undefined,
    twitter:     p.get('twitter')     ?? undefined,
    website:     p.get('website')     ?? undefined,
  }

  // Fetch GitHub data if token exists
  let stats = undefined
  let avatarBase64: string | undefined = undefined

  const token = process.env.GITHUB_TOKEN
  if (token && options.username) {
    try {
      stats = await fetchGithubStats(options.username, token)
      // Use name from GitHub if not explicitly set
      if (!options.name) options.name = stats.name
      // Fetch avatar
      if (options.show_avatar !== false && stats.avatarUrl) {
        avatarBase64 = await fetchAvatarAsBase64(stats.avatarUrl)
      }
    } catch (_e) {
      // Graceful degradation: continue without stats
    }
  }

  // If no stats but show_stats requested, skip
  const svg = generateProfileCard(options, stats, avatarBase64)

  const cacheSeconds = 3600
  return new NextResponse(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': `public, max-age=${cacheSeconds / 2}, s-maxage=${cacheSeconds}, stale-while-revalidate=86400`,
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
