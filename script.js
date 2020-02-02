const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const demoMedia = {
  audio: "https://cdn.glitch.com/07d3d128-e4a3-48ea-9d14-fc3b0a9c1b78%2Faudio.m4a?v=1580661398525",
  video: "https://cdn.glitch.com/07d3d128-e4a3-48ea-9d14-fc3b0a9c1b78%2Fvideo.mp4?v=1580661554465"
}
$("video").src = demoMedia.video;
$("audio").src = demoMedia.audio

$("video").play();
$("video").addEventListener("play", () =>{
  $("audio").play();
})
$("video").addEventListener("pause", () =>{
  $("audio").pause();
})