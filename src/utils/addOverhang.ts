import { World } from "cannon";
import { Scene } from "three";
import { Layer } from "../types";
import { generateBox } from "./generateBox";

export const addOverhang = (
  x: number,
  z: number,
  width: number,
  depth: number,
  boxHeight: number,
  stack: React.MutableRefObject<Layer[]>,
  overhangs: React.MutableRefObject<Layer[]>,
  scene: React.MutableRefObject<Scene>,
  world: React.MutableRefObject<World>
) => {
  const y = boxHeight * (stack.current.length - 1);
  const overhang: Layer = generateBox(
    x,
    y,
    z,
    width,
    depth,
    "x",
    true,
    boxHeight,
    stack,
    scene,
    world
  );
  overhangs.current.push(overhang);
};
