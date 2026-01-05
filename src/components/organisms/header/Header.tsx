import React from 'react'
import globe from "../../../../public/globe.svg";
import Image from 'next/image';

export default function Header() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-primary-subtle ">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <Image width={30} height={30} alt='brand logo' src={globe}/>
                    </a>
                    <ul className="navbar-nav w-100 justify-content-between">
                        <li className="nav-item">
                            <a className="nav-link text-primary-emphasis active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-primary-emphasis" href="#">Sepet</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}
