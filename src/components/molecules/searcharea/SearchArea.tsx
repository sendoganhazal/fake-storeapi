import Button from '@/components/atoms/button/Button'
import React from 'react'

export default function SearchArea() {
    return (
        <div className="bg-info-subtle p-3">
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <Button variant='primary' type="submit">Search</Button>
            </form>
        </div>
    )
}
