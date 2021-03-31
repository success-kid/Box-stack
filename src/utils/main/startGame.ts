import {
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
  streak: Streak
) => {
  gameEnded.current = false;

  if (gameStarted.current === false) {
    renderer.current.setAnimationLoop(() =>
      boxAnimation(
        stack,
        overhangs,
        camera,
        world,
        renderer,
        scene,
        gameEnded,
        randomNumber,
        boxHeight
      )
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
