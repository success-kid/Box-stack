import { MainWorld, OverhangsArray } from "../../types";

export const updatePhysics = (world: MainWorld, overhangs: OverhangsArray) => {
  world.current.step(1 / 60);
  overhangs.current.forEach((element: any) => {
    element.threejs.position.copy(element.cannonjs.position);
    element.threejs.quaternion.copy(element.cannonjs.quaternion);
  });
};
