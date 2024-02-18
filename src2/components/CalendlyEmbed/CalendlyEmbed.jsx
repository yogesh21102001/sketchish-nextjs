"use client";
import { InlineWidget } from "react-calendly";
import { useEffect, useState } from "react";
import { Button } from "..";

export default function CalendlyEmbed({ text, className ,background,animate,width,border,color, margin}) {
  return (
    <Button background={background} width={width} border={border} color={color} animate={animate} margin={margin} className={className} onClick={()=>{}}>
       { text }
    </Button>
  );
}
