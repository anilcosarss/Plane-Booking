import React from 'react'
import { GiCommercialAirplane } from "react-icons/gi"
import { CgProfile } from "react-icons/cg"
import "../Assets/scss/navbar.scss"
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='navbar-container'>
            <nav>
                <div className='left-nav'>
                    
                    
                    <Link className='logo' to="/"><GiCommercialAirplane /> </Link>
                           
                    <a>Home</a>
                    <a>Lorem</a>
                    <a>İpsum</a>
                </div>
                <div className='right-nav'>
                    <a><CgProfile /></a>                    
                </div>
            </nav>

        </div>
    )
}

export default Navbar