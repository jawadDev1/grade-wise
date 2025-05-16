import React from "react";

function getThemeStyle(variant) {
  if (variant === "primary") {
    return "bg-primary border-transparent relative after:bg-[#172554] text-white hover:border-[#172554]";
  }
  return "text-primary";
}

const Button = ({ className = "", variant = 'primary', children, ...props }) => {
  return (
    <button
      {...props}
      className={`px-6 py-3  rounded-full outline-none relative overflow-hidden border duration-300 ease-linear
        after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center
        after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0
        after:content-[''] ${getThemeStyle(
          variant
        )} hover:after:opacity-100 hover:after:scale-[2.5] ${className}`}
    >
      <span className="z-10 relative">{children}</span>
    </button>
  );
};

export default Button;
