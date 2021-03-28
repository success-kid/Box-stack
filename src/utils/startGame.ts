import { World } from "cannon";
import { OrthographicCamera, Scene, WebGLRenderer } from "three";
import { Layer } from "../types";
import { addLayer } from "./addLayer";
import { addOverhang } from "./addOverhang";
import { animation } from "./animation";
import { cutBox } from "./cutBox";
import { missedTheSpot } from "./missedSpot";

export const startGame = (
  gameStarted: React.MutableRefObject<boolean>,
  stack: React.MutableRefObject<Layer[]>,
  overhangs: React.MutableRefObject<Layer[]>,
  camera: React.MutableRefObject<OrthographicCamera>,
  world: React.MutableRefObject<World>,
  renderer: React.MutableRefObject<WebGLRenderer>,
  scene: React.MutableRefObject<Scene>,
  infiniteMode: React.MutableRefObject<boolean>,
  originalBoxSize: number,
  boxHeight: number,
  randomNumber: React.MutableRefObject<number>
) => {
  let boxSpawnDistance = -5;
  if (gameStarted.current === false) {
    if (renderer.current) {
      renderer.current.setAnimationLoop(() =>
        animation(stack, overhangs, camera, world, renderer, scene)
      );
    }
    gameStarted.current = true;
  } else {
    if (infiniteMode.current === true) {
      const topLayer = stack.current[stack.current.length - 1];

      const direction = topLayer.direction;

      const newWidth = originalBoxSize;
      const newDepth = originalBoxSize;

      const nextX = direction === "x" ? 0 : boxSpawnDistance;
      const nextZ = direction === "z" ? 0 : boxSpawnDistance;

      const nextDirection = direction === "x" ? "z" : "x";

      addLayer(
        nextX,
        nextZ,
        newWidth,
        newDepth,
        nextDirection,
        boxHeight,
        stack,
        overhangs,
        scene,
        world,
        randomNumber
      );
    } else {
      const topLayer = stack.current[stack.current.length - 1];
      const previousLayer = stack.current[stack.current.length - 2];

      const direction = topLayer.direction;

      const delta =
        topLayer.threejs.position[direction] -
        previousLayer.threejs.position[direction];
      const overhangSize = Math.abs(delta);

      const size = direction === "x" ? topLayer.width : topLayer.depth;

      const overlap = size - overhangSize;
      if (overlap > 0) {
        cutBox(topLayer, overlap, size, delta, boxHeight);

        const overHangShift =
          (overlap / 2 + overhangSize / 2) * Math.sign(delta);

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
          overhangs,
          scene,
          world,
          randomNumber
        );
      } else {
        missedTheSpot(stack, overhangs, boxHeight, scene, world, randomNumber);
      }
    }
  }
};
