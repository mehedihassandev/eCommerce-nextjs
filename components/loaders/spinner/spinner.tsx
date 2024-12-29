import React from 'react';

import './styles.css';

export const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999999999999]">
      <div className="Buttons"></div>
    </div>
  );
};

export default Spinner;
