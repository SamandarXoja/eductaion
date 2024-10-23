import React from "react";

function Description({ children, ...props }) {
  return (
    <p className="text-base text-customSilver" {...props}>
      {children}
    </p>
  );
}

export default Description;
