import { World } from "cannon";
import { OrthographicCamera, Scene, WebGLRenderer } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { Layer } from "../../types";
import { updatePhysics } from "../physics/updatePhysics";
import { renderScene } from "../render/renderScene";

export const boxAnimation = (
  stack: React.MutableRefObject<Layer[]>,
  overhangs: React.MutableRefObject<Layer[]>,
  camera: React.MutableRefObject<OrthographicCamera>,
  world: React.MutableRefObject<World>,
  renderer: React.MutableRefObject<WebGLRenderer>,
  scene: React.MutableRefObject<Scene>,
  _: React.MutableRefObject<EffectComposer>
) => {
  let speed = ((stack.current.length / 200 + 0.25) * 7) / 22;

  if (speed < 0.09) {
    speed = 0.09;
  }

  if (speed > 0.12) {
    speed = 0.12;
  }

  // let speed = 0.01;

  const topLayer: Layer = stack.current[stack.current.length - 1];
  let asi = topLayer.threejs.position[topLayer.direction] + speed;

  if (asi < 5) {
    topLayer.threejs.position[topLayer.direction] += speed;
    topLayer.cannonjs.position[topLayer.direction] += speed;
  } else {
    topLayer.threejs.position[topLayer.direction] -= speed;
    topLayer.cannonjs.position[topLayer.direction] -= speed;
  }

  // let calc = boxHeight * (stack.length - 2) + 4;

  let calc = stack.current.length + 2.5;

  if (camera.current.position.y < calc) {
    camera.current.position.y += speed;
  }

  updatePhysics(world, overhangs);
  renderScene(renderer, scene, camera);
};
