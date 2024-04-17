import { useState, useEffect } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import axios from "axios"
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DeleteGameFileModal from '../components/DeleteGameFileModal';

function ContinuePage() {
  const [modalShow, setModalShow] = useState(false)
  const [savedGames, setSavedGames] = useState([])
  const {user, userInfo} = useOutletContext()
  const navigate = useNavigate();
  console.log(userInfo)

  const getSavedGames = async()=> {
    const userId =  userInfo[0].id
    let response = await axios.get(`http://127.0.0.1:8000/api/v1/saved_games/?user_id=${userId}`)
    const games = response.data
    setSavedGames(games)
  }

  useEffect(() => {
    getSavedGames();
  }, [userInfo]);
  console.log(savedGames)

  const enterGame = async (id) => {
    navigate(`/game/${id}`)
  }

  const renderSavedGames = () => {
    if (savedGames.length > 0) {
        for (let i = 0; i < savedGames.length; i++) {
            const game = savedGames[i]
            return (
              <ButtonGroup aria-label="Basic example">
              <Button onClick={() => enterGame(game.id)} variant="outline-success">{`Game ${game.id} - ${game.diff_level}`}</Button>
              {/* <Button onClick={() => setModalShow(true)} variant="outline-danger">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
              </Button> */}
            </ButtonGroup>
            )
        }
    } else {
        return <h4>No Saved Games</h4>
    }
}

    return (
      <div className='flex-center'>
        <h1 className='hobbiton-brushhand'>Choose A Game File</h1>
          <div>{renderSavedGames()}</div>
          <DeleteGameFileModal show={modalShow} onHide={() => setModalShow(false)}/>
      </div>
    )
  }
  
  export default ContinuePage