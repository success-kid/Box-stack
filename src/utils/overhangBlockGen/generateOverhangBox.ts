import { Body, Box as CannonBox, Vec3 } from "cannon";
import { BoxGeometry, Color, Mesh, MeshLambertMaterial } from "three";
import {
  DirectionType,
  MainScene,
  MainWorld,
  RandomNumber,
  StackArray,
} from "../../types";
export const generateOverhangBox = (
  x: number,
  y: number,
  z: number,
  width: number,
  depth: number,
  direction: DirectionType,
  falls: boolean,
  boxHeight: number,
  stack: StackArray,
  scene: MainScene,
  world: MainWorld,
  randomNumber: RandomNumber
) => {
  const geometry = new BoxGeometry(width, boxHeight, depth);

  // generates cube color (hue saturation and lightness) based on stack length
  const color = new Color(
    `hsl(${randomNumber.current + (stack.current.length - 1) * 7}, 100%, 50%)`
  );

  const material = new MeshLambertMaterial({
    color,
  });

  const cube = new Mesh(geometry, material);
  cube.position.set(x, y, z);

  scene.current.add(cube);

  const shape = new CannonBox(new Vec3(width / 2, boxHeight / 2, depth / 2));

  let mass = falls ? 5 : 0;

  const body = new Body({ mass, shape });
  body.position.set(x, y, z);
  world.current.addBody(body);

  return {
    threejs: cube,
    cannonjs: body,
    width,
    depth,
    direction,
  };
};
