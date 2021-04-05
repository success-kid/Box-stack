import { Layer, StackArray } from "../types";

export const animSpeed = (stack: StackArray) => {
  let speed = ((stack.current.length / 200 + 0.25) * 7) / 22;
  if (speed < 0.09) {
    speed = 0.09;
  }

  if (speed > 0.12) {
    speed = 0.12;
  }

  const topLayer: Layer = stack.current[stack.current.length - 1];

  let howFar = topLayer.threejs.position[topLayer.direction] + speed;
  return { speed, topLayer, howFar };
};
