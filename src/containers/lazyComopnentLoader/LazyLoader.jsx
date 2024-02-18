// LazyLoader.js
import React, { useRef, useEffect, useState } from "react";

const LazyLoader = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px 100px 0px" } // Adjust as needed
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return <div ref={targetRef} style={{minHeight:"30rem"}}>{isVisible ? children : null}</div>;
};

export default LazyLoader;