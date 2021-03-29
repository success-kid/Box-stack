import { World } from "cannon";
import { Layer } from "../../types";

export const updatePhysics = (
  world: React.MutableRefObject<World | undefined>,
  overhangs: React.MutableRefObject<Layer[]>
) => {
  if (world.current) {
    world.current.step(1 / 60);
  }
  overhangs.current.forEach((element: any) => {
    element.threejs.position.copy(element.cannonjs.position);
    element.threejs.quaternion.copy(element.cannonjs.quaternion);
  });
};
