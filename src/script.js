/*
Author: chankruze (chankruze@geekofia.in)
Created: Sat Apr 17 2021 12:31:39 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2021 and beyond
*/

import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Loading
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load("/textures/NormalMap.png");

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
// https://threejs.org/docs/?q=sphere#api/en/geometries/SphereGeometry
const geometry = new THREE.SphereGeometry(0.5, 32, 32);

// Materials
// https://threejs.org/docs/#api/en/materials/MeshStandardMaterial
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.2;
material.roughness = 0.5;
material.color = new THREE.Color(0x292929);
material.normalMap = normalTexture;

const materialFolder = gui.addFolder("Mesh Material");
materialFolder.add(material, "roughness").min(0).max(1);
materialFolder.add(material, "metalness").min(0).max(1);

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights

// Light 1
const pointLight = new THREE.PointLight(0xffffff, 0.15);
pointLight.position.set(2, 3, 4);
scene.add(pointLight);

// Light 2
const pointLight2 = new THREE.PointLight(0xbbbbbb, 2);
pointLight2.position.set(-0.76, 1, 1);
pointLight2.intensity = 1.37;
scene.add(pointLight2);

const light2 = gui.addFolder("Light 2");

light2.add(pointLight2.position, "x").min(-3).max(3).step(0.01);
light2.add(pointLight2.position, "y").min(-6).max(6).step(0.01);
light2.add(pointLight2.position, "z").min(-3).max(3).step(0.01);
light2.add(pointLight2, "intensity").min(0).max(10).step(0.01);

const light2Color = {
  color: 0xbbbbbb,
};

light2
  .addColor(light2Color, "color")
  .onChange(() => pointLight2.color.set(light2Color.color));

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1);
// scene.add(pointLightHelper2);

// Light 3
const pointLight3 = new THREE.PointLight(0xacacac, 2);
pointLight3.position.set(0.76, -1, 1);
pointLight3.intensity = 2.03;
scene.add(pointLight3);

const light3 = gui.addFolder("Light 3");

light3.add(pointLight3.position, "x").min(-3).max(3).step(0.01);
light3.add(pointLight3.position, "y").min(-6).max(6).step(0.01);
light3.add(pointLight3.position, "z").min(-3).max(3).step(0.01);
light3.add(pointLight3, "intensity").min(0).max(10).step(0.01);

const light3Color = {
  color: 0xacacac,
};

light3
  .addColor(light3Color, "color")
  .onChange(() => pointLight3.color.set(light3Color.color));

// const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 1);
// scene.add(pointLightHelper3);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

let mouseX = 0,
  mouseY = 0,
  targetX = 0,
  targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

const onDocumentMouseMove = (e) => {
  mouseX = e.clientX - windowHalfX;
  mouseY = e.clientY - windowHalfY;
};

const updateSphere = (e) => {
  sphere.position.y = window.scrollY * 0.001;
};

document.addEventListener("mousemove", onDocumentMouseMove);
document.addEventListener("scroll", updateSphere);

const clock = new THREE.Clock();

const tick = () => {
  targetX = mouseX * 0.002;
  targetY = mouseY * 0.002;

  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.25 * elapsedTime;

  sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
  sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x);
  sphere.position.z += -0.05 * (targetY - sphere.rotation.x);

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
