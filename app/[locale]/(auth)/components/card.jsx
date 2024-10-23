import React from "react";

function Card({ children }) {
  return (
    <main className="w-[500px] space-y-6 bg-white px-6 py-8 sm:space-y-10 sm:px-10 sm:py-14">
      {children}
    </main>
  );
}

export default Card;
