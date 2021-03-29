import { OrthographicCamera, Scene, WebGLRenderer } from "three";
import { Layer } from "../../types";
import { renderScene } from "../render/renderScene";

export const endGameAnimation = (
  _: React.MutableRefObject<Layer[]>,
  // overhangs: React.MutableRefObject<Layer[]>,
  camera: React.MutableRefObject<OrthographicCamera>,
  // world: React.MutableRefObject<World>,
  renderer: React.MutableRefObject<WebGLRenderer>,
  scene: React.MutableRefObject<Scene>
) => {
  camera.current.position.set(4, 5, 4);

  renderScene(renderer, scene, camera);
};
