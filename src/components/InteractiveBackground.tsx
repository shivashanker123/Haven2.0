

import React from 'react';

export const InteractiveBackground: React.FC = () => {
  return (
    // This div will act as the fixed container for your background
    <div 
      className="fixed inset-0 -z-10 bg-cover bg-center"
      style={{
        // Make sure the path matches the location of your image in the 'public' folder
        backgroundImage: `url('/backgroundgifsih.gif')`,
        backgroundAttachment: 'fixed', // This keeps the background still while the content scrolls
      }}
    >
      {/* This is an optional overlay. It's highly recommended for readability.
        It adds a semi-transparent dark layer on top of your image, 
        making the text and UI elements on top easier to read.
        You can adjust the opacity (e.g., bg-black/50, bg-black/70).
      */}
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
};