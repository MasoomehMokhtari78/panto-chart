import React from "react";
import { Header } from "./Header";

export const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="flex flex-col gap-6 p-4">
        <p className="text-4xl font-bold">Statics</p>
        {children}
      </div>
    </div>
  );
};
