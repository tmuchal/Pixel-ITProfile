<div align="center">

# 🐱 Pixel IT Profile

**픽셀 아트 고양이 방 프로필 카드 생성기**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftmuchal%2FPixel-ITProfile)

</div>

---

## 미리보기

<div align="center">

**dubai** — 노을 하늘 + 부르즈 할리파 실루엣 + 사막 모래언덕

![Cat Dubai](https://raw.githubusercontent.com/tmuchal/Pixel-ITProfile/main/examples/cat-dubai.svg)

**italy** — 지중해 파란 하늘 + 태양 + 아말피 알록달록 건물 + 바다

![Cat Italy](https://raw.githubusercontent.com/tmuchal/Pixel-ITProfile/main/examples/cat-italy.svg)

**aurora** — 어두운 밤 + 초록/보라 오로라 + 눈덮인 산 + 소나무

![Cat Aurora](https://raw.githubusercontent.com/tmuchal/Pixel-ITProfile/main/examples/cat-aurora.svg)

</div>

---

## 사용법

**GitHub README에 붙여넣기:**

```markdown
![Cat Dubai](https://raw.githubusercontent.com/tmuchal/Pixel-ITProfile/main/examples/cat-dubai.svg)
![Cat Italy](https://raw.githubusercontent.com/tmuchal/Pixel-ITProfile/main/examples/cat-italy.svg)
![Cat Aurora](https://raw.githubusercontent.com/tmuchal/Pixel-ITProfile/main/examples/cat-aurora.svg)
```

**직접 배포 후 씬 파라미터 사용:**

```
https://YOUR-APP.vercel.app/api/cat?scene=dubai
https://YOUR-APP.vercel.app/api/cat?scene=italy
https://YOUR-APP.vercel.app/api/cat?scene=aurora
```

---

## 파라미터

| 파라미터 | 설명 | 기본값 |
|---------|------|--------|
| `scene` | 창문 씬 (`dubai` / `italy` / `aurora` / `night`) | `night` |
| `theme` | 색상 테마 (`matrix` / `cyberpunk` / `synthwave` / ...) | `matrix` |
| `width` | 가로 크기 (px) | `800` |
| `height` | 세로 크기 (px) | `200` |

---

## 배포

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftmuchal%2FPixel-ITProfile)

```bash
git clone https://github.com/tmuchal/Pixel-ITProfile
npm install && npm run dev
```

<div align="center">

Made with 🐱 pixels

</div>
