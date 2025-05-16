import Link from "next/link";
import React from "react";

function getThemeStyle(variant) {
  if (variant === "primary") {
    return "bg-primary border-transparent relative after:bg-[#172554] hover:border-[#172554]";
  }
  return "text-primary";
}

function getTextColor(variant) {
  if (variant === "primary") {
    return "text-white";
  }
  return "text-primary";
}

const BtnLink = ({ href, text, className = "", variant = 'primary' }) => {
  return (
    <Link
      href={href}
      className={`px-6 py-3 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear
        after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center
        after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0
        after:content-[''] ${getThemeStyle(
          variant
        )} hover:after:opacity-100 hover:after:scale-[2.5] ${className}`}
    >
      <span className={`relative ${getTextColor(variant)} z-10`}>{text}</span>
    </Link>
  );
};

export default BtnLink;
