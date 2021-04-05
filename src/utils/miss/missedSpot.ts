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
} from "../../types";
import { endGameAnimation } from "../animations/endGameAnimation";
import { playBlockEffectSound } from "../newBlockGen/playBlockEffectSound";
import { addOverhang } from "../overhangBlockGen/addOverhang";

export const missedTheSpot = (
  stack: StackArray,
  overhangs: OverhangsArray,
  boxHeight: number,
  scene: MainScene,
  world: MainWorld,
  randomNumber: RandomNumber,
  camera: MainCamera,
  renderer: MainRenderer,
  gameEnded: GameEnded,
  distortion: DistortionType
) => {
  const topLayer = stack.current[stack.current.length - 1];
  playBlockEffectSound(distortion);
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

  let restart = document.getElementById("restart");
  let highscore = document.getElementById("highscore");
  if (restart) {
    restart.classList.remove("ins1");
    restart.classList.add("ins2");
  }
  let stored: any = localStorage.getItem("highScore");
  let currentHighScore = parseInt(stored);
  let score = stack.current.length - 2;
  if (stored === null) {
    localStorage.setItem("highScore", (0).toString());
  }

  if (score > currentHighScore) {
    localStorage.setItem("highScore", score.toString());
    if (highscore) {
      highscore.classList.remove("ins1");
      highscore.classList.add("ins2");
    }
  }
  gameEnded.current = true;
};
