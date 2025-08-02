import React from "react";

const menuItems = ["Home", "Products", "About Us", "Contact Us"];

export const Header = () => {
  return (
    <header
      style={{
        padding: "1rem 2rem",
        backgroundColor: "white",
        fontSize: "1.5rem",
        fontWeight: "bold",
        textAlign: "center",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div className="flex gap-2 items-start">
        <img src="/img/chart-bar.svg" className="w-[30px]" />
        <p> PANTO Chart</p>
      </div>
      <div className="flex gap-2 items-center cursor-pointer">
        {menuItems.map((item) => (
          <p className="text-sm">{item}</p>
        ))}
      </div>
    </header>
  );
};
