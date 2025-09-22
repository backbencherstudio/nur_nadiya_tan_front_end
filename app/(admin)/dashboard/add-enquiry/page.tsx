import AddNewInquryForm from '@/components/allForm/AddNewInquryForm'

function AddEnquiry() {
  return (
    <div className='md:px-10 py-6'>
      <h2 className='text-2xl md:text-[32px] text-headerColor font-semibold'>Enquiry</h2>
      <div className=' p-4 md:p-10 rounded-2xl w-full bg-white mt-10'>
      <AddNewInquryForm/>
      </div>
    </div>
  )
}

export default AddEnquiry
