import LoginForm from '@/components/LoginForm'
import RegisterLink from '@/components/RegisterLink'
import GoogleLoginButton from '@/components/GoogleLoginButton'


export default function Home() {
  return (
    <>
      <LoginForm />
      <RegisterLink />
      <GoogleLoginButton />
    </>
  )
}