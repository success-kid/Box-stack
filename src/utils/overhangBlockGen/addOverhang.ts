import {
  Layer,
  MainScene,
  MainWorld,
  OverhangsArray,
  RandomNumber,
  StackArray,
} from "../../types";
import { generateOverhangBox } from "./generateOverhangBox";

export const addOverhang = (
  x: number,
  z: number,
  width: number,
  depth: number,
  boxHeight: number,
  stack: StackArray,
  overhangs: OverhangsArray,
  scene: MainScene,
  world: MainWorld,
  randomNumber: RandomNumber
) => {
  const y = boxHeight * (stack.current.length - 1);

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
