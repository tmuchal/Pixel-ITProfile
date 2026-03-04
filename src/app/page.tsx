import DemoClient from './demo-client'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://pixel-itprofile.vercel.app'

export default function Home() {
  return <DemoClient baseUrl={BASE_URL} />
}
