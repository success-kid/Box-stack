import { Body, World } from "cannon";
import {
  BoxGeometry,
  Mesh,
  MeshLambertMaterial,
  OrthographicCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { Distortion } from "tone";

export type Layer = {
  threejs: Mesh<BoxGeometry, MeshLambertMaterial>;
  cannonjs: Body;
  width: number;
  depth: number;
  direction: DirectionType;
};
export type OverhangBox = {
  depth: number;
  threejs: Mesh<BoxGeometry, MeshLambertMaterial>;
  width: number;
};

export type MainCamera = React.MutableRefObject<OrthographicCamera>;
export type MainRenderer = React.MutableRefObject<WebGLRenderer>;
export type MainScene = React.MutableRefObject<Scene>;
export type MainWorld = React.MutableRefObject<World>;

export type GameStarted = React.MutableRefObject<boolean>;
export type GameEnded = React.MutableRefObject<boolean>;
export type IsMobile = React.MutableRefObject<boolean>;
export type StackArray = React.MutableRefObject<Layer[]>;
export type OverhangsArray = React.MutableRefObject<Layer[]>;
export type RandomNumber = React.MutableRefObject<number>;
export type Streak = React.MutableRefObject<number>;
export type DirectionType = "x" | "z";
export type DistortionType = React.MutableRefObject<Distortion>;
