import React from 'react'
import navbarLogo from '../assets/logo.svg'

export default function Navbar() {
  return (
    <div className='border-[#D1D1D1] border-b-2 flex gap-[17.03px] items-center'>
        <img className='py-[8px] pl-[21px]' alt='logo' src={navbarLogo} />
        <p className='font-[600] text-[16px] text-[#7E8185]'>Monk Upsell & Cross-sell</p>
    </div>
  )
}

// react-with-typescript
