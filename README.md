<div align="center">

```
  ____  _          _   ___ _____   ____             __ _ _
 |  _ \(_)_  _____| | |_ _|_   _| |  _ \ _ __ ___ / _(_) | ___
 | |_) | \ \/ / _ \ |  | |  | |   | |_) | '__/ _ \ |_| | |/ _ \
 |  __/| |>  <  __/ |  | |  | |   |  __/| | | (_) |  _| | |  __/
 |_|   |_/_/\_\___|_| |___| |_|   |_|   |_|  \___/|_| |_|_|\___|
```

**픽셀 아트 IT 프로필 카드 생성기**
고양이가 사는 픽셀 아트 방 + 당신의 IT 정체성 🐱

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftmuchal%2FPixel-ITProfile)

</div>

---

## 🎬 미리보기

<div align="center">

### 프로필 카드

**UCHAL (tmuchal)** — PM · AI & Blockchain (`cyberpunk`)

![UCHAL Cyberpunk](https://raw.githubusercontent.com/tmuchal/Pixel-ITProfile/main/examples/tmuchal-cyberpunk.svg)

**PM · AI 전략가** (`cyberpunk`)

![PM Cyberpunk](https://raw.githubusercontent.com/tmuchal/Pixel-ITProfile/main/examples/pm-cyberpunk.svg)

**AI Engineer** (`matrix`)

![AI Matrix](https://raw.githubusercontent.com/tmuchal/Pixel-ITProfile/main/examples/ai-matrix.svg)

**Frontend Dev** (`synthwave`)

![Frontend Synthwave](https://raw.githubusercontent.com/tmuchal/Pixel-ITProfile/main/examples/frontend-synthwave.svg)

**Full Stack Dev** (`tokyonight`)

![Fullstack TokyoNight](https://raw.githubusercontent.com/tmuchal/Pixel-ITProfile/main/examples/fullstack-tokyonight.svg)

**DevOps** (`ocean`)

![DevOps Ocean](https://raw.githubusercontent.com/tmuchal/Pixel-ITProfile/main/examples/devops-ocean.svg)

---

### 🐱 고양이 방 — 창문 씬 (scene)

**`dubai`** — 노을 하늘 + 부르즈 할리파 실루엣 + 사막 모래언덕

![Cat Dubai](https://raw.githubusercontent.com/tmuchal/Pixel-ITProfile/main/examples/cat-dubai.svg)

**`italy`** — 지중해 파란 하늘 + 태양 + 아말피 알록달록 건물 + 바다

![Cat Italy](https://raw.githubusercontent.com/tmuchal/Pixel-ITProfile/main/examples/cat-italy.svg)

**`aurora`** — 어두운 밤 + 초록/보라 오로라 + 눈덮인 산 + 소나무

![Cat Aurora](https://raw.githubusercontent.com/tmuchal/Pixel-ITProfile/main/examples/cat-aurora.svg)

**`matrix`** — 클래식 그린 터미널

![Cat Matrix](https://raw.githubusercontent.com/tmuchal/Pixel-ITProfile/main/examples/cat-matrix.svg)

**`cyberpunk`** — 핫핑크 + 사이안

![Cat Cyberpunk](https://raw.githubusercontent.com/tmuchal/Pixel-ITProfile/main/examples/cat-cyberpunk.svg)

**`synthwave`** — 레트로 보라 + 분홍

![Cat Synthwave](https://raw.githubusercontent.com/tmuchal/Pixel-ITProfile/main/examples/cat-synthwave.svg)

**`tokyonight`** — VS Code 인기 테마

![Cat TokyoNight](https://raw.githubusercontent.com/tmuchal/Pixel-ITProfile/main/examples/cat-tokyonight.svg)

</div>

---

> **왜 만들었냐?**
> [pixel-profile](https://github.com/LuciNyan/pixel-profile) 은 GitHub 통계 숫자만 보여줌.
> 커밋 수가 적은 PM, 기획자, AI 도메인 전문가에게는 의미없는 숫자들.
> **당신이 어떤 IT인인지**를 보여주는 카드가 필요했다.
> 거기에 + 타마고치처럼 방을 돌아다니는 픽셀 고양이.

---

## ✨ 특징

| | |
|---|---|
| 🎭 **IT 정체성 중심** | 역할(PM / AI Engineer / DevOps) + 도메인 태그 |
| 🐱 **픽셀 고양이 방** | 타마고치처럼 걷고, 모니터 앞에 앉고, 자는 고양이 |
| 🌍 **4가지 창문 씬** | dubai / italy / aurora / night — 방 밖 풍경 선택 |
| ✨ **SVG 네온 글로우** | `<feGaussianBlur>` 필터로 실제 CRT/네온 느낌 |
| ⌨️ **타이핑 애니메이션** | SVG SMIL `<animate>` clip-path reveal로 이름이 타이핑되며 등장 |
| 📊 **GitHub 통계** | 토큰 있을 때 선택 표시, 없어도 완전 동작 |
| 🎨 **12가지 테마** | matrix / cyberpunk / synthwave / tokyonight / monokai... |
| 🇰🇷 **한글 지원** | 한글 이름·소개 완전 지원 |
| ⚡ **Edge Runtime** | Vercel Edge로 전세계 빠른 응답 |

---

## 🚀 30초 시작

**GitHub `README.md`에 한 줄만 붙여넣으면 됩니다:**

```markdown
![고양이 방](https://raw.githubusercontent.com/tmuchal/Pixel-ITProfile/main/examples/cat-matrix.svg)
```

**창문 씬 바꾸기 (`scene` 파라미터, Vercel 배포 시):**

```markdown
![Cat Dubai](https://YOUR-APP.vercel.app/api/cat?scene=dubai)
![Cat Italy](https://YOUR-APP.vercel.app/api/cat?scene=italy)
![Cat Aurora](https://YOUR-APP.vercel.app/api/cat?scene=aurora)
```

**프로필 카드 전체 (Vercel 배포 시):**

```markdown
![My IT Profile](https://YOUR-APP.vercel.app/api/profile?name=김철수&role=PM&domains=AI,Enterprise,Agent,Voice,Blockchain&bio=관련없어보이는것들을연결하는사람&theme=cyberpunk)
```

---

## ⚙️ 파라미터 전체 목록

### 🧑‍💻 IT 정체성 (핵심)

| 파라미터 | 설명 | 예시 |
|---------|------|------|
| `name` | 표시 이름 | `김철수` |
| `username` | GitHub 유저명 (아바타 자동 fetch) | `yourname` |
| `role` | IT 역할/직군 | `PM`, `AI Engineer`, `Full Stack Dev` |
| `domains` | IT 도메인 태그 (쉼표 구분, 최대 8개) | `AI,Enterprise,Agent,Blockchain` |
| `bio` | 한 줄 소개 | `관련없어보이는것들을연결하는사람` |

### 🐱 고양이 방 (`/api/cat`)

| 파라미터 | 설명 | 기본값 |
|---------|------|--------|
| `theme` | 방 액센트 색상 | `matrix` |
| `scene` | 창문 배경 장면 | `night` |
| `width` | 가로 크기 (px) | `800` |
| `height` | 세로 크기 (px) | `200` |
| `show_cat` | 프로필 카드 고양이 방 표시 여부 | `true` |

**`scene` 옵션:**

| scene | 설명 |
|-------|------|
| `night` | 달빛 + 별 (기본) |
| `dubai` | 노을 + 부르즈 할리파 + 사막 |
| `italy` | 지중해 + 아말피 해안 마을 |
| `aurora` | 오로라 + 설산 + 소나무 |

### 🎨 디자인

| 파라미터 | 설명 | 기본값 |
|---------|------|--------|
| `theme` | 색상 테마 | `matrix` |
| `layout` | `wide` (800px) / `compact` (600px) | `wide` |
| `bg_color` | 배경색 override | 테마 기본값 |
| `accent_color` | 강조색 override | 테마 기본값 |
| `border_color` | 테두리색 override | 테마 기본값 |
| `text_color` | 텍스트색 override | 테마 기본값 |

### 📊 GitHub 연동 (선택)

| 파라미터 | 설명 |
|---------|------|
| `show_stats` | GitHub 통계 표시 (기본 `false`, 토큰 필요) |
| `show_avatar` | 아바타 표시 (기본 `true`) |

---

## 🎨 테마 갤러리

| 테마 | 설명 |
|------|------|
| `matrix` | 클래식 그린 터미널 |
| `cyberpunk` | 핫핑크 + 사이안 |
| `synthwave` | 레트로 보라 + 분홍 |
| `tokyonight` | VS Code 인기 테마 |
| `dracula` | 다크 드라큘라 |
| `monokai` | 웜 에디터 테마 |
| `ocean` | 딥 오션 청록 |
| `nord` | 북유럽 블루 |
| `terminal` | 앰버 레트로 터미널 |
| `hacker` | 순수 블랙 + 그린 |
| `neon` | 사이안 + 마젠타 |
| `retro` | CRT 호박색 |

---

## 💡 예시 모음

### PM · AI 전략가
```markdown
![Profile](https://pixel-itprofile.vercel.app/api/profile?name=김철수&role=PM&domains=AI,Enterprise,Agent,Voice,Blockchain&bio=관련없어보이는것들을연결하는사람&theme=cyberpunk)
```

### Frontend Developer
```markdown
![Profile](https://pixel-itprofile.vercel.app/api/profile?name=Jane&role=Frontend+Dev&domains=React,TypeScript,Next.js,Figma&bio=Pixel+by+pixel+building+the+web&theme=synthwave)
```

### AI / ML Engineer
```markdown
![Profile](https://pixel-itprofile.vercel.app/api/profile?name=Alex&role=AI+Engineer&domains=PyTorch,LangChain,RAG,Vector+DB&bio=Making+machines+think&theme=matrix)
```

### DevOps / Platform Engineer
```markdown
![Profile](https://pixel-itprofile.vercel.app/api/profile?name=Sam&role=DevOps&domains=Kubernetes,Terraform,AWS,GitOps&bio=Infrastructure+as+a+feeling&theme=ocean)
```

### GitHub 통계 포함 (토큰 필요)
```markdown
![Profile](https://pixel-itprofile.vercel.app/api/profile?username=yourname&role=Backend+Dev&domains=Go,PostgreSQL,Redis,gRPC&theme=tokyonight&show_stats=true)
```

---

## 🚀 내 서버에 배포하기

### Vercel (권장)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftmuchal%2FPixel-ITProfile)

1. 위 버튼 클릭 → Vercel에 Fork + 자동 배포
2. *(선택)* 아바타·통계 사용 시 환경변수 추가:
   - Vercel Dashboard → Settings → Environment Variables
   - `GITHUB_TOKEN` = `ghp_your_token_here`
3. 배포 URL로 README에 사용:
   ```
   https://YOUR-APP.vercel.app/api/profile?...
   ```

**GitHub Personal Access Token 생성:**
[github.com/settings/tokens](https://github.com/settings/tokens) → `read:user`, `repo` 권한

### Docker

```bash
docker build -t pixel-itprofile .
docker run -p 3000:3000 -e GITHUB_TOKEN=ghp_xxx pixel-itprofile
```

---

## 🤖 GitHub Actions 자동 업데이트

매일 프로필 카드를 자동 생성해서 레포에 저장 → README에서 로컬 파일 참조:

```markdown
![My Profile](./profile-card.svg)
![Snake](./snake.svg)
```

`.github/workflows/update-profile.yml`이 이미 포함되어 있습니다.

**설정:**
1. 레포 Settings → Secrets → `PIXEL_ITPROFILE_URL` 추가
   ```
   https://YOUR-APP.vercel.app/api/profile?name=김철수&theme=cyberpunk&...
   ```
2. 매일 자정 자동 실행 + Actions 탭에서 수동 트리거 가능

---

## 🛠 로컬 개발

```bash
git clone https://github.com/tmuchal/Pixel-ITProfile
cd Pixel-ITProfile
npm install
cp .env.example .env.local
npm run dev
```

테스트:
```
http://localhost:3000                     ← 인터랙티브 데모 페이지
http://localhost:3000/api/cat?theme=matrix&scene=dubai
http://localhost:3000/api/profile?name=테스트&role=PM&domains=AI,Agent&theme=cyberpunk
```

---

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── api/
│   │   ├── profile/route.ts   ← 메인 프로필 카드 (SVG)
│   │   └── cat/route.ts       ← 고양이 방 단독 (SVG)
│   ├── demo-client.tsx        ← 인터랙티브 데모 (React 클라이언트)
│   ├── page.tsx
│   └── layout.tsx
└── lib/
    ├── buildCatRoom.ts        ← 픽셀 아트 고양이 방 + 씬 생성기 ★ 핵심
    ├── card.ts                ← SVG 카드 생성기
    ├── themes.ts              ← 12가지 테마 정의
    ├── github.ts              ← GitHub GraphQL API
    └── types.ts               ← TypeScript 타입
```

---

## 🤝 새 테마 추가 PR 환영

`src/lib/themes.ts`에 테마 추가 후 PR 보내주세요:

```typescript
my_theme: {
  bg: '#000000',
  bg2: '#111111',
  text: '#ffffff',
  accent: '#ff6600',
  subtext: '#888888',
  border: '#ff6600',
  badge: '#1a0a00',
  badgeText: '#ff6600',
  cat: '#ff8c3a',
},
```

---

<div align="center">

Made with 🐱 pixels and too much caffeine

Inspired by [pixel-profile](https://github.com/LuciNyan/pixel-profile)

</div>
