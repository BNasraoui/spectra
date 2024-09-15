import dynamic from 'next/dynamic'

const DynamicHomePage = dynamic(() => import('@/components/HomePage'), {
  ssr: false,
  loading: () => <p>Loading...</p>
})

export default function Home() {
  return <DynamicHomePage />
}