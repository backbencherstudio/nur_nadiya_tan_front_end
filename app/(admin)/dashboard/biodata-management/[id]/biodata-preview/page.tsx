import BiodataPDFPreview from '@/components/biodata/BiodataPDFPreview';
import { UserService } from '@/service/user/user.service';
import { cookies } from 'next/headers';

async function page(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params
  const { id } = params
  const cookieStore = await cookies();  
  const token = cookieStore.get("jobtoken")?.value;

  try {
    const biodata = await UserService.getBiodata(id, token);
  
  return (
    <div className="p-6">
      <BiodataPDFPreview biodata={biodata?.data?.data} />
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
