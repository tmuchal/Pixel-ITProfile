'use client'

import { useState, useEffect } from 'react'

const THEMES = [
  'matrix', 'cyberpunk', 'synthwave', 'tokyonight',
  'ocean', 'nord', 'monokai', 'retro',
]

const THEME_COLORS: Record<string, { bg: string; accent: string }> = {
  matrix:     { bg: '#0d0d0d', accent: '#00ff41' },
  cyberpunk:  { bg: '#0a0a0f', accent: '#ff2d78' },
  synthwave:  { bg: '#1a0a2e', accent: '#ff6b9d' },
  tokyonight: { bg: '#1a1b26', accent: '#7aa2f7' },
  ocean:      { bg: '#0a192f', accent: '#64ffda' },
  nord:       { bg: '#2e3440', accent: '#88c0d0' },
  monokai:    { bg: '#272822', accent: '#a6e22e' },
  retro:      { bg: '#1a0f00', accent: '#ff8c00' },
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
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      style={{
        background: 'none', border: '1px solid #333', color: copied ? '#00ff41' : '#555',
        padding: '4px 12px', cursor: 'pointer', fontFamily: 'monospace', fontSize: 11,
        borderRadius: 2, transition: 'color 0.2s',
      }}
    >
      {copied ? '✓ 복사됨!' : '복사'}
    </button>
  )
}

