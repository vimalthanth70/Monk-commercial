import React from 'react'
import { Button } from './ui/button'

export default function SecondaryButton({onClick,children}:{onClick:()=>void,children:string}) {
  return (
    <Button className='w-[193px] border-2 border-[#008060] text-[#008060] font-[600] text-[14px] hover:bg-white hover:text-[#008060]' variant="outline" onClick={onClick}>{children}</Button>
  )
}
