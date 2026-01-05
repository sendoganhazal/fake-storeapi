import ProductCard from '@/components/molecules/card/ProductCard'
import FilterArea from '@/components/molecules/filterarea/FilterArea'
import SearchArea from '@/components/molecules/searcharea/SearchArea'
import React from 'react'

export default function ProductsContainer() {
  return (
    <section className='row'>
      <section className='col-12'>
        <SearchArea />
      </section>
      <aside className='col-md-6 col-lg-4'>
        <FilterArea />
      </aside>
      <section className='col-md-6 col-lg-8'>
        <p>Products List</p>
      </section>

    </section>
  )
}
