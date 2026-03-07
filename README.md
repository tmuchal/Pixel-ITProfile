<div align="center">

# 🐱 Pixel IT Profile

**픽셀 아트 고양이 방 GitHub 프로필 카드**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftmuchal%2FPixel-ITProfile)

</div>

---

## 만든 이유

숫자만 보여주는 GitHub stats는 PM이나 기획자한테 의미없다.
**커밋 수가 아니라 내가 어떤 IT인인지** 보여주는 카드가 필요했다.
거기에 방을 돌아다니는 주황 픽셀 고양이.

---

## 만든 사람

<div align="center">

**UCHAL** ([@tmuchal](https://github.com/tmuchal))
PM · AI & Blockchain

![Cat Room](https://pixel-itprofile.vercel.app/api/cat?scene=paris&theme=cyberpunk)

</div>

---

## 씬 미리보기

**paris** — cyberpunk
![paris](https://pixel-itprofile.vercel.app/api/cat?scene=paris&theme=cyberpunk)

**dubai** — sunset
![dubai](https://pixel-itprofile.vercel.app/api/cat?scene=dubai&theme=sunset)

**night** — dracula
![night](https://pixel-itprofile.vercel.app/api/cat?scene=night&theme=dracula)

<div align="center">

![dubai](https://raw.githubusercontent.com/tmuchal/Pixel-ITProfile/main/examples/cat-dubai.svg)
![italy](https://raw.githubusercontent.com/tmuchal/Pixel-ITProfile/main/examples/cat-italy.svg)

</div>

---

## GitHub README에 넣는 법

### 1. Vercel 배포

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftmuchal%2FPixel-ITProfile)

### 2. 내 README에 붙여넣기

```markdown
![Pixel IT Profile](https://your-app.vercel.app/api/cat?scene=paris&theme=cyberpunk)
```

---

## 파라미터

### `/api/cat` — 고양이 방

| 파라미터 | 옵션 | 기본값 |
|---------|------|--------|
| `scene` | `dubai` `italy` `paris` `night` | `paris` |
| `theme` | `matrix` `cyberpunk` `synthwave` `ocean` `nord` `dracula` `tokyonight` `monokai` `hacker` `neon` `terminal` `retro` | `matrix` |
| `width` | 최대 `1200` | `800` |
| `height` | 최대 `300` | `150` |

### `/api/snake` — 뱀 애니메이션

```markdown
![Snake](https://your-app.vercel.app/api/snake?theme=matrix)
```

| 파라미터 | 옵션 | 기본값 |
|---------|------|--------|
| `theme` | 위 테마 목록과 동일 | `matrix` |
| `speed` | `slow` `normal` `fast` | `normal` |
| `width` | 최대 `1200` | `800` |
| `height` | 최대 `200` | `60` |

---

## 로컬 실행

```bash
git clone https://github.com/tmuchal/Pixel-ITProfile
npm install && npm run dev
```

<div align="center">

Made with 🐱 by UCHAL

</div>
