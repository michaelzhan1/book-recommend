'use client'


import { signIn } from 'next-auth/react'


// same here as with login form, create a register route to handle the error of the user already existing
async function register(e) {
  e.preventDefault()
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
    const { error } = await res.json()
    alert(error)
  }
}

export default function RegisterForm(props) {
  return (
    <form onSubmit={ register }>
      <input name="username" type="text" placeholder="Username" required />
      <input name="password" type="password" placeholder="Password" required minLength={8}/>
      <button type="submit">Register</button>
    </form>
  )
}