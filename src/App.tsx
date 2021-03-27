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
import { Body, Box as CannonBox, NaiveBroadphase, Vec3, World } from "cannon";
import * as React from "react";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import {
  AmbientLight,
  BoxGeometry,
  Color,
  DirectionalLight,
  Mesh,
  MeshLambertMaterial,
  OrthographicCamera,
  Scene,
  WebGLRenderer,
} from "three";
import customTheme from "./theme";
import { Layer } from "./types";

export const App = () => {
  let stack: Layer[] = [];
  let overhangs: Layer[] = [];
  const boxHeight = 1;
  const originalBoxSize = 3;
  const [score, setScore] = useState(0);
  const [infiniteMode, setInfiniteMode] = useState(false);

  const gameStarted = React.useRef<boolean>(false);
  const world = React.useRef<World>();
  const scene = React.useRef<Scene>();
  const camera = React.useRef<OrthographicCamera>();
  const renderer = React.useRef<WebGLRenderer>();

  const init = () => {
    world.current = new World();
    world.current.gravity.set(0, -10, 0);
    world.current.broadphase = new NaiveBroadphase();
    world.current.solver.iterations = 40;

    scene.current = new Scene();

    // Foundation
    addLayer(0, 0, originalBoxSize, originalBoxSize, "x");

    // First layer
    addLayer(-10, 0, originalBoxSize, originalBoxSize, "x");

    // Set up lights
    const ambientLight = new AmbientLight(0xffffff, 0.6);
    scene.current.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(10, 20, 0);
    scene.current.add(directionalLight);

    // Camera
    const width = 15;
    const height = width * (window.innerHeight / window.innerWidth);
    camera.current = new OrthographicCamera(
      width / -1,
      width / 1,
      height / 1,
      height / -1,
      1,
      100
    );
    camera.current.position.set(4, 4, 4);
    camera.current.lookAt(0, 0, 0);

    // Renderer
    renderer.current = new WebGLRenderer({ antialias: true });
    renderer.current.setSize(window.innerWidth, window.innerHeight);
    renderScene();

    document.body.appendChild(renderer.current.domElement);
  };

  const renderScene = () => {
    if (renderer.current && scene.current && camera.current) {
      renderer.current.render(scene.current, camera.current);
    }
  };

  const addLayer = (
    x: number,
    z: number,
    width: number,
    depth: number,
    direction: "x" | "z"
  ) => {
    const y = boxHeight * stack.length;
    const layer: Layer = generateBox(x, y, z, width, depth, direction, false);
    stack.push(layer);
    setScore(stack.length - 1);
  };
  const addOverhang = (x: number, z: number, width: number, depth: number) => {
    const y = boxHeight * (stack.length - 1);
    const overhang: Layer = generateBox(x, y, z, width, depth, "x", true);
    overhangs.push(overhang);
  };

  const generateBox = (
    x: number,
    y: number,
    z: number,
    width: number,
    depth: number,
    direction: "x" | "z",
    falls: boolean
  ) => {
    const geometry = new BoxGeometry(width, boxHeight, depth);

    // generates cube color (hue saturation and lightness) based on stack length
    const color = new Color(`hsl(${30 + stack.length * 4}, 100%, 50%)`);
    const material = new MeshLambertMaterial({ color });

    const cube = new Mesh(geometry, material);
    cube.position.set(x, y, z);

    if (scene.current) {
      scene.current.add(cube);
    }

    const shape = new CannonBox(new Vec3(width / 2, boxHeight / 2, depth / 2));

    let mass = falls ? 5 : 0;

    const body = new Body({ mass, shape });
    body.position.set(x, y, z);
    if (world.current) {
      world.current.addBody(body);
    }

    return {
      threejs: cube,
      cannonjs: body,
      width,
      depth,
      direction,
    };
  };

  const animation = () => {
    const speed = 0.15;

    const topLayer: Layer = stack[stack.length - 1];

    topLayer.threejs.position[topLayer.direction] += speed;
    topLayer.cannonjs.position[topLayer.direction] += speed;
    // let calc = boxHeight * (stack.length - 2) + 4;
    let calc = stack.length + 2;

    if (camera.current) {
      if (camera.current.position.y < calc) {
        camera.current.position.y += speed;
      }
    }
    updatePhysics();
    renderScene();
  };
  const cutBox = (
    topLayer: Layer,
    overlap: number,
    size: number,
    delta: number
  ) => {
    const direction = topLayer.direction;
    const newWidth = direction === "x" ? overlap : topLayer.width;
    const newDepth = direction === "z" ? overlap : topLayer.depth;

    topLayer.width = newWidth;
    topLayer.depth = newDepth;

    topLayer.threejs.scale[direction] = overlap / size;
    topLayer.threejs.position[direction] -= delta / 2;

    topLayer.cannonjs.position[direction] -= delta / 2;

    const shape = new CannonBox(
      new Vec3(newWidth / 2, boxHeight / 2, newDepth / 2)
    );

    topLayer.cannonjs.shapes = [];
    topLayer.cannonjs.addShape(shape);
  };

  const updatePhysics = () => {
    if (world.current) {
      world.current.step(1 / 60);
    }
    overhangs.forEach((element: any) => {
      element.threejs.position.copy(element.cannonjs.position);
      element.threejs.quaternion.copy(element.cannonjs.quaternion);
    });
  };

  const startGame = () => {
    if (gameStarted.current === false) {
      if (renderer.current) {
        renderer.current.setAnimationLoop(animation);
      }
      gameStarted.current = true;
    } else {
      const topLayer = stack[stack.length - 1];
      const previousLayer = stack[stack.length - 2];

      const direction = topLayer.direction;

      const delta =
        topLayer.threejs.position[direction] -
        previousLayer.threejs.position[direction];
      const overhangSize = Math.abs(delta);

      const size = direction === "x" ? topLayer.width : topLayer.depth;

      const overlap = size - overhangSize;

      // const topLayer = stack[stack.length - 1];

      // const direction = topLayer.direction;

      // const newWidth = originalBoxSize;
      // const newDepth = originalBoxSize;

      // const nextX = direction === "x" ? 0 : -10;
      // const nextZ = direction === "z" ? 0 : -15;

      // const nextDirection = direction === "x" ? "z" : "x";

      // addLayer(nextX, nextZ, newWidth, newDepth, nextDirection);

      if (overlap > 0) {
        cutBox(topLayer, overlap, size, delta);

        const overHangShift =
          (overlap / 2 + overhangSize / 2) * Math.sign(delta);

        const overhangX =
          direction === "x"
            ? topLayer.threejs.position.x + overHangShift
            : topLayer.threejs.position.x;
        const overhangZ =
          direction === "z"
            ? topLayer.threejs.position.z + overHangShift
            : topLayer.threejs.position.z;

        const overhangWidth = direction === "x" ? overhangSize : topLayer.width;
        const overhangDepth = direction === "z" ? overhangSize : topLayer.depth;

        addOverhang(overhangX, overhangZ, overhangWidth, overhangDepth);

        // Next layer
        const nextX = direction === "x" ? topLayer.threejs.position.x : -10;
        const nextZ = direction === "z" ? topLayer.threejs.position.z : -10;

        const newWidth = topLayer.width;
        const newDepth = topLayer.depth;

        const nextDirection = direction === "x" ? "z" : "x";

        addLayer(nextX, nextZ, newWidth, newDepth, nextDirection);
      } else {
        missedTheSpot();
      }
    }
  };
  const missedTheSpot = () => {
    const topLayer = stack[stack.length - 1];

    // Turn to top layer into an overhang and let it fall down
    addOverhang(
      topLayer.threejs.position.x,
      topLayer.threejs.position.z,
      topLayer.width,
      topLayer.depth
    );
    // world.current.remove(topLayer.cannonjs);
    // scene.remove(topLayer.threejs);

    console.log("you lose");

    // gameEnded = true;

    // if (resultsElement && !autopilot) resultsElement.style.display = "flex";
  };

  useEffect(() => {
    init();
    window.addEventListener("click", (e: MouseEvent) => {
      let element = e.target as HTMLElement;
      if (element.tagName === "CANVAS") {
        startGame();
      }
    });
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <ChakraProvider theme={customTheme}>
      <Box position="relative">
        <Box>
          <Button
            position="absolute"
            zIndex={10}
            top={100}
            right={10}
            onClick={() => {
              onOpen();
            }}
          >
            Settings
          </Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Settings</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Button
                  onClick={() => {
                    setInfiniteMode(!infiniteMode);
                  }}
                  rightIcon={infiniteMode ? <FaCheck /> : <MdClose />}
                >
                  Infinite Mode
                </Button>
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
