import {
  DistortionType,
  GameEnded,
  MainCamera,
  MainRenderer,
  MainScene,
  MainWorld,
  OverhangsArray,
  RandomNumber,
  StackArray,
  Streak,
} from "../../types";
import { boxAnimation } from "../animations/boxAnimation";
import { animSpeed } from "../animSpeed";
import { missedTheSpot } from "../miss/missedSpot";
import { newBlock } from "../newBlockGen/newBlock";

export const startGame = (
  gameStarted: React.MutableRefObject<boolean>,
  stack: StackArray,
  overhangs: OverhangsArray,
  camera: MainCamera,
  world: MainWorld,
  renderer: MainRenderer,
  scene: MainScene,
  boxHeight: number,
  randomNumber: RandomNumber,
  gameEnded: GameEnded,
  streak: Streak,
  distortion: DistortionType
) => {
  gameEnded.current = false;

  if (gameStarted.current === false) {
    renderer.current.setAnimationLoop(() => {
      let { howFar } = animSpeed(stack);

      if (howFar >= 5 && gameEnded.current === false) {
        missedTheSpot(
          stack,
          overhangs,
          boxHeight,
          scene,
          world,
          randomNumber,
          camera,
          renderer,
          gameEnded,
          distortion
        );
      }

      boxAnimation(stack, overhangs, camera, world, renderer, scene);
    });
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
      streak,
      distortion
    );
  }
};
