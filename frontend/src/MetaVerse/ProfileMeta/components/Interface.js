import React from "react";

import { useCharacterAnimations } from "../../contexts/CharacterAnimations";
import { Affix, Button, Group, Stack } from "@mantine/core";
import {
  CameraModes,
  useCharacterCustomization,
} from "../../contexts/CharacterCustomizationContext";
import { HeadConfigurator } from "./HeadConfigurator";
import { TopConfigurator } from "./TopConfigurator";
import { BottomConfigurator } from "./BottomConfigurator";

const Interface = () => {
  const { animations, animationIndex, setAnimationIndex } =
    useCharacterAnimations();
  const { cameraMode, setCameraMode, setTakeScreenshot } =
    useCharacterCustomization();
  return (
    <>
      <Affix position={{ top: 70, right: 20 }}>
        <Group>
          <Button onClick={() => setTakeScreenshot(true)}>
            <i class="fa-solid fa-camera " style={{ color: "black" }}></i>
          </Button>
          {Object.keys(CameraModes).map((mode) => (
            <Button
              key={mode}
              variant={mode === cameraMode ? "filled" : "light"}
              onClick={() => setCameraMode(mode)}
            >
              {mode}
            </Button>
          ))}
        </Group>
      </Affix>
      <Affix position={{ top: 70, left: 20 }}>
        {cameraMode === CameraModes.HEAD && <HeadConfigurator />}
        {cameraMode === CameraModes.TOP && <TopConfigurator />}
        {cameraMode === CameraModes.BOTTOM && <BottomConfigurator />}
      </Affix>
      <Affix position={{ bottom: 50, right: 20 }}>
        <Stack>
          {animations.map((animation, index) => (
            <Button
              key={animation}
              variant={index === animationIndex ? "filled" : "light"}
              onClick={() => setAnimationIndex(index)}
            >
              {animation}
            </Button>
          ))}
        </Stack>
      </Affix>
    </>
  );
};

export default Interface;
