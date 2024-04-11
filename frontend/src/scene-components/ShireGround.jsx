import { Plane, useTexture } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import shireElevation from '../heightmaps/shire-heightmap3.jpg'
import shireNormal from '../normalmaps/shire-normalmap3.png'
import shireColor from '../colormaps/shire-colormap.jpg'

export function ShireGround() {
    const elevations = useLoader(TextureLoader, shireElevation);  
    const normals = useLoader(TextureLoader, shireNormal);
    const colors = useLoader(TextureLoader, shireColor);

    return (
        // true
        <Plane
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0,0,0]}
            args={[50, 50, 2048, 2048]}
        >
            <meshStandardMaterial 
                attach='material'
                color='white'
                map={colors}
                metalness={0.2}
                displacementMap={elevations}
                normalMap={normals}
                displacementScale={3.5} //makes hills taller
            />
        </Plane>
    )
}