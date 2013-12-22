


var Emitter = require('emitter')
  , domify = require('domify');



/**
 * Expose youtube
 */
module.exports = Youtube;



/**
 * Initialize a new 'Youtube'
 * @param {id} a youtube video id
 */
function Youtube (el, videoId, width, height, callback) {
  var self = this;

  // Return a new instance of Youtube for chaining
  if (!(this instanceof Youtube)) return new Youtube(el, videoId, width, height, callback);

  // Setup basic params
  // Added 'unloaded' state of -2 to state options (see 
  // https://developers.google.com/youtube/js_api_reference#onStateChange)
  this.playerState = -2;
  this.el = el;
  this.videoId = videoId;
  this.width = width;
  this.height = height;
  this.params = { allowScriptAccess: "always" };
  this.atts = { id: "ytplayer" };

  // Bind the player variable, triggered by youtube embed 
  function onYouTubePlayerReady (playerId) {
    self.player = document.getElementById(playerId);
    self.bind();
    self.emit('playerReady');
    return true;
  };
  window.onYouTubePlayerReady = onYouTubePlayerReady;

  // Insert swf player into el using id of element
  // @TODO - If it doesn't have an id, add random one
  this.elId = this.el.id;
  // (swfobject requires an id)
  swfobject.embedSWF(
    "http://www.youtube.com/v/" 
    + this.videoId 
    + "?enablejsapi=1&playerapiid=ytplayer&version=3"
    , this.elId, this.width, this.height, "8", null, null, this.params, this.atts
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
 * Execute a callback on a particular this.playerState
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