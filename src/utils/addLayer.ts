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
  scene: React.MutableRefObject<Scene>,
  world: React.MutableRefObject<World>
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
    world
  );
  stack.current.push(layer);
};
