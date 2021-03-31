import {
  DirectionType,
  Layer,
  MainScene,
  MainWorld,
  RandomNumber,
  StackArray,
} from "../../types";
import { generateBox } from "../newBlockGen/generateBox";

export const addLayer = (
  x: number,
  z: number,
  width: number,
  depth: number,
  direction: DirectionType,
  boxHeight: number,
  stack: StackArray,
  scene: MainScene,
  world: MainWorld,
  randomNumber: RandomNumber
) => {
  const y = boxHeight * stack.current.length;
  const layer: Layer = generateBox(
    x,
    y,
    z,
    width,
    depth,
    direction,
    false,
    boxHeight,
    stack,
    scene,
    world,
    randomNumber
  );
  stack.current.push(layer);
};
