import { useState, useEffect } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import axios from "axios"
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DeleteGameFileModal from '../components/DeleteGameFileModal';
import { deleteGameFile } from '../utilities';

function ContinuePage() {
  const [modalShow, setModalShow] = useState(false)
  const [savedGames, setSavedGames] = useState([])
  const [gameIdToDelete, setGameIdToDelete] = useState(null);
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

  const handleDeleteButtonClick = (id) => {
    setModalShow(true); // Set modal show state to true
    setGameIdToDelete(id); // Set the game id to delete
  };

  const handleDeleteGameFile = async (id) => {
    // Delete the game file
    await deleteGameFile(id);
    // Update the list of saved games
    await getSavedGames();
    // Close the modal
    setModalShow(false);
  };

  const renderSavedGames = () => {
    if (savedGames.length > 0) {
        // Initialize an array to hold the rendered button groups
        const buttonGroups = [];
        for (let i = 0; i < savedGames.length; i++) {
            const game = savedGames[i];
            // Push each rendered button group into the array
            buttonGroups.push(
                <ButtonGroup aria-label="Basic example" key={game.id} >
                    <Button onClick={() => enterGame(game.id)} variant="outline-success">{`Game ${game.id} - ${game.diff_level}`}</Button>
                    <Button onClick={() => handleDeleteButtonClick(game.id)} variant="outline-danger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                    </Button>
                </ButtonGroup>
            );
        }
        // Return the array of button groups
        return buttonGroups;
    } else {
        return <h4>No Saved Games</h4>;
    }
  };

  const gameMenuReturn = () => {
    navigate('/game')
  }

    return (
      <div className='flex-center'>
        <h1 className='hobbiton-brushhand'>Choose A Game File</h1>
        <div className='flex-center'>{renderSavedGames()}</div>
        <DeleteGameFileModal show={modalShow} onHide={() => setModalShow(false)} gameIdToDelete={gameIdToDelete} handleDeleteGameFile={handleDeleteGameFile} />
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
  
  export default ContinuePage