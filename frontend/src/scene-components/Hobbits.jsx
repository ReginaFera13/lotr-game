import { useRef, useContext } from 'react'
import * as THREE from 'three';
import { useFBX } from "@react-three/drei";
import axios from "axios"
import { GameContext } from '../pages/AGamePage';

export default function Hobbits() {
    const { gameID, fetchSubquests, playerStats, getAllInventory, fetchQuests, resourceCollected } = useContext(GameContext);

    const frodo = useFBX('/Peasant-Nolant-Frodo.fbx');
    const samwise = useFBX('/Peasant-Nolant-Samwise.fbx');
    const merry = useFBX('/Peasant-Nolant-Merry.fbx');
    const pippin = useFBX('/Peasant-Nolant-Pippin.fbx');
    const bilbo = useFBX('/Peasant-Nolant-Bilbo.fbx');
    const maggot = useFBX('/Peasant-Nolant-Maggot.fbx');

    frodo.traverse((child) => {
        if (child.isMesh) {
            child.material = child.material.clone();
            child.material.map = new THREE.TextureLoader().load('/Peasant-Nolant-Green.png');
        }
    });

    samwise.traverse((child) => {
        if (child.isMesh) {
            child.material = child.material.clone();
            child.material.map = new THREE.TextureLoader().load('/Peasant-Nolant-Blue.png');
        }
    });

    merry.traverse((child) => {
        if (child.isMesh) {
            child.material = child.material.clone();
            child.material.map = new THREE.TextureLoader().load('/Peasant-Nolant-Brown.png');
        }
    });

    pippin.traverse((child) => {
        if (child.isMesh) {
            child.material = child.material.clone();
            child.material.map = new THREE.TextureLoader().load('/Peasant-Nolant-Yellow.png');
        }
    });

    bilbo.traverse((child) => {
        if (child.isMesh) {
            child.material = child.material.clone();
            child.material.map = new THREE.TextureLoader().load('/Peasant-Nolant-Yellow.png');
        }
    });

    maggot.traverse((child) => {
        if (child.isMesh) {
            child.material = child.material.clone();
            child.material.map = new THREE.TextureLoader().load('/Peasant-Nolant-Brown.png');
        }
    });

    const handleClick = async () => {
        console.log('Bilbo clicked!')
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/v1/game_subquests/?game_id=${gameID}`);
          const questData = response.data;
          console.log(questData)
          if (questData[2].completed == false) {
            const data = { completed: true }
            const subquestResponse = await axios.put(`http://127.0.0.1:8000/api/v1/game_subquests/${questData[2].id}/`, data)
            console.log('Quest completed:', subquestResponse.data)
            fetchSubquests()
            getRing(playerStats)
            resourceCollected()
            getAllInventory(playerStats)
            completeQuest()
          }
        } catch (error) {
          console.error("Error completing quests:", error);
        }
      }

    const getRing = async (playerStats) => {
        const playerID = playerStats.id
        console.log('player id', playerID)
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/dev_inventory_items/9/`);
            const item = response.data;
            console.log(item)

            const newItem = {
                char_id: playerID,
                item_id: item.id,
                quantity: 1,
            };

            const addItemResponse = await axios.post(`http://127.0.0.1:8000/api/v1/game_inventory/`, newItem)
            console.log('Ring added:', addItemResponse.data)
        } catch (error) {
            console.error("Error inventory:", error);
        }

    }

    const completeQuest = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/game_quests/?game_id=${gameID}`);
            const questData = response.data;
            console.log(questData)
            if (questData[0].completed == false) {
                const data = { completed: true }
                const questResponse = await axios.put(`http://127.0.0.1:8000/api/v1/game_quests/${questData[0].id}/`, data)
                console.log('Quest completed:', questResponse.data)
                fetchQuests()
              }
        } catch (error) {
            console.error("Error completing quests:", error);
        }
    }



    

    

    return (
        <group>
            <primitive object={frodo} position={[-14,0.2,-10]} rotation={[0,0,0]} scale={0.015} />
            <primitive object={samwise} position={[4,0.2,-15]} rotation={[0,-3,0]} scale={0.015} />
            <primitive object={merry} position={[10,0,0]} rotation={[0,-3,0]} scale={0.015} />
            <primitive object={pippin} position={[10,0,3]} rotation={[0,0,0]} scale={0.015} />
            <primitive object={bilbo} position={[-16,0.4,-9]} rotation={[0,0,0]} scale={0.015} onClick={handleClick}/>
            <primitive object={maggot} position={[0,0,8]} rotation={[0,-3,0]} scale={0.015} />
        </group>
    );
}