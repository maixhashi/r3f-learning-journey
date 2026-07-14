import {
  BoxGeometry,
  Color,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  AmbientLight,
} from 'three'

/**
 * Minimal Three.js scene: Scene + PerspectiveCamera + WebGLRenderer + rAF.
 * Returns a dispose function for cleanup on unmount.
 */
export function createHelloScene(canvas: HTMLCanvasElement): () => void {
  const parent = canvas.parentElement
  const width = parent?.clientWidth || canvas.clientWidth || 800
  const height = parent?.clientHeight || canvas.clientHeight || 500

  const renderer = new WebGLRenderer({ canvas, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(width, height, false)
  renderer.setClearColor(new Color('#1f2937'))

  const scene = new Scene()

  const camera = new PerspectiveCamera(60, width / height, 0.1, 100)
  camera.position.set(3, 3, 3)
  camera.lookAt(0, 0, 0)

  const geometry = new BoxGeometry(1.5, 1.5, 1.5)
  const material = new MeshStandardMaterial({ color: '#ff6b6b' })
  const mesh = new Mesh(geometry, material)
  scene.add(mesh)

  const ambient = new AmbientLight(0xffffff, 0.4)
  scene.add(ambient)

  const directional = new DirectionalLight(0xffffff, 1)
  directional.position.set(5, 8, 4)
  scene.add(directional)

  let frameId = 0

  const tick = () => {
    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.015
    renderer.render(scene, camera)
    frameId = requestAnimationFrame(tick)
  }
  frameId = requestAnimationFrame(tick)

  const setSizeFromParent = () => {
    if (!parent) return
    const w = parent.clientWidth
    const h = parent.clientHeight
    if (w === 0 || h === 0) return
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h, false)
  }

  const observer = parent
    ? new ResizeObserver(() => {
        setSizeFromParent()
      })
    : null
  if (parent && observer) {
    observer.observe(parent)
  }

  return () => {
    cancelAnimationFrame(frameId)
    observer?.disconnect()
    geometry.dispose()
    material.dispose()
    renderer.dispose()
  }
}
