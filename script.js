const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const { afterglow } = window;

const demoMedia = {
  audio:
    "https://cdn.glitch.com/07d3d128-e4a3-48ea-9d14-fc3b0a9c1b78%2Faudio.m4a?v=1580661398525",
  video:
    "https://cdn.glitch.com/07d3d128-e4a3-48ea-9d14-fc3b0a9c1b78%2Fvideo.mp4?v=1580661554465"
};
$("video").src = demoMedia.video;
$("audio").src = demoMedia.audio;

$("video").addEventListener(
  "loadedmetadata",
  e => {
    const fitRatio = () => {
      const that = e.target;
      // ($("#mep_0").style.width = `${that.videoWidth}px`),
      // ($("#mep_0").style.height = `${that.videoHeight}px`);
      const ratio = that.videoHeight / that.videoWidth;
      $("#mep_0").style.height = `${$("#mep_0").clientWidth * ratio}px`;
    };
    setTimeout(fitRatio, 0);
    window.addEventListener("resize", fitRatio);
  },
  false
);

afterglow.initVideoElements();

try {
  $("video").load();
  //$("video").play();
} catch (e) {}
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
    $("video").currentTime = $("audio").currentTime;
    $("audio").play();
  }),
    $("video").addEventListener("pause", () => {
      (window.self !== window.top || document.hasFocus()) && $("audio").pause();
    });
}

/*window.addEventListener("focus", e => {
  $("video").play();
});*/

window.addEventListener("blur", function() {
  console.log("blur");
});

const syncer = setInterval(() => {
  $("audio").currentTime / $("video").currentTime > 1.1 && [
    ($("video").currentTime = $("audio").currentTime)
  ];
}, 2999);

//RESET EVENT
$(".afterglow__button.afterglow__fullscreen-toggle").addEventListener(
  "click",
  e => {
    const that = e.target;

    //force landscape on mobile

    if ($("body").clientWidth < 555) {
      const locOrientation =
        screen.lockOrientation ||
        screen.mozLockOrientation ||
        screen.msLockOrientation ||
        screen.orientation.lock;

      try {
        setTimeout(locOrientation("landscape"), 3999);
      } catch (e) {
        alert(e);
      }
    }
  }
);
