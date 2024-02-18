"use client"

import React, { useRef, useEffect} from 'react';
import Styles from "./style.module.css"

const Button = ({children, animate, background, width, color, margin, border, className, onClick = ()=>{}}) => {
  const magneticAreaRef = useRef(null);

  useEffect(() => {
    const magneticArea = magneticAreaRef.current;
    const magneticElements = Array.from(magneticArea.querySelectorAll('.magnetic-element'));

    const handleMouseMove = (e) => {
      const boundingRect = magneticArea.getBoundingClientRect();
      let Xvalue = e.clientX - boundingRect.left;
      let Yvalue = e.clientY - boundingRect.top;

      magneticElements.forEach((element) => {
        let magneticValue = element.getAttribute('data-magnetic-value');

        element.style.transform = `translate(${Xvalue/2 * magneticValue}px, ${Yvalue/2 * magneticValue}px)`;
      });
    };

    const handleMouseLeave = () => {
      magneticElements.forEach((element) => {
        element.style.transform = 'translate(0)';
      });
    };

    if (magneticArea) {
      magneticArea.addEventListener('mousemove', handleMouseMove);
      magneticArea.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        magneticArea.removeEventListener('mousemove', handleMouseMove);
        magneticArea.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <div ref={magneticAreaRef} className={`${Styles.btn_cont} ${className}`} style={{width:width, margin:margin}}>
      <button className={`${Styles.btn} ${animate ? "magnetic-element": ""}`} data-magnetic-value="0.4" style={{background:background, border:border}} onClick={onClick}>
        <p className={` ${Styles.btn_text } ${animate ? "magnetic-element": ""}`} data-magnetic-value="0.1" style={{color:color}}>
          {children}
        </p>
      </button>
    </div>
  );
}

export default Button