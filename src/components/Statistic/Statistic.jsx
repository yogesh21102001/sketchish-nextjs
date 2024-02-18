"use client"

import React, { useState, useEffect, useRef } from 'react';
import Styles from "./style.module.css"

const Statistic = ({endValue, lable, backtxt, skipTo}) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const countRef = useRef(count);
  
    useEffect(() => {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5, // Adjust this threshold based on your requirements
      };
  
      const handleIntersection = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      };
  
      const observer = new IntersectionObserver(handleIntersection, options);
  
      observer.observe(countRef.current);
  
      return () => {
        observer.disconnect();
      };
    }, []);
  
    useEffect(() => {
      let interval;
      if (isVisible) {
        // Increment by 100 in one go
        setCount((prevCount) => Math.min(prevCount + skipTo, endValue));
  
        // Increment the remaining value with higher speed
        interval = setInterval(() => {
          setCount((prevCount) => {
            if (prevCount < endValue) {
              const incrementedValue = Math.min(prevCount + skipTo, endValue);
              return parseFloat(incrementedValue.toFixed(1));
            } else {
              clearInterval(interval);
              return prevCount;
            }
          });
        }, 50); // Adjust the interval based on your desired animation speed
      }
  
      return () => clearInterval(interval);
    }, [isVisible, endValue]);

  return (
    <div className={Styles.statistic} ref={countRef}>
       <div className={Styles.number_cont}>
            {count}{backtxt}
       </div>
       <p>{lable}</p>
    </div>
  )
}

export default Statistic