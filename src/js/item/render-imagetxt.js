import * as THREE from "three";



export default function renderImageTxt(txtSub) {

  let canvas = makeTextCanvas(txtSub, 1070, .25*602);
  const texture = new THREE.CanvasTexture(canvas);
  const geometry = new THREE.PlaneGeometry(2, .25);

  const labelMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide
  });

  // create and return
  const label = new THREE.Mesh(geometry, labelMaterial);
  label.position.setZ(0.03);
  label.position.setY(-0.5);
  return label;

  // const geometry = new THREE.PlaneGeometry(1, .2);
  // const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
  // const plane = new THREE.Mesh( geometry, material );
  //   plane.position.setZ(0.3);
  // plane.position.setY(-0.3);
  // return plane
}

function makeTextCanvas(text, width, height) {
  const ctx = document.createElement("canvas").getContext("2d");
  const font = `60px Arial`;
  let lineHeight = 36
  ctx.font = font;
  // measure how long the name will be
  ctx.canvas.width = width;
  ctx.canvas.height = height;

  // need to set font again after resizing canvas
  ctx.font = font;
  ctx.fillStyle = "white";
  ctx.textAlign = 'center';
  let textTest = ctx.measureText("Hello world");
  console.log(textTest.width); // 56;
  ctx.fillText(text, 1070/2, height/2 + lineHeight/4);
  return ctx.canvas;
}
