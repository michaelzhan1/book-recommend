import LoginForm from '@/components/LoginForm'
import GoogleLoginButton from '@/components/GoogleLoginButton'


export default function Home() {
  return (
    <>
      <div className='flex flex-col h-screen justify-center items-center bg-gray-200'>
        <div className='flex flex-col items-center mb-4 text-center'>
          <h1 className='text-5xl font-bold text-gray-700 mb-2 md:w-3/5 xs:w-full leading-snug'>Log in to see your bookshelf</h1>
        </div>
        <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <LoginForm />
          <hr className='h-px mb-4 bg-gray-400 border-0'/>
          <GoogleLoginButton />
        </div>
      </div>
    </>
  )
}