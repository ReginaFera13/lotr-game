import { Suspense, useState, useEffect } from 'react'
import axios from "axios"
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { Sky, OrbitControls } from '@react-three/drei'
import { ShireGround } from '../scene-components/ShireGround'
import { ShireDoors } from '../scene-components/ShireDoors'
import OakTree from '../scene-components/OakTree'
import PicnicTable from '../scene-components/PicnicTable'
import WoodFence from '../scene-components/WoodFence'
import WoodArch from '../scene-components/WoodArch'
import WoodRaft from '../scene-components/WoodRaft'
import Bush from '../scene-components/Bush'
import Daisies from '../scene-components/Daisies'
import FlowerBush from '../scene-components/FlowerBush'
import SunsetFlowerBush from '../scene-components/SunsetFlowerBush'
import Hobbits from '../scene-components/Hobbits'
import Gandalf from '../scene-components/Gandalf'
import GameUI from './GameUI'
import { saveAGame } from '../utilities'

function AGamePage() {
    const [chapter, setChapter] = useState(1)
    const [player, setPlayer] = useState()
    const [team, setTeam] = useState([])
    const [teamInfo, setTeamInfo] = useState([])
    const [teamStats, setTeamStats] = useState([])
    const [npcs, setNpcs] = useState([])

    const handleEnterChapter = (chapterId) => {
        setChapter(chapterId);
    };

    const saveGameState = () => {
        const gameState = {
            chapter: chapter,
            player: player,
            team: team,
            teamInfo: teamInfo,
            teamStats: teamStats,
            npcs: npcs,
        };
        const scene_state = JSON.stringify(gameState);
        saveAGame(scene_state) 
    };

    useEffect(() => {
        saveGameState();
    }, [chapter, player, team, teamInfo, teamStats, npcs]);

    const fetchCharacters = async (charIds) => {
        try {
            const characters = await Promise.all(charIds.map(async (charId) => {
                const response = await axios.get(`http://127.0.0.1:8000/api/v1/dev_characters/${charId}/`);
                return response.data;
            }));
            setTeam(characters);
        } catch (error) {
            console.error("Error fetching characters:", error);
        }
    };

    useEffect(() => {
        if (chapter === 1) {
            fetchCharacters([4]);
        }
    }, [chapter]);

    //, 22, 11, 44

    const getTeamInfo = async (team) => {
        if (team) {
            let allCharInfo = []
            for (let i = 0; i < team.length; i++) {
                const theOneId = team[i].char_id
                const myId = team[i].id
                const reponse = await axios.get(`http://127.0.0.1:8000/api/v1/the_one_api/${theOneId}/`)
                const char = reponse.data.docs[0] 
                allCharInfo[myId] = char;
            }
            setTeamInfo(allCharInfo)
        } else {
            console.log("Team is undefined")
        }
    }

    const getTeamStats = async (team) => {
        try {
            const teamStatsObject = []; // Array to store stats objects
        
            // Iterate through each character in the team
            for (const character of team) {
                const response = await axios.get(`http://127.0.0.1:8000/api/v1/game_characters/${character.id}`);
                const stats = response.data;
                
                // Push the stats object to the teamStatsObject array
                teamStatsObject.push(stats);
            }
    
            // Set the team stats array
            setTeamStats(teamStatsObject);
        } catch (error) {
            console.error("Error fetching team stats:", error);
        }
    }

    useEffect(() => {
        if (team && team.length > 0) {
            getTeamInfo(team);
            getTeamStats(team);
        }
    }, [team]);
    
    console.log('team', team)
    console.log('teamInfo', teamInfo)
    console.log('teamStats', teamStats)

    if (chapter == 1) {
        return (
            <div id="canvas-container" style={{ position: 'relative', width: '100%', height: '100vh' }}>
                <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh' }}>
                    <OrbitControls/>
                    <Sky sunPosition={[100, 100, 20]}/>
                    <ambientLight intensity={0.6}/>
                    <Physics>
                        <Suspense fallback={null}>
                            <ShireGround/>
                            <ShireDoors/>
                            <OakTree/>
                            <PicnicTable/>
                            <WoodFence/>
                            <WoodArch/>
                            <WoodRaft/>
                            <FlowerBush/>
                            <SunsetFlowerBush/>
                            <Hobbits/>
                            <Gandalf/>
                        </Suspense>
                    </Physics>
                </Canvas>
                <GameUI handleEnterChapter={handleEnterChapter} team={team} teamInfo={teamInfo} teamStats={teamStats} player={player} setPalyer={setPlayer}/>
            </div>
        )
    }

    
  }
  
  export default AGamePage