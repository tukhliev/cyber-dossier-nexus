import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Trail } from '@react-three/drei';
import * as THREE from 'three';

// Floating data node
const DataNode = ({ position, color, size = 0.1 }: { position: [number, number, number]; color: string; size?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[size, 0]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.5}
          wireframe
        />
      </mesh>
    </Float>
  );
};

// Grid floor
const CyberGrid = () => {
  const gridRef = useRef<THREE.GridHelper>(null);
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 0.5) % 2;
    }
  });

  return (
    <group position={[0, -2, 0]}>
      <gridHelper 
        ref={gridRef}
        args={[100, 100, '#00ffff', '#00ffff']} 
        rotation={[0, 0, 0]}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial 
          color="#000510" 
          transparent 
          opacity={0.8}
        />
      </mesh>
    </group>
  );
};

// Particle field
const ParticleField = ({ count = 500 }: { count?: number }) => {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={points}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color="#00ffff" 
        transparent 
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Orbiting ring
const OrbitRing = ({ radius = 3, color = '#00ffff' }: { radius?: number; color?: string }) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.2;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.02, 16, 100]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
};

// Central core
const CyberCore = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      coreRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      glowRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={[0, 0, -5]}>
      <Trail
        width={2}
        length={5}
        color="#00ffff"
        attenuation={(t) => t * t}
      >
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[0.5, 1]} />
          <meshStandardMaterial 
            color="#00ffff" 
            emissive="#00ffff" 
            emissiveIntensity={0.5}
            wireframe
          />
        </mesh>
      </Trail>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff" 
          emissiveIntensity={0.2}
          transparent
          opacity={0.1}
        />
      </mesh>
      <OrbitRing radius={1.5} color="#00ffff" />
      <OrbitRing radius={2} color="#00ff88" />
      <OrbitRing radius={2.5} color="#8800ff" />
    </group>
  );
};

// Main scene component
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00ff88" />
      
      <Stars 
        radius={50} 
        depth={50} 
        count={2000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={0.5}
      />
      
      <CyberCore />
      <CyberGrid />
      <ParticleField count={300} />
      
      {/* Floating data nodes */}
      <DataNode position={[-3, 1, -8]} color="#00ffff" size={0.15} />
      <DataNode position={[4, 2, -10]} color="#00ff88" size={0.12} />
      <DataNode position={[-5, -1, -12]} color="#8800ff" size={0.18} />
      <DataNode position={[6, 0, -6]} color="#00ffff" size={0.1} />
      <DataNode position={[-2, 3, -15]} color="#00ff88" size={0.2} />
      <DataNode position={[3, -2, -9]} color="#ff0044" size={0.08} />
    </>
  );
};

export const CyberScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};
