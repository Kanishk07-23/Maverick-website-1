'use client';
import Spline from '@splinetool/react-spline/next';

export default function InteractiveRobot() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Spline
        scene="https://prod.spline.design/kZDDjO5HlviUof4f/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  );
}
