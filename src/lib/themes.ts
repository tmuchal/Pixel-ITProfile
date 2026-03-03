import type { Theme, ThemeName } from './types'

export const themes: Record<ThemeName, Theme> = {
  // Classic green terminal
  matrix: {
    bg: '#0d0d0d',
    bg2: '#0a150a',
    text: '#00ff41',
    accent: '#00ff41',
    subtext: '#2d7a2d',
    border: '#00ff41',
    badge: '#001a00',
    badgeText: '#00ff41',
    snake: '#00cc33',
    snakeHead: '#00ff88',
    food: '#ffff00',
  },

  // Dark + purple (Dracula)
  dracula: {
    bg: '#282a36',
    bg2: '#21222c',
    text: '#f8f8f2',
    accent: '#bd93f9',
    subtext: '#6272a4',
    border: '#bd93f9',
    badge: '#44475a',
    badgeText: '#f8f8f2',
    snake: '#50fa7b',
    snakeHead: '#8be9fd',
    food: '#ffb86c',
  },

  // Hot pink + cyan cyberpunk
  cyberpunk: {
    bg: '#0a0a0f',
    bg2: '#10101a',
    text: '#ffffff',
    accent: '#ff2d78',
    subtext: '#9999aa',
    border: '#ff2d78',
    badge: '#1a0a1a',
    badgeText: '#ff2d78',
    snake: '#00e5ff',
    snakeHead: '#ff2d78',
    food: '#ffff00',
  },

  // Purple retrowave
  synthwave: {
    bg: '#1a0a2e',
    bg2: '#16213e',
    text: '#e0aaff',
    accent: '#ff6b9d',
    subtext: '#9b72cc',
    border: '#c77dff',
    badge: '#240046',
    badgeText: '#e0aaff',
    snake: '#f72585',
    snakeHead: '#4cc9f0',
    food: '#7bf1a8',
  },

  // Cool blue Nord
  nord: {
    bg: '#2e3440',
    bg2: '#3b4252',
    text: '#eceff4',
    accent: '#88c0d0',
    subtext: '#7b88a0',
    border: '#88c0d0',
    badge: '#434c5e',
    badgeText: '#eceff4',
    snake: '#a3be8c',
    snakeHead: '#88c0d0',
    food: '#ebcb8b',
  },

  // Classic amber terminal
  terminal: {
    bg: '#1a1a1a',
    bg2: '#0d0d0d',
    text: '#e0e0e0',
    accent: '#ffcc00',
    subtext: '#888888',
    border: '#ffcc00',
    badge: '#2a2a2a',
    badgeText: '#ffcc00',
    snake: '#66ff66',
    snakeHead: '#ffcc00',
    food: '#ff6666',
  },

  // Deep ocean teal
  ocean: {
    bg: '#0a192f',
    bg2: '#112240',
    text: '#ccd6f6',
    accent: '#64ffda',
    subtext: '#8892b0',
    border: '#64ffda',
    badge: '#172a45',
    badgeText: '#64ffda',
    snake: '#64ffda',
    snakeHead: '#a8edea',
    food: '#ffd700',
  },

  // Pure black + green hacker
  hacker: {
    bg: '#000000',
    bg2: '#050505',
    text: '#33ff33',
    accent: '#00ff00',
    subtext: '#448844',
    border: '#00ff00',
    badge: '#001100',
    badgeText: '#00ff00',
    snake: '#00ff00',
    snakeHead: '#88ff88',
    food: '#ff0000',
  },

  // Neon cyan + magenta
  neon: {
    bg: '#0a0a0a',
    bg2: '#111118',
    text: '#ffffff',
    accent: '#00ffff',
    subtext: '#888899',
    border: '#ff00ff',
    badge: '#1a001a',
    badgeText: '#ff00ff',
    snake: '#00ffff',
    snakeHead: '#ff00ff',
    food: '#ffff00',
  },

  // Popular Tokyo Night (VS Code theme)
  tokyonight: {
    bg: '#1a1b26',
    bg2: '#16161e',
    text: '#c0caf5',
    accent: '#7aa2f7',
    subtext: '#565f89',
    border: '#7aa2f7',
    badge: '#24283b',
    badgeText: '#c0caf5',
    snake: '#9ece6a',
    snakeHead: '#7dcfff',
    food: '#ff9e64',
  },

  // Warm Monokai
  monokai: {
    bg: '#272822',
    bg2: '#1e1f1c',
    text: '#f8f8f2',
    accent: '#a6e22e',
    subtext: '#75715e',
    border: '#a6e22e',
    badge: '#3e3d32',
    badgeText: '#f8f8f2',
    snake: '#66d9e8',
    snakeHead: '#f92672',
    food: '#e6db74',
  },

  // Retro amber CRT
  retro: {
    bg: '#1a0f00',
    bg2: '#140b00',
    text: '#ffb000',
    accent: '#ff8c00',
    subtext: '#804800',
    border: '#ff8c00',
    badge: '#2a1800',
    badgeText: '#ffb000',
    snake: '#ff6600',
    snakeHead: '#ffcc00',
    food: '#ffffff',
  },
}

export function getTheme(name?: string): Theme {
  return themes[(name as ThemeName) ?? 'matrix'] ?? themes.matrix
}
