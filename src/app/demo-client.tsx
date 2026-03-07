'use client'

import { useState, useEffect } from 'react'

const THEMES = [
  'matrix', 'cyberpunk', 'synthwave', 'tokyonight',
  'ocean', 'nord', 'monokai', 'retro',
]

const THEME_COLORS: Record<string, { bg: string; accent: string; label: string }> = {
  matrix:     { bg: '#0d0d0d', accent: '#00ff41', label: 'Matrix' },
  cyberpunk:  { bg: '#0a0a0f', accent: '#ff2d78', label: 'Cyberpunk' },
  synthwave:  { bg: '#1a0a2e', accent: '#ff6b9d', label: 'Synthwave' },
  tokyonight: { bg: '#1a1b26', accent: '#7aa2f7', label: 'Tokyo Night' },
  ocean:      { bg: '#0a192f', accent: '#64ffda', label: 'Ocean' },
  nord:       { bg: '#2e3440', accent: '#88c0d0', label: 'Nord' },
  monokai:    { bg: '#272822', accent: '#a6e22e', label: 'Monokai' },
  retro:      { bg: '#1a0f00', accent: '#ff8c00', label: 'Retro' },
}

function buildProfileUrl(baseUrl: string, params: Record<string, string>): string {
  const url = new URL(`${baseUrl}/api/profile`)
  Object.entries(params).forEach(([k, v]) => {
    if (v) url.searchParams.set(k, v)
  })
  return url.toString()
}

function CopyButton({ text, label = '복사' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      style={{
        background: copied ? '#00ff4111' : 'none',
        border: `1px solid ${copied ? '#00ff41' : '#2a2a2a'}`,
        color: copied ? '#00ff41' : '#444',
        padding: '5px 14px',
        cursor: 'pointer',
        fontFamily: 'monospace',
        fontSize: 11,
        borderRadius: 3,
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
      }}
    >
      {copied ? '✓ 복사됨!' : label}
    </button>
  )
}

