import React from "react";

export function Card({ title, description, children }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm flex flex-col gap-6 items-center flex-1 min-w-[600px]">
      <h3 className="text-xl font-bold">{title}</h3>
      <div>{children}</div>
    </div>
  );
}
