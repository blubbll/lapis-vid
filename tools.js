let { Fullscreen } = window;

/*
tools
*/
Fullscreen = {
  open: elem => {
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
  close: () => {
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
