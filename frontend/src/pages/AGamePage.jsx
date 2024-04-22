import { Suspense, useState, useEffect, createContext, useContext } from 'react'
import axios from "axios"
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { Sky, OrbitControls, Plane } from '@react-three/drei'
import { ShireGround } from '../scene-components/ShireGround'
import { ShireDoors } from '../scene-components/ShireDoors'
import OakTree from '../scene-components/OakTree'
import PicnicTable from '../scene-components/PicnicTable'
import WoodFence from '../scene-components/WoodFence'
import WoodArch from '../scene-components/WoodArch'
import WoodRaft from '../scene-components/WoodRaft'
import FlowerBush from '../scene-components/FlowerBush'
import SunsetFlowerBush from '../scene-components/SunsetFlowerBush'
import Hobbits from '../scene-components/Hobbits'
import Gandalf from '../scene-components/Gandalf'
import GameUI from './GameUI'
import { saveAGame, fetchSavedGameStateFromStorage } from '../utilities'

export const GameContext = createContext();

function AGamePage() {
    const [mapModalShow, setMapModalShow] = useState(false)
    const [chapter, setChapter] = useState()
    const [chapterTitle, setChapterTitle] = useState('')
    const [player, setPlayer] = useState()
    const [playerInfo, setPlayerInfo] = useState([])
    const [playerStats, setPlayerStats] = useState()
    const [team, setTeam] = useState([])
    const [teamInfo, setTeamInfo] = useState([])
    const [teamStats, setTeamStats] = useState([])
    const [npcs, setNpcs] = useState([])
    const [quests, setQuests] = useState([])
    const [subquests, setSubquests] = useState([])
    const [completedQuests, setCompletedQuests] = useState([])
    const [completedSubquests, setCompletedSubquests] = useState([])
    const [incompleteQuests, setIncompleteQuests] = useState([])
    const [incompleteSubquests, setIncompleteSubquests] = useState([])
    const [allInventory, setAllInventory] = useState([])

    const currentURL = window.location.href;
    const parts = currentURL.split('/');
    const gameID = parts[parts.length - 1];

    // console.log('Game ID:', gameID);

    const handleEnterChapter = (chapterId) => {
        setChapter(parseInt(chapterId));
        setMapModalShow(false)
    };

    const saveGameState = async (initialGameState) => {
        try {
            const gameState = {
                chapter: initialGameState[0],
                player: initialGameState[1],
                team: initialGameState[2] 
            };
            console.log('gameState', gameState)
            const scene_state = JSON.stringify(gameState);
            await saveAGame(scene_state, gameID);
        } catch (error) {
            console.error("Error saving game state:", error);
        }
    };

    const fetchGameData = async () => {
        try {
            await addCharsToDB()
            await addInventoryToDB()
            await addQuestsToDB()
            await addSubquestsToDB()
            const initialChapter = 1
            setChapter(initialChapter)
            const initialPlayer = await fetchPlayer(4)
            const initialTeam = await fetchTeam([4])
            const initialGameState = [initialChapter, initialPlayer, initialTeam]
            console.log('initialGameState', initialGameState)
            return initialGameState
        } catch (error) {
            console.error("Error fetching game data:", error);
        }
    };

    useEffect(() => {
        const initializeGame = async () => {
            try {
                const savedGameState = await fetchSavedGameStateFromStorage(gameID);
                if (!savedGameState || !savedGameState.data.scene_state) {
                    console.log("Initializing new game...");
                    const initialGameState = await fetchGameData();
                    console.log('initialGameState2', initialGameState)
                    console.log("New game data fetched. Saving game state...");
                    await saveGameState(initialGameState);
                    console.log("Game state saved.");
                } else {
                    const gameState = JSON.parse(savedGameState.data.scene_state);
                    setChapter(gameState.chapter);
                    setPlayer(gameState.player);
                    setTeam(gameState.team);
                    console.log("Loaded saved game state:", gameState);
                }
            } catch (error) {
                console.error("Error initializing the game:", error);
            }
        };
    
        initializeGame();
    }, []);

    const addCharsToDB = async () => {
        try {
            // Fetch all characters from the dev_characters endpoint
            const response = await axios.get('http://127.0.0.1:8000/api/v1/dev_characters/');
            const devCharacters = response.data;
    
            // Iterate over each character
            for (const devCharacter of devCharacters) {
                // Map the fields from DevCharacter to GameCharacter
                const gameCharacter = {
                    game_id: gameID,
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

    const addInventoryToDB = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/v1/dev_starting_inventory/');
            const devStartInv = response.data;
            console.log(devStartInv)
    
            for (const item of devStartInv) {
                const character = await getCharacter(item.char_id)
                const charID = character.id
                const itemID = item.item_id
                console.log('itemID', itemID)
                const gameInv = {
                    char_id: charID, 
                    item_id: itemID,
                    quantity: item.quantity
                };

                // console.log('gameInv', gameInv) 
    
                const gameInvResponse = await axios.post('http://127.0.0.1:8000/api/v1/game_inventory/', gameInv);
                console.log('Item added to the game:', gameInvResponse.data);
            }
        } catch (error) {
            console.error('Error adding items to the game:', error);
        }
    }

    const addQuestsToDB = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/v1/dev_quests/');
            const devQuest = response.data;
            console.log(devQuest)
    
            for (const quest of devQuest) {
                const questID = quest.id
                const questData = {
                    game_id: gameID,
                    quest_id: questID, 
                };

                console.log('questData', questData) 
    
                const questDataResponse = await axios.post('http://127.0.0.1:8000/api/v1/game_quests/', questData);
                console.log('Quest added to the game:', questDataResponse.data);
            }
        } catch (error) {
            console.error('Error adding quests to the game:', error);
        }
    }

    const addSubquestsToDB = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/v1/dev_subquests/');
            const devSubquest = response.data;
            // console.log(devSubquest)
    
            for (const subquest of devSubquest) {
                const subquestID = subquest.id
                const subquestData = {
                    game_id: gameID,
                    subquest_id: subquestID, 
                };

                // console.log('subquestData', subquestData) 
    
                const subquestDataResponse = await axios.post('http://127.0.0.1:8000/api/v1/game_subquests/', subquestData);
                console.log('Quest added to the game:', subquestDataResponse.data);
            }
        } catch (error) {
            console.error('Error adding subquests to the game:', error);
        }
    }
    
    

    const getCharacter = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/game_characters/${gameID}/${id}`);
            const stats = response.data;
            return stats
        } catch (error) {
            console.error("Error fetching team stats:", error);
        }
    }
    

    // useEffect(() => {
    //     saveGameState(gameID);
    // }, [chapter, player, team]);

    const fetchTeam = async (charIds) => {
        try {
            const characters = await Promise.all(charIds.map(async (charId) => {
                const response = await axios.get(`http://127.0.0.1:8000/api/v1/dev_characters/${charId}/`);
                return response.data;
            }));
            setTeam(characters);
            return characters
        } catch (error) {
            console.error("Error fetching characters:", error);
        }
    };

    const fetchPlayer = async (charId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/dev_characters/${charId}/`);
            const character = response.data;
            setPlayer([character]);
            return [character]
        } catch (error) {
            console.error("Error fetching characters:", error);
        }
    }; //, 22-sam, 11-merry, 44-pippin

    const fetchChapter = async (chapter) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/dev_areas/${chapter}/`);
            const title = response.data.name;
            setChapterTitle(title);
        } catch (error) {
            console.error("Error fetching chapter title:", error);
        }
    }

    // console.log('chapterTitle', chapterTitle)

    

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

    const getPlayerInfo = async (player) => {
        // console.log('player', player)
        if (player) {
            const theOneId = player[0].char_id
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/the_one_api/${theOneId}/`)
            const char = response.data.docs[0] 
            setPlayerInfo([char])
        } else {
            console.log("Player is undefined")
        }
    }

    const getTeamStats = async (team) => {
        try {
            const teamStatsObject = [];        
            for (const character of team) {
                const response = await axios.get(`http://127.0.0.1:8000/api/v1/game_characters/${gameID}/${character.id}`);
                const stats = response.data;
                teamStatsObject.push(stats);
            }
            setTeamStats(teamStatsObject);
        } catch (error) {
            console.error("Error fetching team stats:", error);
        }
    }

    const setPlayerActive = async (player) => {
        try {
            const playerId = player[0].id;
            // Define the data object containing the field you want to update
            const data = { curr_char: true }; // or false, depending on your logic
            // Make the PUT request with the correct data object
            const response = await axios.put(`http://127.0.0.1:8000/api/v1/game_characters/${gameID}/${playerId}/`, data);
            // console.log(response);
        } catch (error) {
            console.error("Error setting player to active:", error);
        }
    };

    const getPlayerStats = async (player) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/game_characters/${gameID}/${player[0].id}`);
            const stats = response.data;
            setPlayerStats(stats);
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

    useEffect(() => {
        if (player && player.length > 0) {
            setPlayerActive(player)
            getPlayerInfo(player);
            getPlayerStats(player);
        }
    }, [player]);
    
    // console.log('chapter', chapter)
    // console.log('team', team)
    // console.log('teamInfo', teamInfo)
    // console.log('teamStats', teamStats)
    // console.log('player', player)
    // console.log('playerInfo', playerInfo)
    // console.log('playerStats', playerStats)

    const renderUI = () => {
        if (team && teamStats && teamInfo && player && playerStats && playerInfo) {
            return (
                <GameUI handleEnterChapter={handleEnterChapter} />
            )
        } else {
            return null
        } 
    }

    const renderTeamName = (id) => {
        if (teamInfo && teamInfo.length > 0) {
            return teamInfo[id].name
        } else {
            return null
        }
    }

    const renderPlayerName = (id) => {
        if (playerInfo && playerInfo.length > 0) {
            return playerInfo[0].name
        } else {
            return null
        }
    }

    const fetchQuests = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/game_quests/?game_id=${gameID}`);
            const questData = response.data;
            // console.log(questData)
            setQuests(questData)
        } catch (error) {
            console.error("Error quests:", error);
        }
    }

    const fetchSubquests = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/game_subquests/?game_id=${gameID}`);
            const subquestData = response.data;
            // console.log(subquestData)
            setSubquests(subquestData)
        } catch (error) {
            console.error("Error subquests:", error);
        }
    }

    useEffect(() => {
        fetchQuests()
        fetchSubquests()
    }, []);
    
    // console.log('quests', quests)
    // console.log('subquests', subquests)

    const sortQuests = () => {
        const compQuests = []
        const incompQuests = []
        for (const quest of quests) {
            // console.log('quest', quest)
            const completed = quest.completed
            if (completed) {
                compQuests.push(quest)
            } else {
                incompQuests.push(quest)
            }
        }
        setCompletedQuests(compQuests)
        setIncompleteQuests(incompQuests)
    }

    const sortSubquests = () => {
        const compSubquests = []
        const incompSubquests = []
        for (const subquest of subquests) {
            // console.log('subquest', subquest)
            const completed = subquest.completed
            if (completed) {
                compSubquests.push(subquest)
            } else {
                incompSubquests.push(subquest)
            }
        }
        setCompletedSubquests(compSubquests)
        setIncompleteSubquests(incompSubquests)
    }

    useEffect(() => {
        sortQuests()
        sortSubquests()
    }, [quests, subquests]);

    
    // console.log('completedQuests', completedQuests)
    // console.log('incompleteQuests', incompleteQuests)
    // console.log('completedSubquests', completedSubquests)
    // console.log('incompleteSubquests', incompleteSubquests)

    const getAllInventory = async (playerStats) => {
        const id = playerStats.id
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/game_inventory/?char_id=${id}`);
            const items = response.data;
            // console.log(items)
            setAllInventory(items)
        } catch (error) {
            console.error("Error inventory:", error);
        }
    }

    useEffect(() => {
        if (playerStats) {
            getAllInventory(playerStats)
        }
    }, [playerStats]);

    // console.log('allInventory', allInventory)

    const resourceCollected = async () => {
        try {
            const gameResponse = await axios.get(`http://127.0.0.1:8000/api/v1/saved_games/${gameID}/`)
            const gameData = gameResponse.data
            console.log('gameData', gameData)

            const statsResponse = await axios.get(`http://127.0.0.1:8000/api/v1/game_stats/?user_id=${gameData.user_id}`)
            const statsData = statsResponse.data
            console.log('statsData', statsData)

            for (const stat of statsData) {
                if (stat.diff_level == gameData.diff_level.toLowerCase()) {
                    console.log('stat', stat)
                    const data = { total_resources_collected: 1 }; 
                    const newStatResponse = await axios.put(`http://127.0.0.1:8000/api/v1/game_stats/${stat.id}/`, data);
                    console.log('Resource collected:', newStatResponse.data)
                }
            }            
        } catch (error) {
            console.error("Error updating resource collected:", error);
        }
    }
    

    if (chapter == 1) {
        return (
            <GameContext.Provider value={{ team, teamInfo, teamStats, player, playerInfo, playerStats, mapModalShow, setMapModalShow, renderTeamName, renderPlayerName, chapterTitle, saveGameState, gameID, incompleteQuests, incompleteSubquests, completedQuests, fetchSubquests, allInventory, setAllInventory, getAllInventory, fetchQuests, resourceCollected }}>
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
                    {renderUI()}
                </div>
            </GameContext.Provider>
        )
    } 
    
    if (chapter != 1) {
        return (
            <GameContext.Provider value={{ team, teamInfo, teamStats, player, playerInfo, playerStats, mapModalShow, setMapModalShow, renderTeamName, renderPlayerName }}>
                <div id="canvas-container" style={{ position: 'relative', width: '100%', height: '100vh' }}>
                    <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh' }}>
                        <OrbitControls/>
                        <Sky sunPosition={[100, 100, 20]}/>
                        <ambientLight intensity={0.6}/>
                        <Physics>
                            <Suspense fallback={null}>
                                <Plane
                                    rotation={[-Math.PI / 2, 0, 0]}
                                    position={[0,0,0]}
                                    args={[50, 50, 1024, 1024]}
                                />
                            </Suspense>
                        </Physics>
                    </Canvas>
                    {renderUI()}
                </div>
            </GameContext.Provider>
        )
    }

    
  }
  
  export default AGamePage