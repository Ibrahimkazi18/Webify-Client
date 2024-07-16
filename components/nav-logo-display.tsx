"use client"

import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Globe } from 'lucide-react'

const NavLogoDisplay = () => {
  return (
      <Link href={"/dashboard"} >
        <Button variant={"outline"} size={"lg"}>
          <Globe className='w-4 h-4 mr-3' /> Webify
        </Button> 
      </Link>
  )
}

export default NavLogoDisplay