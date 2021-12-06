import React from 'react';
import Image from 'next/image';

function ImageFallback({
  teamId,
  src,
  objectFit = 'scale-down',
  quality = 100,
  ...otherProps
}) {
  let finalSource = src;
  if (!finalSource.match(/^http|^https/))
    finalSource = `${process.env.CDN}/${teamId}/public/templates/${src}`;

  return (
    <Image
      layout="fill"
      objectFit={objectFit}
      quality={quality}
      src={finalSource}
      {...otherProps}
    />
  );
}

export default ImageFallback;
