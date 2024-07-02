import React from 'react'
import { Button } from './ui/button'

export default function PrimaryButton({onClick,children,className,disabled}:{onClick:()=>void,children:string,className?:string,disabled:boolean}) {
  return (
    <Button onClick={onClick} disabled={disabled} className={`bg-[#008060] hover:bg-[#008060] h-[32px] w-[142px] ${className}`}>{children}</Button>
  )
}
