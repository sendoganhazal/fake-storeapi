"use client"
import React, { useState, Suspense} from 'react'
import { Row, Col, Input } from 'antd'
import type { GetProps } from 'antd';
// import { Product } from '@/utils/types';
import { useRouter } from 'next/navigation'


type SearchProps = GetProps<typeof Input.Search>;



const SearchBox = () => {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState<string>("")
  const handleChange: SearchProps['onChange'] = (e) => setSearchParams(e.target.value);
   const handleSearch: SearchProps['onSearch'] = (e) => router.push(`/products?q=${searchParams}`)
  return (
    <form>
      <section >
        <Row justify={'center'} align={'middle'} className='greeting-banner'>
          <Col span={6}>
            <Input.Search placeholder="Search Products" onChange={handleChange} onSearch={handleSearch} size='large'/>
          </Col>
        </Row>
      </section>
    </form>


  )
}

const Search = () => {
  return(
    <Suspense>
      <SearchBox/>
    </Suspense>
  )
}

export default Search