import { OrthographicCamera, Scene, WebGLRenderer } from "three";

export const renderScene = (
  renderer: React.MutableRefObject<WebGLRenderer>,
  scene: React.MutableRefObject<Scene>,
  camera: React.MutableRefObject<OrthographicCamera>
) => {
  renderer.current.render(scene.current, camera.current);
};
