import { useState } from 'react'
import { Outlet, useNavigate, useLoaderData } from 'react-router-dom';
import './App.css'

function App() {

  return (
    <>
      <Outlet />
    </>
  )
}

export default App
