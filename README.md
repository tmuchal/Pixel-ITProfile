<div align="center">

# 🐱 Pixel IT Profile

**픽셀 아트 고양이 방 GitHub 프로필 카드 생성기**

커밋 수가 아니라 **내가 어떤 IT인인지** 보여주는 카드.
방을 돌아다니는 주황 픽셀 고양이와 함께.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftmuchal%2FPixel-ITProfile)

</div>

---

## 미리보기

<div align="center">

**🗼 Paris**
![paris](https://raw.githubusercontent.com/tmuchal/Pixel-ITProfile/main/examples/cat-paris.svg)

**🏙️ Dubai**
![dubai](https://raw.githubusercontent.com/tmuchal/Pixel-ITProfile/main/examples/cat-dubai.svg)

**🍋 Italy**
![italy](https://raw.githubusercontent.com/tmuchal/Pixel-ITProfile/main/examples/cat-italy.svg)

</div>

---

## 사용법

### 1. Vercel에 배포

위 **Deploy** 버튼 클릭 → Vercel 계정으로 로그인 → 배포 완료

### 2. 내 GitHub README에 추가

```markdown
![Pixel IT Profile](https://your-app.vercel.app/api/cat?scene=paris&theme=cyberpunk)
```

`your-app.vercel.app` 부분을 배포된 내 Vercel 주소로 교체.

---

## 파라미터

### `/api/cat` — 고양이 방

| 파라미터 | 옵션 | 기본값 |
|---------|------|--------|
| `scene` | `paris` `dubai` `italy` `night` | `paris` |
| `theme` | `matrix` `cyberpunk` `synthwave` `ocean` `nord` `dracula` `tokyonight` `monokai` `hacker` `neon` `terminal` `retro` | `matrix` |
| `width` | 최대 `1200` | `800` |
| `height` | 최대 `300` | `150` |

### `/api/snake` — 뱀 애니메이션

<div align="center">

![snake](https://raw.githubusercontent.com/tmuchal/Pixel-ITProfile/main/examples/snake-cyberpunk.svg)

</div>

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
npm install
npm run dev
```

<div align="center">

Made with 🐱 by [@tmuchal](https://github.com/tmuchal)

</div>
