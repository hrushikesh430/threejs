import * as THREE from 'three';
import { Camera } from 'three';
import './style.css'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
//sizes
const sizes = {
  width:window.innerWidth,
  height:window.innerHeight
}

const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(3,64,64);
const material = new THREE.MeshStandardMaterial({
  color:"red",
})

const mesh = new THREE.Mesh(geometry,material);

scene.add(mesh)

//adding camera 
const camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height);
camera.position.z = 10
scene.add(camera)




//light
const light = new THREE.PointLight(0xffffff,1,100);
light.position.set(0,10,10);
scene.add(light)

//rendere
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGL1Renderer({canvas});
renderer.setSize(sizes.width,sizes.height)
renderer.render(scene,camera);
renderer.setPixelRatio(1);
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
controls.enablePan=false
controls.enableZoom=false
controls.autoRotate = true
controls.autoRotateSpeed = 10
//resizes
window.addEventListener('resize',()=>{
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width/sizes.height
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width,sizes.height)
})


const loop = ()=>{
  controls.update()
  renderer.render(scene,camera);
  window.requestAnimationFrame(loop);
}

loop();