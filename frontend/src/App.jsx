import { useState } from 'react'
import { Outlet } from 'react-router-dom';
import './App.css'

function App() {
  const [user, setUser] = useState(null);

  const contextObj = {
    user,
    setUser
  }
  
  console.log(user)

  return (
    <>
      <Outlet context={contextObj} />
    </>
  )
}

export default App