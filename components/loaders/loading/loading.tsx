import React from 'react';

import './styles.css';

export const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999999999999]">
      <div className="loader-spinner font-playfair"></div>
    </div>
  );
};

export default Loading;
