import { Cylinder, useTexture } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import shireDoor from '../textures/hobbit-door.jpg'

export function Doors() {
    const doorTexture = useLoader(TextureLoader, shireDoor);

    return (
        <Cylinder
            rotation={[3, 1, 0.95]}
            position={[-6.2,1.2,10]}
            args={[1, 1, 0.3, 32]}
        >
            <meshStandardMaterial 
                attach='material'
                color='white'
                map={doorTexture}
            />
        </Cylinder>
        
    )
}