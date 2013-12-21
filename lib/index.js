var Emitter = require('emitter')
  , bind = require('event').bind
  , domify = require('domify')
  , template = require('./template.js');

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
  this.el = el;
  this.videoId = videoId;
  this.width = width;
  this.height = height;
  this.params = { allowScriptAccess: "always" };
  this.atts = { id: "ytplayer" };

  // Bind the player variable, triggered by youtube embed 
  function onYouTubePlayerReady (playerId) {
    self.player = document.getElementById(playerId);
    self.emit('playerReady');
    return true;
  };
  window.onYouTubePlayerReady = onYouTubePlayerReady;

  // Insert swf player into el
  // Get id of element
  this.elId = this.el.id;
  // If it doesn't have an id, add random one
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
 * Play the video
 * @param  {Function} optional callback
 * @return {Youtube}
 */
Youtube.prototype.play = function (callback) {
  // If the player is not yet ready, call the play
  // function when it is.
  if (this.player == undefined) {
    bind(this, 'playerReady', function () {
      this.play();
    });
    return this;
  }

  this.player.playVideo();

  this.emit('play');
  if ('function' === typeof callback) callback();
  return this;
};


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