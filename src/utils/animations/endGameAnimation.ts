import { MainCamera } from "../../types";

export const endGameAnimation = (camera: MainCamera) => {
  camera.current.position.set(7, 7, 7);
};
