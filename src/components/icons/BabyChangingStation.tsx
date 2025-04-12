
import React from "react";

const BabyChangingStation = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 6h6l-1.5 2h-3z" />
      <path d="M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      <path d="M6 12h12" />
      <path d="M6 16v-4" />
      <path d="M18 16v-4" />
      <path d="M10 16s0-2 2-2 2 2 2 2" />
      <path d="M15 20v-4" />
      <path d="M9 20v-4" />
    </svg>
  );
};

export default BabyChangingStation;
