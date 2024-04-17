import { useContext, useState, useEffect } from 'react'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import MapModal from '../components/MapModal';
import InventoryModal from '../components/InventoryModal';
import QuestModal from '../components/QuestModal';
import CharacterCard from '../components/CharacterCard';

function GameUI( {handleEnterChapter, team, teamInfo, teamStats, player, setPlayer, playerInfo, playerStats} ) {
    const [mapModalShow, setMapModalShow] = useState(false)
    const [inventoryModalShow, setInventoryModalShow] = useState(false)
    const [questModalShow, setQuestModalShow] = useState(false)

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
                            team={team}
                            teamInfo={teamInfo}
                            player={player} 
                            setPlayer={setPlayer}                    
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
                <InventoryModal show={inventoryModalShow} onHide={() => setInventoryModalShow(false)} player={player} playerInfo={playerInfo} playerStats={playerStats} />
            )
        }
    }

    return (
        <>
            <div className="absolute left-top">
                <Button onClick={() => setMapModalShow(true)} variant="secondary" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-map" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.5.5 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103M10 1.91l-4-.8v12.98l4 .8zm1 12.98 4-.8V1.11l-4 .8zm-6-.8V1.11l-4 .8v12.98z"/>
                    </svg>
                </Button>
                <div className='spacer-h10'></div>
                {renderCharCard()}
            </div>
            <div className="absolute top-right flex-center">
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