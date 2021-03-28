import { World } from "cannon";
import { Scene } from "three";
import { Layer } from "../types";
import { generateBox } from "./generateBox";

export const addLayer = (
  x: number,
  z: number,
  width: number,
  depth: number,
  direction: "x" | "z",
  boxHeight: number,
  stack: React.MutableRefObject<Layer[]>,
  overhangs: React.MutableRefObject<Layer[]>,
  scene: React.MutableRefObject<Scene>,
  world: React.MutableRefObject<World>,
  randomNumber: React.MutableRefObject<number>
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
    overhangs,
    scene,
    world,
    randomNumber
  );
  stack.current.push(layer);
};
