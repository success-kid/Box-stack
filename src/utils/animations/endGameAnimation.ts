import { MainCamera, MainRenderer, MainScene, StackArray } from "../../types";

export const endGameAnimation = (
  stack: StackArray,
  // overhangs: OverhangsArray,
  camera: MainCamera,
  // world: MainWorld,
  renderer: MainRenderer,
  scene: MainScene
) => {
  camera.current.position.set(7, 7, 7);
  // camera.current.position.set(4, 5, 4);
  // renderScene(renderer, scene, camera);
  // const controls = new OrbitControls( camera, renderer.domElement );
  // //controls.update() must be called after any manual changes to the camera's transform
  // camera.position.set( 0, 20, 100 );
  // controls.update();
  // function animate() {
  // 	requestAnimationFrame( animate );
  // 	// required if controls.enableDamping or controls.autoRotate are set to true
  // 	controls.update();
  // 	renderScene(renderer, scene, camera);
  // }
};
