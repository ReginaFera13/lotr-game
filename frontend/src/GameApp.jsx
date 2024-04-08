import { useState } from 'react'
import { Outlet, useNavigate, useLoaderData } from 'react-router-dom';

function GameApp() {

  return (
    <>
      <Outlet />
    </>
  )
}

export default GameApp