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
    let VIDEO = $("video");
    const AUDIO = $("audio");

    if (Browser.isMobileChrome || Browser.isFirefox || Browser.isChrome) {
      const poster = $("poster>img").currentSrc;

      $(
        "video"
      ).outerHTML = `<video autoplay preload="metadata" class="afterglow" height="0" width="0" poster="${poster}"></video>`;

      VIDEO = $("video");

      //SET MEDIA
      VIDEO.src = demoMedia.video;
      AUDIO.src = demoMedia.audio;

      //init afterglow
      afterglow.initVideoElements();

      {
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
            AUDIO.paused && AUDIO.play();

            if (AUDIO.paused) {
              console.debug("muted");
              $(".afterglow__video").insertAdjacentHTML(
                "afterbegin",
                "<lapis-muted></lapis-muted>"
              );

              const MUTED_WARNING = $("lapis-muted");
              MUTED_WARNING.innerHTML =
                "THE VIDEO IS MUTED. CLICK ME TO UNMUTE";
              MUTED_WARNING.style.display = "flex";
              MUTED_WARNING.addEventListener("click", () => {
                MUTED_WARNING.remove();
                AUDIO.muted = false;
                VIDEO.currentTime = 0;
                AUDIO.play();
                !AUDIO.muted && !AUDIO.paused && console.debug("unmuted.");
              });
            }

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
      }

      VIDEO.addEventListener(
        "loadedmetadata",
        e => {
          console.log("loaded");

          try {
            VIDEO.play();
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
            $(".afterglow__video").style.height = `${$(".afterglow__video").clientWidth * ratio}px`;
          };
          setTimeout(fitRatio, 0);
          window.addEventListener("resize", fitRatio);
        },
        false
      );

      //load vidn
      VIDEO.load();

      try {
        //$("video").play();
      } catch (e) {}
      {
      }

      //keep video time in sync with audio
      const syncer = setInterval(() => {
        //console.log(AUDIO.currentTime/VIDEO.currentTime)
        AUDIO.currentTime / VIDEO.currentTime > 1.1 && [
          (VIDEO.currentTime = AUDIO.currentTime)
        ];
      }, 2999);

      //MOBILE DEVICE
      if (Browser.isMobileChrome) {
        document.title = demoMedia.title;

        //sync audio pause on android video pause
        document.addEventListener(
          "fullscreenchange",
          () => {
            if (!document.fullscreen) {
              if (VIDEO.paused && !AUDIO.paused) {
                AUDIO.pause();
              }

              $(".afterglow__video").classList.add("afterglow__container");
            }
          },
          false
        );

        //sync video war playNpause with audio
        VIDEO.addEventListener("play", () => {
          AUDIO.play();
        }),
          VIDEO.addEventListener("pause", () => {
            !AUDIO.paused && AUDIO.pause();
          });
        //: @android: FIXME

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
            } else {
              setTimeout(() => {
                $(".afterglow__video").classList.remove("afterglow__container");
                Fullscreen.enter($("video"));
              });
            }
          }
        );
      }

      //IOS
    } /* if (
      !!navigator.platform &&
      /iPad|iPhone|iPod/.test(navigator.platform)
    ) */ else {
      {
        const VIDEO = $("video");
        const AUDIO = $("audio");

        document.title = demoMedia.title;

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

      $("video").outerHTML = "<video preload controls playsinline></video>";

      $("video").src = demoMedia.video_low;
    }
  };
}
