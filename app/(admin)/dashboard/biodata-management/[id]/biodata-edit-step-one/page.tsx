import BiodataFormStepOne from '@/components/allForm/BiodataFormStepOne'
import { UserService } from '@/service/user/user.service'
import { cookies } from 'next/headers'

async  function page(props: {
  params: Promise<{ id: string }>
}) {
   const params = await props.params
  const { id } = params
  const cookieStore = await cookies()
  const token = cookieStore.get('jobtoken')?.value
//   if (!token) {
//     redirect('/login')
//   }


  try { 
    const data = await UserService.getSingleBiodata(id, token)
    const singleBiodata = data?.data?.data
    return (
      <div>
        <BiodataFormStepOne editedData={singleBiodata} />
      </div>
    )
  } catch (error) {
    console.log("error",error)
  }
}

export default page