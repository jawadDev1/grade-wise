import React from "react";
import { cn } from "@/lib/utils";

const classNames = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
  h3: "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
  h5: "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
  h6: "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
  p: "leading-7 [&:not(:first-child)]:mt-6",
  blockquote: "mt-6 border-l-2 pl-6 italic",
  ul: "my-6 ml-6 list-disc [&>li]:mt-2",
  before:
    "before:content-[''] before:block before:w-3/4 before:h-1 before:bg-black before:mb-0.5",
  after:
    "after:content-[''] after:block after:w-3/4 after:h-1 after:bg-black after:mt-0.5",
};

const Typography = ({
  children,
  className,
  variant,
  before,
  after,
  ...otherProps
}) => {
  const Element = variant ?? "span";

  const baseClass = classNames[Element] ?? "";
  const beforeClass = before ? cn(classNames["before"], before) : "";
  const afterClass = after ? cn(classNames["after"], after) : "";
  return (
    <Element
      className={cn(baseClass, className, beforeClass, afterClass)}
      {...otherProps}
    >
      {children}
    </Element>
  );
};

export default Typography;
