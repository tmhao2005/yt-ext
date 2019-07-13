let player: HTMLVideoElement;
let vURL: string;

const iconDeactive = `
  <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><use class="ytp-svg-shadow" xlink:href="#ytp-id-51"></use><path class="ytp-svg-fill" d="M 18,11 V 7 l -5,5 5,5 v -4 c 3.3,0 6,2.7 6,6 0,3.3 -2.7,6 -6,6 -3.3,0 -6,-2.7 -6,-6 h -2 c 0,4.4 3.6,8 8,8 4.4,0 8,-3.6 8,-8 0,-4.4 -3.6,-8 -8,-8 z" id="ytp-id-51"></path></svg>
`;

const iconActive = `
  <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><use class="ytp-svg-shadow" xlink:href="#ytp-id-51"></use><path class="ytp-svg-fill" style="fill: #ff0000" d="M 18,11 V 7 l -5,5 5,5 v -4 c 3.3,0 6,2.7 6,6 0,3.3 -2.7,6 -6,6 -3.3,0 -6,-2.7 -6,-6 h -2 c 0,4.4 3.6,8 8,8 4.4,0 8,-3.6 8,-8 0,-4.4 -3.6,-8 -8,-8 z" id="ytp-id-51"></path></svg>
`;

const YTSelectors = {
  mainPlayer: '.html5-main-video',
  playerLeftControls: '.ytp-left-controls',
  btnPlayVideo: '.ytp-play-button',

  btnCloseAdsOverlay: '.ytp-ad-overlay-close-button',

  videoAds: '.ytp-ad-player-overlay',
  btnSkipVideoAds: '.ytp-ad-skip-button',
};


const hasPlayer = (): boolean => /^\?v=.+/.test(window.location.search) && !!document.querySelector(YTSelectors.mainPlayer);

const hasVideoAds = (): boolean => !!document.querySelector(YTSelectors.videoAds);

const hasOverlayAds = (): boolean => !!document.querySelector(YTSelectors.btnCloseAdsOverlay);

const hasAds = (): boolean => hasOverlayAds() || hasVideoAds();

const getVideoPlayer = (): HTMLVideoElement => {
  const video = document.querySelector(YTSelectors.mainPlayer) as HTMLVideoElement;

  return video;
};

const attachControls = (player: HTMLVideoElement) => {
  const leftControls = document.querySelector(YTSelectors.playerLeftControls);

  const btnReplay = document.createElement('a');
  btnReplay.className = 'ytp-replay ytp-button';
  btnReplay.id = 'btnReplay';
  btnReplay.innerHTML = iconDeactive;

  leftControls.insertBefore(btnReplay, document.querySelector(YTSelectors.btnPlayVideo));

  bindEventsToReplayButton(btnReplay, player);

  handleNewVideoInstalled(btnReplay);

  return { btnReplay };
};

const bindEventsToReplayButton = (btnReplay: Element, player: HTMLVideoElement) => {
  let repeater;

  btnReplay.addEventListener('click', () => {
    if (btnReplay.classList.contains('active')) {
      deactivate(btnReplay, repeater);
    } else {
      activate(btnReplay, player);
    }
  });
};

const replay = () => {
  player.currentTime = 0;
  player.play();
}

const activate = (btnReplay: Element, player: HTMLMediaElement) => {
  btnReplay.classList.add('active');
  btnReplay.innerHTML = iconActive;

  // player.addEventListener('ended', replay, false);

  return setInterval(() => {
    if (player.ended || player.duration <= player.currentTime + 1) {
      replay();
    }

    if (hasAds()) {
      clearAds(player);
    }

  }, 100);
};

const deactivate = (btnReplay: Element, repeater: number) => {
  btnReplay.classList.remove('active');
  btnReplay.innerHTML = iconDeactive;

  // player.removeEventListener('ended', replay, false);

  clearInterval(repeater);
};

const handleNewVideoInstalled = (btnReplay: Element) => {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'src') {

        if (vURL !== window.location.search) {
          vURL = window.location.search;

          console.log('new video url has changed to', vURL);

          // deactivate(btnReplay, repeater);
          // observer.disconnect();
        }
      }
    }
  });

  observer.observe(document.querySelector(YTSelectors.mainPlayer), {
    attributes: true,
    // childList: true,
    // subtree: true,
  });

  return observer;
};

const clearAds = (player: HTMLMediaElement) => {
  const event = new MouseEvent('click', {
    bubbles: true,
  });

  if (hasVideoAds()) {
    player.currentTime = player.duration;

    const btnClose = document.querySelector(YTSelectors.btnSkipVideoAds);

    if (btnClose) {
      btnClose.dispatchEvent(event);
    }
  } else {
    document.querySelector(YTSelectors.btnCloseAdsOverlay).dispatchEvent(event);
  }
};

const initialize = () => {
  const interval = setInterval(() => {

    if (hasPlayer()) {
      vURL = window.location.search;

      console.log('has video installed');

      player = getVideoPlayer();

      attachControls(player);

      clearInterval(interval);
    }
  }, 500);
};

initialize();
