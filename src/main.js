import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import GUI from "lil-gui";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import {} from "three/examples/jsm/controls/OrbitControls";

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

  const sunMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    emissive: 0x112244,
    emissiveIntensity: 0.5,
  });
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

  /** Font */
  const fontLoader = new FontLoader();

  fontLoader.load("/assets/fonts/EliceDigitalBaeum_Bold.json", (font) => {
    const textGeometry = new TextGeometry("태양, 달 그리고 지구", {
      font,
      size: 0.8,
      height: 0.2,
    });
    textGeometry.center();

    const textMetrial = new THREE.MeshPhongMaterial({ color: 0x00c896 });
    const text = new THREE.Mesh(textGeometry, textMetrial);
    text.position.set(0, -3, 0);
    scene.add(text);
  });

  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

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
