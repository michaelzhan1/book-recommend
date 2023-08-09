import Header from '@/components/Header'
import Books from '@/components/Books'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'


export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <>
      <div className="h-screen bg-gray-200">
        <Header username={session.user.username} />
        <Books username={session.user.username} />
      </div>
    </>
  )
}
