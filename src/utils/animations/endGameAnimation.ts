import { OrthographicCamera, Scene, WebGLRenderer } from "three";
import { Layer } from "../../types";
import { renderScene } from "../renderScene";

export const endGameAnimation = (
  stack: React.MutableRefObject<Layer[]>,
  // overhangs: React.MutableRefObject<Layer[]>,
  camera: React.MutableRefObject<OrthographicCamera>,
  // world: React.MutableRefObject<World>,
  renderer: React.MutableRefObject<WebGLRenderer>,
  scene: React.MutableRefObject<Scene>
) => {
  let width = stack.current.length + 10;
  const height = width * (window.innerHeight / window.innerWidth);
  camera.current.position.set(4, 5, 4);
  if (stack.current.length < 15) {
    camera.current.position.set(4, 5, 4);
  }
  camera.current.top = height / 2;
  camera.current.bottom = height / -2;
  camera.current.left = height / -2;
  camera.current.right = height / 2;

  renderScene(renderer, scene, camera);
};
