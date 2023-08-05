'use client'

import GoogleButton from "react-google-button"
import { signIn, useSession } from "next-auth/react"


async function googleLogin (e) {
  signIn('google', {callbackUrl: `${window.location.origin}/`})
  const { data: session } = useSession()
  console.log(session)
  const response = await fetch('/api/auth/googleLogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: session.user.email
    })
  })
}


// expand functionality to add email as username into database so that it can be used to reference books later
export default function GoogleLoginButton() {
  return (
    <GoogleButton onClick={ googleLogin } />
  )
}