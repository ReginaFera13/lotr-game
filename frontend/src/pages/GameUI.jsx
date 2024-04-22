import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import MapModal from '../components/MapModal';
import InventoryModal from '../components/InventoryModal';
import QuestModal from '../components/QuestModal';
import CharacterCard from '../components/CharacterCard';
import { GameContext } from './AGamePage';

function GameUI( {handleEnterChapter} ) {
    const [inventoryModalShow, setInventoryModalShow] = useState(false)
    const [questModalShow, setQuestModalShow] = useState(false)
    const { team, teamInfo, teamStats, player, setPlayer, playerInfo, playerStats, mapModalShow, setMapModalShow, chapterTitle, saveGameState, gameID } = useContext(GameContext);
    const navigate = useNavigate()

    const renderCharCard = () => {
        if (teamStats && team && teamInfo && player) {
            return (
                <div>
                    {teamStats.map(c =>
                        <CharacterCard 
                            key={c.char_id}
                            id={c.char_id}
                            armor={c.armor}
                            att_sp={c.att_sp}
                            dam={c.damage}
                            health={c.health}
                            stam={c.stamina}
                            exp={c.exp}
                            level={c.level}
                            curr_char={c.curr_char}                  
                        />
                    )}
                </div>
            )
        } else {
            return null
        }
    }

    const renderInventoryModal = () => {
        if (player && playerInfo && playerStats) {
            return (
                <InventoryModal show={inventoryModalShow} onHide={() => setInventoryModalShow(false)} />
            )
        }
    }

    const gameMenuReturn = () => {
        navigate('/game')
    }

    return (
        <>
            <div className="absolute text-black top-center ">
                <h1 className='center-text'>{`${chapterTitle}`}</h1>
            </div>
            <div className="absolute left-top flex-left">
                <Button onClick={() => gameMenuReturn()} variant="secondary" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                        <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                    </svg>
                </Button>
                <div className='spacer-h10'></div>
                <Button onClick={() => saveGameState(gameID)} variant="secondary" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-floppy" viewBox="0 0 16 16">
                        <path d="M11 2H9v3h2z"/>
                        <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"/>
                    </svg>
                </Button>
                <div className='spacer-h10'></div>
                {renderCharCard()}
            </div>
            <div className="absolute top-right flex-center">
                <Button onClick={() => setMapModalShow(true)} variant="secondary" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-map" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.5.5 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103M10 1.91l-4-.8v12.98l4 .8zm1 12.98 4-.8V1.11l-4 .8zm-6-.8V1.11l-4 .8v12.98z"/>
                    </svg>
                </Button>
                <div className='spacer-h10'></div>
                <Button onClick={() => setInventoryModalShow(true)} variant="secondary" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-backpack4" viewBox="0 0 16 16">
                        <path d="M4 9.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm1 .5v3h6v-3h-1v.5a.5.5 0 0 1-1 0V10z"/>
                        <path d="M8 0a2 2 0 0 0-2 2H3.5a2 2 0 0 0-2 2v1c0 .52.198.993.523 1.349A.5.5 0 0 0 2 6.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6.5a.5.5 0 0 0-.023-.151c.325-.356.523-.83.523-1.349V4a2 2 0 0 0-2-2H10a2 2 0 0 0-2-2m0 1a1 1 0 0 0-1 1h2a1 1 0 0 0-1-1M3 14V6.937q.24.062.5.063h4v.5a.5.5 0 0 0 1 0V7h4q.26 0 .5-.063V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1m9.5-11a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/>
                    </svg>
                </Button>
                <div className='spacer-h10'></div>
                <Button onClick={() => setQuestModalShow(true)} variant="secondary" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-book" viewBox="0 0 16 16">
                        <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
                    </svg>
                </Button>
            </div>
            
            <MapModal show={mapModalShow} onHide={() => setMapModalShow(false)} onEnterChapter={handleEnterChapter}/>
            {renderInventoryModal()}
            <QuestModal show={questModalShow} onHide={() => setQuestModalShow(false)}/>
        </>
    )
  }
  
  export default GameUI