import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function GameMenuPage() {

    return (
      <div className='flex-center'>
        <div className='flex-center-row screen-width'>
          <div className='flex-center left-top'>
            <Button as={Link} to='/game/profile' variant="outline-success">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
              </svg>
            </Button>
            <div className="spacer-h10"></div>
            <Button as={Link} to='/game/settings' variant="outline-success">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
                <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
              </svg>
            </Button>
          </div>
          <div className='flex-center'>
            <h1 className='hobbiton-brushhand'>Shadows of Mordor:</h1>
            <h2 className='hobbiton-brushhand'>Tales of the Fellowship</h2>
          </div>
        </div>
        <div className='flex-center d-grid gap-2'>
          <Button as={Link} to='/game/new-game' variant="outline-success" size="lg">New Game</Button>
          <Button as={Link} to='/game/continue' variant="outline-success" size="lg">Continue</Button>
          <Button as={Link} to='/game/stats' variant="outline-success" size="lg">Stats</Button>
        </div>
      </div>
    )
  }
  
  export default GameMenuPage