'use'


import LoginForm from '@/components/LoginForm'
import RegisterLink from '@/components/RegisterLink'
import GoogleLoginButton from '@/components/GoogleLoginButton'
import { SessionProvider } from 'next-auth/react'


export default function Home() {
  return (
    <>
      <LoginForm />
      <RegisterLink />
      <GoogleLoginButton />
    </>
  )
}