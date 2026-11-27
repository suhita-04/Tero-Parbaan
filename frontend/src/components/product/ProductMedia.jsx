import React from 'react';
import { isVideoMedia } from '../../utils/products';

/**
 * Renders either an image or a muted looping/playable video depending on media_type.
 * Supports product objects ({ image, image_url }), media gallery items ({ url, src }), or plain URL strings.
 */
export default function ProductMedia({
  item,
  src: explicitSrc,
  alt = '',
  className = '',
  controls = false,
  loading = 'lazy',
}) {
  const resolvedSrc =
    explicitSrc ||
    (typeof item === 'string'
      ? item
      : item?.url || item?.src || item?.image || item?.image_url || '');

  if (isVideoMedia(item) && resolvedSrc) {
    return (
      <video
        key={resolvedSrc}
        src={resolvedSrc}
        controls={controls}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className={className}
      />
    );
  }

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      loading={loading}
      className={className}
    />
  );
}
