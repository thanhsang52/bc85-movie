import React from "react";

export const Section = ({ children, titleSection }) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-6 text-center">
        {titleSection}
      </h2>
      {children}
    </div>
  );
};
