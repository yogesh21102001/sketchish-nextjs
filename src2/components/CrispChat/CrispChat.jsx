"use client";

import React from "react";
import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  const ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;

  useEffect(() => {
    if (ID) {
      Crisp.configure(ID);
    }
  }, [ID]);
  return null;
};

export default CrispChat;
