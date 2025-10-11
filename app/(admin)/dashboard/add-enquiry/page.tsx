"use client"
import AddEmployerEnquiry from '@/components/allForm/AddEmployerEnquiry'
import AddNewInquryForm from '@/components/allForm/AddNewInquryForm'
import { useState } from 'react'

function AddEnquiry() {
  const [activeForm, setActiveForm] = useState<'employer' | 'maid'>('employer')

  return (
    <div className='md:px-10 pb-6'>
       <div className='flex p-2 max-w-[340px] mx-auto rounded-lg border border-primaryColor justify-between items-center'>
        <button 
          className={`px-4 py-2 rounded-md transition-colors ${
            activeForm === 'employer' 
              ? 'bg-primaryColor text-white' 
              : 'bg-transparent text-primaryColor hover:bg-primaryColor/10'
          }`}
          onClick={() => setActiveForm('employer')}
        >
          Employer Enquiry
        </button>
        <button 
          className={`px-4 py-2 rounded-md transition-colors ${
            activeForm === 'maid' 
              ? 'bg-primaryColor text-white' 
              : 'bg-transparent text-primaryColor hover:bg-primaryColor/10'
          }`}
          onClick={() => setActiveForm('maid')}
        >
          Maid Enquiry
        </button>
       </div>
      <div className=' p-4 md:p-10 rounded-2xl w-full bg-white mt-6'>
        {activeForm === 'employer' ?  <AddEmployerEnquiry/> : <AddNewInquryForm/>}
      </div>
    </div>
  )
}

export default AddEnquiry
