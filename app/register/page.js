import RegisterForm from "@/components/RegisterForm";


export default function Home() {
  return (
    <>
      <div className='flex flex-col h-screen justify-center items-center bg-gray-200'>
        <div className='flex flex-col items-center mb-4 text-center'>
          <h1 className='text-5xl font-bold text-gray-700 mb-2 w-full leading-snug'>Create an account</h1>
        </div>
        <div className='bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4'>
          <RegisterForm />
        </div>
      </div>
    </>
  )
}