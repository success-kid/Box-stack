import { World } from "cannon";
import { OrthographicCamera, Scene, WebGLRenderer } from "three";
import { Layer } from "../types";
import { addOverhang } from "./addOverhang";
import { endGameAnimation } from "./animations/endGameAnimation";

export const missedTheSpot = (
  stack: React.MutableRefObject<Layer[]>,
  overhangs: React.MutableRefObject<Layer[]>,
  boxHeight: number,
  scene: React.MutableRefObject<Scene>,
  world: React.MutableRefObject<World>,
  randomNumber: React.MutableRefObject<number>,
  camera: React.MutableRefObject<OrthographicCamera>,
  renderer: React.MutableRefObject<WebGLRenderer>,
  gameEnded: React.MutableRefObject<boolean>
) => {
  const topLayer = stack.current[stack.current.length - 1];

  addOverhang(
    topLayer.threejs.position.x,
    topLayer.threejs.position.z,
    topLayer.width,
    topLayer.depth,
    boxHeight,
    stack,
    overhangs,
    scene,
    world,
    randomNumber
  );

  world.current.remove(topLayer.cannonjs);
  scene.current.remove(topLayer.threejs);

  requestAnimationFrame(() => endGameAnimation(stack, camera, renderer, scene));
  gameEnded.current = true;
};
