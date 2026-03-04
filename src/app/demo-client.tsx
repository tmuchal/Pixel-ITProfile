'use client'

import { useState, useEffect } from 'react'

const THEMES = [
  'matrix', 'cyberpunk', 'synthwave', 'dracula',
  'tokyonight', 'ocean', 'nord', 'monokai',
  'terminal', 'hacker', 'neon', 'retro',
]

const THEME_COLORS: Record<string, { bg: string; accent: string; text: string }> = {
  matrix:     { bg: '#0d0d0d', accent: '#00ff41', text: '#00ff41' },
  cyberpunk:  { bg: '#0a0a0f', accent: '#ff2d78', text: '#ffffff' },
  synthwave:  { bg: '#1a0a2e', accent: '#ff6b9d', text: '#e0aaff' },
  dracula:    { bg: '#282a36', accent: '#bd93f9', text: '#f8f8f2' },
  tokyonight: { bg: '#1a1b26', accent: '#7aa2f7', text: '#c0caf5' },
  ocean:      { bg: '#0a192f', accent: '#64ffda', text: '#ccd6f6' },
  nord:       { bg: '#2e3440', accent: '#88c0d0', text: '#eceff4' },
  monokai:    { bg: '#272822', accent: '#a6e22e', text: '#f8f8f2' },
  terminal:   { bg: '#1a1a1a', accent: '#ffcc00', text: '#e0e0e0' },
  hacker:     { bg: '#000000', accent: '#00ff00', text: '#33ff33' },
  neon:       { bg: '#0a0a0a', accent: '#00ffff', text: '#ffffff' },
  retro:      { bg: '#1a0f00', accent: '#ff8c00', text: '#ffb000' },
}

function buildProfileUrl(baseUrl: string, params: Record<string, string>): string {
  const url = new URL(`${baseUrl}/api/profile`)
  Object.entries(params).forEach(([k, v]) => {
    if (v) url.searchParams.set(k, v)
  })
  return url.toString()
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      style={{
        background: 'none', border: '1px solid #333', color: copied ? '#00ff41' : '#666',
        padding: '4px 10px', cursor: 'pointer', fontFamily: 'monospace', fontSize: 11,
        borderRadius: 2, transition: 'color 0.2s',
      }}
    >
      {copied ? '✓ Copied!' : 'Copy'}
    </button>
  )
}

