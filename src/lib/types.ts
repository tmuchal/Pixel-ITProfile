export type ThemeName =
  | 'matrix'
  | 'dracula'
  | 'cyberpunk'
  | 'synthwave'
  | 'nord'
  | 'terminal'
  | 'ocean'
  | 'hacker'
  | 'neon'
  | 'tokyonight'
  | 'monokai'
  | 'retro'

export interface Theme {
  bg: string
  bg2: string
  text: string
  accent: string
  subtext: string
  border: string
  badge: string
  badgeText: string
  snake: string
  snakeHead: string
  food: string
}

export type SnakeSpeed = 'slow' | 'normal' | 'fast'
export type LayoutType = 'wide' | 'compact'

export interface ProfileOptions {
  // IT Identity (핵심!)
  username?: string
  name?: string
  role?: string                   // e.g. "PM", "Frontend Dev", "AI Engineer"
  domains?: string                // e.g. "AI,Enterprise,Agent,Voice,Blockchain"
  bio?: string                    // 한 줄 소개
  slogan?: string                 // 한 줄 슬로건 예: "관련 없어 보이는 것들을 연결하는 사람"

  // Appearance
  theme?: ThemeName
  bg_color?: string
  text_color?: string
  accent_color?: string
  border_color?: string

  // Layout
  width?: number
  layout?: LayoutType

  // Sections
  show_avatar?: boolean           // default: true
  show_domains?: boolean          // default: true
  show_stats?: boolean            // default: false (optional GitHub stats)
  show_snake?: boolean            // default: true

  // Snake options
  snake_color?: string
  snake_speed?: SnakeSpeed
  food_color?: string

  // Social links (optional)
  github?: string
  twitter?: string
  linkedin?: string
  website?: string
}

export interface GithubStats {
  name: string
  username: string
  avatarUrl: string
  followers: number
  totalStars: number
  totalCommits: number
  totalPRs: number
  totalIssues: number
  contributedTo: number
}

export interface CardDimensions {
  width: number
  height: number
  padding: number
}
