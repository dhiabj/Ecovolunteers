import { MantineProvider } from "@mantine/core";
import { createContext, useState } from "react";

const CanvasContext = createContext({});

export const CanvasProvider = ({ children }) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        globalStyles: (_theme) => ({
          body: {
            width: "100vw",
            height: "100vh",
          },
          "#root": {
            width: "100%",
          },
        }),
      }}
    >
      {children}
    </MantineProvider>
  );
};

export default CanvasContext;
