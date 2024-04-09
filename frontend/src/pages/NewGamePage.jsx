import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function NewGamePage() {
  const [difficulty, setDifficulty] = useState('');

  const handleDifficultySelect = (diff) => {
    setDifficulty(diff);
  };

  console.log(difficulty)

    return (
      <div className='flex-center'>
        <h1 className='hobbiton-brushhand'>Choose A Difficulty Level</h1>
        <div className="d-grid gap-2">
          <Button onClick={() => handleDifficultySelect('easy')} variant="outline-success" size="lg">Easy</Button>
          <Button onClick={() => handleDifficultySelect('medium')} variant="outline-success" size="lg">Medium</Button>
          <Button onClick={() => handleDifficultySelect('hard')} variant="outline-success" size="lg">Hard</Button>
        </div>
      </div>
    )
  }
  
  export default NewGamePage