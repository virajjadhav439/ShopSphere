import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'

const CustomerLayout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <h2>Footer</h2>
    </>
  )
}

export default CustomerLayout