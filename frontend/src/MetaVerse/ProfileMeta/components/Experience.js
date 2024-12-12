import React, { useContext, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import Woman from "../../Woman";
import Womans from "../../Womans";
import { CameraControls } from "./CameraControls";
import { useCharacterCustomization } from "../../contexts/CharacterCustomizationContext";
import { useThree } from "react-three-fiber";
import axios from "axios";
import { baseURL } from "../../../api/api";
import AuthContext from "../../../context/AuthContext";

const Experience = () => {
  const gl = useThree((state) => state.gl);
  const { takeScreenshot, setTakeScreenshot } = useCharacterCustomization();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (takeScreenshot) {
      screenshot();
      setTakeScreenshot(false);
    }
  }, [takeScreenshot]);

  const screenshot = () => {
    const link = document.createElement("a");
    link.setAttribute("download", "screenshot.png");
    link.setAttribute(
      "href",
      gl.domElement
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream")
    );

    link.click();
    console.log(link);
  };
  return (
    <>
      <CameraControls />
      <ambientLight />
      <directionalLight
        position={[-5, 5, 5]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <group position={[0, -1, 0]}>
        <Womans />
      </group>

      <mesh
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[0, -1, 0]}
        receiveShadow
      >
        <planeBufferGeometry args={[10, 10, 1, 1]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    </>
  );
};

export default Experience;
