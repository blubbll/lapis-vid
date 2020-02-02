const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const demoMedia = {
  audio:
    "https://cdn.glitch.com/07d3d128-e4a3-48ea-9d14-fc3b0a9c1b78%2Faudio.m4a?v=1580661398525",
  video:
    "https://cdn.glitch.com/07d3d128-e4a3-48ea-9d14-fc3b0a9c1b78%2Fvideo.mp4?v=1580661554465"
};
$("video").src = demoMedia.video;
$("audio").src = demoMedia.audio;

$("video").play();
{
  //sync video playNpause with audio
  $("audio").addEventListener("play", () => {
    $("video").play();
  }),
    $("audio").addEventListener("pause", () => {
      $("video").pause();
    });
  //sync audio playNpause with video
  $("video").addEventListener("play", () => {
    $("i.fa-play-circle").style.visibility = "hidden";

    $("audio").currentTime = $("video").currentTime;
    $("audio").play();
  }),
    $("video").addEventListener("pause", () => {
      $("i.fa-play-circle").style.visibility = "visible";
      $("i.fa-pause-circle").style.visibility = "hidden";

      $("audio").pause();
    });

  //click button
  $("i.fa-play-circle").addEventListener("click", () => {
    $("video").play();
  });

  $("i.fa-pause-circle").addEventListener("click", () => {
    $("video").pause();
  });
}
const syncer = setInterval(() => {
  $("audio").currentTime = $("video").currentTime;
}, 2999);
