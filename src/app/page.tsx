export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pixel-itprofile.vercel.app'

  const examples = [
    {
      title: 'PM + AI/Enterprise',
      theme: 'cyberpunk',
      url: `${baseUrl}/api/profile?name=김철수&role=PM&domains=AI,Enterprise,Agent,Blockchain&bio=관련없어보이는것들을연결하는사람&theme=cyberpunk`,
    },
    {
      title: 'Full Stack Dev',
      theme: 'matrix',
      url: `${baseUrl}/api/profile?name=Jane&username=janedev&role=Full+Stack+Dev&domains=React,Node.js,Docker,PostgreSQL&bio=Building+cool+things+with+code&theme=matrix&show_snake=true`,
    },
    {
      title: 'AI Engineer',
      theme: 'synthwave',
      url: `${baseUrl}/api/profile?name=Alex&role=AI+Engineer&domains=PyTorch,LangChain,Vector+DB,RAG&bio=Making+machines+think&theme=synthwave`,
    },
    {
      title: 'DevOps Engineer',
      theme: 'ocean',
      url: `${baseUrl}/api/profile?name=Sam&role=DevOps&domains=Kubernetes,Terraform,AWS,GitOps&bio=Infrastructure+as+a+feeling&theme=ocean`,
    },
  ]

  const params = [
    { name: 'username',     desc: 'GitHub 유저명 (아바타 + 통계 자동 fetch)', example: 'yourname' },
    { name: 'name',         desc: '표시할 이름', example: '김철수' },
    { name: 'role',         desc: 'IT 역할/직군', example: 'PM' },
    { name: 'domains',      desc: 'IT 도메인 (쉼표 구분)', example: 'AI,Enterprise,Agent,Blockchain' },
    { name: 'bio',          desc: '한 줄 소개', example: '관련없어보이는것들을연결하는사람' },
    { name: 'theme',        desc: '색상 테마', example: 'matrix|dracula|cyberpunk|synthwave|nord|terminal|ocean|hacker|neon' },
    { name: 'snake_speed',  desc: '뱀 속도', example: 'slow|normal|fast' },
    { name: 'layout',       desc: '레이아웃', example: 'wide|compact' },
    { name: 'show_stats',   desc: 'GitHub 통계 표시', example: 'true|false' },
    { name: 'show_snake',   desc: '뱀 애니메이션', example: 'true|false' },
    { name: 'bg_color',     desc: '배경색 override', example: '%230d0d0d' },
    { name: 'accent_color', desc: '강조색 override', example: '%2300ff41' },
    { name: 'snake_color',  desc: '뱀 색 override', example: '%2344ff44' },
  ]

  const themes = ['matrix', 'dracula', 'cyberpunk', 'synthwave', 'nord', 'terminal', 'ocean', 'hacker', 'neon']

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
      <pre style={{ color: '#00ff41', fontSize: 22, lineHeight: 1.3, marginBottom: 8 }}>
{`╔══════════════════════════════════════╗
║  🐍  PIXEL IT PROFILE GENERATOR      ║
║     픽셀 아트 IT 프로필 카드           ║
╚══════════════════════════════════════╝`}
      </pre>

      <p style={{ color: '#888', fontSize: 14, marginBottom: 40 }}>
        GitHub README에 붙여넣을 수 있는 픽셀 아트 IT 프로필 카드.
        통계 숫자가 아닌, <strong style={{ color: '#00ff41' }}>당신이 무엇을 하는 사람인지</strong>를 보여줍니다.
        뱀이 도메인 태그들을 연결하며 기어다닙니다. 🐍
      </p>

      {/* Quick start */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ color: '#00ff41', borderBottom: '1px solid #333', paddingBottom: 8 }}>⚡ Quick Start</h2>
        <p style={{ color: '#888', fontSize: 13, marginBottom: 12 }}>GitHub README.md에 아래 코드를 붙여넣으세요:</p>
        <pre style={{
          background: '#111', border: '1px solid #333', borderRadius: 4,
          padding: 16, fontSize: 12, color: '#ccc', overflowX: 'auto'
        }}>
{`![My IT Profile](${baseUrl}/api/profile?name=YOUR_NAME&role=YOUR_ROLE&domains=AI,Enterprise,Agent&bio=한줄소개&theme=cyberpunk)

<!-- 뱀 애니메이션만 사용하기 -->
![Snake](${baseUrl}/api/snake?theme=matrix&speed=normal)`}
        </pre>
      </section>

      {/* Examples */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ color: '#00ff41', borderBottom: '1px solid #333', paddingBottom: 8 }}>🎨 Examples</h2>
        <div style={{ display: 'grid', gap: 24 }}>
          {examples.map(ex => (
            <div key={ex.title}>
              <p style={{ color: '#888', fontSize: 12, margin: '0 0 8px' }}>
                Theme: <span style={{ color: '#00ff41' }}>{ex.theme}</span> — {ex.title}
              </p>
              <img src={ex.url} alt={ex.title} style={{ width: '100%', maxWidth: 800, border: '1px solid #333' }} />
              <details style={{ marginTop: 6 }}>
                <summary style={{ color: '#555', fontSize: 11, cursor: 'pointer' }}>URL 보기</summary>
                <pre style={{ background: '#111', padding: 8, fontSize: 10, color: '#888', overflowX: 'auto', marginTop: 4 }}>{ex.url}</pre>
              </details>
            </div>
          ))}
        </div>
      </section>

      {/* Parameters */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ color: '#00ff41', borderBottom: '1px solid #333', paddingBottom: 8 }}>⚙️ Parameters</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #333' }}>
              {['파라미터', '설명', '예시'].map(h => (
                <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: '#00ff41' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {params.map(param => (
              <tr key={param.name} style={{ borderBottom: '1px solid #1a1a1a' }}>
                <td style={{ padding: '6px 12px', color: '#ff6b9d', fontFamily: 'monospace' }}>{param.name}</td>
                <td style={{ padding: '6px 12px', color: '#888' }}>{param.desc}</td>
                <td style={{ padding: '6px 12px', color: '#ccc', fontFamily: 'monospace', fontSize: 11 }}>{param.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Themes */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ color: '#00ff41', borderBottom: '1px solid #333', paddingBottom: 8 }}>🎨 Themes</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {themes.map(t => (
            <span key={t} style={{
              padding: '4px 12px', border: '1px solid #333',
              color: '#00ff41', fontFamily: 'monospace', fontSize: 12
            }}>{t}</span>
          ))}
        </div>
      </section>

      {/* Deploy */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ color: '#00ff41', borderBottom: '1px solid #333', paddingBottom: 8 }}>🚀 Deploy (Vercel)</h2>
        <pre style={{ background: '#111', border: '1px solid #333', padding: 16, fontSize: 12, color: '#ccc' }}>
{`1. Fork this repo: https://github.com/yourname/pixel-itprofile

2. Deploy to Vercel:
   vercel deploy

3. (선택) GitHub 아바타 + 통계 사용 시 환경변수 설정:
   GITHUB_TOKEN = your_github_personal_access_token

4. README.md에 사용:
   ![Profile](https://YOUR-APP.vercel.app/api/profile?...)`}
        </pre>
      </section>

      <footer style={{ color: '#333', fontSize: 11, marginTop: 40, borderTop: '1px solid #1a1a1a', paddingTop: 16 }}>
        <span>Pixel IT Profile</span>
        {' · '}
        <a href="https://github.com/LuciNyan/pixel-profile" style={{ color: '#444' }}>
          Inspired by pixel-profile
        </a>
        {' · '}
        <a href="https://github.com/Platane/snk" style={{ color: '#444' }}>
          Snake by Platane/snk
        </a>
      </footer>
    </main>
  )
}
