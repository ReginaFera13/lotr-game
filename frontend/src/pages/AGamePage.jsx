import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { Sky } from '@react-three/drei'
import { ShireGround } from '../scene-components/ShireGround'

function AGamePage() {

    return (
        <div id="canvas-container">
            <Canvas>
                <Sky sunPosition={[100, 100, 20]}/>
                <ambientLight intensity={0.5}/>
                <Physics>
                    <ShireGround/>
                </Physics>
            </Canvas>
        </div>
    )
  }
  
  export default AGamePage