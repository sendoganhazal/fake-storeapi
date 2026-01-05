import React from 'react'
import CardBody from '@/components/atoms/card/CardBody'
import CardImage from '@/components/atoms/card/CardImage'

export default function ProductCard() {
  return (
    <div className='card'>
        <CardImage/>
        <CardBody/>
    </div>
  )
}
