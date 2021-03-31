import { MainCamera, MainRenderer, MainScene } from "../../types";

export const resizeCameraForSmallerScreens = (
  aspect: number,
  size: number,
  camera: MainCamera,
  renderer: MainRenderer,
  scene: MainScene
) => {
  // camera.current.left = (size * aspect) / -1;
  // camera.current.right = (size * aspect) / 1;
  // camera.current.top = size / 1;
  // camera.current.bottom = size / -1;
  // camera.current.updateProjectionMatrix();
  // renderer.current.setSize(window.innerWidth, window.innerHeight);
  // renderScene(renderer, scene, camera);
};
