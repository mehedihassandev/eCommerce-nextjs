'use client';

import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';

interface IBannerCardProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  buttonText: string;
}

export const BannerCard: FC<IBannerCardProps> = ({
  backgroundImage,
  title,
  subtitle,
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
      <div className="relative text-white w-full px-16">
        <motion.h3
          className="text-sm font-semibold uppercase tracking-wide mb-2"
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {subtitle}
        </motion.h3>
        <motion.h1
          className="text-4xl font-bold mb-8"
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {title}
        </motion.h1>
        <Button className="mt-4 px-6 py-2 rounded-lg shadow-md font-semibold bg-white/60 hover:bg-white/90">
          {buttonText}
        </Button>
      </div>
    </motion.div>
  );
};

export default BannerCard;
