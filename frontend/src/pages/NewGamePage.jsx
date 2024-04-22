import { useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { createAGame } from '../utilities';

function NewGamePage() {
  const {user, userInfo} = useOutletContext()
  const navigate = useNavigate();

  const handleDifficultySelect = async (diff) => {
    const userId =  userInfo[0].id
    try {
      const gameData = await createAGame(diff, userId); // Wait for game creation
      console.log(gameData)
      if (gameData) {
        console.log(gameData)
        const gameId = gameData.id; // Assuming gameData has an ID
        navigate(`/game/${gameId}`); // Redirect to the game page with the ID
      } else {
        // Handle case where game creation fails
        console.log("Failed to create game");
      }
    } catch (error) {
      // Handle errors
      console.error("Error creating game:", error);
    }
  };

  console.log(userInfo)
  console.log(user)

  const gameMenuReturn = () => {
    navigate('/game')
  }

    return (
      <div className='flex-center'>
        <h1 className='hobbiton-brushhand'>Choose A Difficulty Level</h1>
        <div className="d-grid gap-2">
          <Button onClick={() => handleDifficultySelect('Easy')} variant="outline-success" size="lg">Easy</Button>
          <Button onClick={() => handleDifficultySelect('Medium')} variant="outline-success" size="lg">Medium</Button>
          <Button onClick={() => handleDifficultySelect('Hard')} variant="outline-success" size="lg">Hard</Button>
        </div>
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
  
  export default NewGamePage