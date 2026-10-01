import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CarDetail from '../features/cars/pages/CarDetail'
import Cars from '../features/cars/pages/Cars'
import Contact from '../features/contact/pages/Contact'
import Home from '../features/home/pages/Home'
import NotFound from '../features/shared/components/NotFound'
import Layout from '../features/shared/layout/Layout'

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />} />
      <Route path="/" element={<Home />} />
      <Route path="/cars" element={<Cars />} />
      <Route path="/cars/:id" element={<CarDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
