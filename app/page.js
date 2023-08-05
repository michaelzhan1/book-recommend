import LogoutButton from '@/components/LogoutButton'
import DisplayUsername from '@/components/DisplayUsername'
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
      <DisplayUsername username={session.user.username} />
      <LogoutButton />
    </>
  )
}
