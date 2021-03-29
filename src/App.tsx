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
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import customTheme from "./theme";
import { Layer } from "./types";
import { init } from "./utils/init";
import { renderScene } from "./utils/renderScene";
import { resizeCameraForSmallerScreens } from "./utils/resizeCameraForSmallerScreens";
import { startGame } from "./utils/startGame";

export const App = () => {
  const boxHeight = 1;
  const [score, setScore] = useState(0);
  let aspect = React.useRef<number>(window.innerWidth / window.innerHeight);
  let originalBoxSize = React.useRef<number>(3);
  let size = React.useRef<number>(5);
  let stack = React.useRef<Layer[]>([]);
  let overhangs = React.useRef<Layer[]>([]);
  const gameStarted = React.useRef<boolean>(false);
  const gameEnded = React.useRef<boolean>(false);
  const world = React.useRef<World>(new World());
  const scene = React.useRef<Scene>(new Scene());
  const camera = React.useRef<OrthographicCamera>(
    new OrthographicCamera(
      (size.current * aspect.current) / -2,
      (size.current * aspect.current) / 2,
      size.current / 2,
      size.current / -2,
      0,
      1000
    )
  );
  const renderer = React.useRef<WebGLRenderer>(
    new WebGLRenderer({ antialias: true, alpha: true })
  );
  const listener = React.useRef<AudioListener>(new AudioListener());
  const sound = React.useRef<Audio>(new Audio(listener.current));
  const audioLoader = React.useRef<AudioLoader>(new AudioLoader());
  const composer = React.useRef<EffectComposer>(
    new EffectComposer(renderer.current)
  );

  const randomNumber = React.useRef<number>(
    Math.floor(Math.random() * Math.floor(360)) + 1
  );

  useEffect(() => {
    init(
      originalBoxSize.current,
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
      gameEnded,
      composer
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
            gameEnded,
            composer
          );
          setScore(stack.current.length - 2);
        } else {
          window.location.reload();
        }
      }
    });
    let checkMobile = () => {
      let UserAgent = navigator.userAgent;

      if (
        UserAgent.match(
          /iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i
        ) != null ||
        UserAgent.match(/LG|SAMSUNG|Samsung/) != null
      ) {
        resizeCameraForSmallerScreens(
          aspect.current,
          size.current,
          camera,
          renderer,
          scene
        );
      }
    };
    checkMobile();

    if (window.innerWidth <= 900) {
      resizeCameraForSmallerScreens(
        aspect.current,
        size.current,
        camera,
        renderer,
        scene
      );
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth <= 900) {
        camera.current.left = (size.current * aspect.current) / -1;
        camera.current.right = (size.current * aspect.current) / 1;
        camera.current.top = size.current / 1;
        camera.current.bottom = size.current / -1;
      } else {
        camera.current.left = (size.current * aspect.current) / -2;
        camera.current.right = (size.current * aspect.current) / 2;
        camera.current.top = size.current / 2;
        camera.current.bottom = size.current / -2;
      }

      camera.current.updateProjectionMatrix();
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
            fontSize="3xl"
            fontWeight="bold"
            color="white"
            textAlign="center"
            mt="110px"
          >
            Click to restart
          </Text>
        </div>
      </Flex>
    </ChakraProvider>
  );
};
