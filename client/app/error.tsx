"use client"
import ShadowParent from '@/components/ui/ShadowParent'
import React from 'react'

type props={
    error:Error
}

function Error({error}:props) {
  return (
    <div className='flex items-center justify-center h-[100vh]'>
        <ShadowParent classStyle='w-[500px] max-w-full text-center py-[40px]'>
            <div>
              {error.message}
            </div>
        </ShadowParent>
    </div>
  )
}

export default Error