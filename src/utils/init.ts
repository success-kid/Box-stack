import { NaiveBroadphase, World } from "cannon";
import {
  AmbientLight,
  Audio,
  AudioLoader,
  DirectionalLight,
  OrthographicCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { Layer } from "../types";
import { addLayer } from "./addLayer";
import { renderScene } from "./renderScene";

export const init = (
  originalBoxSize: number,
  boxHeight: number,
  stack: React.MutableRefObject<Layer[]>,
  world: React.MutableRefObject<World>,
  scene: React.MutableRefObject<Scene>,
  camera: React.MutableRefObject<OrthographicCamera>,
  listener: any,
  audioLoader: React.MutableRefObject<AudioLoader>,
  sound: React.MutableRefObject<Audio<GainNode>>,
  renderer: React.MutableRefObject<WebGLRenderer>
) => {
  world.current.gravity.set(0, -10, 0);
  world.current.broadphase = new NaiveBroadphase();
  world.current.solver.iterations = 40;

  // Foundation
  addLayer(
    0,
    0,
    originalBoxSize,
    originalBoxSize,
    "x",
    boxHeight,
    stack,
    scene,
    world
  );

  // First layer
  addLayer(
    -10,
    0,
    originalBoxSize,
    originalBoxSize,
    "x",
    boxHeight,
    stack,
    scene,
    world
  );

  // Set up lights
  const ambientLight = new AmbientLight(0xffffff, 0.6);
  scene.current.add(ambientLight);

  const directionalLight = new DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(10, 20, 0);
  scene.current.add(directionalLight);

  // Camera

  camera.current.position.set(4, 4, 4);
  camera.current.lookAt(0, 0, 0);

  camera.current.add(listener.current);

  // load a sound and set it as the Audio object's buffer

  audioLoader.current.load("ambient.ogg", (buffer: AudioBuffer) => {
    sound.current.setBuffer(buffer);
    sound.current.setLoop(true);
    sound.current.setVolume(0.2);
    sound.current.play();
  });

  // Renderer

  renderer.current.setSize(window.innerWidth, window.innerHeight);
  renderScene(renderer, scene, camera);

  document.body.appendChild(renderer.current.domElement);
};
