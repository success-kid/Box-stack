import { NaiveBroadphase, World } from "cannon";
import {
  AmbientLight,
  Audio,
  AudioLoader,
  Color,
  DirectionalLight,
  OrthographicCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { LuminosityShader } from "three/examples/jsm/shaders/LuminosityShader";
import { Layer } from "../types";
import { addBottomLayer } from "./layers/addBottomLayer";
import { addLayer } from "./layers/addLayer";
import { renderScene } from "./renderScene";

export const init = (
  originalBoxSize: number,
  boxHeight: number,
  stack: React.MutableRefObject<Layer[]>,
  overhangs: React.MutableRefObject<Layer[]>,
  world: React.MutableRefObject<World>,
  scene: React.MutableRefObject<Scene>,
  camera: React.MutableRefObject<OrthographicCamera>,
  listener: any,
  audioLoader: React.MutableRefObject<AudioLoader>,
  sound: React.MutableRefObject<Audio<GainNode>>,
  renderer: React.MutableRefObject<WebGLRenderer>,
  randomNumber: React.MutableRefObject<number>,
  gameEnded: React.MutableRefObject<boolean>,
  composer: React.MutableRefObject<EffectComposer>
) => {
  const luminosityPass = new ShaderPass(LuminosityShader);
  composer.current.addPass(luminosityPass);
  gameEnded.current = false;
  stack.current = [];
  overhangs.current = [];

  world.current.gravity.set(0, -10, 0);
  world.current.broadphase = new NaiveBroadphase();
  world.current.solver.iterations = 40;

  scene.current.background = new Color(0x1a202c);
  // scene.current.fog = new Fog(0xc53030, 0.1);

  //Foundation
  addBottomLayer(
    0,
    0,
    originalBoxSize,
    originalBoxSize,
    "x",
    21,
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

  camera.current.position.set(4, 5, 4);
  camera.current.lookAt(0, 1, 0);

  // load a sound and set it as the Audio object's buffer
  camera.current.add(listener.current);

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
