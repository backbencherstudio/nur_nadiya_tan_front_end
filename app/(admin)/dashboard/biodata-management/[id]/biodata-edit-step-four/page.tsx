
import BiodataUpdateStepFourForm from '@/components/allForm/BiodataUpdateFourForm'
import { UserService } from '@/service/user/user.service'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function page(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params
  const { id } = params
  const cookieStore = await cookies()
  const token = cookieStore.get('jobtoken')?.value
  if (!token) {
    redirect('/login')
  }
  try { 
    const data = await UserService.getSingleBiodata(id, token)
    const singleBiodata = data?.data?.data
    return (
        <div>
        <BiodataUpdateStepFourForm editedData={singleBiodata} />
      </div>
    )
  } catch (error) {
    return (
      <div>
        <p>Error: {error?.message || "Something went wrong."}</p>
      </div>
    )
  }
}
export default page
