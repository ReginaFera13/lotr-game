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

  const gameMenuReturn = () => {
    navigate('/game')
  }

    return (
      <div className='flex-center'>
        <h1 className='hobbiton-brushhand'>{displayName}</h1>
        <div className="d-grid gap-2">
          <Button onClick={handleLogout} variant="outline-secondary" size="lg">Logout</Button>
          <Button onClick={() => setModalShow(true)} variant="outline-danger" size="lg">Delete Pofile</Button>
        </div>
        <DeleteProfileModal show={modalShow} onHide={() => setModalShow(false)}/>
        <div className="absolute left-top flex-left">
          <Button onClick={() => gameMenuReturn()} variant="outline-success" >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
            </svg>
          </Button>
        </div>
      </div>
    )
  }
  
  export default ProfilePage