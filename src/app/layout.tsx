import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pixel IT Profile — 픽셀 아트 IT 프로필 카드',
  description: '픽셀 아트 스타일의 IT 프로필 카드 생성기. 역할, 도메인, 기술을 뱀 애니메이션과 함께 멋지게 표현하세요.',
  keywords: ['pixel art', 'github profile', 'IT profile', 'readme card', 'snake animation'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, padding: 0, fontFamily: "'Courier New', monospace", backgroundColor: '#0d0d0d', color: '#00ff41' }}>
        {children}
      </body>
    </html>
  )
}
