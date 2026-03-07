/**
 * 예제 SVG 파일 생성 스크립트
 * Usage: node scripts/generate-examples.mjs
 */

import { writeFileSync, unlinkSync } from 'fs'
import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const distFile = path.join(root, '.gen-tmp.cjs')
const entryFile = path.join(root, '.gen-entry.ts')

import { writeFileSync as writeFS } from 'fs'
writeFS(entryFile, `export { buildCatRoomContent } from './src/lib/buildCatRoom'\nexport { themes } from './src/lib/themes'\nexport { generateProfileCard } from './src/lib/card'\n`)

execSync(
  `npx esbuild ${entryFile} --bundle --platform=node --format=cjs --outfile=${distFile}`,
  { cwd: root, stdio: 'inherit' }
)

const mod = await import(distFile)
const { buildCatRoomContent, themes, generateProfileCard } = mod

// ── Cat-room only examples ──────────────────────────────────────────────────
const CAT_EXAMPLES = [
  { file: 'cat-dubai.svg',    scene: 'dubai',  accent: '#d4a020' },
  { file: 'cat-italy.svg',    scene: 'italy',  accent: '#2277cc' },
  { file: 'cat-aurora.svg',   scene: 'aurora', accent: '#40ff80' },
]

for (const ex of CAT_EXAMPLES) {
  const w = 800, h = 200
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
${buildCatRoomContent(w, h, ex.accent, ex.scene)}
</svg>`
  writeFileSync(path.join(root, 'examples', ex.file), svg, 'utf8')
  console.log(`✅ ${ex.file}`)
}

// ── Full profile card examples ───────────────────────────────────────────────
const PROFILE_EXAMPLES = [
  {
    file: 'tmuchal-cyberpunk.svg',
    options: {
      name: 'UCHAL',
      role: 'PM · AI & Blockchain',
      domains: 'AI,Enterprise,Agent,Voice,Blockchain',
      bio: '관련없어보이는것들을연결하는사람',
      theme: 'cyberpunk',
    },
  },
  {
    file: 'pm-cyberpunk.svg',
    options: {
      name: '김철수',
      role: 'PM · AI 전략가',
      domains: 'AI,Enterprise,Agent,Voice,Blockchain',
      bio: '관련없어보이는것들을연결하는사람',
      theme: 'cyberpunk',
    },
  },
  {
    file: 'ai-matrix.svg',
    options: {
      name: 'Alex',
      role: 'AI Engineer',
      domains: 'PyTorch,LangChain,RAG,Vector DB',
      bio: 'Making machines think',
      theme: 'matrix',
    },
  },
  {
    file: 'frontend-synthwave.svg',
    options: {
      name: 'Jane',
      role: 'Frontend Dev',
      domains: 'React,TypeScript,Next.js,Figma',
      bio: 'Pixel by pixel building the web',
      theme: 'synthwave',
    },
  },
  {
    file: 'fullstack-tokyonight.svg',
    options: {
      name: 'Park Junho',
      role: 'Fullstack Engineer',
      domains: 'Node.js,PostgreSQL,Docker,AWS',
      bio: '풀스택은 외로운 직업입니다',
      theme: 'tokyonight',
    },
  },
  {
    file: 'devops-ocean.svg',
    options: {
      name: 'Lee Minho',
      role: 'DevOps / SRE',
      domains: 'Kubernetes,Terraform,Prometheus,ArgoCD',
      bio: '인프라가 코드가 되는 세상',
      theme: 'ocean',
    },
  },
]

for (const ex of PROFILE_EXAMPLES) {
  const svg = generateProfileCard(ex.options)
  writeFileSync(path.join(root, 'examples', ex.file), svg, 'utf8')
  console.log(`✅ ${ex.file}`)
}

try { unlinkSync(distFile) } catch {}
try { unlinkSync(entryFile) } catch {}
console.log('\n완료! examples/ 폴더를 확인하세요.')
