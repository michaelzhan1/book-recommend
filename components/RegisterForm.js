'use client'


import { signIn } from 'next-auth/react'


async function register(e) {
  e.preventDefault()
  if (e.target.password.value !== e.target.confirmPassword.value) {
    alert('Passwords do not match')
    return
  }
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: e.target.username.value,
      password: e.target.password.value
    })
  })
  if (res.ok) {
    await signIn('credentials', {
      username: e.target.username.value,
      password: e.target.password.value,
      callbackUrl: `${window.location.origin}/`
    });
  } else {
    const error = await res.text()
    alert(error)
  }
}

export default function RegisterForm(props) {
  return (
    <form onSubmit={ register } className='flex flex-col justify-center'>
      <div className='mb-4'>
        <label htmlFor="username" className='block text-gray-700 text-sm font-bold mb-2'>Username</label>
        <input type="text" name="username" placeholder="Username" required className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
      </div>
      <div className='mb-4'>
        <label htmlFor="password" className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
        <input type="password" name="password" placeholder="Password" required minLength={8} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
      </div>
      <div className='mb-4'>
        <label htmlFor="confirmPassword" className='block text-gray-700 text-sm font-bold mb-2'>Confirm password</label>
        <input type="password" name="confirmPassword" placeholder="Password" required minLength={8} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
      </div>
      <div className='text-center'>
        <button type="submit" className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline mb-3'>Register</button>
      </div>
    </form>
  )
}