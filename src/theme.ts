import { extendTheme } from "@chakra-ui/react";

// Let's say you want to add custom colors
const customTheme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark",
  },
});
export default customTheme;
