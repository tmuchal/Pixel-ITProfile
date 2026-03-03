# 🐍 Pixel IT Profile

> **픽셀 아트 스타일의 IT 프로필 카드 생성기**
> 통계 숫자가 아닌, 당신이 **어떤 IT인인지**를 멋지게 보여주세요.
> 뱀이 도메인 태그들 사이를 기어다니며 연결합니다.

Inspired by [pixel-profile](https://github.com/LuciNyan/pixel-profile) · Snake by [Platane/snk](https://github.com/Platane/snk)

---

## ✨ 특징

- 🎭 **IT 정체성 중심** — 역할(PM, AI Engineer, DevOps...) + 도메인 태그
- 🐍 **픽셀 뱀 애니메이션** — 뱀이 도메인 태그들을 연결하며 기어다님
- 🎨 **9가지 테마** — matrix, cyberpunk, synthwave, dracula, nord, ocean...
- 📦 **GitHub 토큰 없이도 사용 가능** — 아바타/통계는 선택 옵션
- ⚡ **Vercel 1-click 배포**
- 🇰🇷 **한글 지원**

---

## 🚀 Quick Start

GitHub `README.md`에 아래 코드 한 줄만 붙여넣으면 됩니다:

```markdown
![My IT Profile](https://pixel-itprofile.vercel.app/api/profile?name=김철수&role=PM&domains=AI,Enterprise,Agent,Blockchain&bio=관련없어보이는것들을연결하는사람&theme=cyberpunk)
```

**뱀 애니메이션만 단독 사용:**
```markdown
![Snake](https://pixel-itprofile.vercel.app/api/snake?theme=matrix&speed=normal)
```

---

## 🎨 테마 미리보기

| 테마 | 설명 |
|------|------|
| `matrix` | 초록 터미널 (기본) |
| `cyberpunk` | 핑크+시안 사이버펑크 |
| `synthwave` | 보라+분홍 레트로 |
| `dracula` | 다크 드라큘라 |
| `nord` | 북유럽 블루 |
| `ocean` | 딥 오션 그린 |
| `hacker` | 순수 블랙+그린 |
| `neon` | 네온 사인 |
| `terminal` | 클래식 터미널 |

---

## ⚙️ 파라미터 전체 목록

### 🧑‍💻 IT 정체성 (핵심!)

| 파라미터 | 설명 | 예시 |
|---------|------|------|
| `name` | 표시 이름 | `김철수` |
| `role` | IT 역할/직군 | `PM`, `AI Engineer`, `Full Stack Dev` |
| `domains` | IT 도메인 태그 (쉼표 구분) | `AI,Enterprise,Agent,Blockchain` |
| `bio` | 한 줄 소개 | `관련없어보이는것들을연결하는사람` |

### 🎨 디자인

| 파라미터 | 설명 | 기본값 |
|---------|------|--------|
| `theme` | 색상 테마 | `matrix` |
| `layout` | 레이아웃 | `wide` / `compact` |
| `bg_color` | 배경색 override | (테마 기본값) |
| `accent_color` | 강조색 override | (테마 기본값) |
| `text_color` | 텍스트색 override | (테마 기본값) |
| `border_color` | 테두리색 override | (테마 기본값) |

### 🐍 뱀 애니메이션

| 파라미터 | 설명 | 옵션 |
|---------|------|------|
| `show_snake` | 뱀 표시 여부 | `true` / `false` |
| `snake_speed` | 뱀 이동 속도 | `slow` / `normal` / `fast` |
| `snake_color` | 뱀 몸 색 | CSS color |
| `food_color` | 먹이 색 | CSS color |

### 📊 GitHub 연동 (선택)

| 파라미터 | 설명 |
|---------|------|
| `username` | GitHub 유저명 (토큰 설정 시 아바타 + 통계 자동 fetch) |
| `show_avatar` | 아바타 표시 (기본: `true`) |
| `show_stats` | GitHub 통계 표시 (기본: `false`) |

---

## 💡 사용 예시

### PM · AI 기획자
```markdown
![Profile](https://pixel-itprofile.vercel.app/api/profile?name=김철수&role=PM&domains=AI,Enterprise,Agent,Voice,Blockchain&bio=관련없어보이는것들을연결하는사람&theme=cyberpunk)
```

### Frontend Developer
```markdown
![Profile](https://pixel-itprofile.vercel.app/api/profile?name=Jane&role=Frontend+Dev&domains=React,TypeScript,Next.js,Figma&bio=Pixel+by+pixel,+building+the+web&theme=synthwave)
```

### AI / ML Engineer
```markdown
![Profile](https://pixel-itprofile.vercel.app/api/profile?name=Alex&role=AI+Engineer&domains=PyTorch,LangChain,RAG,Vector+DB&bio=Making+machines+think&theme=matrix&snake_speed=fast)
```

### DevOps / Platform Engineer
```markdown
![Profile](https://pixel-itprofile.vercel.app/api/profile?name=Sam&role=DevOps&domains=Kubernetes,Terraform,AWS,GitOps&bio=Infrastructure+as+a+feeling&theme=ocean)
```

### GitHub 통계 포함 (토큰 필요)
```markdown
![Profile](https://pixel-itprofile.vercel.app/api/profile?username=yourname&role=Backend+Dev&domains=Go,PostgreSQL,Redis,gRPC&theme=nord&show_stats=true)
```

---

## 🚀 Vercel 배포 (내 서버로 운영하기)

남들에게 나만의 프로필 생성기를 제공하고 싶다면:

```bash
# 1. 이 레포 Fork 후 클론
git clone https://github.com/YOUR_USERNAME/pixel-itprofile

# 2. Vercel CLI로 배포
npx vercel deploy

# 3. (선택) GitHub 아바타/통계 사용 시 환경변수 설정
# Vercel 대시보드 → Settings → Environment Variables
GITHUB_TOKEN = ghp_your_personal_access_token
```

**GitHub Personal Access Token 생성:**
[https://github.com/settings/tokens](https://github.com/settings/tokens)
필요 권한: `read:user`, `repo`

---

## 🛠 로컬 개발

```bash
npm install
cp .env.example .env.local
# .env.local에 GITHUB_TOKEN 설정 (선택)

npm run dev
# http://localhost:3000
```

**API 테스트:**
```
http://localhost:3000/api/profile?name=테스트&role=PM&domains=AI,Agent,Blockchain&theme=cyberpunk
http://localhost:3000/api/snake?theme=matrix
```

---

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── api/
│   │   ├── profile/route.ts   # 메인 프로필 카드 API
│   │   └── snake/route.ts     # 뱀 단독 API
│   ├── page.tsx               # 데모/문서 페이지
│   └── layout.tsx
└── lib/
    ├── card.ts                # SVG 카드 생성기 (핵심)
    ├── themes.ts              # 9가지 테마 정의
    ├── github.ts              # GitHub API 연동
    └── types.ts               # TypeScript 타입
```

---

## 🤝 기여 / 새 테마 추가

`src/lib/themes.ts`에 새 테마를 추가해서 PR 주세요!

```typescript
my_theme: {
  bg: '#000000',
  bg2: '#111111',
  text: '#ffffff',
  accent: '#ff6600',
  subtext: '#666666',
  border: '#ff6600',
  badge: '#1a0a00',
  badgeText: '#ff6600',
  snake: '#ffaa00',
  snakeHead: '#ffdd00',
  food: '#ff0000',
},
```

---

<p align="center">
  Made with 🐍 and pixels
</p>
