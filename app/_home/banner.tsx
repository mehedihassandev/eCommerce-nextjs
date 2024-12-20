'use client';

import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slides } from '../data/banner';

export const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section
      id="banner"
      className="h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="flex justify-between items-center relative w-full h-full overflow-hidden">
        <AnimatePresence>
          {slides.map(
            (slide, index) =>
              index === currentIndex && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 1 }}
                  className="absolute w-full h-full flex items-center bg-cover bg-center object-cover"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-black opacity-65 z-10"></div>
                  <div className="max-w-screen-2xl px-4 sm:px-6 lg:px-48 py-4 flex z-20">
                    <div className="flex flex-col gap-1 text-white">
                      <motion.span
                        className="text-lg font-normal font-noto pb-2"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {slide.title}
                      </motion.span>
                      <motion.h5
                        className="text-6xl font-bold pb-2 font-playfair w-9/12 leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {slide.subtitle}
                      </motion.h5>

                      <motion.p
                        className="text-lg font-noto font-normal w-8/12 pt-8 leading-relaxed"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                      >
                        {slide.details}
                      </motion.p>

                      <Button className="w-48 h-11 mt-16 font-poppins text-base">
                        Shop Now
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ),
          )}
        </AnimatePresence>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
