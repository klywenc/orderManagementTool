'use client';

import React, { useState } from 'react';

const ImageSlider = ({ imagePaths }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? imagePaths.length - 1 : prevIndex - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === imagePaths.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="flex mx-auto w-full max-w-3xl h-96">
            <div className="flex items-center justify-between px-4">
                <button onClick={goToPrevious}
                        className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-8 px-3 rounded-full text-lg md:text-xl transition-colors duration-200 mb-4 transform"
                >
                    ‹
                </button>
                <div className="w-full h-full overflow-hidden">
                    <div className="flex transition-transform duration-500"
                         style={{transform: `translateX(-${currentIndex * 100}%)`}}>
                        {imagePaths.map((path, index) => (
                            <div key={index} className="w-full h-full flex-shrink-0">
                                <img
                                    src={path}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={goToNext}
                        className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-8 px-3 rounded-full text-lg md:text-xl transition-colors duration-200 mb-4 transform"
                >
                    ›
                </button>
            </div>
        </div>
    );
};

export default ImageSlider;
