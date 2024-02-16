"use client";

import { hotjar } from "react-hotjar";
import { useEffect } from "react";

const HotJar = () => {
  const HJID = process.env.NEXT_PUBLIC_HJ_ID;
  const HJSV = process.env.NEXT_PUBLIC_HJ_SV;

  useEffect(() => {
    if ((HJID, HJSV)) {
      hotjar.initialize(HJID, HJSV);
    }
  }, [HJID, HJSV]);

  return null
};

export default HotJar;
