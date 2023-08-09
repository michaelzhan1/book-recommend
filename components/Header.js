'use client'


import { signOut } from 'next-auth/react'


async function logout() {
  await signOut({callbackUrl: `${window.location.origin}/login`})
}


export default function Header({ username }) {
  return (
    <header className="w-full text-right flex justify-end py-5 px-5">
      <div className="flex justify-end">
        <h1 className='pe-6 text-sm'>Logged in as {username}</h1>
        <button onClick={ logout } className='text-sm hover:text-gray-600'>Logout</button>
      </div>
    </header>
  )
}