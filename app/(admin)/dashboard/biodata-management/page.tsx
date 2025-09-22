import Biodatapage from '@/components/dashboard/Biodatapage'

function BiodataManagement() {
  return (
    <div className='md:px-10 pb-6'>
      <h2 className='text-2xl md:text-[32px] text-headerColor font-semibold'>Biodata List</h2>
      <div className=' rounded-2xl w-full  mt-6'>
      <Biodatapage/>
      </div>
    </div>
  )
}

export default BiodataManagement
