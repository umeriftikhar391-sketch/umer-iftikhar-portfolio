'use client';
import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

/** A removed or unavailable CMS image should not leave a broken-image icon. */
export default function BlogImage(props: ImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div role="img" aria-label={props.alt || 'Article image unavailable'} className={`${props.className || ''} flex aspect-video items-center justify-center border border-line bg-blush p-6 text-center text-sm text-body`}>Article image unavailable</div>;
  return <Image {...props} alt={props.alt} onError={() => setFailed(true)} />;
}
