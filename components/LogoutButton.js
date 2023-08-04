'use client'


import { signOut } from 'next-auth/react'


async function logout() {
  await signOut({callbackUrl: `${window.location.origin}/login`})
}


export default function LogoutButton(props) {
  return (
    <button onClick={ logout }>Logout</button>
  )
}