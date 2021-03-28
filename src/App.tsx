import { ChakraProvider, Flex, Text } from "@chakra-ui/react";
import { World } from "cannon";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  Audio,
  AudioListener,
  AudioLoader,
  OrthographicCamera,
  Scene,
  WebGLRenderer,
} from "three";
import customTheme from "./theme";
import { Layer } from "./types";
import { init } from "./utils/init";
import { renderScene } from "./utils/renderScene";
import { startGame } from "./utils/startGame";

export const App = () => {
  const boxHeight = 1;
  const originalBoxSize = 3;
  const [score, setScore] = useState(0);
  const width = 12;
  const height = width * (window.innerHeight / window.innerWidth);
  let stack = React.useRef<Layer[]>([]);
  let overhangs = React.useRef<Layer[]>([]);
  const gameStarted = React.useRef<boolean>(false);
  const gameEnded = React.useRef<boolean>(false);
  const world = React.useRef<World>(new World());
  const scene = React.useRef<Scene>(new Scene());
  const camera = React.useRef<OrthographicCamera>(
    new OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      0,
      1000
    )
  );
  /*
  camera = new THREE.PerspectiveCamera(
    45, // field of view
    aspect, // aspect ratio
    1, // near plane
    100 // far plane
  );
  */
  const renderer = React.useRef<WebGLRenderer>(
    new WebGLRenderer({ antialias: true })
  );
  const listener = React.useRef<AudioListener>(new AudioListener());
  const sound = React.useRef<Audio>(new Audio(listener.current));
  const audioLoader = React.useRef<AudioLoader>(new AudioLoader());
  // const textureLoader = React.useRef<TextureLoader>(new TextureLoader());

  const randomNumber = React.useRef<number>(
    Math.floor(Math.random() * Math.floor(360)) + 1
  );
  // textureLoader.current.load(
  //   "http://localhost:3000/texture.png",
  //   function (texture) {
  //     scene.current.background = texture;
  //   }
  // );
  useEffect(() => {
    // window.focus();
    init(
      originalBoxSize,
      boxHeight,
      stack,
      overhangs,
      world,
      scene,
      camera,
      listener,
      audioLoader,
      sound,
      renderer,
      randomNumber,
      gameEnded
    );
    window.addEventListener("click", (e: MouseEvent) => {
      let element = e.target as HTMLElement;
      if (element.tagName === "CANVAS") {
        if (gameEnded.current === false) {
          startGame(
            gameStarted,
            stack,
            overhangs,
            camera,
            world,
            renderer,
            scene,
            boxHeight,
            randomNumber,
            gameEnded
          );
          setScore(stack.current.length - 1);
        } else {
          // // Remove every object from world
          // while (world.current.bodies.length > 0) {
          //   world.current.remove(world.current.bodies[0]);
          // }

          // // Remove every Mesh from the scene
          // while (scene.current.children.find((c) => c.type == "Mesh")) {
          //   const mesh = scene.current.children.find((c) => c.type == "Mesh");
          //   if (mesh) {
          //     scene.current.remove(mesh);
          //   }
          // }

          // // Reset camera positions
          // camera.current.position.set(4, 4, 4);
          // camera.current.lookAt(0, 0, 0);
          // init(
          //   originalBoxSize,
          //   boxHeight,
          //   stack,
          //   overhangs,
          //   world,
          //   scene,
          //   camera,
          //   listener,
          //   audioLoader,
          //   sound,
          //   renderer,
          //   randomNumber,
          //   gameEnded
          // );
          window.location.reload();
        }
      }
    });

    window.addEventListener("resize", () => {
      const aspect = window.innerWidth / window.innerHeight;
      const width = 10;
      const height = width / aspect;

      camera.current.top = height / 2;
      camera.current.bottom = height / -2;
      // camera.current.position.set(4, 4, 4);
      // Reset renderer
      renderer.current.setSize(window.innerWidth, window.innerHeight);
      renderScene(renderer, scene, camera);
    });
  }, []);

  return (
    <ChakraProvider theme={customTheme}>
      <Flex position="relative" justifyContent="center">
        <Text
          position="absolute"
          fontSize="6xl"
          fontWeight="bold"
          color="white"
          textAlign="center"
          mt="30px"
        >
          {score}
        </Text>
        <div id="ins" className="ins1">
          <Text
            fontSize="6xl"
            fontWeight="bold"
            color="white"
            textAlign="center"
            mt="100px"
          >
            Click to restart
          </Text>
        </div>
      </Flex>
    </ChakraProvider>
  );
};
