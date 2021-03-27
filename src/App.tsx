import {
  Box,
  Button,
  ChakraProvider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { World } from "cannon";
import * as React from "react";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
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
import { startGame } from "./utils/startGame";

export const App = () => {
  const boxHeight = 1;
  const originalBoxSize = 3;
  const [score, setScore] = useState(0);
  // const [infiniteMode, setInfiniteMode] = useState(false);
  const width = 15;
  const height = width * (window.innerHeight / window.innerWidth);
  let stack = React.useRef<Layer[]>([]);
  let overhangs = React.useRef<Layer[]>([]);
  const gameStarted = React.useRef<boolean>(false);
  const world = React.useRef<World>(new World());
  const scene = React.useRef<Scene>(new Scene());
  const camera = React.useRef<OrthographicCamera>(
    new OrthographicCamera(
      width / -1,
      width / 1,
      height / 1,
      height / -1,
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
  const infiniteMode = React.useRef<boolean>(false);

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
          boxHeight
        );
        setScore(stack.current.length - 1);
      }
    });

    init(
      originalBoxSize,
      boxHeight,
      stack,
      world,
      scene,
      camera,
      listener,
      audioLoader,
      sound,
      renderer
    );
  }, []);

  const { isOpen, onClose } = useDisclosure();
  return (
    <ChakraProvider theme={customTheme}>
      <Box position="relative">
        <Box>
          {/* <Button
            position="absolute"
            zIndex={10}
            top={100}
            right={10}
            onClick={() => {
              onOpen();
            }}
          >
            Settings
          </Button> */}
          <Button
            position="absolute"
            zIndex={10}
            top={100}
            right={10}
            onClick={() => {
              infiniteMode.current
                ? (infiniteMode.current = false)
                : (infiniteMode.current = true);

              // setInfiniteMode(!infiniteMode);
            }}
            rightIcon={infiniteMode.current ? <FaCheck /> : <MdClose />}
          >
            Infinite Mode
          </Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Settings</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* <Button
                  onClick={() => {
                    {
                      infiniteMode.current === true
                        ? (infiniteMode.current = false)
                        : (infiniteMode.current = true);
                    }
                    // setInfiniteMode(!infiniteMode);
                  }}
                  rightIcon={infiniteMode ? <FaCheck /> : <MdClose />}
                >
                  Infinite Mode
                </Button> */}
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    onClose();
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
      <Box></Box>
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
