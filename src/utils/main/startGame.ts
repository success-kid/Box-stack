import { World } from "cannon";
import { OrthographicCamera, Scene, WebGLRenderer } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { Layer } from "../../types";
import { boxAnimation } from "../animations/boxAnimation";
import { newBlock } from "../newBlockGen/newBlock";

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
  gameEnded: React.MutableRefObject<boolean>,
  composer: React.MutableRefObject<EffectComposer>,
  streak: React.MutableRefObject<number>
) => {
  gameEnded.current = false;

  if (gameStarted.current === false) {
    renderer.current.setAnimationLoop(() =>
      boxAnimation(stack, overhangs, camera, world, renderer, scene, composer)
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
      gameEnded,
      streak
    );
  }
};
