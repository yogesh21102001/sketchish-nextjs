"use client";

import React, { useEffect, useState } from "react";
import { GoogleTagManager } from "@next/third-parties/google";

const GoogleTagManagerComp = () => {
  const GMT_ID = process.env.NEXT_PUBLIC_GTM_ID;
  const [gmtId, setgmtId] = useState('')

  useEffect(()=>{
    setgmtId(GMT_ID)
  },[GMT_ID])

  if (GMT_ID) {
    return <GoogleTagManager gtmId={gmtId} />;
  }
};

export default GoogleTagManagerComp;
