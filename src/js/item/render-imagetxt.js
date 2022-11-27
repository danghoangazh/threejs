import * as THREE from "three";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';



export default function renderImageTxt() {
  let canvas = makeTextCanvas("Hello!", 100, 100);

  var loader = new FontLoader();

  const font = loader.load(
    // resource URL
    'fonts/helvetiker_bold.typeface.json',
  
    // onLoad callback
    function ( font ) {
      // do something with the font
      console.log( font );
    },
  
    // onProgress callback
    function ( xhr ) {
      console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    },
  
    // onError callback
    function ( err ) {
      console.log( 'An error happened' );
    }
  );

  loader.load("fonts/helvetiker_bold.typeface.json", function (font) {
    var textGeo = new THREE.TextGeometry("My Text", {
      font: font,

      size: 200,
      height: 50,
      curveSegments: 12,

      bevelThickness: 2,
      bevelSize: 5,
      bevelEnabled: true,
    });
    var textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
    return  new THREE.Mesh( textGeo, textMaterial );
  });

  // const labelGeometry = new THREE.TextGeometry(text, parameters);

  // const texture = new THREE.CanvasTexture(canvas);

  // const labelMaterial = new THREE.MeshBasicMaterial({
  //   map: texture,
  //   side: THREE.DoubleSide,
  //   transparent: true,
  // });

  // // create and return
  // const label = new THREE.Mesh(geometry, labelMaterial);
  // console.log(label);
  // label.position.setZ(0.3);
  // label.position.setX(0.03);

  return label;
}

function makeTextCanvas(text, width, height) {
  const borderSize = 2;
  const ctx = document.createElement("canvas").getContext("2d");
  const font = `${14}px bold sans-serif`;
  ctx.font = font;
  // measure how long the name will be
  ctx.canvas.width = width;
  ctx.canvas.height = height;

  // need to set font again after resizing canvas
  ctx.font = font;
  // ctx.fillStyle = 'blue';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "red";
  ctx.fillText(text, 10, 100);

  return ctx.canvas;
}