export default function DemoClient({ baseUrl }: { baseUrl: string }) {
  const [params, setParams] = useState({
    name:    '김철수',
    role:    'PM · AI 전략가',
    domains: 'AI,Enterprise,Agent,Voice,Blockchain',
    bio:     '관련없어보이는것들을연결하는사람',
    theme:   'cyberpunk',
  })

  const [imgKey, setImgKey] = useState(0)
  const [imgError, setImgError] = useState(false)

  const profileUrl = buildProfileUrl(baseUrl, params)
  const themeColor = THEME_COLORS[params.theme] || THEME_COLORS.matrix

  const readmeSnippet = `<!-- GitHub 프로필 README.md에 붙여넣기 -->
![Pixel IT Profile](${profileUrl})`

  useEffect(() => {
    const t = setTimeout(() => { setImgKey(k => k + 1); setImgError(false) }, 600)
    return () => clearTimeout(t)
  }, [params])

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setParams(p => ({ ...p, [key]: e.target.value }))

  return (
    <main style={{ maxWidth: 980, margin: '0 auto', padding: '36px 20px', color: '#ccc', fontFamily: 'monospace' }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: 36 }}>
        <pre style={{ color: '#00ff41', fontSize: 17, lineHeight: 1.4, margin: 0 }}>
{`  ____  _          _   ___ _____   ____             __ _ _
 |  _ \\(_)_  _____| | |_ _|_   _| |  _ \\ _ __ ___ / _(_) | ___
 | |_) | \\ \\/ / _ \\ |  | |  | |   | |_) | '__/ _ \\ |_| | |/ _ \\
 |  __/| |>  <  __/ |  | |  | |   |  __/| | | (_) |  _| | |  __/
 |_|   |_/_/\\_\\___|_| |___| |_|   |_|   |_|  \\___/|_| |_|_|\\___|`}
        </pre>
        <p style={{ color: '#555', fontSize: 12, margin: '10px 0 0' }}>
          GitHub README에 넣는 픽셀 아트 프로필 카드 — 통통한 고양이가 하루를 보냅니다
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 28 }}>

        {/* ── 설정 패널 ── */}
        <div>
          <div style={{ border: '1px solid #222', background: '#080808', padding: 18 }}>
            <div style={{ color: '#00ff41', fontSize: 11, marginBottom: 18, borderBottom: '1px solid #1a1a1a', paddingBottom: 8 }}>
              ▶ 내용 설정
            </div>

            {[
              { key: 'name',    label: '이름',         placeholder: '김철수' },
              { key: 'role',    label: '직군',         placeholder: 'PM · AI Engineer · DevOps ...' },
              { key: 'domains', label: 'IT 관심분야',  placeholder: 'AI,Enterprise,Agent (쉼표 구분)' },
              { key: 'bio',     label: '한 줄 소개',   placeholder: '나만의 한 줄' },
            ].map(({ key, label, placeholder }) => (
              <div key={key} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 10, color: '#444', marginBottom: 4 }}>{label}</div>
                <input
                  value={(params as Record<string, string>)[key]}
                  onChange={set(key)}
                  placeholder={placeholder}
                  style={{
                    width: '100%', background: '#0e0e0e', border: '1px solid #2a2a2a',
                    color: '#ccc', padding: '6px 8px', fontSize: 11,
                    fontFamily: 'monospace', boxSizing: 'border-box', borderRadius: 2,
                  }}
                />
              </div>
            ))}

            {/* 테마 선택 */}
            <div style={{ marginTop: 18 }}>
              <div style={{ fontSize: 10, color: '#444', marginBottom: 8 }}>색상 테마</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5 }}>
                {THEMES.map(t => {
                  const c = THEME_COLORS[t]
                  return (
                    <button
                      key={t}
                      onClick={() => setParams(p => ({ ...p, theme: t }))}
                      title={t}
                      style={{
                        background: c.bg,
                        border: `2px solid ${params.theme === t ? c.accent : '#1a1a1a'}`,
                        color: c.accent,
                        padding: '5px 2px',
                        fontSize: 8,
                        cursor: 'pointer',
                        fontFamily: 'monospace',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        borderRadius: 2,
                      }}
                    >
                      {t}
                    </button>
                  )
                })}
              </div>
            </div>

            <div style={{ marginTop: 18, padding: '12px', background: '#0a0a0a', border: '1px solid #1a1a1a', fontSize: 10, color: '#444', lineHeight: 1.7 }}>
              <div style={{ color: '#555', marginBottom: 6 }}>고양이 하루 루틴 (40초 반복)</div>
              🚶 걷기 → 💻 코딩 → ☕ 커피 → 🚶 귀가 → 📺 유튜브 → 😴 수면
            </div>
          </div>
        </div>

        {/* ── 미리보기 ── */}
        <div>
          <div style={{ fontSize: 10, color: '#444', marginBottom: 8 }}>
            미리보기 — {params.name || '이름'} · {params.role || '직군'} ({params.theme})
          </div>

          <div style={{
            background: themeColor.bg,
            border: `1px solid ${themeColor.accent}22`,
            padding: 16,
            marginBottom: 20,
            minHeight: 220,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {imgError ? (
              <div style={{ color: '#ff6666', fontSize: 12, textAlign: 'center' }}>
                <div style={{ marginBottom: 8 }}>⚠ 로컬 dev 환경에서는 미리보기가 제한됩니다</div>
                <div style={{ color: '#555', fontSize: 10 }}>배포 후 실제 카드를 확인하세요</div>
              </div>
            ) : (
              <img
                key={imgKey}
                src={profileUrl}
                alt="Profile Card"
                onError={() => setImgError(true)}
                style={{ maxWidth: '100%', display: 'block' }}
              />
            )}
          </div>

          {/* README 코드 복사 */}
          <div style={{ border: '1px solid #1a1a1a', background: '#050505', padding: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ color: '#444', fontSize: 10 }}>📋 README.md에 붙여넣기</span>
              <CopyButton text={readmeSnippet} />
            </div>
            <pre style={{
              margin: 0, fontSize: 10, color: '#555',
              overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all',
              lineHeight: 1.6,
            }}>
              {readmeSnippet}
            </pre>
          </div>
        </div>
      </div>

      {/* ── 사용법 ── */}
      <section style={{ marginTop: 52 }}>
        <h2 style={{ color: '#00ff41', fontSize: 13, borderBottom: '1px solid #1a1a1a', paddingBottom: 8, margin: '0 0 20px' }}>
          ⚙ 사용법 및 파라미터
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>

          <div>
            <div style={{ color: '#555', fontSize: 11, marginBottom: 10 }}>GET /api/profile — 파라미터 목록</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
              <tbody>
                {[
                  ['name',        '표시할 이름'],
                  ['role',        '직군 (PM, AI Engineer, DevOps …)'],
                  ['domains',     'IT 관심 분야 (쉼표 구분, 최대 8개)'],
                  ['bio',         '한 줄 소개'],
                  ['username',    'GitHub 아이디 (프로필 사진 자동 로드)'],
                  ['theme',       THEMES.join(' | ')],
                  ['accent_color','강조색 오버라이드 (#hex)'],
                  ['bg_color',    '배경색 오버라이드 (#hex)'],
                ].map(([k, v]) => (
                  <tr key={k} style={{ borderBottom: '1px solid #0e0e0e' }}>
                    <td style={{ padding: '5px 8px', color: '#ff6b9d', whiteSpace: 'nowrap' }}>{k}</td>
                    <td style={{ padding: '5px 8px', color: '#555' }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <div style={{ color: '#555', fontSize: 11, marginBottom: 10 }}>직접 배포하기</div>
            <div style={{ border: '1px solid #1a1a1a', padding: 14, background: '#050505' }}>
              <pre style={{ margin: 0, fontSize: 10, color: '#555', lineHeight: 1.8 }}>
{`# 1. Fork & clone
git clone github.com/YOU/Pixel-ITProfile

# 2. Vercel 배포
vercel deploy

# 3. (선택) GitHub 통계 표시
# Vercel 환경변수에 GITHUB_TOKEN 추가`}
              </pre>
            </div>

            <div style={{ marginTop: 16, border: '1px solid #1a1a1a', padding: 14, background: '#050505' }}>
              <div style={{ color: '#555', fontSize: 10, marginBottom: 8 }}>README.md 사용 예시</div>
              <pre style={{ margin: 0, fontSize: 10, color: '#555', lineHeight: 1.8 }}>
{`[![Pixel IT Profile](
  https://pixel-itprofile.vercel.app/api/profile
  ?name=홍길동
  &role=Backend+Engineer
  &domains=Go,Kubernetes,AWS
  &bio=서버를신나게두드리는사람
  &theme=ocean
)](https://github.com/홍길동)`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ marginTop: 44, borderTop: '1px solid #111', paddingTop: 16, fontSize: 10, color: '#2a2a2a' }}>
        Pixel IT Profile
        {' · '}
        <a href="https://github.com/tmuchal/Pixel-ITProfile" style={{ color: '#333' }}>GitHub</a>
      </footer>
    </main>
  )
}
