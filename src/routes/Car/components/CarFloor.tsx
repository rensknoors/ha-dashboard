import { useEffect, useMemo } from 'react';
import { CanvasTexture, SRGBColorSpace } from 'three';

interface CarFloorProps {
  length: number;
  width: number;
}

export const CarFloor = ({ length, width }: CarFloorProps) => {
  const glowTexture = useMemo(createGlowTexture, []);
  const shadowTexture = useMemo(createShadowTexture, []);

  useEffect(
    () => () => {
      glowTexture.dispose();
      shadowTexture.dispose();
    },
    [glowTexture, shadowTexture]
  );

  return (
    <group rotation-x={-Math.PI / 2}>
      <mesh position-z={0.001}>
        <circleGeometry args={[GLOW_RADIUS, 64]} />
        <meshBasicMaterial map={glowTexture} transparent depthWrite={false} />
      </mesh>
      <mesh position-z={0.002}>
        <planeGeometry
          args={[width * SHADOW_PADDING, length * SHADOW_PADDING]}
        />
        <meshBasicMaterial map={shadowTexture} transparent depthWrite={false} />
      </mesh>
    </group>
  );
};

const createTexture = (draw: (context: CanvasRenderingContext2D) => void) => {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = TEXTURE_SIZE;
  const context = canvas.getContext('2d');
  if (context) {
    draw(context);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
};

const createGlowTexture = () =>
  createTexture((context) => {
    const center = TEXTURE_SIZE / 2;
    const gradient = context.createRadialGradient(
      center,
      center,
      0,
      center,
      center,
      center
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.14)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, TEXTURE_SIZE, TEXTURE_SIZE);
  });

const createShadowTexture = () =>
  createTexture((context) => {
    const inset = TEXTURE_SIZE * SHADOW_INSET;
    const size = TEXTURE_SIZE - inset * 2;
    context.filter = `blur(${inset / 2}px)`;
    context.fillStyle = 'rgba(0, 0, 0, 0.85)';
    context.beginPath();
    context.roundRect(inset, inset, size, size, size * 0.25);
    context.fill();
  });

const GLOW_RADIUS = 3.6;
const TEXTURE_SIZE = 256;
const SHADOW_INSET = 0.12;
const SHADOW_PADDING = 1 / (1 - SHADOW_INSET * 2);
