import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, MeshDistortMaterial, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Placeholder abstract VR Model that responds to Scroll and Mouse
const FuturisticVRModel = () => {
  const groupRef = useRef();
  const headRef = useRef();
  const visorRef = useRef();

  // Mouse interaction for subtle look-around idle motion
  useFrame(({ pointer, clock }) => {
    // Idle floating rotation sync with mouse
    const time = clock.getElapsedTime();
    if (groupRef.current) {
      // Small idle breathing + parallax logic
      gsap.to(groupRef.current.rotation, {
        y: (pointer.x * Math.PI) / 6,
        x: (-pointer.y * Math.PI) / 8,
        duration: 2,
        ease: 'power2.out',
      });
    }
    
    if (visorRef.current) {
      visorRef.current.material.distort = 0.2 + Math.sin(time) * 0.1;
    }
  });

  // Setup GSAP ScrollTrigger for 3D Camera / Model rotation based on sections parsing
  useEffect(() => {
    if (!groupRef.current) return;
    
    const ctx = gsap.context(() => {
      // Section 1 - Hero
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });
      tl.to(groupRef.current.position, { z: 2, ease: "none" })
        .to(groupRef.current.rotation, { z: -Math.PI / 8, ease: "none" }, 0);
        
      // Section 2 - About
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: '#about-section',
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        }
      });
      tl2.to(groupRef.current.position, { x: 2, z: -1, ease: 'none' })
         .to(groupRef.current.rotation, { y: Math.PI / 2, ease: 'none' }, 0);
    });

    return () => ctx.revert();
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Placeholder Head */}
        <mesh ref={headRef} position={[0, 0, 0]}>
          <boxGeometry args={[1.2, 1.4, 1.2]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.1} metalness={0.8} />
        </mesh>
        
        {/* VR Visor */}
        <mesh ref={visorRef} position={[0, 0.2, 0.65]}>
          <boxGeometry args={[1.3, 0.5, 0.5]} />
          <MeshDistortMaterial color="#007367" speed={2} roughness={0} metalness={1} distort={0.2} />
        </mesh>

        {/* Floating tech rings */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.02, 16, 100]} />
          <meshStandardMaterial color="#009988" emissive="#007367" emissiveIntensity={0.5} />
        </mesh>
      </Float>
    </group>
  );
};

const ThreeCanvas = () => {
  return (
    <div id="canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#FFFFFF" />
        <pointLight position={[-10, -10, -5]} color="#007367" intensity={2} />
        
        <FuturisticVRModel />
        
        {/* Ground shadow for depth */}
        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color="#007367" />
        
        <Environment preset="city" />
        
        {/* Controls optional, but user interaction is via mouse position tracked in useFrame */}
        {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;
