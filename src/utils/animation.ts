import { World } from "cannon";
import { OrthographicCamera, Scene, WebGLRenderer } from "three";
import { Layer } from "../types";
import { renderScene } from "./renderScene";
import { updatePhysics } from "./updatePhysics";

export const animation = (
  stack: React.MutableRefObject<Layer[]>,
  overhangs: React.MutableRefObject<Layer[]>,
  camera: React.MutableRefObject<OrthographicCamera>,
  world: React.MutableRefObject<World>,
  renderer: React.MutableRefObject<WebGLRenderer>,
  scene: React.MutableRefObject<Scene>
) => {
  const speed = 0.15;

  const topLayer: Layer = stack.current[stack.current.length - 1];

  topLayer.threejs.position[topLayer.direction] += speed;
  topLayer.cannonjs.position[topLayer.direction] += speed;
  // let calc = boxHeight * (stack.length - 2) + 4;
  let calc = stack.current.length + 2;

  if (camera.current) {
    if (camera.current.position.y < calc) {
      camera.current.position.y += speed;
    }
  }
  updatePhysics(world, overhangs);
  renderScene(renderer, scene, camera);
};
