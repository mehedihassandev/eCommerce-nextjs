import React from 'react';

import './styles.css';

export const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full z-[999999999999]">
      <div className="Buttons"></div>
    </div>
  );
};

export default Spinner;
