import React from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import { MantineProvider, createStyles, Accordion } from "@mantine/core";
import Interface from "./components/Interface";
const useStyles = createStyles((theme) => ({
  item: {
    width: "100vw",
    height: "100vh",
  },
}));
const CanvasModel = () => {
  const { classes } = useStyles();
  return (
    <Accordion classNames={{ item: classes.item }}>
      <Accordion.Item>
        <Canvas
          camera={{ position: [1, 1.5, 2.5], fov: 50 }}
          shadows
          gl={{ preserveDrawingBuffer: true }}
        >
          <Experience />
        </Canvas>
        <Interface />
      </Accordion.Item>
    </Accordion>
  );
};

export default CanvasModel;
