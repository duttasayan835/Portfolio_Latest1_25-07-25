import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Sphere, 
  Box,
  Torus,
  MeshDistortMaterial, 
  Float, 
  Environment,
  Sparkles,
  OrbitControls
} from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Simplified geometric shape for portfolio aesthetics
function GeometricShape({ position, shape = 'sphere', color, scale = 1 }: { 
  position: [number, number, number], 
  shape?: 'sphere' | 'box' | 'torus',
  color: string,
  scale?: number 
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y += 0.01;
    }
  });

  const geometry = {
    sphere: <sphereGeometry args={[0.8 * scale, 32, 32]} />,
    box: <boxGeometry args={[1.2 * scale, 1.2 * scale, 1.2 * scale]} />,
    torus: <torusGeometry args={[0.8 * scale, 0.3 * scale, 16, 100]} />
  };

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        {geometry[shape]}
        <meshStandardMaterial
          color={color}
          metalness={0.6}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

// Simplified glass sphere
function GlassSphere({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 32, 32]} position={position}>
        <MeshDistortMaterial
          color="#00D9FF"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.6}
        />
      </Sphere>
    </Float>
  );
}

// Simple wireframe element
function WireframeElement({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.008;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <torusKnotGeometry args={[0.8, 0.3, 64, 16]} />
        <meshBasicMaterial color="#8B5CF6" wireframe />
      </mesh>
    </Float>
  );
}

const PortfolioHero3D: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <motion.div 
      className={`absolute inset-0 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          {/* Simplified Lighting Setup */}
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00D9FF" />
          <pointLight position={[-10, -10, -10]} intensity={0.6} color="#8B5CF6" />

          {/* Simplified 3D Elements */}
          <GlassSphere position={[-3, 2, -2]} />
          <GeometricShape position={[3, -2, -1]} shape="sphere" color="#00FF88" scale={0.8} />
          <GeometricShape position={[-2, -1, 1]} shape="torus" color="#FF0080" scale={0.6} />
          <GeometricShape position={[2, 1, -3]} shape="box" color="#00D9FF" scale={0.7} />
          <WireframeElement position={[0, 3, -4]} />
          
          {/* Simplified sparkles */}
          <Sparkles 
            count={50} 
            scale={6} 
            size={1} 
            speed={0.3}
          />
          
          {/* Environment */}
          <Environment preset="sunset" />
          
          {/* Subtle orbit controls */}
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Suspense>
      </Canvas>
    </motion.div>
  );
};

export default PortfolioHero3D;