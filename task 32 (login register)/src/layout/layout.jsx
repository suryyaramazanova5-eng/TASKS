import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './navbar'

function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default Layout
