import React from "react";

import Image from "next/image";

function NoData() {
  return (
    <div className="flex flex-col items-center py-8">
      <Image
        src="/images/no-data.svg"
        width={200}
        height={200}
        alt="Not available"
      />
      <div className="mt-6 text-2xl font-semibold text-[#404040]">
        Not available
      </div>
    </div>
  );
}

export default NoData;
