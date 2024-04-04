import React from 'react'
import Upload from './components/Upload'
import Image from 'next/image'

function Page() {
  return (
    <>
      <div className='h-screen bg-blue-50 flex relative '>

        <Upload />


        <Image alt='uploaded file' className='absolute' width={50} height={50} src='/upload/google.jpg' />
      </div>
    </>
  )
}

export default Page