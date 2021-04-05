import { NaiveBroadphase } from "cannon";
import {
  AmbientLight,
  BufferGeometry,
  CatmullRomCurve3,
  DirectionalLight,
  Line,
  LineBasicMaterial,
  Vector3,
} from "three";
// import RobotoFont from "../../assets/fonts/RobotoLight.json";
import {
  GameEnded,
  MainCamera,
  MainRenderer,
  MainScene,
  MainWorld,
  OverhangsArray,
  RandomNumber,
  StackArray,
} from "../../types";
import { addBottomLayer } from "../layers/addBottomLayer";
import { addLayer } from "../layers/addLayer";
import { renderScene } from "../render/renderScene";

export const init = (
  originalBoxSize: number,
  boxHeight: number,
  stack: StackArray,
  overhangs: OverhangsArray,
  world: MainWorld,
  scene: MainScene,
  camera: MainCamera,
  renderer: MainRenderer,
  randomNumber: RandomNumber,
  gameEnded: GameEnded
) => {
  gameEnded.current = false;
  stack.current = [];
  overhangs.current = [];

  world.current.gravity.set(0, -10, 0);
  world.current.broadphase = new NaiveBroadphase();
  world.current.solver.iterations = 40;
  let stored: any = localStorage.getItem("highScore");

  if (stored !== null) {
    let path = new CatmullRomCurve3([
      new Vector3(-3, parseInt(stored), 0),
      new Vector3(15, parseInt(stored), 0),
    ]);
    let points = path.getPoints(50);

    const geometry = new BufferGeometry().setFromPoints(points);

    const material = new LineBasicMaterial({ color: 0xff0000 });

    // Create the final object to add to the scene
    const curveObject = new Line(geometry, material);
    scene.current.add(curveObject);
  }

  // scene.current.fog = new Fog("0x2D3748", 5, 20);
  // scene.current.fog = new Fog("0xFFFFFF", 10, 20);

  //Foundation
  addBottomLayer(
    0,
    -5,
    0,
    originalBoxSize,
    originalBoxSize,
    "x",
    11,
    stack,
    scene,
    world,
    randomNumber
  );

  // First layer
  addLayer(
    -5,
    0,
    originalBoxSize,
    originalBoxSize,
    "x",
    boxHeight,
    stack,
    scene,
    world,
    randomNumber
  );

  // Set up lights
  const ambientLight = new AmbientLight(0xffffff, 0.6);
  scene.current.add(ambientLight);

  const directionalLight = new DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(10, 20, 0);
  scene.current.add(directionalLight);

  // Camera
  camera.current.position.set(7, 7, 7);
  // camera.current.zoom = -10;

  camera.current.lookAt(2, 3, 2);

  // Renderer
  renderer.current.setSize(window.innerWidth, window.innerHeight);
  renderScene(renderer, scene, camera);

  document.body.appendChild(renderer.current.domElement);
};
