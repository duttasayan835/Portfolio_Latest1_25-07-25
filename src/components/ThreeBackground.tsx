
import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

// Additional Particle System for more variety
function AdditionalParticles() {
  const ref = useRef<THREE.Points>(null);
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    const colors = new Float32Array(1000 * 3);
    
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
      
      const color = new THREE.Color();
      color.setHSL(0.5 + Math.random() * 0.3, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (ref.current && ref.current.geometry && ref.current.geometry.attributes.position) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
      
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const z = positions[i + 2];
        positions[i + 1] += Math.sin(state.clock.elapsedTime + x * 0.1 + z * 0.1) * 0.002;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors}>
      <PointMaterial
        transparent
        vertexColors
        size={1}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    const colors = new Float32Array(2000 * 3);
    
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      
      const color = new THREE.Color();
      const hue = 0.5 + Math.random() * 0.4;
      color.setHSL(hue, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (ref.current && ref.current.geometry && ref.current.geometry.attributes.position) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.05;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.015) * 0.05;
      
      // Wave effect
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const z = positions[i + 2];
        positions[i + 1] += Math.sin(state.clock.elapsedTime * 0.5 + x * 0.01 + z * 0.01) * 0.01;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors}>
      <PointMaterial
        transparent
        vertexColors
        size={1.2}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function FloatingOrb({ position, color, scale }: { position: [number, number, number], color: string, scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 2;
      meshRef.current.position.x = position[0] + Math.cos(time * 0.3) * 1;
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.15;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.6}
          distort={0.3}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function AnimatedTorus() {
  const torusRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (torusRef.current) {
      const time = state.clock.elapsedTime;
      torusRef.current.rotation.x = time * 0.3;
      torusRef.current.rotation.y = time * 0.2;
      torusRef.current.rotation.z = Math.sin(time * 0.1) * 0.3;
    }
  });

  return (
    <mesh ref={torusRef} position={[-8, 3, -12]}>
      <torusGeometry args={[2, 0.6, 16, 100]} />
      <meshStandardMaterial
        color="#8B5CF6"
        transparent
        opacity={0.7}
        emissive="#8B5CF6"
        emissiveIntensity={0.3}
        wireframe
      />
    </mesh>
  );
}

function InteractiveCamera() {
  const { camera, mouse } = useThree();
  
  useFrame(() => {
    if (camera && mouse) {
      camera.position.x += (mouse.x * 2 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 2 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);
    }
  });
  
  return null;
}

function MorphingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.x = time * 0.1;
      meshRef.current.rotation.y = time * 0.15;
      meshRef.current.scale.setScalar(1 + Math.sin(time) * 0.1);
    }
  });

  return (
    <mesh ref={meshRef} position={[6, -2, -8]}>
      <octahedronGeometry args={[1.5]} />
      <meshStandardMaterial
        color="#00D9FF"
        transparent
        opacity={0.8}
        emissive="#00D9FF"
        emissiveIntensity={0.2}
        wireframe={false}
      />
    </mesh>
  );
}

const ThreeBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: 'transparent', height: '100vh', width: '100vw' }}
        gl={{ 
          antialias: true, 
          alpha: true,
          preserveDrawingBuffer: false,
          powerPreference: "high-performance"
        }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0);
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          scene.background = null;
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} color="#00D9FF" intensity={1} />
          <pointLight position={[-10, -10, -10]} color="#8B5CF6" intensity={0.6} />
          <pointLight position={[0, 10, 5]} color="#FF0080" intensity={0.4} />
          
          {/* Consolidated Particle System */}
          <ParticleField />
          <AdditionalParticles />
          <FloatingOrb position={[5, 2, -8]} color="#00D9FF" scale={1.5} />
          <FloatingOrb position={[-6, -3, -10]} color="#FF0080" scale={1.2} />
          <FloatingOrb position={[3, -4, -6]} color="#00FF88" scale={0.8} />
          <AnimatedTorus />
          <MorphingGeometry />
          
          <InteractiveCamera />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
