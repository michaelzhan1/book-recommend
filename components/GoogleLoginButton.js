'use client'

import GoogleButton from "react-google-button"
import { signIn, useSession } from "next-auth/react"


// expand functionality to add email as username into database so that it can be used to reference books later
export default function GoogleLoginButton() {
  return (
    <GoogleButton onClick={ () => signIn('google', {callbackUrl: `${window.location.origin}/`}) } />
  )
}