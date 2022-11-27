import * as THREE from "three";

export default function renderImage(url) {
  let meshImage;
  const texture = new THREE.TextureLoader().load(url);
  // geometry
  const geometry = new THREE.PlaneGeometry(1, 1);
  // material
  const material = new THREE.MeshBasicMaterial({ map: texture });

// create and return 
  meshImage = new THREE.Mesh(geometry, material);
  meshImage.position.setZ(0.02)

  return meshImage;
}
