import React from 'react'
import Navbar from '../components/Navbar'
import { Route, Routes } from 'react-router-dom'
import HomeDashboard from '../components/HomeDashboard'
import NewBoard from '../components/NewBoard'
import CardHistory from '../components/CardHistory'

const Dashboard = () => {
  return (
    <div className='max-w-full overflow-x-auto max-h-screen overflow-y-auto'>
        <Routes>
            <Route path='/dashboard' element={<HomeDashboard/>} />
            <Route path='/dashboard/board/:boardId' element={<NewBoard/>} />
            <Route path='/dashboard_card_details' element={<CardHistory/>} />
        </Routes>
    </div>
  )
}

export default Dashboard