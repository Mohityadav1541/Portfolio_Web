import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Robot3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Scene setup ──────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    mount.appendChild(renderer.domElement);

    // ── Materials ────────────────────────────────────────────────────────
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x001a00,
    });
    const greenMat = new THREE.MeshStandardMaterial({
      color: 0x00ff00,
      emissive: 0x00ff00,
      emissiveIntensity: 0.8,
      metalness: 0.5,
      roughness: 0.1,
    });
    const cyanMat = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      emissive: 0x00ffff,
      emissiveIntensity: 0.6,
      metalness: 0.5,
      roughness: 0.1,
    });
    const purpleMat = new THREE.MeshStandardMaterial({
      color: 0x8a2be2,
      emissive: 0x8a2be2,
      emissiveIntensity: 0.5,
      metalness: 0.5,
      roughness: 0.2,
    });
    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.95,
      roughness: 0.1,
      emissive: 0x050515,
    });
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true, transparent: true, opacity: 0.15 });

    // ── Robot group ───────────────────────────────────────────────────────
    const robot = new THREE.Group();
    scene.add(robot);

    // Helper: add edge lines
    const addEdges = (mesh: THREE.Mesh, mat = greenMat) => {
      const edges = new THREE.EdgesGeometry(mesh.geometry);
      const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: (mat as THREE.MeshStandardMaterial).color, linewidth: 1 }));
      line.position.copy(mesh.position);
      line.rotation.copy(mesh.rotation);
      line.scale.copy(mesh.scale);
      robot.add(line);
    };

    // HEAD ──────────────────────────────────────────────────────────────
    const head = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 1.0), metalMat);
    head.position.set(0, 2.1, 0);
    head.castShadow = true;
    robot.add(head);
    addEdges(head);

    // Visor (green glowing strip)
    const visor = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.22, 0.12), greenMat);
    visor.position.set(0, 2.1, 0.52);
    robot.add(visor);

    // Eye left
    const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.05), greenMat);
    eyeL.position.set(-0.25, 2.1, 0.55);
    robot.add(eyeL);

    // Eye right
    const eyeR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.05), greenMat);
    eyeR.position.set(0.25, 2.1, 0.55);
    robot.add(eyeR);

    // Mouth grid (small boxes)
    for (let i = -1; i <= 1; i++) {
      const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 0.04), i % 2 === 0 ? greenMat : darkMat);
      tooth.position.set(i * 0.18, 1.78, 0.52);
      robot.add(tooth);
    }

    // Antenna
    const antennaBase = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.4, 6), metalMat);
    antennaBase.position.set(0, 2.82, 0);
    robot.add(antennaBase);
    const antennaBall = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), cyanMat);
    antennaBall.position.set(0, 3.1, 0);
    robot.add(antennaBall);

    // Side ears
    const earL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.4, 0.2), darkMat);
    earL.position.set(-0.67, 2.1, 0);
    robot.add(earL);
    addEdges(earL, cyanMat);

    const earR = earL.clone();
    earR.position.set(0.67, 2.1, 0);
    robot.add(earR);

    // NECK ────────────────────────────────────────────────────────────────
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.24, 0.35, 8), metalMat);
    neck.position.set(0, 1.45, 0);
    robot.add(neck);
    addEdges(neck);

    // TORSO ───────────────────────────────────────────────────────────────
    const torso = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.8, 0.9), metalMat);
    torso.position.set(0, 0.3, 0);
    torso.castShadow = true;
    robot.add(torso);
    addEdges(torso);

    // Chest panel (cyan accent)
    const chestPanel = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.5, 0.08), darkMat);
    chestPanel.position.set(0, 0.4, 0.47);
    robot.add(chestPanel);
    addEdges(chestPanel, cyanMat);

    // Core reactor (glowing center)
    const reactor = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.1, 16), cyanMat);
    reactor.rotation.x = Math.PI / 2;
    reactor.position.set(0, 0.4, 0.52);
    robot.add(reactor);

    // Circuit lines on chest
    const circuitH = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.03, 0.03), greenMat);
    circuitH.position.set(0, 0.25, 0.47);
    robot.add(circuitH);
    const circuitV = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.3, 0.03), greenMat);
    circuitV.position.set(-0.2, 0.25, 0.47);
    robot.add(circuitV);
    const circuitV2 = circuitV.clone();
    circuitV2.position.set(0.2, 0.25, 0.47);
    robot.add(circuitV2);

    // Shoulder pads
    const shoulderL = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.55, 0.7), metalMat);
    shoulderL.position.set(-1.02, 0.85, 0);
    robot.add(shoulderL);
    addEdges(shoulderL, purpleMat);

    const shoulderR = shoulderL.clone();
    shoulderR.position.set(1.02, 0.85, 0);
    robot.add(shoulderR);
    addEdges(shoulderR, purpleMat);

    // ARMS ────────────────────────────────────────────────────────────────
    const armL = new THREE.Mesh(new THREE.BoxGeometry(0.38, 1.1, 0.38), metalMat);
    armL.position.set(-1.02, 0.0, 0);
    robot.add(armL);
    addEdges(armL);

    const armR = armL.clone();
    armR.position.set(1.02, 0.0, 0);
    robot.add(armR);
    addEdges(armR);

    // Forearms
    const foreArmL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.9, 0.3), darkMat);
    foreArmL.position.set(-1.02, -0.95, 0);
    robot.add(foreArmL);
    addEdges(foreArmL, greenMat);

    const foreArmR = foreArmL.clone();
    foreArmR.position.set(1.02, -0.95, 0);
    robot.add(foreArmR);
    addEdges(foreArmR, greenMat);

    // Fists
    const fistL = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.32, 0.34), metalMat);
    fistL.position.set(-1.02, -1.52, 0);
    robot.add(fistL);
    addEdges(fistL, greenMat);

    const fistR = fistL.clone();
    fistR.position.set(1.02, -1.52, 0);
    robot.add(fistR);
    addEdges(fistR, greenMat);

    // HIPS ────────────────────────────────────────────────────────────────
    const hips = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.5, 0.75), metalMat);
    hips.position.set(0, -0.65, 0);
    robot.add(hips);
    addEdges(hips);

    // LEGS ────────────────────────────────────────────────────────────────
    const thighL = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.0, 0.5), metalMat);
    thighL.position.set(-0.42, -1.45, 0);
    robot.add(thighL);
    addEdges(thighL);

    const thighR = thighL.clone();
    thighR.position.set(0.42, -1.45, 0);
    robot.add(thighR);

    const shinL = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.0, 0.42), darkMat);
    shinL.position.set(-0.42, -2.45, 0);
    robot.add(shinL);
    addEdges(shinL, greenMat);

    const shinR = shinL.clone();
    shinR.position.set(0.42, -2.45, 0);
    robot.add(shinR);
    addEdges(shinR, greenMat);

    // Feet
    const footL = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.25, 0.7), metalMat);
    footL.position.set(-0.42, -3.05, 0.1);
    robot.add(footL);
    addEdges(footL, cyanMat);

    const footR = footL.clone();
    footR.position.set(0.42, -3.05, 0.1);
    robot.add(footR);
    addEdges(footR, cyanMat);

    // Holographic wireframe overlay
    const holoSphere = new THREE.Mesh(new THREE.SphereGeometry(2.8, 12, 12), wireMat);
    holoSphere.position.set(0, 0, 0);
    robot.add(holoSphere);

    // Floating data rings around robot
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(2.0, 0.025, 6, 64),
      new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.4 })
    );
    ring1.rotation.x = Math.PI / 2.5;
    scene.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.4, 0.018, 6, 64),
      new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.25 })
    );
    ring2.rotation.x = Math.PI / 1.8;
    ring2.rotation.z = Math.PI / 4;
    scene.add(ring2);

    const ring3 = new THREE.Mesh(
      new THREE.TorusGeometry(1.7, 0.02, 6, 64),
      new THREE.MeshBasicMaterial({ color: 0x8a2be2, transparent: true, opacity: 0.3 })
    );
    ring3.rotation.x = Math.PI / 3;
    ring3.rotation.y = Math.PI / 5;
    scene.add(ring3);

    // Floating particles around robot
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 80;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 2.5 + Math.random() * 1.5;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi);
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0x00ff00, size: 0.04, transparent: true, opacity: 0.7 });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── Lighting ──────────────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0x111111, 2);
    scene.add(ambient);

    const greenLight = new THREE.PointLight(0x00ff00, 4, 8);
    greenLight.position.set(2, 2, 3);
    scene.add(greenLight);

    const cyanLight = new THREE.PointLight(0x00ffff, 3, 8);
    cyanLight.position.set(-2, 0, 3);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0x8a2be2, 2, 8);
    purpleLight.position.set(0, -2, 2);
    scene.add(purpleLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 0.5);
    topLight.position.set(0, 5, 5);
    scene.add(topLight);

    // ── Scroll + mouse state ──────────────────────────────────────────────
    let scrollY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetY = 0;
    let currentY = 0;

    const onScroll = () => { scrollY = window.scrollY; };
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouse);

    // ── Animation loop ─────────────────────────────────────────────────────
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Scroll parallax — robot moves down as page scrolls down
      targetY = -scrollY * 0.003;
      currentY += (targetY - currentY) * 0.08;
      robot.position.y = currentY;

      // Idle bob
      robot.position.y += Math.sin(t * 1.2) * 0.06 + currentY;
      robot.position.y -= currentY; // offset so we add the bob correctly
      robot.position.y = currentY + Math.sin(t * 1.2) * 0.06;

      // Mouse look
      robot.rotation.y = mouseX * 0.25 + Math.sin(t * 0.3) * 0.05;
      robot.rotation.x = -mouseY * 0.12;

      // Eye pulse
      const pulse = (Math.sin(t * 3) + 1) / 2;
      (eyeL.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.6 + pulse * 0.6;
      (eyeR.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.6 + pulse * 0.6;
      (reactor.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.4 + pulse * 0.8;
      (antennaBall.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.4 + Math.sin(t * 4) * 0.4;

      // Arm swing subtle
      armL.rotation.x = Math.sin(t * 0.8) * 0.08;
      armR.rotation.x = -Math.sin(t * 0.8) * 0.08;
      foreArmL.rotation.x = Math.sin(t * 0.8) * 0.08;
      foreArmR.rotation.x = -Math.sin(t * 0.8) * 0.08;

      // Ring rotation
      ring1.rotation.z += 0.004;
      ring2.rotation.y += 0.003;
      ring3.rotation.x += 0.002;
      ring3.rotation.z -= 0.003;

      // Particles slow orbit
      particles.rotation.y += 0.001;

      // Wireframe holo pulse
      (holoSphere.material as THREE.MeshBasicMaterial).opacity = 0.08 + Math.sin(t * 0.5) * 0.04;

      // Green light flicker
      greenLight.intensity = 3.5 + Math.sin(t * 7) * 0.5;

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ──────────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
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
      className="w-full h-full min-h-[520px]"
      style={{ cursor: 'crosshair' }}
    />
  );
}
