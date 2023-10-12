import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";

window.addEventListener("load", function () {
  init();
});

function init() {
  const options = {
    color: 0xffffff,
  };

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.set(0, 0, 10);

  scene.add(camera);

  const controls = new OrbitControls(camera, renderer.domElement);

  const sunGeometry = new THREE.SphereGeometry(2, 32, 32);

  const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  scene.add(sun);

  const earthOrbit = new THREE.Object3D();
  scene.add(earthOrbit);

  const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
  const earthMaterial = new THREE.MeshPhongMaterial({
    color: 0x2233ff,
    emissive: 0x112244,
    emissiveIntensity: 0.5,
  });

  const earth = new THREE.Mesh(earthGeometry, earthMaterial);
  earth.position.x = 5;
  earthOrbit.add(earth);

  const moonGeometry = new THREE.SphereGeometry(0.3, 32, 32);
  const moonMaterial = new THREE.MeshPhongMaterial({
    color: 0x888888,
    emissiveIntensity: 0.5,
  });

  const moon = new THREE.Mesh(moonGeometry, moonMaterial);
  moon.position.x = 3.5;
  earthOrbit.add(moon);

  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(0, 0, 0);
  scene.add(light);

  const clock = new THREE.Clock();

  render();

  function render() {
    const elapsedTime = clock.getElapsedTime();
    sun.rotation.y = elapsedTime * 0.1;
    earthOrbit.rotation.y = elapsedTime * 0.5;
    moon.rotation.y = elapsedTime * 0.5;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  window.addEventListener("resize", handleResize);

  const gui = new GUI();

  gui.addColor(options, "color").onChange((value) => {
    sunMaterial.color.set(value);
    earthMaterial.color.set(value);
    moonMaterial.color.set(value);
  });
}
