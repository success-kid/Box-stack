import { Box as CannonBox, Vec3 } from "cannon";
import { Layer } from "../types";
export const cutBox = (
  topLayer: Layer,
  overlap: number,
  size: number,
  delta: number,
  boxHeight: number
) => {
  const direction = topLayer.direction;
  const newWidth = direction === "x" ? overlap : topLayer.width;
  const newDepth = direction === "z" ? overlap : topLayer.depth;

  topLayer.width = newWidth;
  topLayer.depth = newDepth;

  topLayer.threejs.scale[direction] = overlap / size;
  topLayer.threejs.position[direction] -= delta / 2;

  topLayer.cannonjs.position[direction] -= delta / 2;

  const shape = new CannonBox(
    new Vec3(newWidth / 2, boxHeight / 2, newDepth / 2)
  );

  topLayer.cannonjs.shapes = [];
  topLayer.cannonjs.addShape(shape);
};
