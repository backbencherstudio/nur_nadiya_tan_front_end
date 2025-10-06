
import LoginForm from "@/components/allForm/LoginForm"
import Loader from "@/components/reusable/Loader"
import loginPage from "@/public/loginimage.png"
import Image from "next/image"
import { Suspense } from "react"
function LoginPage() {
  return (
     <section className='max-w-[1346px] mx-auto min-h-screen  px-4'>
      <div className=' grid grid-cols-1 lg:grid-cols-2 gap-6  items-center h-full'>
           <div className=' rounded-3xl overflow-hidden '>
              <Image src={loginPage} alt='RegisterImage' width={650} height={750} className='rounded-3xl object-contain w-full h-full '/>
           </div>
           <div className="bg-[#060A2F] w-full h-full">
           <Suspense fallback={<div><Loader/></div>}>
             <LoginForm/>
           </Suspense>
           </div>
      </div>
    </section>
  )
}

export default LoginPage
