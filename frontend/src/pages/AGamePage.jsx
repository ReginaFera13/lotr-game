import { Suspense } from 'react'
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

function AGamePage() {

    return (
        <div id="canvas-container">
            <Canvas>
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
                    </Suspense>
                </Physics>
            </Canvas>
        </div>
    )
  }
  
  export default AGamePage