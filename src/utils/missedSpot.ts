import { World } from "cannon";
import { Scene } from "three";
import { Layer } from "../types";
import { addOverhang } from "./addOverhang";

export const missedTheSpot = (
  stack: React.MutableRefObject<Layer[]>,
  overhangs: React.MutableRefObject<Layer[]>,
  boxHeight: number,
  scene: React.MutableRefObject<Scene>,
  world: React.MutableRefObject<World>
) => {
  const topLayer = stack.current[stack.current.length - 1];

  // Turn to top layer into an overhang and let it fall down
  addOverhang(
    topLayer.threejs.position.x,
    topLayer.threejs.position.z,
    topLayer.width,
    topLayer.depth,
    boxHeight,
    stack,
    overhangs,
    scene,
    world
  );
  if (world.current) {
    world.current.remove(topLayer.cannonjs);
  }

  if (scene.current) {
    scene.current.remove(topLayer.threejs);
  }

  console.log("you lose");

  // gameEnded = true;

  // if (resultsElement && !autopilot) resultsElement.style.display = "flex";
};
