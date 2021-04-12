import { MainCamera, MainRenderer, MainScene } from "../../types";
import { renderScene } from "../render/renderScene";

export const resizeCameraForSmallerScreens = (
  aspect: number,
  size: number,
  camera: MainCamera,
  renderer: MainRenderer,
  scene: MainScene
) => {
  camera.current.left = (size * aspect) / -1.7;
  camera.current.right = (size * aspect) / 1.7;
  camera.current.top = size / 1.7;
  camera.current.bottom = size / -1.7;
  camera.current.updateProjectionMatrix();
  renderer.current.setSize(window.innerWidth / 1.7, window.innerHeight / 1.7);
  renderScene(renderer, scene, camera);
};
