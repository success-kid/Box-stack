import { World } from "cannon";
import { OrthographicCamera, Scene, WebGLRenderer } from "three";
import { Layer } from "../types";
import { addOverhang } from "./addOverhang";
import { cutBox } from "./cutBox";
import { addLayer } from "./layers/addLayer";
import { missedTheSpot } from "./missedSpot";

export const newBlock = (
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
  if (gameEnded.current) return;

  let boxSpawnDistance = -5;
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
};
