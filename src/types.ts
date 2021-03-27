import { Body } from "cannon";
import { BoxGeometry, Mesh, MeshLambertMaterial } from "three";

export type Layer = {
  threejs: Mesh<BoxGeometry, MeshLambertMaterial>;
  cannonjs: Body;
  width: number;
  depth: number;
  direction: "x" | "z";
};
export type OverhangBox = {
  depth: number;
  threejs: Mesh<BoxGeometry, MeshLambertMaterial>;
  width: number;
};
