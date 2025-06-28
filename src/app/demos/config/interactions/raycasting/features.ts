import { FeatureFile } from '../../types'

export const raycastingFeatures: FeatureFile[] = [
  {
    id: 'raycasting-basics',
    name: "レイキャストの基本",
    description: "マウス位置からのレイキャストによる3Dオブジェクトとの交差判定",
    files: ["src/app/demos/interactions/raycasting/components/RaycastingDemo.tsx"],
    codeSections: [
      {
        title: "レイキャストの実装",
        description: "マウス座標を3D空間のレイに変換して交差判定を行う",
        fileName: "RaycastingDemo.tsx",
        code: `// マウス移動時のレイキャスト処理
const handleMouseMove = (event: any) => {
  // マウス座標を正規化 (-1 to 1)
  const rect = gl.domElement.getBoundingClientRect()
  mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  // レイキャストを実行
  raycaster.current.setFromCamera(mouse.current, camera)
  
  // シーン内のメッシュオブジェクトと交差判定
  const meshes = Object.values(boxRefs.current).filter(Boolean)
  const intersects = raycaster.current.intersectObjects(meshes)

  if (intersects.length > 0) {
    const intersect = intersects[0]
    const mesh = intersect.object as Mesh
    const boxId = mesh.userData.boxId
    
    setHoveredObject(\`box-\${boxId}\`)
    setRaycastInfo({
      distance: intersect.distance,
      point: intersect.point,
      objectName: \`Box \${boxId}\`
    })
  }
}`,
        highlights: [
          {
            id: "mouse-normalization",
            startLine: 3,
            endLine: 6,
            startColumn: 2,
            endColumn: 75,
            tooltip: {
              title: "マウス座標の正規化",
              description: "ブラウザのピクセル座標を3D空間で使用する正規化座標(-1から1)に変換します。これによりカメラの視錐台内での正確な位置を特定できます。",
              documentationUrl: "https://threejs.org/docs/#api/en/core/Raycaster",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/events#pointer-events"
            }
          },
          {
            id: "raycaster-setup",
            startLine: 8,
            endLine: 9,
            startColumn: 2,
            endColumn: 55,
            tooltip: {
              title: "レイキャスターの設定",
              description: "setFromCameraメソッドでカメラ位置からマウス位置に向かうレイ（光線）を作成します。このレイが3Dオブジェクトと交差するかを判定します。",
              documentationUrl: "https://threejs.org/docs/#api/en/core/Raycaster.setFromCamera",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/events#pointer-events"
            }
          },
          {
            id: "intersection-test",
            startLine: 11,
            endLine: 13,
            startColumn: 2,
            endColumn: 65,
            tooltip: {
                title: "交差判定",
                description: "intersectObjectsメソッドでレイと3Dオブジェクトの交差を計算します。結果は距離順にソートされた配列で返され、最初の要素が最も近いオブジェクトです。",
                documentationUrl: "https://threejs.org/docs/#api/en/core/Raycaster.intersectObjects",
                r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/events#pointer-events"
              }
            },
            {
              id: "intersection-data",
              startLine: 15,
              endLine: 22,
              startColumn: 4,
              endColumn: 6,
              tooltip: {
                title: "交差データの取得",
                description: "交差結果からオブジェクト、距離、交差点座標などの詳細情報を取得できます。これらの情報を使ってインタラクティブな反応を実装します。",
                documentationUrl: "https://threejs.org/docs/#api/en/core/Raycaster",
                r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/events#pointer-events"
              }
            }
          ]
        }
      ]
    },
    {
      id: 'interactive-feedback',
      name: "インタラクティブフィードバック",
      description: "レイキャスト結果に基づくビジュアルフィードバックの実装",
      files: ["src/app/demos/interactions/raycasting/components/RaycastingDemo.tsx"],
      codeSections: [
        {
          title: "ホバーとクリックの反応",
          description: "レイキャスト結果に基づいてオブジェクトの見た目を動的に変更",
          fileName: "RaycastingDemo.tsx",
          code: `// アニメーション処理
  useFrame((state) => {
    boxes.forEach((box) => {
      const mesh = boxRefs.current[box.id]
      if (mesh) {
        const isHovered = hoveredObject === \`box-\${box.id}\`
        const isClicked = clickedObject === \`box-\${box.id}\`
        
        // ホバー時のスケールアニメーション
        const targetScale = isHovered ? 1.2 : (isClicked ? 1.4 : 1)
        mesh.scale.lerp({ x: targetScale, y: targetScale, z: targetScale } as any, 0.1)
        
        // クリック時の回転アニメーション
        if (isClicked) {
          mesh.rotation.y += 0.05
        }
        
        // 常時微細な浮遊アニメーション
        mesh.position.y = box.position[1] + Math.sin(state.clock.elapsedTime + box.id) * 0.1
      }
    })
  })
  
  // レンダリング時の色変更
  <meshStandardMaterial 
    color={isClicked ? '#ff0000' : (isHovered ? '#ffffff' : box.color)}
    emissive={isHovered ? '#222222' : '#000000'}
  />`,
          highlights: [
            {
              id: "scale-animation",
              startLine: 9,
              endLine: 11,
              startColumn: 6,
              endColumn: 90,
              tooltip: {
                title: "スケールアニメーション",
                description: "lerpメソッドを使用して滑らかなスケール変化を実現します。ホバー時とクリック時で異なるスケール値を設定し、視覚的なフィードバックを提供します。",
                documentationUrl: "https://threejs.org/docs/#api/en/math/Vector3.lerp",
                r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/your-first-scene#animating-the-cube"
              }
            },
            {
              id: "rotation-feedback",
              startLine: 13,
              endLine: 16,
              startColumn: 6,
              endColumn: 8,
              tooltip: {
                title: "回転フィードバック",
                description: "クリックされたオブジェクトに継続的な回転アニメーションを適用します。ユーザーのアクションに対する明確な視覚的応答を提供します。",
                documentationUrl: "https://threejs.org/docs/#api/en/core/Object3D.rotation",
                r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/your-first-scene#animating-the-cube"
              }
            },
            {
              id: "color-feedback",
              startLine: 24,
              endLine: 27,
              startColumn: 2,
              endColumn: 4,
              tooltip: {
                title: "色による状態表示",
                description: "オブジェクトの状態（通常/ホバー/クリック）に応じて色とエミッシブ（発光）プロパティを変更します。直感的な状態表示を実現します。",
                documentationUrl: "https://threejs.org/docs/#api/en/materials/MeshStandardMaterial",
                r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/objects#materials"
              }
            }
          ]
        }
      ]
    },
    {
      id: 'advanced-raycasting',
      name: "高度なレイキャスト",
      description: "レイキャスト情報の可視化と詳細データの活用",
      files: ["src/app/demos/interactions/raycasting/components/RaycastingDemo.tsx"],
      codeSections: [
        {
          title: "レイキャスト情報の表示と可視化",
          description: "交差点の座標、距離、レイの可視化を実装",
          fileName: "RaycastingDemo.tsx",
          code: `// レイキャスト情報表示
  {raycastInfo && (
    <group>
      <Text
        position={[0, 3.5, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
      >
        {\`\${raycastInfo.objectName} - Distance: \${raycastInfo.distance.toFixed(2)}\`}
      </Text>
      <Text
        position={[0, 3, 0]}
        fontSize={0.25}
        color="yellow"
        anchorX="center"
      >
        {\`Point: (\${raycastInfo.point.x.toFixed(1)}, \${raycastInfo.point.y.toFixed(1)}, \${raycastInfo.point.z.toFixed(1)})\`}
      </Text>
    </group>
  )}
  
  // レイキャストの可視化
  {raycastInfo && (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2}
          array={new Float32Array([
            camera.position.x, camera.position.y, camera.position.z,
            raycastInfo.point.x, raycastInfo.point.y, raycastInfo.point.z
          ])}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#00ff00" opacity={0.5} transparent />
    </line>
  )}`,
          highlights: [
            {
              id: "info-display",
              startLine: 2,
              endLine: 19,
              startColumn: 2,
              endColumn: 4,
              tooltip: {
                title: "情報表示",
                description: "レイキャストで取得した距離や交差点座標をリアルタイムで表示します。デバッグや学習目的で非常に有用な機能です。",
                documentationUrl: "https://threejs.org/docs/#api/en/core/Raycaster",
                r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/events#pointer-events"
              }
            },
            {
              id: "ray-visualization",
              startLine: 22,
              endLine: 35,
              startColumn: 2,
              endColumn: 4,
              tooltip: {
                title: "レイの可視化",
                description: "カメラから交差点までのレイを緑色の線で描画します。レイキャストの動作を視覚的に理解するのに役立ちます。",
                documentationUrl: "https://threejs.org/docs/#api/en/core/BufferGeometry",
                r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/objects#geometry"
              }
            },
            {
              id: "buffer-geometry",
              startLine: 24,
              endLine: 33,
              startColumn: 4,
              endColumn: 6,
              tooltip: {
                title: "BufferGeometry",
                description: "効率的な線の描画のためにBufferGeometryを使用します。頂点データを直接配列で指定することで高性能な描画を実現します。",
                documentationUrl: "https://threejs.org/docs/#api/en/core/BufferGeometry",
                r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/objects#geometry"
              }
            }
          ]
        }
      ]
    }
  ]
  