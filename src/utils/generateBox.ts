import { Body, Box as CannonBox, Vec3, World } from "cannon";
import { BoxGeometry, Color, Mesh, MeshLambertMaterial, Scene } from "three";
import { Layer } from "../types";
export const generateBox = (
  x: number,
  y: number,
  z: number,
  width: number,
  depth: number,
  direction: "x" | "z",
  falls: boolean,
  boxHeight: number,
  stack: React.MutableRefObject<Layer[]>,
  scene: React.MutableRefObject<Scene | undefined>,
  world: React.MutableRefObject<World | undefined>
) => {
  const geometry = new BoxGeometry(width, boxHeight, depth);

  // generates cube color (hue saturation and lightness) based on stack length
  const color = new Color(`hsl(${30 + stack.current.length * 4}, 100%, 50%)`);
  const material = new MeshLambertMaterial({ color });

  const cube = new Mesh(geometry, material);
  cube.position.set(x, y, z);

  if (scene.current) {
    scene.current.add(cube);
  }

  const shape = new CannonBox(new Vec3(width / 2, boxHeight / 2, depth / 2));

  let mass = falls ? 5 : 0;

  const body = new Body({ mass, shape });
  body.position.set(x, y, z);
  if (world.current) {
    world.current.addBody(body);
  }

  return {
    threejs: cube,
    cannonjs: body,
    width,
    depth,
    direction,
  };
};
