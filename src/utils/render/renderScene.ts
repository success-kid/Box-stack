import { MainCamera, MainRenderer, MainScene } from "../../types";

export const renderScene = (
  renderer: MainRenderer,
  scene: MainScene,
  camera: MainCamera
) => {
  renderer.current.render(scene.current, camera.current);
};
