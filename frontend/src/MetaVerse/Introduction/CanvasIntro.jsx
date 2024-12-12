import { createStyles, Accordion } from "@mantine/core";
import React from "react";
import { Canvas } from "@react-three/fiber";
import IntroExp from "./components/IntroExp";
import { ScrollControls } from "@react-three/drei";
import "./intro.css";
const useStyles = createStyles((theme) => ({
  item: {
    width: "100vw",
    height: "100vh",
  },
}));
const CanvasIntro = () => {
  const { classes } = useStyles();
  return (
    <Accordion classNames={{ item: classes.item }}>
      <Accordion.Item>
        <Canvas>
          <color attach="background" args={["#ececec"]} />
          <ScrollControls page={5} damping={0.3}>
            <IntroExp />
          </ScrollControls>
        </Canvas>
      </Accordion.Item>
    </Accordion>
  );
};

export default CanvasIntro;
