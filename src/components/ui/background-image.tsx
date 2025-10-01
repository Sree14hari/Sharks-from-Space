
'use client';

export default function BackgroundImage() {

  return (
    <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src="/images/bg.mp4"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]" />
      </div>
  );
}
