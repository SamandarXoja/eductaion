import React from "react";

function Title({ children }) {
  return (
    <h1 className="mb-3 text-[32px] font-semibold leading-[120%] tracking-[-0.3px]">
      {children}
    </h1>
  );
}

export default Title;
