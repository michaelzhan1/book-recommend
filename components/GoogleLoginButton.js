'use client'

import { signIn } from "next-auth/react"


// expand functionality to add email as username into database so that it can be used to reference books later
export default function GoogleLoginButton() {
  return (
    <div className="text-center">
      <button onClick={ () => signIn('google', {callbackUrl: `${window.location.origin}/`}) } className="bg-blue-500 hover:bg-blue-700 font-bold text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign in with Google</button>
    </div>
  )
}