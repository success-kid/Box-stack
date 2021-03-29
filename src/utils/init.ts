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
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
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
  _: React.MutableRefObject<EffectComposer>
) => {
  // const luminosityPass = new ShaderPass(LuminosityShader);
  // composer.current.addPass(luminosityPass);
  gameEnded.current = false;
  stack.current = [];
  overhangs.current = [];

  world.current.gravity.set(0, -10, 0);
  world.current.broadphase = new NaiveBroadphase();
  world.current.solver.iterations = 40;

  // scene.current.background = new LinearC(0x1a202c);
  // scene.current
  // renderer.current.setClearColor(0x000000, 0);
  // scene.current.fog = new Fog(0xc53030, 0.1);

  // let particle = new Object3D();
  // let geometry = new TetrahedronGeometry(0.5, 0);
  // let material = new MeshPhongMaterial({
  //   color: 0xffffff,
  //   flatShading: true,
  // });
  // scene.current.add(particle);

  // function animate() {
  //   requestAnimationFrame(animate);

  //   particle.rotation.x += 0.0;
  //   particle.rotation.y -= 0.004;
  //   renderer.current.clear();
  //   renderScene(renderer, scene, camera);
  // }
  // animate();

  // for (let i = 0; i < 1000; i++) {
  //   let mesh = new Mesh(geometry, material);
  //   mesh.position
  //     .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
  //     .normalize();
  //   mesh.position.multiplyScalar(90 + Math.random() * 700);
  //   mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  //   particle.add(mesh);
  // }

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
