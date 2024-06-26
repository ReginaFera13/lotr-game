/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 Bush.gltf 
Author: Adrian Sheremet (https://sketchfab.com/adriansheremet)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/photorealistic-bush-8db54bf299954daa9ee29b233e923672
Title: Photorealistic Bush
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Bush(props) {
  const groupRef = useRef()
  const { nodes, materials } = useGLTF('/Bush.gltf')
  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group position={[0, 0, 0]} rotation={[1.671, 0, Math.PI / 2]} scale={0.076}>
        <group rotation={[-Math.PI, 0, 0]}>
          <mesh geometry={nodes['Bush_3_(smaller)_Leaf_Mat_0'].geometry} material={materials.Leaf_Mat} />
          <mesh geometry={nodes['Bush_3_(smaller)_Leaf2_Mat_0'].geometry} material={materials.Leaf2_Mat} />
          <mesh geometry={nodes['Bush_3_(smaller)_Bark_Mat_0'].geometry} material={materials.Bark_Mat} />
          <mesh geometry={nodes['Bush_3_(smaller)_Bark_Mat_0_1'].geometry} material={materials.Bark_Mat} />
          <mesh geometry={nodes['Bush_3_(smaller)_Leaf_v2_Mat_0'].geometry} material={materials.Leaf_v2_Mat} />
          <mesh geometry={nodes['Bush_3_(smaller)_Leaf_v3_Mat_0'].geometry} material={materials.Leaf_v3_Mat} />
          <mesh geometry={nodes['Bush_3_(smaller)_Leaf_v4_Mat_0'].geometry} material={materials.Leaf_v4_Mat} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/Bush.gltf')
