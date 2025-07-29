import React from "react";
import { MoonLoader } from "react-spinners";

type props = {
  color?: string;
};

export default function LoadingSpinner({ color }: props) {
  return (
    <div className="flex items-center justify-center m-auto h-screen">
      <MoonLoader color={color || "green"} />
    </div>
  );
}
