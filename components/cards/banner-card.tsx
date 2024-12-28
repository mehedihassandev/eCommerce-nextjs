'use client';

import React, { FC } from 'react';
import { motion } from 'framer-motion';

import { Button } from '../ui/button';

interface IBannerCardProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  descriptions: string;
  buttonText: string;
}

export const BannerCard: FC<IBannerCardProps> = ({
  backgroundImage,
  title,
  subtitle,
  descriptions,
  buttonText,
}) => {
  return (
    <motion.div
      className="relative w-full aspect-video overflow-hidden flex items-center justify-center p-4 rounded-lg"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Overlay */}
      <motion.div
        whileHover={{ opacity: 1 }}
        whileInView={{ opacity: 0.8 }}
        className="absolute inset-0 bg-black/75 transition-opacity duration-300 opacity-0"
      ></motion.div>

      {/* Text Content */}
      <div className="relative text-white w-full px-6">
        <motion.h3
          className="text-sm font-bold font-noto uppercase tracking-wide text-gray-300"
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {subtitle}
        </motion.h3>
        <motion.h1
          className="text-4xl font-semibold mb-2 font-playfair leading-relaxed tracking-wide text-primary"
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {title}
        </motion.h1>
        <motion.h1
          className="text-sm font-medium font-noto leading-[1.75rem]"
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {descriptions}
        </motion.h1>
        <Button
          variant="default"
          className="mt-6 px-6 py-2 rounded-lg shadow-md font-semibold font-poppins text-sm"
        >
          {buttonText}
        </Button>
      </div>
    </motion.div>
  );
};

export default BannerCard;
