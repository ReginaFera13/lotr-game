import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { Sky, OrbitControls } from '@react-three/drei'
import { ShireGround } from '../scene-components/ShireGround'
import { Doors } from '../scene-components/Doors'

function AGamePage() {

    return (
        <div id="canvas-container">
            <Canvas>
                <OrbitControls/>
                <Sky sunPosition={[100, 100, 20]}/>
                <ambientLight intensity={0.5}/>
                <Physics>
                    <Suspense fallback={null}>
                        <ShireGround/>
                        <Doors/>
                    </Suspense>
                </Physics>
            </Canvas>
        </div>
    )
  }
  
  export default AGamePage