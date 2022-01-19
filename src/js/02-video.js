import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');

const player = new Vimeo.Player(iframe);

player.on('timeupdate', throttle(playerCurrentTime, 1000));
player.on('ended', endVideo);
setVideoTime();

function playerCurrentTime(data) {
  const videoTime = data.seconds;
  // console.log(videoTime);

  localStorage.setItem(STORAGE_KEY, videoTime);
  // if (data.percent > 0.99) {
  //   player.off('timeupdate');
  // }
}

function endVideo() {
  player.off('timeupdate');
  localStorage.removeItem(STORAGE_KEY);
  // console.log('11');
}

function setVideoTime() {
  const savedTime = localStorage.getItem(STORAGE_KEY);

  if (savedTime) {
    player.setCurrentTime(savedTime);
  }
}
