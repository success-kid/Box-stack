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
import { addLayer } from "../layers/addLayer";
import { missedTheSpot } from "../miss/missedSpot";
import { addOverhang } from "../overhangBlockGen/addOverhang";
import { cutBox } from "../overhangBlockGen/cutBox";
import { playBlockEffectSound } from "./playBlockEffectSound";
import { streakSound } from "./streakSound";

export const newBlock = (
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
  if (gameEnded.current) return;

  let boxSpawnDistance = -5;
  const topLayer = stack.current[stack.current.length - 1];
  const previousLayer = stack.current[stack.current.length - 2];

  const direction = topLayer.direction;

  const delta =
    topLayer.threejs.position[direction] -
    previousLayer.threejs.position[direction];

  // how big is the oversize, makes it positive
  let overhangSize = Math.abs(delta);

  // const player = new Tone.Player(blockCut).toDestination();
  // Tone.loaded().then(() => {
  //   player.start();
  // });

  // only runs this when overhang is bigger than 0.1 otherwise, it places it automatically perfectly
  if (overhangSize > 0.1) {
    // resets the streak
    streak.current = 0;
    const size = direction === "x" ? topLayer.width : topLayer.depth;
    playBlockEffectSound();
    // overhang size
    const overlap = size - overhangSize;
    // you didn't miss
    if (overlap > 0) {
      // cuts the overhanging part
      cutBox(topLayer, overlap, size, delta, boxHeight);

      // how far will it spawn the overhang
      const overHangShift = (overlap / 2 + overhangSize / 2) * Math.sign(delta);
      const overhangX =
        direction === "x"
          ? topLayer.threejs.position.x + overHangShift
          : topLayer.threejs.position.x;
      const overhangZ =
        direction === "z"
          ? topLayer.threejs.position.z + overHangShift
          : topLayer.threejs.position.z;

      const overhangWidth = direction === "x" ? overhangSize : topLayer.width;
      const overhangDepth = direction === "z" ? overhangSize : topLayer.depth;

      addOverhang(
        overhangX,
        overhangZ,
        overhangWidth,
        overhangDepth,
        boxHeight,
        stack,
        overhangs,
        scene,
        world,
        randomNumber
      );

      // Next layer
      const nextX =
        direction === "x" ? topLayer.threejs.position.x : boxSpawnDistance;
      const nextZ =
        direction === "z" ? topLayer.threejs.position.z : boxSpawnDistance;

      const newWidth = topLayer.width;
      const newDepth = topLayer.depth;

      const nextDirection = direction === "x" ? "z" : "x";

      addLayer(
        nextX,
        nextZ,
        newWidth,
        newDepth,
        nextDirection,
        boxHeight,
        stack,
        scene,
        world,
        randomNumber
      );
    } else {
      missedTheSpot(
        stack,
        overhangs,
        boxHeight,
        scene,
        world,
        randomNumber,
        camera,
        renderer,
        gameEnded
      );
    }
  } else {
    // paricles here
    streakSound(streak);
    topLayer.threejs.position.x = previousLayer.threejs.position.x;
    topLayer.threejs.position.z = previousLayer.threejs.position.z;
    // Next layer
    const nextX =
      direction === "x" ? topLayer.threejs.position.x : boxSpawnDistance;
    const nextZ =
      direction === "z" ? topLayer.threejs.position.z : boxSpawnDistance;

    const newWidth = topLayer.width;
    const newDepth = topLayer.depth;

    const nextDirection = direction === "x" ? "z" : "x";
    // if streak is bigger or equal to 8 it will start placing bigger blocks depending on the axis x or z
    if (streak.current >= 8) {
      if (direction === "x") {
        addLayer(
          nextX,
          nextZ,
          newWidth,
          newDepth + 0.1,
          nextDirection,
          boxHeight,
          stack,
          scene,
          world,
          randomNumber
        );
      } else if (direction === "z") {
        addLayer(
          nextX,
          nextZ,
          newWidth + 0.1,
          newDepth,
          nextDirection,
          boxHeight,
          stack,
          scene,
          world,
          randomNumber
        );
      }
    }
    // when block is placed perfectly, but the streak isn't 8 or bigger yet
    else {
      addLayer(
        nextX,
        nextZ,
        newWidth,
        newDepth,
        nextDirection,
        boxHeight,
        stack,
        scene,
        world,
        randomNumber
      );
    }
  }
};
