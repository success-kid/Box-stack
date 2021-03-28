import { World } from "cannon";
import { OrthographicCamera, Scene, WebGLRenderer } from "three";
import { Layer } from "../types";
import { boxAnimation } from "./animations/boxAnimation";
import { newBlock } from "./newBlock";

export const startGame = (
  gameStarted: React.MutableRefObject<boolean>,
  stack: React.MutableRefObject<Layer[]>,
  overhangs: React.MutableRefObject<Layer[]>,
  camera: React.MutableRefObject<OrthographicCamera>,
  world: React.MutableRefObject<World>,
  renderer: React.MutableRefObject<WebGLRenderer>,
  scene: React.MutableRefObject<Scene>,
  boxHeight: number,
  randomNumber: React.MutableRefObject<number>,
  gameEnded: React.MutableRefObject<boolean>
) => {
  gameEnded.current = false;

  if (gameStarted.current === false) {
    renderer.current.setAnimationLoop(() =>
      boxAnimation(stack, overhangs, camera, world, renderer, scene)
    );
    gameStarted.current = true;
  } else {
    newBlock(
      stack,
      overhangs,
      camera,
      world,
      renderer,
      scene,
      boxHeight,
      randomNumber,
      gameEnded
    );
  }
};
