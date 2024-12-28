import React from 'react';

import './styles.css';

export const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full z-[999999999999]">
      <div className="loader font-playfair"></div>
    </div>
  );
};

export default Loading;
