import { ChakraProvider, Text } from "@chakra-ui/react";
import { World } from "cannon";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  Audio,
  AudioListener,
  AudioLoader,
  OrthographicCamera,
  Scene,
  TextureLoader,
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
  const width = 10;
  const height = width * (window.innerHeight / window.innerWidth);
  let stack = React.useRef<Layer[]>([]);
  let overhangs = React.useRef<Layer[]>([]);
  const gameStarted = React.useRef<boolean>(false);
  const world = React.useRef<World>(new World());
  const scene = React.useRef<Scene>(new Scene());
  const camera = React.useRef<OrthographicCamera>(
    new OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      1,
      100
    )
  );
  const renderer = React.useRef<WebGLRenderer>(
    new WebGLRenderer({ antialias: true })
  );
  const listener = React.useRef<AudioListener>(new AudioListener());
  const sound = React.useRef<Audio>(new Audio(listener.current));
  const audioLoader = React.useRef<AudioLoader>(new AudioLoader());
  const textureLoader = React.useRef<TextureLoader>(new TextureLoader());
  const infiniteMode = React.useRef<boolean>(false);
  const randomNumber = React.useRef<number>(
    Math.floor(Math.random() * Math.floor(360)) + 1
  );
  console.log("sad", randomNumber);

  useEffect(() => {
    window.addEventListener("click", (e: MouseEvent) => {
      let element = e.target as HTMLElement;
      if (element.tagName === "CANVAS") {
        startGame(
          gameStarted,
          stack,
          overhangs,
          camera,
          world,
          renderer,
          scene,
          infiniteMode,
          originalBoxSize,
          boxHeight,
          randomNumber
        );
        setScore(stack.current.length - 1);
      }
    });

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
      textureLoader,
      randomNumber
    );
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
      <Text
        position="absolute"
        fontSize="2xl"
        fontWeight="bold"
        top={10}
        right={10}
        color="white"
      >
        {score}
      </Text>
    </ChakraProvider>
  );
};
