
import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Environment, Torus, Box } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function InteractiveSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = React.useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      
      const targetScale = hovered ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere
        ref={meshRef}
        args={[1, 64, 128]}
        scale={1.5}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshDistortMaterial
          color={hovered ? "#FF0080" : "#00D9FF"}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.9}
        />
      </Sphere>
    </Float>
  );
}

function AnimatedRings() {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.x = state.clock.elapsedTime * 0.05;
      group.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <group ref={group}>
      {[1, 2, 3].map((ring, index) => (
        <mesh key={ring} rotation={[0, 0, (index * Math.PI) / 3]} scale={ring * 0.6}>
          <torusGeometry args={[2, 0.08, 16, 100]} />
          <meshStandardMaterial
            color={['#00D9FF', '#8B5CF6', '#FF0080'][index]}
            transparent
            opacity={0.6}
            emissive={['#00D9FF', '#8B5CF6', '#FF0080'][index]}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function FloatingCubes() {
  const cubesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cubesRef.current) {
      cubesRef.current.children.forEach((cube, index) => {
        cube.rotation.x = state.clock.elapsedTime * (0.5 + index * 0.1);
        cube.rotation.y = state.clock.elapsedTime * (0.3 + index * 0.05);
        cube.position.y = Math.sin(state.clock.elapsedTime + index) * 0.5;
      });
    }
  });

  return (
    <group ref={cubesRef}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Box
          key={index}
          args={[0.3, 0.3, 0.3]}
          position={[
            Math.cos((index / 5) * Math.PI * 2) * 3,
            0,
            Math.sin((index / 5) * Math.PI * 2) * 3
          ]}
        >
          <meshStandardMaterial
            color={`hsl(${200 + index * 30}, 70%, 60%)`}
            transparent
            opacity={0.7}
            emissive={`hsl(${200 + index * 30}, 70%, 40%)`}
            emissiveIntensity={0.1}
          />
        </Box>
      ))}
    </group>
  );
}

const SplineInspired: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <motion.div 
      className={`w-full h-96 relative ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={0.4} color="#8B5CF6" />
          <pointLight position={[0, 10, 5]} intensity={0.6} color="#00D9FF" />
          
          <InteractiveSphere />
          <AnimatedRings />
          <FloatingCubes />
          
          <Environment preset="night" />
        </Suspense>
      </Canvas>
      
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Interactive 3D</h3>
          <p className="text-white/80">Hover to interact</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SplineInspired;
