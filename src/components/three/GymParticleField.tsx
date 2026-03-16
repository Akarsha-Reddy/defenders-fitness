import React, { useRef, useMemo, Component, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// ─────────────────────────────────────────────
// Error boundary — prevents R3F crashes from
// taking down the whole page
// ─────────────────────────────────────────────
class R3FErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

// ─────────────────────────────────────────────
// Dumbbell-shaped particle cloud
// ─────────────────────────────────────────────
function DumbbellParticles({ count = 3000 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const accent = new THREE.Color('#E94560');
    const gold = new THREE.Color('#C9A84C');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Dumbbell silhouette: two spheres connected with a bar
      const r = Math.random();
      let x, y, z;

      if (r < 0.35) {
        // Left sphere
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = 1.8 + Math.random() * 0.4;
        x = Math.sin(phi) * Math.cos(theta) * radius - 3;
        y = Math.sin(phi) * Math.sin(theta) * radius;
        z = Math.cos(phi) * radius;
      } else if (r < 0.7) {
        // Right sphere
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = 1.8 + Math.random() * 0.4;
        x = Math.sin(phi) * Math.cos(theta) * radius + 3;
        y = Math.sin(phi) * Math.sin(theta) * radius;
        z = Math.cos(phi) * radius;
      } else {
        // Connecting bar
        x = (Math.random() - 0.5) * 6;
        y = (Math.random() - 0.5) * 0.5;
        z = (Math.random() - 0.5) * 0.5;
      }

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      // Mix accent and gold
      const mix = Math.random();
      const c = accent.clone().lerp(gold, mix);
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    return { positions, colors };
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    // Slow sine wave orbit
    meshRef.current.rotation.y = Math.sin(t * 0.15) * 0.3;
    meshRef.current.rotation.x = Math.cos(t * 0.1) * 0.1;
    meshRef.current.position.y = Math.sin(t * 0.2) * 0.2;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─────────────────────────────────────────────
// Wireframe torus knot
// ─────────────────────────────────────────────
function WireframeTorusKnot() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.05;
    ref.current.rotation.y = t * 0.08;
  });

  return (
    <mesh ref={ref} scale={2.5}>
      <torusKnotGeometry args={[1, 0.3, 128, 16]} />
      <meshBasicMaterial
        color="#E94560"
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  );
}

// ─────────────────────────────────────────────
// Camera auto-dolly controller
// ─────────────────────────────────────────────
function CameraRig() {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.08) * 1.5;
    camera.position.y = Math.cos(t * 0.06) * 0.8;
    camera.position.z = 8 + Math.sin(t * 0.1) * 0.5;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─────────────────────────────────────────────
// Main exported component
// ─────────────────────────────────────────────
export default function GymParticleField() {
  return (
    <R3FErrorBoundary>
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <CameraRig />
          <ambientLight intensity={0.3} />

          <DumbbellParticles count={3000} />
          <WireframeTorusKnot />

          <EffectComposer>
            <Bloom
              luminanceThreshold={0.4}
              luminanceSmoothing={0.9}
              intensity={1.2}
            />
          </EffectComposer>
        </Canvas>
      </div>
    </R3FErrorBoundary>
  );
}
