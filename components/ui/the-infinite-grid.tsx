import React from "react";

export const Component = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-transparent">
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};