'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.automaticscroll = automaticscroll;
exports.durationformat = durationformat;
exports.select = select;
exports.startaudiorendering = startaudiorendering;
exports.statechange = statechange;
exports.shift = shift;
exports.record = record;
exports.play = play;
exports.pause = pause;
exports.stop = stop;
exports.rewind = rewind;
exports.fastforward = fastforward;
exports.clear = clear;
exports.solo = solo;
exports.mute = mute;
exports.volumechange = volumechange;
exports.mastervolumechange = mastervolumechange;
exports.fadein = fadein;
exports.fadeout = fadeout;
exports.fadetype = fadetype;
exports.newtrack = newtrack;
exports.trim = trim;
exports.zoomin = zoomin;
exports.zoomout = zoomout;
exports.scroll = scroll;
function automaticscroll(val) {
  this.isAutomaticScroll = val;
}

function durationformat(format) {
  this.durationFormat = format;
  this.drawRequest();
}

function select(start, end, track) {
  if (this.isPlaying()) {
    this.lastSeeked = start;
    this.pausedAt = undefined;
    this.restartPlayFrom(start);
  } else {
    // reset if it was paused.
    this.seek(start, end, track);
    this.ee.emit('timeupdate', start);
    this.drawRequest();
  }
}

function startaudiorendering(type) {
  this.startOfflineRender(type);
}

function statechange(state) {
  this.setState(state);
  this.drawRequest();
}

function shift(deltaTime, track) {
  track.setStartTime(track.getStartTime() + deltaTime);
  this.adjustDuration();
  this.drawRequest();
}

function record() {
  this.record();
}

function play(start, end) {
  this.play(start, end);
}

function pause() {
  this.pause();
}

function stop() {
  this.stop();
}

function rewind() {
  this.rewind();
}

function fastforward() {
  this.fastForward();
}

function clear() {
  var _this = this;

  this.clear().then(function () {
    _this.drawRequest();
  });
}

function solo(track) {
  this.soloTrack(track);
  this.adjustTrackPlayout();
  this.drawRequest();
}

function mute(track) {
  this.muteTrack(track);
  this.adjustTrackPlayout();
  this.drawRequest();
}

function volumechange(volume, track) {
  track.setGainLevel(volume / 100);
}

function mastervolumechange(volume) {
  var _this2 = this;

  this.masterGain = volume / 100;
  this.tracks.forEach(function (track) {
    track.setMasterGainLevel(_this2.masterGain);
  });
}

function fadein(duration, track) {
  track.setFadeIn(duration, this.fadeType);
  this.drawRequest();
}

function fadeout(duration, track) {
  track.setFadeOut(duration, this.fadeType);
  this.drawRequest();
}

function fadetype(type) {
  this.fadeType = type;
}

function newtrack(file) {
  this.load([{
    src: file,
    name: file.name
  }]);
}

function trim() {
  var track = this.getActiveTrack();
  var timeSelection = this.getTimeSelection();

  track.trim(timeSelection.start, timeSelection.end);
  track.calculatePeaks(this.samplesPerPixel, this.sampleRate);

  this.setTimeSelection(0, 0);
  this.drawRequest();
}

function zoomin() {
  var zoomIndex = Math.max(0, this.zoomIndex - 1);
  var zoom = this.zoomLevels[zoomIndex];

  if (zoom !== this.samplesPerPixel) {
    this.setZoom(zoom);
    this.drawRequest();
  }
}

function zoomout() {
  var zoomIndex = Math.min(this.zoomLevels.length - 1, this.zoomIndex + 1);
  var zoom = this.zoomLevels[zoomIndex];

  if (zoom !== this.samplesPerPixel) {
    this.setZoom(zoom);
    this.drawRequest();
  }
}

function scroll() {
  var _this3 = this;

  this.isScrolling = true;
  this.drawRequest();
  clearTimeout(this.scrollTimer);
  this.scrollTimer = setTimeout(function () {
    _this3.isScrolling = false;
  }, 200);
}