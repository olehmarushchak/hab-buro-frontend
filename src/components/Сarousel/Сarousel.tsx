import React, { useState, useEffect } from "react";
import "./Carousel.scss";
import {
  useAppDispatch,
  useAppSelector,
} from "../../custom-hooks/reduxHooks.ts";
import {
  selectProjects,
  setCarousel,
} from "../../redux/slices/projects.slice.ts";

interface Props {
  images: string[];
}

export const Carousel: React.FC<Props> = ({ images }) => {
  const { clickedImg } = useAppSelector(selectProjects);
  // Определяем индекс выбранного изображения
  const startingIndex = images.indexOf(clickedImg);

  // Устанавливаем начальный индекс в состояние
  const [currentIndex, setCurrentIndex] = useState(
    startingIndex >= 0 ? startingIndex : 0
  );
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const dispatch = useAppDispatch();

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX && touchEndX) {
      const difference = touchStartX - touchEndX;
      if (difference > 50) {
        handleNext(); // Свайп влево, переходим на следующий слайд
      } else if (difference < -50) {
        handlePrev(); // Свайп вправо, переходим на предыдущий слайд
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <div
      onClick={(event) => {
        dispatch(setCarousel(false));
      }}
      className="carousel-overlay"
    >
      <div
        className="carousel-content"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button className="carousel-button prev" onClick={handlePrev}>
          &lt;
        </button>

        <div className="carousel-slide">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index}`}
              className={index === currentIndex ? "active" : ""}
            />
          ))}
        </div>

        <button className="carousel-button next" onClick={handleNext}>
          &gt;
        </button>
      </div>
    </div>
  );
};
