import { NaiveBroadphase, World } from "cannon";
import {
  AmbientLight,
  Audio,
  AudioLoader,
  DirectionalLight,
  OrthographicCamera,
  Scene,
  TextureLoader,
  WebGLRenderer,
} from "three";
import { Layer } from "../types";
import { addLayer } from "./addLayer";
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
  textureLoader: React.MutableRefObject<TextureLoader>,
  randomNumber: React.MutableRefObject<number>
) => {
  world.current.gravity.set(0, -10, 0);
  world.current.broadphase = new NaiveBroadphase();
  world.current.solver.iterations = 40;

  // scene.current.background = new Color(0x1a202c);
  // scene.current.fog = new FogExp2(0x03544e, 0.001);

  textureLoader.current.load(
    "https://i.pinimg.com/564x/4e/4a/e2/4e4ae24b080f782b0d280aa7d5e0ca45.jpg",
    function (texture) {
      scene.current.background = texture;
    }
  );
  // ../../public
  // Foundation
  addLayer(
    0,
    0,
    originalBoxSize,
    originalBoxSize,
    "x",
    boxHeight,
    stack,
    overhangs,
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
    overhangs,
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
  camera.current.lookAt(0, 0, 0);

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
