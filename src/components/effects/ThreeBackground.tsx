import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current!;

    // ── Scene Setup ───────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000505, 0.025);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 25);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mount.appendChild(renderer.domElement);

    // ── Cyber Terrain (Moving Floor) ──────────────────────────────────────
    const terrainGeo = new THREE.PlaneGeometry(300, 300, 80, 80);
    const posAttr = terrainGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      // Create a canyon in the middle for the camera
      const distFromCenter = Math.abs(x);
      let z = (Math.sin(x * 0.1) * Math.cos(y * 0.1)) * 4;
      if (distFromCenter > 20) {
        z += (distFromCenter - 20) * 0.5 + Math.random() * 2;
      }
      posAttr.setZ(i, z);
    }
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x000a00,
      emissive: 0x001100,
      roughness: 0.8,
      metalness: 0.2,
      wireframe: true,
      wireframeLinewidth: 2,
    });
    
    // Add grid lines glowing
    const terrain = new THREE.Mesh(terrainGeo, new THREE.MeshBasicMaterial({ 
      color: 0x00ff00, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.15 
    }));
    terrain.rotation.x = -Math.PI / 2;
    terrain.position.y = -10;
    scene.add(terrain);

    // Add a solid ground below the wireframe to hide things underneath
    const solidTerrain = new THREE.Mesh(terrainGeo, new THREE.MeshBasicMaterial({ color: 0x000500 }));
    solidTerrain.rotation.x = -Math.PI / 2;
    solidTerrain.position.y = -10.2;
    scene.add(solidTerrain);

    // ── Hyperspace Tunnel ─────────────────────────────────────────────────
    const tunnelGeo = new THREE.CylinderGeometry(40, 40, 400, 32, 32, true);
    const tunnelMat = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0.05,
      side: THREE.BackSide
    });
    const tunnel = new THREE.Mesh(tunnelGeo, tunnelMat);
    tunnel.rotation.x = Math.PI / 2;
    tunnel.position.z = -50;
    scene.add(tunnel);

    const tunnel2Geo = new THREE.CylinderGeometry(45, 45, 400, 16, 16, true);
    const tunnel2Mat = new THREE.MeshBasicMaterial({
      color: 0x8a2be2, // Purple
      wireframe: true,
      transparent: true,
      opacity: 0.04,
      side: THREE.BackSide
    });
    const tunnel2 = new THREE.Mesh(tunnel2Geo, tunnel2Mat);
    tunnel2.rotation.x = Math.PI / 2;
    tunnel2.position.z = -50;
    scene.add(tunnel2);

    // ── Floating Cyber Cubes ──────────────────────────────────────────────
    const cubes: { mesh: THREE.Mesh; inner: THREE.Mesh; rx: number; ry: number; zSpeed: number }[] = [];
    const boxGeo = new THREE.BoxGeometry(2, 2, 2);
    
    for (let i = 0; i < 40; i++) {
      const isPrimary = Math.random() > 0.5;
      const color = isPrimary ? 0x00ff00 : 0x00ffff;
      
      const outMat = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.4 });
      const inMat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.5, transparent: true, opacity: 0.6 });
      
      const outer = new THREE.Mesh(boxGeo, outMat);
      const inner = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), inMat);
      outer.add(inner);
      
      outer.position.set(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 40 + 10,
        (Math.random() - 0.5) * 200 - 50
      );
      
      // Keep cubes out of the center camera path
      if (Math.abs(outer.position.x) < 10) outer.position.x += 15 * Math.sign(outer.position.x || 1);
      
      const scale = Math.random() * 1.5 + 0.5;
      outer.scale.setScalar(scale);
      
      scene.add(outer);
      cubes.push({
        mesh: outer,
        inner: inner,
        rx: (Math.random() - 0.5) * 0.02,
        ry: (Math.random() - 0.5) * 0.02,
        zSpeed: Math.random() * 0.2 + 0.05
      });
    }

    // ── Streaking Warp Particles ──────────────────────────────────────────
    const streakCount = 1000;
    const streakGeo = new THREE.BufferGeometry();
    const streakPos = new Float32Array(streakCount * 6); // 2 vertices per line
    const streakColors = new Float32Array(streakCount * 6);

    for (let i = 0; i < streakCount; i++) {
      const x = (Math.random() - 0.5) * 150;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 300 - 100;
      const length = Math.random() * 15 + 5;

      // Start vertex
      streakPos[i * 6] = x;
      streakPos[i * 6 + 1] = y;
      streakPos[i * 6 + 2] = z;
      
      // End vertex
      streakPos[i * 6 + 3] = x;
      streakPos[i * 6 + 4] = y;
      streakPos[i * 6 + 5] = z + length;

      const r = Math.random() > 0.5 ? 0 : 0.5;
      const g = Math.random() > 0.2 ? 1 : 0.2;
      const b = Math.random() > 0.5 ? 1 : 0;

      streakColors[i*6] = r; streakColors[i*6+1] = g; streakColors[i*6+2] = b;
      streakColors[i*6+3] = r; streakColors[i*6+4] = g; streakColors[i*6+5] = b;
    }

    streakGeo.setAttribute('position', new THREE.BufferAttribute(streakPos, 3));
    streakGeo.setAttribute('color', new THREE.BufferAttribute(streakColors, 3));

    const streakMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const streaks = new THREE.LineSegments(streakGeo, streakMat);
    scene.add(streaks);

    // ── Lighting ──────────────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0x001100, 2);
    scene.add(ambient);
    const directional = new THREE.DirectionalLight(0x00ffff, 1.5);
    directional.position.set(0, 20, 10);
    scene.add(directional);

    // ── Interaction State ─────────────────────────────────────────────────
    let scrollY = 0;
    let targetScrollSpeed = 0;
    let currentScrollSpeed = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraZ = 25;

    const onScroll = () => { 
      const newScroll = window.scrollY;
      const delta = newScroll - scrollY;
      targetScrollSpeed = delta > 0 ? Math.min(delta * 0.05, 5) : Math.max(delta * 0.05, -5);
      scrollY = newScroll;
    };
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouse);

    // ── Animation Loop ────────────────────────────────────────────────────
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Smooth scroll speed return to normal
      targetScrollSpeed *= 0.95; 
      currentScrollSpeed += (targetScrollSpeed - currentScrollSpeed) * 0.1;
      
      const baseSpeed = 0.5;
      const speed = baseSpeed + Math.abs(currentScrollSpeed);

      // Camera dynamic movement
      camera.position.x += (mouseX * 15 - camera.position.x) * 0.05;
      camera.position.y += (5 + -mouseY * 10 - camera.position.y) * 0.05;
      
      // Camera zooms in slightly on fast scroll
      targetCameraZ = 25 - Math.abs(currentScrollSpeed) * 2;
      camera.position.z += (targetCameraZ - camera.position.z) * 0.1;
      
      camera.lookAt(mouseX * 5, 5 + -mouseY * 5, -100);

      // Move terrain UVs to simulate infinite forward motion
      terrain.position.z = (t * 15 * speed) % 10;
      solidTerrain.position.z = terrain.position.z;

      // Rotate tunnels
      tunnel.rotation.y += 0.001 * speed;
      tunnel2.rotation.y -= 0.0015 * speed;

      // Animate cubes
      cubes.forEach(obj => {
        obj.mesh.rotation.x += obj.rx;
        obj.mesh.rotation.y += obj.ry;
        obj.inner.rotation.x -= obj.rx * 2;
        obj.inner.rotation.y -= obj.ry * 2;
        
        // Pulse emission
        const inMat = obj.inner.material as THREE.MeshStandardMaterial;
        inMat.emissiveIntensity = 0.5 + Math.sin(t * 3 + obj.mesh.position.x) * 0.5;

        // Move towards camera
        obj.mesh.position.z += (obj.zSpeed + currentScrollSpeed * 0.5) * speed * 2;
        
        // Loop back
        if (obj.mesh.position.z > 50) {
          obj.mesh.position.z = -250;
          obj.mesh.position.x = (Math.random() - 0.5) * 80;
          if (Math.abs(obj.mesh.position.x) < 10) obj.mesh.position.x += 15 * Math.sign(obj.mesh.position.x || 1);
        }
      });

      // Animate streaks (warp effect)
      const positions = streakGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < streakCount; i++) {
        // Move z
        positions[i * 6 + 2] += speed * 4;
        positions[i * 6 + 5] += speed * 4;
        
        // Reset if passed camera
        if (positions[i * 6 + 2] > 50) {
          const z = -200 - Math.random() * 100;
          const length = Math.random() * 15 + 5 + Math.abs(currentScrollSpeed) * 5;
          positions[i * 6 + 2] = z;
          positions[i * 6 + 5] = z + length;
        }
      }
      streakGeo.attributes.position.needsUpdate = true;

      // Dynamic FOV based on scroll speed (warp speed effect)
      camera.fov = 60 + Math.abs(currentScrollSpeed) * 5;
      camera.updateProjectionMatrix();

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.95 }}
    />
  );
}
