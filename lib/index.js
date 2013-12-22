var Emitter = require('emitter')
  , swfobject = require('swfobject')
  , sgen = require('sgen');

var playerDefaults = {
  enablejsapi: 1,
  playerapiid: "ytplayer",
  version: 3,
  modestbranding: 1
}


/**
 * Expose youtube
 */
module.exports = Youtube;



/**
 * initialize and show a new Youtube video
 * @param {el} dom element to render over
 * @param {String} youtube.com video ID 
 * @param {Object} options
 * @param.width {Number} width
 * @param.height {Number} height
 * @param.controls {Number} controls - 0 for no controls
 * @param {Function} optional callback
 */
function Youtube (el, videoId, options, callback) {
  var self = this;

  if (!(this instanceof Youtube)) return new Youtube(el, videoId, options, callback);

  this.playerState = -2;
  this.el = el;
  this.videoId = videoId;
  width = options.width;
  height = options.height
  controls = (options.controls == undefined) ? 1 : options.controls;
  params = { allowScriptAccess: "always" };
  attrs = { id: "ytplayer" };

  // Create reference to player
  function onYouTubePlayerReady (playerId) {
    self.player = document.getElementById(playerId);
    self.bind();
    self.emit('playerReady');
    return true;
  };
  window.onYouTubePlayerReady = onYouTubePlayerReady;

  // append div with random ID to el, to be replaced by swfobject
  elemId = sgen.random();
  var newDiv = document.createElement("div");
  newDiv.id = elemId;
  this.el.appendChild(newDiv);

  swfobject.embedSWF(
    "http://www.youtube.com/v/" + this.videoId 
    + "?" + flattenObjectToArray(playerDefaults).join("&")
    + "&controls=" + controls
    , elemId, width, height, "8", null, null, params, attrs
  );

  if ('function' === typeof callback) callback();
  return this;
};



/**
 * Mixin emitter
 */
Emitter(Youtube.prototype);



/**
 * Binds necessary listeners
 * @return {Youtube}
 */
Youtube.prototype.bind = function () {
  var self = this;

  // Update this.playerState whenever it changes in the DOM
  updatePlayerState = function (e) {
    self.playerState = e;
    self.emit('stateChange', self.playerState);
  }
  this.player.addEventListener("onStateChange", "updatePlayerState");

  return this;
}



/**
 * Execute a callback on a particular playerState
 * @param  {Number} this.playerState that you are waiting for
 * @param  {Function} required callback
 * @return {Boolean} 
 */
Youtube.prototype.onState = function (state, func) {
  if (this.playerState == state) {
    func();
    return true;
  } else {
    this.once("stateChange", function () {
      if (this.playerState == state) {
        func();
        return true;
      } else {
        this.onState(state, func);
        return false;
      }
    });
    return false;
  }
}



/**
 * Play the video
 * @param  {Number} optional number of seconds to play from
 * @param  {Function} optional callback
 * @return {Youtube}
 */
Youtube.prototype.play = function (seconds, callback) {
  var self = this;

  // If the player is not yet ready, return to stop function
  // execution and re-call function when it is.
  if (this.playerState == -2) {
    this.onState(-1, function () {
      self.play(seconds, callback);
    });
    return this;
  }

  this.player.playVideo();
  this.emit('play');
  if (seconds != undefined) { this.seekTo(seconds); }

  if ('function' === typeof callback) callback();
  return this;
}



/**
 * Pause the current video
 * @param  {Function} optional callback
 * @return {Youtube}
 */
Youtube.prototype.pause = function (callback) {
  this.player.pauseVideo();
  
  this.emit('pause');
  if ('function' === typeof callback) callback();
  return this;  
}



/**
 * Seek to specific point in the current video
 * @param  {Number} number of seconds to start from
 * @param  {Function} optional callback
 * @return {Youtube}
 */
Youtube.prototype.seekTo = function (seconds, callback) {
  var self = this;

  if (this.playerState != 1) {
    this.onState(1, function () {
      self.seekTo(seconds, callback);
    });
    return false;
  }

  this.player.seekTo(seconds, true);

  this.emit('seek');
  if ('function' === typeof callback) callback();
  return this;
}


/**
 * Stop current video
 * @param  {Function} optional callback
 * @return {Youtube}
 */
Youtube.prototype.stop = function (callback) {
  this.player.stopVideo();

  this.emit('stop');
  if ('function' === typeof callback) callback();
  return this;
}



function flattenObjectToArray (obj) {
  var newArray = [];
  for (var key in obj) {
    newArray.push(key + "=" + obj[key]);
  }
  return newArray;
}
