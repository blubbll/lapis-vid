let { Fullscreen } = window;

/*
tools
*/
Fullscreen = {
  enter: elem => {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  },
  exit: () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }
  }
};

HTMLElement.prototype.onEvent = (eventType, callBack, useCapture) => {
  this.addEventListener(eventType, callBack, useCapture);
  if (!this.myListeners) {
    this.myListeners = [];
  }
  this.myListeners.push({ eType: eventType, callBack: callBack });
  return this;
};

HTMLElement.prototype.removeListeners = () => {
  if (this.myListeners) {
    for (var i = 0; i < this.myListeners.length; i++) {
      this.removeEventListener(
        this.myListeners[i].eType,
        this.myListeners[i].callBack
      );
    }
    delete this.myListeners;
  }
};

{
  let that = {};
  // Opera 8.0+
  that.isOpera =
    (!!window.opr && !!window.opr.addons) ||
    !!window.opera ||
    navigator.userAgent.indexOf(" OPR/") >= 0;

  // Firefox 1.0+
  that.isFirefox = typeof InstallTrigger !== "undefined";

  // Safari 3.0+ "[object HTMLElementConstructor]"
  that.isSafari =
    /constructor/i.test(window.HTMLElement) ||
    (function(p) {
      return p.toString() === "[object SafariRemoteNotification]";
    })(
      !window["safari"] ||
        (typeof safari !== "undefined" && window.safari.pushNotification)
    );

  // Internet Explorer 6-11
  that.isIE = /*@cc_on!@*/ false || !!document.documentMode;

  // Edge 20+
  that.isEdge = !that.isIE && !!window.StyleMedia;

  // Chrome 1 - 71
  that.isChrome =
    !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

  // Edge (based on chromium) detection
  that.isEdgeChromium =
    that.isChrome && navigator.userAgent.indexOf("Edg") != -1;

  // Blink engine detection
  that.isBlink = (that.isChrome || that.isOpera) && !!window.CSS;
  window.getBrowser = () => that;
}
