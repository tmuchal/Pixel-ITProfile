/**
 * 예제 SVG 파일 생성 스크립트
 * Usage: node scripts/generate-examples.mjs
 */

import { writeFileSync } from 'fs'
import { createRequire } from 'module'
import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

// TypeScript를 일시적으로 컴파일해서 사용
const distFile = path.join(root, '.gen-tmp.cjs')

execSync(`npx esbuild src/lib/buildCatRoom.ts src/lib/themes.ts src/lib/card.ts src/lib/types.ts --bundle --platform=node --format=cjs --outfile=${distFile}`, {
  cwd: root,
  stdio: 'inherit'
})

const { buildCatRoomContent } = await import(distFile)
const { themes } = await import(distFile)

const EXAMPLES = [
  { file: 'cat-matrix.svg',     theme: 'matrix',     w: 800, h: 200, type: 'cat' },
  { file: 'cat-cyberpunk.svg',  theme: 'cyberpunk',  w: 800, h: 200, type: 'cat' },
  { file: 'cat-synthwave.svg',  theme: 'synthwave',  w: 800, h: 200, type: 'cat' },
  { file: 'cat-tokyonight.svg', theme: 'tokyonight', w: 800, h: 200, type: 'cat' },
]

for (const ex of EXAMPLES) {
  const t = themes[ex.theme]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${ex.w}" height="${ex.h}" viewBox="0 0 ${ex.w} ${ex.h}">
${buildCatRoomContent(ex.w, ex.h, t.accent)}
</svg>`
  const outPath = path.join(root, 'examples', ex.file)
  writeFileSync(outPath, svg, 'utf8')
  console.log(`✅ ${ex.file} 생성됨`)
}

// 임시 파일 삭제
import { unlinkSync } from 'fs'
try { unlinkSync(distFile) } catch {}

console.log('\n완료! examples/ 폴더를 확인하세요.')
