import { ChakraProvider, Flex, IconButton, Text } from "@chakra-ui/react";
import { World } from "cannon";
import * as React from "react";
import { useEffect, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { OrthographicCamera, Scene, WebGLRenderer } from "three";
import { Distortion } from "tone";
import customTheme from "./theme";
import { Layer } from "./types";
import { resizeCameraForSmallerScreens } from "./utils/camera/resizeCameraForSmallerScreens";
import { init } from "./utils/main/init";
import { startGame } from "./utils/main/startGame";
import { renderScene } from "./utils/render/renderScene";

export const App = () => {
  const boxHeight = 1;
  let originalBoxSize = 3;
  const [score, setScore] = useState(0);
  let aspect = window.innerWidth / window.innerHeight;
  let size = 10;
  let stack = React.useRef<Layer[]>([]);
  let overhangs = React.useRef<Layer[]>([]);
  const gameStarted = React.useRef<boolean>(false);
  const gameEnded = React.useRef<boolean>(false);
  const isMobile = React.useRef<boolean>(false);
  const world = React.useRef<World>(new World());
  const scene = React.useRef<Scene>(new Scene());
  const camera = React.useRef<OrthographicCamera>(
    new OrthographicCamera(
      (size * aspect) / -2,
      (size * aspect) / 2,
      size / 2,
      size / -2,
      0,
      1000
    )
  );
  // const camera = React.useRef<PerspectiveCamera>(
  //   new PerspectiveCamera(45, aspect, 1, 1000)
  // );

  const distortion = React.useRef<Distortion>(
    new Distortion(0).toDestination()
  );

  const renderer = React.useRef<WebGLRenderer>(
    new WebGLRenderer({ antialias: true, alpha: true })
  );

  const randomNumber = React.useRef<number>(
    Math.floor(Math.random() * Math.floor(360)) + 1
  );
  const streak = React.useRef<number>(0);

  useEffect(() => {
    init(
      originalBoxSize,
      boxHeight,
      stack,
      overhangs,
      world,
      scene,
      camera,
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
            gameEnded,
            streak,
            distortion
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
        isMobile.current = true;
      } else {
        isMobile.current = false;
      }
    };
    checkMobile();
    if (isMobile.current === true) {
      resizeCameraForSmallerScreens(aspect, size, camera, renderer, scene);
    }
    if (window.innerWidth <= 900) {
      resizeCameraForSmallerScreens(aspect, size, camera, renderer, scene);
    }

    window.addEventListener("resize", () => {
      var aspect = window.innerWidth / window.innerHeight;

      if (window.innerWidth <= 900) {
        camera.current.left = (size * aspect) / -1.7;
        camera.current.right = (size * aspect) / 1.7;
        camera.current.top = size / 1.7;
        camera.current.bottom = size / -1.7;
      } else {
        camera.current.left = (size * aspect) / -2;
        camera.current.right = (size * aspect) / 2;
        camera.current.top = size / 2;
        camera.current.bottom = size / -2;
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
          fontFamily="numbers"
          position="absolute"
          fontSize="8xl"
          fontWeight="bold"
          color="gray.800"
          textAlign="center"
          mt="30px"
        >
          {score}
        </Text>
        <div id="restart" className="ins1">
          <Text
            fontFamily="text"
            fontSize="3xl"
            fontWeight="bold"
            color="gray.800"
            textAlign="center"
            mt="150px"
          >
            Click to restart
          </Text>
        </div>
        <div id="highscore" className="ins1">
          <Text
            fontFamily="text"
            fontSize="3xl"
            fontWeight="bold"
            color="gray.800"
            textAlign="center"
            mt="195px"
          >
            New High Score: {score}
          </Text>
        </div>
        <IconButton
          position="absolute"
          right={10}
          top={5}
          colorScheme="blackAlpha"
          textColor="gray.800"
          variant="ghost"
          aria-label="github icon"
          icon={<AiFillGithub size="2em" />}
          onClick={() =>
            window.open("https://github.com/tomimarkus991/stacker", "blank")
          }
        />
      </Flex>
    </ChakraProvider>
  );
};
