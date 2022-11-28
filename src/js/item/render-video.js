import * as THREE from "three";
function createVideo(url, time, isPause) {
  const video = document.createElement("video");
  video.src = url;
  video.muted = true;
  video.currentTime = time;
  video.playbackRate = 1.0
  if (isPause) {
    video.pause()
  }else{
    video.play()
    
  }
  video.addEventListener(
    "ended",
    function () {
      video.currentTime = 0;
    },
    false
  );
  return video;
}

export default function renderVideo(url, time, isPause) {
  let meshVideo;
  const video = createVideo(url, time, isPause);
  let texture = new THREE.VideoTexture(video);
  // geometry
  const geometry = new THREE.PlaneGeometry(2.5, 1.3);
  // material
  const material = new THREE.MeshBasicMaterial({ map: texture });

  // create and return
  meshVideo = new THREE.Mesh(geometry, material);

  return meshVideo;
}
