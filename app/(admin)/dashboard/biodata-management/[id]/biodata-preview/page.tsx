import BiodataPDFPreview from '@/components/biodata/BiodataPDFPreview';
import { UserService } from '@/service/user/user.service';
import { cookies } from 'next/headers';

async function page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const cookieStore = await cookies();  
  const token = cookieStore.get("jobtoken")?.value;

  try {
    const biodata = await UserService.getBiodata(id, token);
  console.log("biodata", biodata);
  
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
