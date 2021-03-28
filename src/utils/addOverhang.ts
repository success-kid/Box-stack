import { World } from "cannon";
import { Scene } from "three";
import { Layer } from "../types";
import { generateOverhangBox } from "./generateOverhangBox";

export const addOverhang = (
  x: number,
  z: number,
  width: number,
  depth: number,
  boxHeight: number,
  stack: React.MutableRefObject<Layer[]>,
  overhangs: React.MutableRefObject<Layer[]>,
  scene: React.MutableRefObject<Scene>,
  world: React.MutableRefObject<World>,
  randomNumber: React.MutableRefObject<number>
) => {
  const y = boxHeight * (stack.current.length - 1);
  console.log("addOverhang", randomNumber);

  const overhang: Layer = generateOverhangBox(
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
    world,
    randomNumber
  );
  overhangs.current.push(overhang);
};
