<div align="center">

# 🐱 Pixel IT Profile

**GitHub README에 붙이는 픽셀 아트 고양이 방 IT 프로필 카드**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftmuchal%2FPixel-ITProfile)

</div>

---

## 미리보기

| 씬 | 설명 |
|---|---|
| **dubai** | 노을 하늘 + 부르즈 할리파 실루엣 + 사막 모래언덕 |
| **italy** | 지중해 파란 하늘 + 태양 + 아말피 알록달록 건물 + 바다 |
| **paris** | 밝은 파리 하늘 + 에펠탑 + 센강 + 오스만 건물 |
| **night** | 별밤 + 달 + 도시 야경 (기본값) |

> 고양이는 Pusheen 스타일 주황색 픽셀 아트. 걷기 → 코딩 → 커피 → TV → 수면 40초 루프 애니메이션.

---

## GitHub README에 추가하는 법

### 1단계 — Vercel에 배포

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftmuchal%2FPixel-ITProfile)

버튼 누르고 배포하면 `https://your-app.vercel.app` 주소가 생긴다.

### 2단계 — 내 GitHub README에 붙여넣기

```markdown
![Pixel IT Profile](https://your-app.vercel.app/api/cat?scene=paris&theme=matrix)
```

원하는 씬/테마로 바꿔서 붙이면 끝.

---

## 파라미터

| 파라미터 | 옵션 | 기본값 | 설명 |
|---------|------|--------|------|
| `scene` | `dubai` `italy` `paris` `night` | `night` | 창문 배경 씬 |
| `theme` | 아래 목록 참고 | `matrix` | 모니터/키보드 포인트 컬러 |
| `width` | 최대 `1200` | `800` | 카드 가로 크기 (px) |
| `height` | 최대 `300` | `150` | 카드 세로 크기 (px) |

### 테마 목록

| 테마명 | 포인트 컬러 |
|--------|------------|
| `matrix` | 초록 (#00ff41) |
| `cyberpunk` | 노랑 (#f0e040) |
| `synthwave` | 핑크 (#ff2d78) |
| `ocean` | 청록 (#00c8ff) |
| `sunset` | 주황 (#ff6020) |
| `nord` | 연파랑 (#88c0d0) |
| `dracula` | 보라 (#bd93f9) |
| `solarized` | 초록 (#859900) |

---

## URL 예시

```
# 파리 씬, 매트릭스 테마 (기본)
https://your-app.vercel.app/api/cat?scene=paris&theme=matrix

# 두바이 씬, 사이버펑크 테마
https://your-app.vercel.app/api/cat?scene=dubai&theme=cyberpunk

# 이탈리아 씬, 오션 테마, 넓게
https://your-app.vercel.app/api/cat?scene=italy&theme=ocean&width=1000&height=200

# 야경 씬, 드라큘라 테마
https://your-app.vercel.app/api/cat?scene=night&theme=dracula
```

---

## 로컬 실행

```bash
git clone https://github.com/tmuchal/Pixel-ITProfile
npm install
npm run dev
# http://localhost:3000 에서 확인
```

---

## GitHub Actions 자동 업데이트 (선택)

`.github/workflows/update-profile.yml` 파일이 있으면 매일 자동으로 README 이미지를 갱신한다. Vercel 배포 URL만 있으면 별도 설정 없이 동작.

---

<div align="center">
Made with 🐱 orange pixels
</div>
