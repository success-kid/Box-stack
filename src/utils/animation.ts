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
  // let speed = ((stack.current.length / 200 + 0.25) * 7) / 22;

  // if (speed < 0.1) {
  //   speed = 0.11;
  // }

  // if (speed > 0.125) {
  //   speed = 0.124;
  // }
  let speed = 0.05;

  const topLayer: Layer = stack.current[stack.current.length - 1];

  topLayer.threejs.position[topLayer.direction] += speed;
  topLayer.cannonjs.position[topLayer.direction] += speed;
  // let calc = boxHeight * (stack.length - 2) + 4;
  let calc = stack.current.length + 2;

  if (camera.current.position.y < calc) {
    camera.current.position.y += speed;
  }
  updatePhysics(world, overhangs);
  renderScene(renderer, scene, camera);
};
