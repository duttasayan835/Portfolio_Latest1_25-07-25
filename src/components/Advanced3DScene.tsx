import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Sphere, 
  MeshDistortMaterial, 
  Float, 
  Environment, 
  Text3D, 
  Center,
  Sparkles,
  Cloud,
  Stars,
  ContactShadows,
  PresentationControls,
  Stage
} from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Liquid Metal Sphere
function LiquidMetalSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  
  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
      meshRef.current.rotation.y = time * 0.4;
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.3;
      
      // Animate material properties
      materialRef.current.distort = 0.4 + Math.sin(time * 2) * 0.1;
      materialRef.current.speed = 1 + Math.sin(time) * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1.2, 128, 128]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          ref={materialRef}
          color="#ff6b6b"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0}
          metalness={1}
          envMapIntensity={2}
          transparent
          opacity={0.9}
        />
      </Sphere>
    </Float>
  );
}

// Morphing Geometry
function MorphingShapes() {
  const groupRef = useRef<THREE.Group>(null);
  
  const shapes = useMemo(() => [
    { geometry: 'box', position: [-3, 1, 0] as [number, number, number], color: '#4ecdc4' },
    { geometry: 'octahedron', position: [3, -1, 0] as [number, number, number], color: '#45b7d1' },
    { geometry: 'torus', position: [0, 2, -2] as [number, number, number], color: '#f9ca24' },
    { geometry: 'cone', position: [-2, -2, 1] as [number, number, number], color: '#f0932b' },
    { geometry: 'cylinder', position: [2, 0, 2] as [number, number, number], color: '#eb4d4b' }
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      
      groupRef.current.children.forEach((child, index) => {
        const time = state.clock.elapsedTime;
        child.rotation.x = time * (0.5 + index * 0.1);
        child.rotation.z = Math.sin(time + index) * 0.3;
        child.scale.setScalar(1 + Math.sin(time * 2 + index) * 0.1);
      });
    }
  });

  const getGeometry = (type: string) => {
    switch (type) {
      case 'box': return <boxGeometry args={[0.8, 0.8, 0.8]} />;
      case 'octahedron': return <octahedronGeometry args={[0.8]} />;
      case 'torus': return <torusGeometry args={[0.6, 0.25, 16, 100]} />;
      case 'cone': return <coneGeometry args={[0.5, 1, 8]} />;
      case 'cylinder': return <cylinderGeometry args={[0.4, 0.4, 1, 8]} />;
      default: return <sphereGeometry args={[0.5]} />;
    }
  };

  return (
    <group ref={groupRef}>
      {shapes.map((shape, index) => (
        <Float key={index} speed={1 + index * 0.2} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={shape.position}>
            {getGeometry(shape.geometry)}
            <meshStandardMaterial
              color={shape.color}
              metalness={0.8}
              roughness={0.1}
              envMapIntensity={1.5}
              transparent
              opacity={0.8}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Floating 3D Text
function Floating3DText() {
  const textRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
    }
  });

  return (
    <Center ref={textRef} position={[0, 3, -1]}>
      <Text3D
        font="https://cdn.jsdelivr.net/npm/three/examples/fonts/helvetiker_regular.typeface.json"
        size={0.5}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        INNOVATION
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={2}
        />
      </Text3D>
    </Center>
  );
}

// Particle Cloud System
function ParticleCloud() {
  const pointsRef = useRef<THREE.Points>(null);
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(3000 * 3);
    const colors = new Float32Array(3000 * 3);
    
    for (let i = 0; i < 3000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      const color = new THREE.Color();
      color.setHSL(0.5 + Math.random() * 0.5, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (pointsRef.current && pointsRef.current.geometry.attributes.position) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const z = positions[i + 2];
        positions[i + 1] += Math.sin(state.clock.elapsedTime * 0.5 + x * 0.01 + z * 0.01) * 0.01;
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={2}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Interactive Camera Controller
function CameraController() {
  const { camera, mouse } = useThree();
  
  useFrame(() => {
    camera.position.x += (mouse.x * 3 - camera.position.x) * 0.03;
    camera.position.y += (mouse.y * 2 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

const Advanced3DScene: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <motion.div 
      className={`w-full h-screen relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Lighting Setup */}
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b6b" />
          <pointLight position={[0, 10, 5]} intensity={0.7} color="#4ecdc4" />
          <spotLight
            position={[0, 5, 5]}
            angle={0.3}
            penumbra={1}
            intensity={1}
            castShadow
            color="#45b7d1"
          />

          {/* Environment and Effects */}
          <Environment preset="night" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Sparkles count={100} scale={10} size={2} speed={0.4} />
          
          {/* 3D Elements */}
          <PresentationControls
            global
            cursor={true}
            snap={true}
            speed={1}
            zoom={0.8}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
          >
            <Stage environment="night" intensity={0.5} shadows>
              <LiquidMetalSphere />
              <MorphingShapes />
              <Floating3DText />
            </Stage>
          </PresentationControls>
          
          <ParticleCloud />
          <CameraController />
          
          {/* Contact Shadows */}
          <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.4} 
            scale={20} 
            blur={2} 
            far={2} 
          />
        </Suspense>
      </Canvas>

      {/* Overlay Information */}
      <motion.div 
        className="absolute bottom-8 left-8 text-white/80"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <p className="text-sm font-medium">Interactive 3D Experience</p>
        <p className="text-xs">Drag to rotate • Scroll to zoom</p>
      </motion.div>
    </motion.div>
  );
};

export default Advanced3DScene;