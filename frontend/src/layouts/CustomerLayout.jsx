import React from 'react'
import { Outlet } from 'react-router-dom'

const CustomerLayout = () => {
  return (
    <>
    <h2>Navbar</h2>
    <Outlet/>
    <h2>Footer</h2>
    </>
  )
}

export default CustomerLayout