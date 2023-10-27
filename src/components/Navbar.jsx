import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import "../styles/navbar.css"
import ThemeContext from '../context/context'
import { useContext, useState } from 'react'

const Navbar = ({children}) => {
    const {theme, handleChangeTheme } = useContext(ThemeContext);
    const [hovered, setHovered] = useState(false);

    const handleBtnHover = () => {
        setHovered(!hovered);
    };

    return (
        <>
            <nav className="navbar" >
                <Link to="/"  id='home' onMouseEnter={handleBtnHover} onMouseLeave={handleBtnHover} style={{ color: hovered ? 'white' : theme.color }}><span>Home</span></Link>
                <div className='containerNavBtn'>
                    <Link to="/buscar" className='btn' onMouseEnter={handleBtnHover} onMouseLeave={handleBtnHover}><span style={{color: hovered ? 'white' : theme.color}}>Search</span></Link>
                    <button id='theme' type='button' className='btn' onClick={handleChangeTheme} onMouseEnter={handleBtnHover}
                        onMouseLeave={handleBtnHover}><span style={{color: hovered ? 'white' : theme.color}}>Change Theme</span></button>
                </div>
            </nav>
            {children}
            <Outlet/>
        </>
    )
    
}

export default Navbar;