import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DeleteProfileModal from '../components/DeleteProfileModal';
import { logout } from '../utilities';

function ProfilePage() {
  const [modalShow, setModalShow] = useState(false)
  const {userInfo, setUserInfo, setUser} = useOutletContext()
  const navigate = useNavigate()

  const displayName = userInfo[0].display_name

  const handleLogout = async () => {
    try {
      await logout();
      setUserInfo([])
      setUser([])
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

    return (
      <div className='flex-center'>
        <h1 className='hobbiton-brushhand'>{displayName}</h1>
        <div className="d-grid gap-2">
          <Button onClick={handleLogout} variant="outline-secondary" size="lg">Logout</Button>
          <Button onClick={() => setModalShow(true)} variant="outline-danger" size="lg">Delete Pofile</Button>
        </div>
        <DeleteProfileModal show={modalShow} onHide={() => setModalShow(false)}/>
      </div>
    )
  }
  
  export default ProfilePage