import React from 'react';

export function Container({ className, children }) {
  return (
    <div className={`p-2 md:container md:mx-auto md:p-0 ${className}`}>
      {children}
    </div>
  );
}

export default Container;
