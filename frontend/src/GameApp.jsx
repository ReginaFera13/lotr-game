import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLoaderData, useOutletContext } from 'react-router-dom';
import { getInfo } from './utilities';

function GameApp() {
  const {user, setUser} = useOutletContext()
  const [userInfo, setUserInfo] = useState([])

  useEffect(() => {
    const handleUserInfo = async () => {
      let response = await getInfo();
      setUserInfo([response]);
    };
  
    if (!userInfo.length) {
      handleUserInfo();
    }
  }, []);

  
  

  const contextObj = {
    user,
    setUser,
    userInfo,
    setUserInfo
  }

  console.log(user)
  console.log(userInfo)

  return (
    <>
      <Outlet context={contextObj}/>
    </>
  )
}

export default GameApp