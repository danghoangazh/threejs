import * as THREE from "three";
import renderImage from "./item/render-image.js";
import renderVideo from "./item/render-video.js";
import renderImageTxt from "./item/render-imagetxt.js";

let timer = 0;
let canvas = document.getElementById("myCanvas");
let scene = new THREE.Scene();
let renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
document.body.appendChild(renderer.domElement);
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth/canvas.clientHeight, 0.1, 1000);

// data
let txtSub = "AN";
let timeVideo = 0;

let image = renderImage("src/resource/hinh1.jpg");
let video = renderVideo("src/resource/video3.mp4", timeVideo, false);
let imageTxt = renderImageTxt(txtSub);

image.name = "myImage";
video.name = "myVideo";
imageTxt.name = "myImageTxt";

image.callback = function () {
  selectItem("image");
};

video.callback = function () {
  selectItem("video");
};

imageTxt.callback = function () {
  selectItem("imaeTXT");
};

scene.add(video);
scene.add(image);
scene.add(imageTxt);

camera.position.z = 1;

var idFrame;

function animate() {
  timer++;
  if (timer == 100) {
    console.log(video);
    var selectedObject = scene.getObjectByName("myImage");
    scene.remove(selectedObject);
    // console.log(scene);
    // console.log(video);
    // console.log(image);
    // image.position.set(0.5, 0.5, 0.5);
  }
  //   console.log(timer++);
  //   console.log(timer);
  renderer.render(scene, camera);
  idFrame = requestAnimationFrame(animate);
}
animate();

// event user
export default function updatePosition() {
  cancelAnimationFrame(idFrame);
  while (scene.children.length) {
    scene.remove(scene.children[0]);
  }
  let image = renderImage("src/resource/hinh1.jpg");
  let video = renderVideo("src/resource/video3.mp4", 300, true);
  let imageTxt = renderImageTxt(txtSub);
  scene.add(video);
  // scene.add(image);
  scene.add(imageTxt);

  animate();
  return;
}

function selectItem(data) {
  console.log("select item : ", data);
}

function onDocumentMouseDown(event) {
  event.preventDefault();
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  console.log(scene.children);
  var intersects = raycaster.intersectObjects(scene.children);
  console.log(intersects);
  if (intersects.length > 0) {
    intersects[1].object.callback();
  }
  console.log("onDocumentMouseDown");
}

window.updatePosition = updatePosition;

canvas.addEventListener("click", onDocumentMouseDown, false);
