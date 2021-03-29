import { OrthographicCamera, Scene, WebGLRenderer } from "three";
import { renderScene } from "./renderScene";

export const resizeCameraForSmallerScreens = (
  aspect: number,
  size: number,
  camera: React.MutableRefObject<OrthographicCamera>,
  renderer: React.MutableRefObject<WebGLRenderer>,
  scene: React.MutableRefObject<Scene>
) => {
  camera.current.left = (size * aspect) / -1;
  camera.current.right = (size * aspect) / 1;
  camera.current.top = size / 1;
  camera.current.bottom = size / -1;

  camera.current.updateProjectionMatrix();
  renderer.current.setSize(window.innerWidth, window.innerHeight);

  renderScene(renderer, scene, camera);
};
