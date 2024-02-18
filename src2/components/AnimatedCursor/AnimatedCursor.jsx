"use client";
import React, { useEffect, useRef, useState } from "react";
import Styles from "./style.module.css";
import Image from "next/image";

const AnimatedDiv = ({ className, speed = .3, img }) => {
  const getRandomPosition = () => ({
    top: Math.floor(Math.random() * (window.innerHeight - 50)),
    left: Math.floor(Math.random() * (window.innerWidth - 50)),
  });

  const [position, setPosition] = useState(getRandomPosition());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPosition(getRandomPosition());
    }, 700 / speed);

    return () => clearInterval(intervalId);
  }, [speed]);

  return (
    <div
      className={Styles.cursor_div}
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        zIndex: 2,
        transition: "all 0.6s linear 0s"
      }}
    >
      <Image alt='cursor' src={img} width={80} height={100}/>
    </div>
  );
};

export default AnimatedDiv;
