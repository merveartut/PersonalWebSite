import React from "react";

export default function ButterflyEmbed() {
  return (
    <div className="sketchfab-embed-wrapper w-full h-[400px] md:h-[600px] relative">
      <iframe
        title="Animated Flying Fluttering Butterfly Loop"
        frameBorder="0"
        allowFullScreen
        mozAllowFullScreen="true"
        webkitAllowFullScreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        src="https://sketchfab.com/models/80f8d9a6dadc411e89ca366cb0cfb0d9/embed"
        className="w-full h-full"
      ></iframe>
    </div>
  );
}
