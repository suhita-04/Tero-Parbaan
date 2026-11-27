import React from 'react';
import { isVideoMedia } from '../../utils/products';

/**
 * Renders either an image or a muted looping/playable video depending on media_type.
 */
export default function ProductMedia({
  item,
  alt = '',
  className = '',
  controls = false,
  loading = 'lazy',
}) {
  const src = item?.image || item?.image_url || '';

  if (isVideoMedia(item) && src) {
    return (
      <video
        src={src}
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
      src={src}
      alt={alt}
      loading={loading}
      className={className}
    />
  );
}
