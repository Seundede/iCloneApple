import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import ModelView from "./ModelView";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";

export type ModelStateType = {
  title: string;
  color: string[];
//   image: string;
};
const sizes = [
  { label: '6.1"', value: "small" },
  { label: '6.7"', value: "large" },
];
const models = [
  {
    id: 1,
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
    // img: yellowImg,
  },
  {
    id: 2,
    title: "iPhone 15 Pro in Blue Titanium",
    color: ["#53596E", "#6395ff", "#21242e"],
    // img: blueImg,
  },
  {
    id: 3,
    title: "iPhone 15 Pro in White Titanium",
    color: ["#C9C8C2", "#ffffff", "#C9C8C2"],
    // img: whiteImg,
  },
  {
    id: 4,
    title: "iPhone 15 Pro in Black Titanium",
    color: ["#454749", "#3b3b3b", "#181819"],
    // img: blackImg,
  },
];
const Model = () => {
  const [size, setSize] = useState<string>("small");
  const [model, setModel] = useState<ModelStateType>({
    title: "iPhone 15 Pro in natural titanium",
    color: ["#8F8A81", "#ffe7B9", "#6F6C64"],
    // image: "/imagePath",
  });
  useGSAP(() => {
    gsap.to("#heading", { opacity: 1, y: 0 });
  }, []);
  // Camera control
  const cameraControlSmall = useRef<any>();
  const cameraControlLarge = useRef<any>();
  //Model
  const small = useRef<THREE.Group>(new THREE.Group());
  const large = useRef<THREE.Group>(new THREE.Group());
  // Rotation
  const [smallRotation, setSmallRotation] = useState<number>(0);
  const [largeRotation, setLargeRotation] = useState<number>(0);
  return (
    <section className="py-32 md:py-20 px-10 md:px-5">
      <div className="me-auto ms-auto relative max-w-screen-xl">
        <h1
          id="heading"
          className=" text-gray lg:text-6xl md:text-5xl text-3xl lg:mb-0 mb-5 font-medium opacity-0 translate-y-20"
        >
          Take a closer look
        </h1>
        <div className="flex flex-col mt-5 items-center">
          <div className="w-full  h-[75vh] md:h-[90vh] overflow-hidden relative">
        <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />
            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            /> 
            <Canvas
              className="w-full h-full"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflow: "hidden",
              }}
              // eventSource={document.getElementById('root')}
            >
              <View.Port />
            </Canvas>
          </div>
          <div className="mx-auto w-full">
            <p className="mb-5 text-center text-sm font-light">{model.title}</p>
            <div className="flex items-center justify-center">
              <ul className="flex items-center justify-center px-4 py-4 rounded-full bg-gray-300 backdrop-blur">
                {models.map((item, i) => (
                  <li
                    key={i}
                    className="size-6 rounded-full mx-2 cursor-pointer"
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => setModel(item)}
                  />
                ))}
              </ul>
              <button className="flex items-center justify-center p-1 rounded-full bg-gray-300 backdrop-blur ml-3 gap-1">
                {sizes.map((item) => (
                  <span
                    key={item.label}
                    className={`size-10 text-sm flex justify-center items-center bg-white text-black rounded-full transition-all ${size === item.value ? 'bg-white text-black' : 'bg-transparent text-white'}`}
                  onClick={() => setSize(item.value)}
                  >
               
                    {item.label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
