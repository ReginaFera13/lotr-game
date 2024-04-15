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

    return (
      <div className='flex-center'>
        <h1 className='hobbiton-brushhand'>Choose A Difficulty Level</h1>
        <div className="d-grid gap-2">
          <Button onClick={() => handleDifficultySelect('Easy')} variant="outline-success" size="lg">Easy</Button>
          <Button onClick={() => handleDifficultySelect('Medium')} variant="outline-success" size="lg">Medium</Button>
          <Button onClick={() => handleDifficultySelect('Hard')} variant="outline-success" size="lg">Hard</Button>
        </div>
      </div>
    )
  }
  
  export default NewGamePage