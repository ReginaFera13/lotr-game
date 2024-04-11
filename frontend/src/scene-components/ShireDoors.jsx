import { Cylinder, useTexture } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import shireDoor from '../textures/hobbit-door.jpg'

export function ShireDoors() {
    const doorTexture = useLoader(TextureLoader, shireDoor);

    return (
        <>
            <Cylinder
                rotation={[3, 1, 0.95]}
                position={[-5.8,1.2,10]}
                args={[1, 1, 0.3, 32]}
            >
                <meshStandardMaterial 
                    attach='material'
                    color='white'
                    map={doorTexture}
                />
            </Cylinder>

            <Cylinder
                rotation={[3, 1, 2.4]}
                position={[5,1.2,-11.7]}
                args={[1, 1, 0.3, 32]}
            >
                <meshStandardMaterial 
                    attach='material'
                    color='white'
                    map={doorTexture}
                />
            </Cylinder>

            <Cylinder
                rotation={[-1.6, 1.4, -0.5]}
                position={[5,1.3,-16.65]}
                args={[1, 1, 0.3, 32]}
            >
                <meshStandardMaterial 
                    attach='material'
                    color='white'
                    map={doorTexture}
                />
            </Cylinder>

            <Cylinder
                rotation={[-0.9, 2.2, -0.1]}
                position={[-13,1.3,-7.6]}
                args={[1, 1, 0.3, 32]}
            >
                <meshStandardMaterial 
                    attach='material'
                    color='white'
                    map={doorTexture}
                />
            </Cylinder>

            <Cylinder
                rotation={[0.3, -0.9, 1]}
                position={[17,1.2,0.6]}
                args={[1, 1, 0.3, 32]}
            >
                <meshStandardMaterial 
                    attach='material'
                    color='white'
                    map={doorTexture}
                />
            </Cylinder>

            <Cylinder
                rotation={[0, 0.3, -1]}
                position={[-7.7,1.2,23]}
                args={[1, 1, 0.3, 32]}
            >
                <meshStandardMaterial 
                    attach='material'
                    color='white'
                    map={doorTexture}
                />
            </Cylinder>
        </>
        
    )
}