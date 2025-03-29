import React from 'react'

type Props={
    error:string
}

function ErrorMessage({error}:Props) {
  return (
    <p className='text-red-600 mt-1 text-[14px]'>{error}</p>
  )
}

export default ErrorMessage