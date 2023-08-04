'use client'


import { signIn } from 'next-auth/react'


// TODO: create a login route to first check if the password is correct/the user exists to handle that error, then call the signIn function from there
async function login(e) {
  e.preventDefault()
  const username = e.target.username.value
  const password = e.target.password.value
  await signIn('credentials', {
    username,
    password,
    callbackUrl: `${window.location.origin}/`
  })
}


export default function LoginForm(props) {
  return (
    <form onSubmit={ login }>
      <input type="text" name="username" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  )
}