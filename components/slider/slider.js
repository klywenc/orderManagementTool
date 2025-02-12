'use client';

import React, { useState, useEffect, useRef } from 'react';

const ImageSlider = ({ imagePaths }) => {
    const extendedImages = [...imagePaths, imagePaths[0]];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const intervalRef = useRef(null);

    const startInterval = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            goToNext();
        }, 2000);
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        startInterval();
    };

    useEffect(() => {
        startInterval();
        return () => clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        if (currentIndex === imagePaths.length) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(0);
                setTimeout(() => setIsTransitioning(true), 50);
            }, 500);
        }
    }, [currentIndex]);

    return (
        <div className="flex mx-auto w-full max-w-3xl h-96 overflow-hidden relative">
            <div
                className={`w-full h-full flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                onClick={goToNext}
            >
                {extendedImages.map((path, index) => (
                    <div key={index} className="w-full h-full flex-shrink-0">
                        <img
                            src={path}
                            alt={`Slide ${index % imagePaths.length + 1}`}
                            className="w-full h-full object-cover cursor-pointer"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;
