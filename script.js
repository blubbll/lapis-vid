const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

{
  const { afterglow, Browser, Fullscreen } = window;

  const demoMedia = {
    title: "Testvideo",
    audio:
      "https://cdn.glitch.com/07d3d128-e4a3-48ea-9d14-fc3b0a9c1b78%2Faudio.m4a?v=1580661398525",
    video:
      "https://cdn.glitch.com/07d3d128-e4a3-48ea-9d14-fc3b0a9c1b78%2Fvideo.mp4?v=1580661554465",
    video_low:
      "https://cdn.glitch.com/07d3d128-e4a3-48ea-9d14-fc3b0a9c1b78%2Fvideo_low.mp4?v=1580727568643"
  };

  window.onload = () => {
    if (Browser.isFirefox || Browser.isChrome) {
      $("video").outerHTML =
        '<video autoplay preload="metadata" class="afterglow" height="0" width="0"></video>';

      //SET MEDIA
      ($("video").src = demoMedia.video), ($("audio").src = demoMedia.audio);

      //init afterglow
      afterglow.initVideoElements();

      $("video").load();

      {
        const VIDEO = $("video");
        const AUDIO = $("audio");

        //MIRROR VOLUME
        Object.defineProperty(VIDEO, "volume", {
          set: val => {
            VIDEO._volume = val;
            //!
            AUDIO.volume = val;
          },
          get: () => {
            return VIDEO._volume;
          }
        });

        //MIRROR MUTED
        Object.defineProperty(VIDEO, "muted", {
          set: val => {
            VIDEO._muted = val;
            //!
            AUDIO.muted = val;
          },
          get: () => {
            return VIDEO._muted;
          }
        });

        //SYNC PLAY
        VIDEO._play = VIDEO.play;
        Object.defineProperty(VIDEO, "play", {
          get: () => {
            AUDIO.play();
            return VIDEO._play;
          }
        });
        //SYNC PAUSE
        VIDEO._pause = VIDEO.pause;
        Object.defineProperty(VIDEO, "pause", {
          get: () => {
            AUDIO.pause();
            return VIDEO._pause;
          }
        });

        //sync audio playNpause with video
        AUDIO.addEventListener("play", () => {
          VIDEO.paused && VIDEO.play();
        }),
          AUDIO.addEventListener("pause", () => {
            !VIDEO.paused && VIDEO.pause();
          });

        //sync video playNpause with audio
        VIDEO.addEventListener("play", () => {
          AUDIO.paused && AUDIO.play();
        }),
          VIDEO.addEventListener("pause", () => {
            !AUDIO.paused && AUDIO.pause();
          });
      }

      $("video").addEventListener(
        "loadedmetadata",
        e => {
          try {
            $("video").play();
          } catch (e) {
            console.warn(e);
          }

          //fancy title
          $(".afterglow__controls").insertAdjacentHTML(
            "afterbegin",
            `<div class="afterglow__title-bar">${demoMedia.title}</div>`
          );
          //fancy control area
          $(".afterglow__controls").insertAdjacentHTML(
            "beforeend",
            `<div class="afterglow__control-bar"></div>`
          );

          const fitRatio = () => {
            const that = e.target;

            const ratio =
              $("lapis-player").getAttribute("ratio") ||
              that.videoHeight / that.videoWidth;
            $("lapis-player").setAttribute("ratio", ratio);
            $("#mep_0").style.height = `${$("#mep_0").clientWidth * ratio}px`;
          };
          setTimeout(fitRatio, 0);
          window.addEventListener("resize", fitRatio);
        },
        false
      );

      try {
        //$("video").play();
      } catch (e) {}
      {
      }

      const syncer = setInterval(() => {
        $("audio").currentTime / $("video").currentTime > 1.1 && [
          ($("video").currentTime = $("audio").currentTime)
        ];
      }, 2999);

      //MOBILE DEVICE
      if (typeof window.orientation !== "undefined") {
        //RESET EVENT
        $(".afterglow__top-control-bar").innerHTML = $(
          ".afterglow__top-control-bar"
        ).innerHTML;
        //ADD NEW EVENT
        $(".afterglow__button.afterglow__fullscreen-toggle").addEventListener(
          "click",
          e => {
            const that = e.target;

            if (document.fullscreen) {
              Fullscreen.exit();
              //$("#mep_0").classList.add("afterglow__container");
            } else {
              setTimeout(() => {
                $("#mep_0").classList.remove("afterglow__container");
                Fullscreen.enter($("video"));
              });
            }
          }
        );
      }

      //IOS
    } else if (
      !!navigator.platform &&
      /iPad|iPhone|iPod/.test(navigator.platform)
    ) {
      document.title = demoMedia.title;

      $("video").outerHTML = "<video preload controls playsinline></video>";

      $("video").src = demoMedia.video_low;
    }
  };
}