function InputField({
  label, value, onChange, placeholder, mono = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  mono?: boolean
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 10, color: '#555', marginBottom: 5, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        {label}
      </div>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          background: '#080808',
          border: '1px solid #1e1e1e',
          color: '#aaa',
          padding: '7px 10px',
          fontSize: mono ? 11 : 12,
          fontFamily: mono ? 'monospace' : 'inherit',
          boxSizing: 'border-box',
          borderRadius: 3,
          outline: 'none',
        }}
      />
    </div>
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
  const [imgLoading, setImgLoading] = useState(false)

  const profileUrl = buildProfileUrl(baseUrl, params)
  const themeColor = THEME_COLORS[params.theme] || THEME_COLORS.matrix

  const readmeSnippet = `![Pixel IT Profile](${profileUrl})`
  const markdownLink = `[![Pixel IT Profile](${profileUrl})](https://github.com/${params.name})`

  useEffect(() => {
    setImgLoading(true)
    const t = setTimeout(() => {
      setImgKey(k => k + 1)
      setImgError(false)
    }, 600)
    return () => clearTimeout(t)
  }, [params])

  const set = (key: string) => (v: string) =>
    setParams(p => ({ ...p, [key]: v }))

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: '#ccc', fontFamily: "'Courier New', monospace" }}>

      {/* ── Hero / Header ── */}
      <div style={{
        background: 'linear-gradient(180deg, #0d0d0d 0%, #080808 100%)',
        borderBottom: '1px solid #1a1a1a',
        padding: '48px 0 36px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'inline-block', background: '#0d0d0d', border: '1px solid #1e1e1e', borderRadius: 4, padding: '3px 12px', fontSize: 10, color: '#555', marginBottom: 20, letterSpacing: '0.1em' }}>
            GITHUB PROFILE CARD GENERATOR
          </div>
          <pre style={{
            color: '#00ff41',
            fontSize: 'clamp(8px, 1.6vw, 15px)',
            lineHeight: 1.35,
            margin: '0 0 16px',
            userSelect: 'none',
            textShadow: '0 0 20px #00ff4155',
            overflowX: 'auto',
          }}>
{`  ____  _          _   ___ _____   ____             __ _ _
 |  _ \\(_)_  _____| | |_ _|_   _| |  _ \\ _ __ ___ / _(_) | ___
 | |_) | \\ \\/ / _ \\ |  | |  | |   | |_) | '__/ _ \\ |_| | |/ _ \\
 |  __/| |>  <  __/ |  | |  | |   |  __/| | | (_) |  _| | |  __/
 |_|   |_/_/\\_\\___|_| |___| |_|   |_|   |_|  \\___/|_| |_|_|\\___|`}
          </pre>
          <p style={{ color: '#444', fontSize: 12, margin: 0, lineHeight: 1.7 }}>
            GitHub README에 넣는 픽셀 아트 프로필 카드 &mdash; 통통한 고양이가 하루를 보내는 애니메이션
          </p>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '40px 24px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '290px 1fr', gap: 32, alignItems: 'start' }}>

          {/* ── Left: Settings panel ── */}
          <div style={{ position: 'sticky', top: 24 }}>

            {/* Content settings */}
            <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 4, padding: '18px 18px 14px', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, paddingBottom: 12, borderBottom: '1px solid #111' }}>
                <span style={{ fontSize: 10, color: '#00ff41', opacity: 0.7 }}>▶</span>
                <span style={{ fontSize: 11, color: '#666', letterSpacing: '0.08em', textTransform: 'uppercase' }}>내용 설정</span>
              </div>

              <InputField label="이름" value={params.name} onChange={set('name')} placeholder="김철수" />
              <InputField label="직군" value={params.role} onChange={set('role')} placeholder="PM · AI Engineer · DevOps" />
              <InputField label="IT 관심분야 (쉼표 구분)" value={params.domains} onChange={set('domains')} placeholder="AI,Cloud,Kubernetes" mono />
              <InputField label="한 줄 소개" value={params.bio} onChange={set('bio')} placeholder="나만의 한 줄" />
            </div>

            {/* Theme picker */}
            <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 4, padding: '18px 18px 14px', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #111' }}>
                <span style={{ fontSize: 10, color: '#00ff41', opacity: 0.7 }}>▶</span>
                <span style={{ fontSize: 11, color: '#666', letterSpacing: '0.08em', textTransform: 'uppercase' }}>색상 테마</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                {THEMES.map(t => {
                  const c = THEME_COLORS[t]
                  const active = params.theme === t
                  return (
                    <button
                      key={t}
                      onClick={() => setParams(p => ({ ...p, theme: t }))}
                      style={{
                        background: c.bg,
                        border: `1.5px solid ${active ? c.accent : '#1e1e1e'}`,
                        color: c.accent,
                        padding: '8px 6px',
                        fontSize: 10,
                        cursor: 'pointer',
                        fontFamily: 'monospace',
                        borderRadius: 3,
                        textAlign: 'left',
                        transition: 'border-color 0.15s',
                        boxShadow: active ? `0 0 8px ${c.accent}33` : 'none',
                      }}
                    >
                      <div style={{ width: 8, height: 8, background: c.accent, display: 'inline-block', marginRight: 6, borderRadius: 1, verticalAlign: 'middle', boxShadow: `0 0 4px ${c.accent}` }} />
                      {c.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Cat info */}
            <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 4, padding: 14, fontSize: 10, color: '#333', lineHeight: 1.9 }}>
              <div style={{ color: '#444', marginBottom: 8, letterSpacing: '0.06em' }}>고양이 하루 루틴 (40초 반복)</div>
              <div>🚶 걷기</div>
              <div>💻 코딩</div>
              <div>☕ 커피</div>
              <div>🚶 귀가</div>
              <div>📺 유튜브</div>
              <div>😴 수면</div>
            </div>
          </div>

          {/* ── Right: Preview + Export ── */}
          <div>

            {/* Preview */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: '#444', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  미리보기
                </div>
                <div style={{ fontSize: 10, color: '#333' }}>
                  {params.name || '—'} · {params.theme}
                </div>
              </div>

              <div style={{
                background: themeColor.bg,
                border: `1px solid ${themeColor.accent}22`,
                borderRadius: 4,
                padding: 20,
                minHeight: 240,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {imgError ? (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#ff5555', fontSize: 12, marginBottom: 8 }}>⚠ 로컬 환경에서는 미리보기가 제한됩니다</div>
                    <div style={{ color: '#333', fontSize: 10 }}>배포 후 실제 카드를 확인하세요</div>
                  </div>
                ) : (
                  <img
                    key={imgKey}
                    src={profileUrl}
                    alt="Profile Card Preview"
                    onError={() => setImgError(true)}
                    onLoad={() => setImgLoading(false)}
                    style={{ maxWidth: '100%', display: 'block', borderRadius: 2 }}
                  />
                )}
              </div>
            </div>

            {/* Export */}
            <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 4, overflow: 'hidden' }}>

              {/* Tab: Simple */}
              <div style={{ borderBottom: '1px solid #111', padding: '14px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 10, color: '#555', letterSpacing: '0.06em', textTransform: 'uppercase' }}>README.md — 이미지만</span>
                  <CopyButton text={readmeSnippet} />
                </div>
                <pre style={{
                  margin: 0,
                  fontSize: 10,
                  color: '#444',
                  overflowX: 'auto',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                  lineHeight: 1.7,
                  background: '#060606',
                  padding: '10px 12px',
                  borderRadius: 3,
                  border: '1px solid #111',
                }}>
                  {readmeSnippet}
                </pre>
              </div>

              {/* Tab: With link */}
              <div style={{ padding: '14px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 10, color: '#555', letterSpacing: '0.06em', textTransform: 'uppercase' }}>README.md — 클릭 링크 포함</span>
                  <CopyButton text={markdownLink} />
                </div>
                <pre style={{
                  margin: 0,
                  fontSize: 10,
                  color: '#444',
                  overflowX: 'auto',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                  lineHeight: 1.7,
                  background: '#060606',
                  padding: '10px 12px',
                  borderRadius: 3,
                  border: '1px solid #111',
                }}>
                  {markdownLink}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* ── API Reference ── */}
        <div style={{ marginTop: 64, borderTop: '1px solid #111', paddingTop: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <span style={{ fontSize: 10, color: '#00ff41', opacity: 0.6 }}>▶</span>
            <span style={{ fontSize: 13, color: '#555', letterSpacing: '0.08em', textTransform: 'uppercase' }}>API Reference</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>

            {/* Parameters */}
            <div>
              <div style={{ fontSize: 10, color: '#333', marginBottom: 12, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                GET /api/profile
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '6px 10px', fontSize: 10, color: '#333', fontWeight: 'normal', borderBottom: '1px solid #111' }}>파라미터</th>
                    <th style={{ textAlign: 'left', padding: '6px 10px', fontSize: 10, color: '#333', fontWeight: 'normal', borderBottom: '1px solid #111' }}>설명</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['name',         '표시할 이름'],
                    ['role',         '직군 (PM, AI Engineer …)'],
                    ['domains',      'IT 관심 분야 (쉼표 구분, max 8)'],
                    ['bio',          '한 줄 소개'],
                    ['username',     'GitHub ID (프로필 사진 로드)'],
                    ['theme',        THEMES.join(' | ')],
                    ['accent_color', '강조색 오버라이드 (#hex)'],
                    ['bg_color',     '배경색 오버라이드 (#hex)'],
                  ].map(([k, v], i) => (
                    <tr key={k} style={{ borderBottom: '1px solid #0c0c0c', background: i % 2 === 0 ? 'transparent' : '#0a0a0a' }}>
                      <td style={{ padding: '7px 10px', color: '#ff6b9d', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{k}</td>
                      <td style={{ padding: '7px 10px', color: '#444', fontSize: 10 }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Deploy + Example */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <div style={{ fontSize: 10, color: '#333', marginBottom: 10, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  직접 배포하기
                </div>
                <div style={{ background: '#060606', border: '1px solid #111', borderRadius: 4, padding: '14px 16px' }}>
                  <pre style={{ margin: 0, fontSize: 10, color: '#444', lineHeight: 1.9 }}>
{`# 1. Fork & clone
git clone github.com/YOU/Pixel-ITProfile

# 2. Vercel 배포
vercel deploy

# 3. (선택) GitHub 통계 연동
# Vercel 환경변수에 GITHUB_TOKEN 추가`}
                  </pre>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 10, color: '#333', marginBottom: 10, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  사용 예시
                </div>
                <div style={{ background: '#060606', border: '1px solid #111', borderRadius: 4, padding: '14px 16px' }}>
                  <pre style={{ margin: 0, fontSize: 10, color: '#444', lineHeight: 1.9 }}>
{`[![Pixel IT Profile](
  https://pixel-itprofile.vercel.app/api/profile
  ?name=홍길동
  &role=Backend+Engineer
  &domains=Go,Kubernetes,AWS
  &bio=서버를신나게두드리는사람
  &theme=ocean
)](https://github.com/honggildong)`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{ borderTop: '1px solid #0f0f0f', padding: '24px 0', marginTop: 40 }}>
        <div style={{ maxWidth: 1060, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 10, color: '#2a2a2a' }}>Pixel IT Profile</span>
          <div style={{ display: 'flex', gap: 20, fontSize: 10 }}>
            <a href="https://github.com/tmuchal/Pixel-ITProfile" style={{ color: '#333', textDecoration: 'none' }}>
              GitHub
            </a>
            <a href="/api/profile?name=demo&theme=matrix" style={{ color: '#333', textDecoration: 'none' }}>
              API
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
