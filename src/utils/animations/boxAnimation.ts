import {
  MainCamera,
  MainRenderer,
  MainScene,
  MainWorld,
  OverhangsArray,
  StackArray,
} from "../../types";
import { animSpeed } from "../animSpeed";
import { updatePhysics } from "../physics/updatePhysics";
import { renderScene } from "../render/renderScene";

export const boxAnimation = (
  stack: StackArray,
  overhangs: OverhangsArray,
  camera: MainCamera,
  world: MainWorld,
  renderer: MainRenderer,
  scene: MainScene
) => {
  let { speed, topLayer, howFar } = animSpeed(stack);

  if (howFar <= 5) {
    topLayer.threejs.position[topLayer.direction] += speed;
    topLayer.cannonjs.position[topLayer.direction] += speed;
  }

  let calc = stack.current.length + 5;

  // let calc = stack.current.length + 2.5;

  if (camera.current.position.y < calc) {
    camera.current.position.y += speed;
  }

  updatePhysics(world, overhangs);
  renderScene(renderer, scene, camera);
};
