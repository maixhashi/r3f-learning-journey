'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Box, Sphere, Cone } from '@react-three/drei'
import { Mesh } from 'three'
import { useControls, folder } from 'leva'

export function LevaControlDemo() {
  const boxRef = useRef<Mesh>(null)
  const sphereRef = useRef<Mesh>(null)
  const coneRef = useRef<Mesh>(null)

  // パラメータを個別に定義
  const {
    objectType,
    positionX,
    positionY,
    positionZ,
    rotationX,
    rotationY,
    rotationZ,
    scale,
    color,
    wireframe,
    opacity,
    emissiveColor,
    metalness,
    roughness,
    reflectivity,
    enableAnimation,
    rotationSpeed,
    bounceHeight,
    bounceSpeed,
    ambientIntensity,
    directionalIntensity,
    directionalPositionX,
    directionalPositionY,
    directionalPositionZ,
    autoRotateCamera,
    cameraSpeed,
    shadowBias,
    shadowMapSize,
    shadowRadius,
    shadowCameraNear,
    shadowCameraFar,
  } = useControls({
    'Object Settings': folder({
      objectType: {
        label: 'Object Type',
        value: 'box',
        options: ['box', 'sphere', 'cone']
      },
      positionX: { label: 'Position X', value: 0, min: -10, max: 10, step: 0.1 },
      positionY: { label: 'Position Y', value: 0, min: -10, max: 10, step: 0.1 },
      positionZ: { label: 'Position Z', value: 0, min: -10, max: 10, step: 0.1 },
      rotationX: { label: 'Rotation X', value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
      rotationY: { label: 'Rotation Y', value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
      rotationZ: { label: 'Rotation Z', value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
      scale: { label: 'Scale', value: 1, min: 0.1, max: 3, step: 0.1 },
      color: { label: 'Color', value: '#ff6b6b' },
      wireframe: { label: 'Wireframe', value: false },
      opacity: { label: 'Opacity', value: 1, min: 0, max: 1, step: 0.01 },
      emissiveColor: { label: 'Emissive Color', value: '#000000' },
      metalness: { label: 'Metalness', value: 0.5, min: 0, max: 1, step: 0.01 },
      roughness: { label: 'Roughness', value: 0.5, min: 0, max: 1, step: 0.01 },
      reflectivity: { label: 'Reflectivity', value: 0.5, min: 0, max: 1, step: 0.01 },
    }),
    'Shadow Settings': folder({
      shadowBias: { label: 'Shadow Bias', value: 0, min: -0.01, max: 0.01, step: 0.0001 },
      shadowMapSize: { label: 'Shadow Map Size', value: 2048, min: 512, max: 4096, step: 512 },
      shadowRadius: { label: 'Shadow Radius', value: 4, min: 0, max: 16, step: 1 },
      shadowCameraNear: { label: 'Shadow Camera Near', value: 0.5, min: 0.1, max: 10, step: 0.1 },
      shadowCameraFar: { label: 'Shadow Camera Far', value: 50, min: 10, max: 200, step: 10 },
    }),
    // 他のフォルダも同様に
    // ...
  })

  // useFrameでアニメーション
  useFrame((state, delta) => {
    if (!enableAnimation) return
    const time = state.clock.elapsedTime
    let currentMesh: Mesh | null = null
    if (objectType === 'box' && boxRef.current) currentMesh = boxRef.current
    if (objectType === 'sphere' && sphereRef.current) currentMesh = sphereRef.current
    if (objectType === 'cone' && coneRef.current) currentMesh = coneRef.current

    if (currentMesh) {
      currentMesh.rotation.x += delta * rotationSpeed
      currentMesh.rotation.y += delta * rotationSpeed * 0.7
      const bounceOffset = Math.sin(time * bounceSpeed) * bounceHeight
      currentMesh.position.y = positionY + bounceOffset
    }

    if (autoRotateCamera) {
      state.camera.position.x = Math.cos(time * cameraSpeed) * 5
      state.camera.position.z = Math.sin(time * cameraSpeed) * 5
      state.camera.lookAt(0, 0, 0)
    }
  })

  return (
    <group>
      {/* ライティング */}
      <ambientLight intensity={ambientIntensity} />
      <directionalLight
        position={[directionalPositionX, directionalPositionY, directionalPositionZ]}
        intensity={directionalIntensity}
        castShadow
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-radius={shadowRadius}
        shadow-bias={shadowBias}
        shadow-camera-near={shadowCameraNear}
        shadow-camera-far={shadowCameraFar}
      />

      {/* オブジェクト */}
      {objectType === 'box' && (
        <Box
          ref={boxRef}
          position={[positionX, positionY, positionZ]}
          rotation={[rotationX, rotationY, rotationZ]}
          scale={scale}
        >
          <meshStandardMaterial
            color={color}
            wireframe={wireframe}
            opacity={opacity}
            transparent={opacity < 1}
            emissive={emissiveColor}
            metalness={metalness}
            roughness={roughness}
            reflectivity={reflectivity}
          />
        </Box>
      )}
      {objectType === 'sphere' && (
        <Sphere
          ref={sphereRef}
          position={[positionX, positionY, positionZ]}
          rotation={[rotationX, rotationY, rotationZ]}
          scale={scale}
        >
          <meshStandardMaterial
            color={color}
            wireframe={wireframe}
            opacity={opacity}
            transparent={opacity < 1}
            emissive={emissiveColor}
            metalness={metalness}
            roughness={roughness}
            reflectivity={reflectivity}
          />
        </Sphere>
      )}
      {objectType === 'cone' && (
        <Cone
          ref={coneRef}
          position={[positionX, positionY, positionZ]}
          rotation={[rotationX, rotationY, rotationZ]}
          scale={scale}
        >
          <meshStandardMaterial
            color={color}
            wireframe={wireframe}
            opacity={opacity}
            transparent={opacity < 1}
            emissive={emissiveColor}
            metalness={metalness}
            roughness={roughness}
            reflectivity={reflectivity}
          />
        </Cone>
      )}

      {/* 地面 */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      {/* ラベル */}
      <Text position={[0, -3.5, 0]} fontSize={0.5} color="white" anchorX="center">
        {`\${objectType.charAt(0).toUpperCase() + objectType.slice(1)} with Leva Controls`}
      </Text>
    </group>
  )
}