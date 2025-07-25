import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  Sphere, 
  MeshDistortMaterial, 
  Float, 
  Environment,
  Sparkles,
  OrbitControls
} from '@react-three/drei';
import { motion } from 'framer-motion';

// Liquid Metal Sphere
function LiquidMetalSphere() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1.2, 32, 32]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#ff6b6b"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0}
          metalness={1}
          transparent
          opacity={0.9}
        />
      </Sphere>
    </Float>
  );
}

// Floating orb
function FloatingOrb({ position, color }: { position: [number, number, number], color: string }) {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh position={position}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial
          color={color}
          metalness={0.5}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

const SimplifiedAdvanced3D: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <motion.div 
      className={`w-full h-96 relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting Setup */}
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b6b" />

          {/* 3D Elements */}
          <LiquidMetalSphere />
          <FloatingOrb position={[-2, 1, 0]} color="#4ecdc4" />
          <FloatingOrb position={[2, -1, 0]} color="#8a2be2" />
          
          {/* Environment and Effects */}
          <Environment preset="city" />
          <Sparkles count={50} scale={5} size={1} speed={0.3} />
          
          {/* Controls */}
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Suspense>
      </Canvas>
    </motion.div>
  );
};

export default SimplifiedAdvanced3D;