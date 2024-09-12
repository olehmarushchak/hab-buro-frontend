import React, { useEffect, useRef } from "react";

interface Props {
  images: string;
}

export const ProjectItem: React.FC<Props> = ({ images }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      },
      {
        threshold: 0.1,
      }
    );

    const unobserve = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("hidden");
        } else {
          entry.target.classList.add("hidden");
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
      unobserve.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
        unobserve.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div ref={elementRef} className="ProjectPage__images__container__big-img">
      <img className="ProjectPage__images__big-img" src={images} alt={images} />
    </div>
  );
};