export default function DemoClient({ baseUrl }: { baseUrl: string }) {
  const [params, setParams] = useState({
    name: '김철수',
    username: '',
    role: 'PM',
    domains: 'AI,Enterprise,Agent,Voice,Blockchain',
    bio: '관련없어보이는것들을연결하는사람',
    theme: 'cyberpunk',
    layout: 'wide',
    snake_speed: 'normal',
    show_stats: 'false',
  })

  const [imgKey, setImgKey] = useState(0)
  const [imgError, setImgError] = useState(false)

  const profileUrl = buildProfileUrl(baseUrl, params)
  const snakeUrl = `${baseUrl}/api/snake?theme=${params.theme}&speed=${params.snake_speed}`
  const themeColor = THEME_COLORS[params.theme] || THEME_COLORS.matrix

  const readmeCode = `<!-- 프로필 카드 -->\n![My IT Profile](${profileUrl})\n\n<!-- 뱀 단독 사용 -->\n![Snake](${snakeUrl})`

  useEffect(() => {
    const timer = setTimeout(() => {
      setImgKey(k => k + 1)
      setImgError(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [params])

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setParams(p => ({ ...p, [key]: e.target.value }))

  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '32px 20px', color: '#ccc' }}>

      {/* Title */}
      <div style={{ marginBottom: 32 }}>
        <pre style={{ color: '#00ff41', fontSize: 18, lineHeight: 1.4, margin: 0, fontFamily: 'monospace' }}>
{`  ____  _          _   ___ _____   ____             __ _ _
 |  _ \\(_)_  _____| | |_ _|_   _| |  _ \\ _ __ ___ / _(_) | ___
 | |_) | \\ \\/ / _ \\ |  | |  | |   | |_) | '__/ _ \\ |_| | |/ _ \\
 |  __/| |>  <  __/ |  | |  | |   |  __/| | | (_) |  _| | |  __/
 |_|   |_/_/\\_\\___|_| |___| |_|   |_|   |_|  \\___/|_| |_|_|\\___|`}
        </pre>
        <p style={{ color: '#888', fontSize: 13, margin: '12px 0 0', fontFamily: 'monospace' }}>
          🐍 픽셀 아트 IT 프로필 카드 생성기 — 뱀이 당신의 도메인들을 연결합니다
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 24 }}>

        {/* ── Controls ── */}
        <div>
          <div style={{
            border: '1px solid #333', padding: 16,
            background: '#0a0a0a', fontFamily: 'monospace',
          }}>
            <div style={{ color: '#00ff41', fontSize: 11, marginBottom: 16, borderBottom: '1px solid #222', paddingBottom: 8 }}>
              ▶ CUSTOMIZE
            </div>

            {[
              { key: 'name',        label: 'Name',         placeholder: '김철수' },
              { key: 'username',    label: 'GitHub user',  placeholder: 'yourname (optional)' },
              { key: 'role',        label: 'Role',         placeholder: 'PM / Frontend Dev / ...' },
              { key: 'domains',     label: 'IT Domains',   placeholder: 'AI,Enterprise,Agent' },
              { key: 'bio',         label: 'Bio / Slogan', placeholder: '한 줄 소개' },
            ].map(({ key, label, placeholder }) => (
              <div key={key} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: '#555', marginBottom: 3 }}>{label}</div>
                <input
                  value={(params as Record<string, string>)[key]}
                  onChange={set(key)}
                  placeholder={placeholder}
                  style={{
                    width: '100%', background: '#111', border: '1px solid #333',
                    color: '#ccc', padding: '5px 8px', fontSize: 11,
                    fontFamily: 'monospace', boxSizing: 'border-box',
                  }}
                />
              </div>
            ))}

            {/* Theme picker */}
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 10, color: '#555', marginBottom: 6 }}>Theme</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
                {THEMES.map(t => {
                  const c = THEME_COLORS[t]
                  return (
                    <button
                      key={t}
                      onClick={() => setParams(p => ({ ...p, theme: t }))}
                      title={t}
                      style={{
                        background: c.bg,
                        border: `2px solid ${params.theme === t ? c.accent : '#222'}`,
                        color: c.accent,
                        padding: '4px 2px',
                        fontSize: 8,
                        cursor: 'pointer',
                        fontFamily: 'monospace',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {t}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Layout + Speed */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 10, color: '#555', marginBottom: 3 }}>Layout</div>
                <select value={params.layout} onChange={set('layout')}
                  style={{ width: '100%', background: '#111', border: '1px solid #333', color: '#ccc', padding: '4px', fontSize: 11, fontFamily: 'monospace' }}>
                  <option value="wide">wide</option>
                  <option value="compact">compact</option>
                </select>
              </div>
              <div>
                <div style={{ fontSize: 10, color: '#555', marginBottom: 3 }}>Snake speed</div>
                <select value={params.snake_speed} onChange={set('snake_speed')}
                  style={{ width: '100%', background: '#111', border: '1px solid #333', color: '#ccc', padding: '4px', fontSize: 11, fontFamily: 'monospace' }}>
                  <option value="slow">slow</option>
                  <option value="normal">normal</option>
                  <option value="fast">fast</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ── Preview ── */}
        <div>
          {/* Card preview */}
          <div style={{
            background: themeColor.bg, border: `1px solid ${themeColor.accent}22`,
            padding: 16, marginBottom: 16, minHeight: 200,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {imgError ? (
              <div style={{ color: '#ff6666', fontSize: 12, fontFamily: 'monospace', textAlign: 'center' }}>
                <div style={{ marginBottom: 8 }}>⚠ 로컬 dev 환경에서는 미리보기가 제한됩니다</div>
                <div style={{ color: '#555', fontSize: 10 }}>배포 후 실제 카드를 확인하세요</div>
              </div>
            ) : (
              <img
                key={imgKey}
                src={profileUrl}
                alt="Profile Card Preview"
                onError={() => setImgError(true)}
                style={{ maxWidth: '100%', display: 'block' }}
              />
            )}
          </div>

          {/* Snake preview */}
          <div style={{
            background: themeColor.bg, border: `1px solid ${themeColor.accent}22`,
            padding: '8px 16px', marginBottom: 16,
          }}>
            <div style={{ color: '#444', fontSize: 10, fontFamily: 'monospace', marginBottom: 6 }}>
              ▶ Snake only (/api/snake)
            </div>
            {!imgError && (
              <img key={`snake-${imgKey}`} src={snakeUrl} alt="Snake" style={{ maxWidth: '100%', height: 60 }} />
            )}
          </div>

          {/* README code */}
          <div style={{ border: '1px solid #222', background: '#060606', padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ color: '#444', fontSize: 10, fontFamily: 'monospace' }}>📋 Copy to README.md</span>
              <CopyButton text={readmeCode} />
            </div>
            <pre style={{
              margin: 0, fontSize: 10, color: '#666',
              fontFamily: 'monospace', overflowX: 'auto',
              whiteSpace: 'pre-wrap', wordBreak: 'break-all',
            }}>
              {readmeCode}
            </pre>
          </div>
        </div>
      </div>

      {/* ── API Docs ── */}
      <section style={{ marginTop: 48 }}>
        <h2 style={{ color: '#00ff41', fontFamily: 'monospace', fontSize: 14, borderBottom: '1px solid #222', paddingBottom: 8 }}>
          ⚙ API Reference
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

          {/* Profile params */}
          <div>
            <div style={{ color: '#888', fontSize: 11, fontFamily: 'monospace', marginBottom: 8 }}>
              GET /api/profile
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
              <tbody>
                {[
                  ['name', '표시할 이름'],
                  ['username', 'GitHub 유저명 (아바타 자동 fetch)'],
                  ['role', '직군 — PM, AI Engineer, DevOps...'],
                  ['domains', 'IT 도메인 (쉼표 구분, 최대 8개)'],
                  ['bio / slogan', '한 줄 소개'],
                  ['theme', THEMES.join(' | ')],
                  ['layout', 'wide | compact'],
                  ['snake_speed', 'slow | normal | fast'],
                  ['show_stats', 'true | false (GitHub 통계)'],
                  ['show_avatar', 'true | false'],
                  ['bg_color', '배경색 (#hex)'],
                  ['accent_color', '강조색 (#hex)'],
                  ['snake_color', '뱀 색 (#hex)'],
                  ['food_color', '먹이 색 (#hex)'],
                ].map(([k, v]) => (
                  <tr key={k} style={{ borderBottom: '1px solid #111' }}>
                    <td style={{ padding: '5px 8px', color: '#ff6b9d', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{k}</td>
                    <td style={{ padding: '5px 8px', color: '#666' }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Snake params + Deploy */}
          <div>
            <div style={{ color: '#888', fontSize: 11, fontFamily: 'monospace', marginBottom: 8 }}>
              GET /api/snake
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11, marginBottom: 24 }}>
              <tbody>
                {[
                  ['theme', '색상 테마'],
                  ['speed', 'slow | normal | fast'],
                  ['color', '뱀 몸 색'],
                  ['head_color', '뱀 머리 색'],
                  ['food_color', '먹이 색'],
                  ['width', '이미지 너비 (px)'],
                  ['height', '이미지 높이 (px)'],
                ].map(([k, v]) => (
                  <tr key={k} style={{ borderBottom: '1px solid #111' }}>
                    <td style={{ padding: '5px 8px', color: '#ff6b9d', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{k}</td>
                    <td style={{ padding: '5px 8px', color: '#666' }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Deploy */}
            <div style={{ border: '1px solid #1a1a1a', padding: 12, background: '#060606' }}>
              <div style={{ color: '#00ff41', fontSize: 11, fontFamily: 'monospace', marginBottom: 8 }}>🚀 Deploy your own</div>
              <pre style={{ margin: 0, fontSize: 10, color: '#666', fontFamily: 'monospace' }}>
{`# 1. Fork & clone
git clone github.com/YOU/pixel-itprofile

# 2. Deploy to Vercel
vercel deploy

# 3. (optional) GitHub stats
# Add GITHUB_TOKEN env var in Vercel dashboard`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ marginTop: 40, borderTop: '1px solid #111', paddingTop: 16, fontSize: 10, color: '#333', fontFamily: 'monospace' }}>
        <span>Pixel IT Profile</span>
        {' · '}
        <a href="https://github.com/LuciNyan/pixel-profile" style={{ color: '#444' }}>Inspired by pixel-profile</a>
        {' · '}
        <a href="https://github.com/Platane/snk" style={{ color: '#444' }}>Snake idea from Platane/snk</a>
      </footer>
    </main>
  )
}
