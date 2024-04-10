import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function HomePage() {

    return (
      <div className='flex-center'>
        <h1 className='hobbiton-brushhand'>Shadows of Mordor:</h1>
        <h2 className='hobbiton-brushhand'>Tales of the Fellowship</h2>
        <div className='spacer-h100'></div>
        <div className="d-grid gap-2">
          <Button as={Link} to='/signup' variant="outline-success" size="lg">Sign-up</Button>
          <Button as={Link} to='/login' variant="outline-success" size="lg">Login</Button>
        </div>
        <div className='spacer-h100'></div>
        <div className='disclaimer'>
          <h5 className='center-text'>Disclaimer</h5>
          <p>Game created for educational puposes to demonstate my learning. Lord of the Rings is a creation of J.R.R Tolkien and I claim no ownership.</p>
          <img src="shire-heightmap.jpg" alt="" />
          <img src="shire-normalmap.png" alt="" />
        </div>
      </div>
    )
  }
  
  export default HomePage