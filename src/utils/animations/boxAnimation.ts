import {
  GameEnded,
  Layer,
  MainCamera,
  MainRenderer,
  MainScene,
  MainWorld,
  OverhangsArray,
  RandomNumber,
  StackArray,
} from "../../types";
import { updatePhysics } from "../physics/updatePhysics";
import { renderScene } from "../render/renderScene";

export const boxAnimation = (
  stack: StackArray,
  overhangs: OverhangsArray,
  camera: MainCamera,
  world: MainWorld,
  renderer: MainRenderer,
  scene: MainScene,
  gameEnded: GameEnded,
  randomNumber: RandomNumber,
  boxHeight: number
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

  let howFar = topLayer.threejs.position[topLayer.direction] + speed;

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
