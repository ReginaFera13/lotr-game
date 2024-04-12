import * as THREE from 'three'; // Import Three.js
import { useFBX } from "@react-three/drei";

export default function Hobbits() {
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

    return (
        <group>
            <primitive object={frodo} position={[-14,0.2,-10]} rotation={[0,0,0]} scale={0.015} />
            <primitive object={samwise} position={[4,0.2,-15]} rotation={[0,-3,0]} scale={0.015} />
            <primitive object={merry} position={[10,0,0]} rotation={[0,-3,0]} scale={0.015} />
            <primitive object={pippin} position={[10,0,3]} rotation={[0,0,0]} scale={0.015} />
            <primitive object={bilbo} position={[-16,0.4,-9]} rotation={[0,0,0]} scale={0.015} />
            <primitive object={maggot} position={[0,0,8]} rotation={[0,-3,0]} scale={0.015} />
        </group>
    );
}