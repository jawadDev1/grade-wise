import { cn } from '@/lib/utils';
import React from 'react';

const Paragraph = ({ children, className }) => {
  return (
    <p className={cn(`md:text-lg text-heading-3 line-clamp-3 `, className)}>
      {children}
    </p>
  );
};

export default Paragraph;
