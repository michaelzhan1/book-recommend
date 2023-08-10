'use client'


import { signIn } from 'next-auth/react'


// TODO: create a login route to first check if the password is correct/the user exists to handle that error, then call the signIn function from there
async function login(e) {
  e.preventDefault()
  const username = e.target.username.value
  const password = e.target.password.value
  try {
    await signIn('credentials', {
      username,
      password,
      redirect: false
    }).then(res => {
      if (res.error) {
        alert('Username or password is incorrect')
      } else {
        window.location.replace('/')
      }
    });
  } catch (error) {
    console.log(error)
    alert('Error logging in')
  }
}


export default function LoginForm(props) {
  return (
    <form onSubmit={ login } className='flex flex-col justify-center'>
      <div className='mb-4'>
        <label htmlFor="username" className='block text-gray-700 text-sm font-bold mb-2'>Username</label>
        <input type="text" name="username" placeholder="Username" required className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
      </div>
      <div className='mb-4'>
        <label htmlFor="password" className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
        <input type="password" name="password" placeholder="Password" required className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
      </div>
      <div className='mb-3 text-center'>
        <button type="submit" className='w-full bg-green-500 hover:bg-blue-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline mb-3'>Login</button>
        <a href="/register" className='text-sm text-blue-500 hover:text-blue-700 underline'>Click here to register</a>
      </div>
    </form>
  )
}