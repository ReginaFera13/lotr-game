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

function AGamePage() {
    const [chapter, setChapter] = useState(1);
    const [player, setPlayer] = useState()
    const [team, setTeam] = useState([])
    const [npcs, setNpcs] = useState([])

    const handleEnterChapter = (chapterId) => {
        setChapter(chapterId);
    };

    const saveGameState = () => {
        const gameState = {
            chapter: chapter,
            player: player,
            team: team,
            npcs: npcs
        };

        // Convert the gameState object to JSON string
        const scene_state = JSON.stringify(gameState);

        // Perform any action with the JSON string, like saving to local storage or sending to a server
        console.log(scene_state);
    };

    useEffect(() => {
        // Call the saveGameState function whenever any of the states change
        saveGameState();
    }, [chapter, player, team, npcs]);

    const addAllCharsToDB = async () => {
        try {
            // Fetch all characters from the dev_characters endpoint
            const response = await axios.get('http://127.0.0.1:8000/api/v1/dev_characters/');
            const devCharacters = response.data;
    
            // Iterate over each character
            for (const devCharacter of devCharacters) {
                // Map the fields from DevCharacter to GameCharacter
                const gameCharacter = {
                    char_id: devCharacter.id, // Assuming devCharacter.id is the primary key
                    health: devCharacter.start_health,
                    stamina: devCharacter.start_stam,
                    damage: devCharacter.start_dam,
                    armor: devCharacter.start_armor,
                    att_sp: devCharacter.start_att_sp,
                    // You may need to set other fields based on your application logic
                };
    
                // Send a POST request to add the character to the game_characters endpoint
                const gameCharResponse = await axios.post('http://127.0.0.1:8000/api/v1/game_characters/', gameCharacter);
                console.log('Character added to the game:', gameCharResponse.data);
            }
        } catch (error) {
            console.error('Error adding characters to the game:', error);
        }
    }

    // addAllCharsToDB();

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
                <GameUI handleEnterChapter={handleEnterChapter} team={team}/>
            </div>
        )
    }

    
  }
  
  export default AGamePage