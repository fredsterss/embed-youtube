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
function Youtube (id, width, height) {
  var self = this;

  /* Return a new instance of Youtube for chaining */
  if (!(this instanceof Youtube)) return new Youtube(id, width, height);

  /* Setup basic params */
  this.id = id;
  this.width = width;
  this.height = height;
  this.params = { allowScriptAccess: "always" };
  this.atts = { id: "ytplayer" };
  this.template = domify(template());

  // Bind the player variable, triggered by youtube embed 
  function onYouTubePlayerReady (playerId) {
    self.player = document.getElementById(playerId);
    self.emit('playerReady');
    return true;
  };
  window.onYouTubePlayerReady = onYouTubePlayerReady;

  /* Append template to body */
  document.body.appendChild(this.template);
};


/**
 * Mixin emitter
 */
Emitter(Youtube.prototype);


/**
 * Show the youtube embed
 * @param  {Function} callback
 * @return {Youtube}
 */
Youtube.prototype.show = function (callback) {
  swfobject.embedSWF(
    "http://www.youtube.com/v/" + this.id + "?enablejsapi=1&playerapiid=ytplayer&version=3",
    "video-holder",
    this.width,
    this.height,
    "8",
    null,
    null,
    this.params,
    this.atts
    );
  if ('function' === typeof callback) callback();
  this.emit('show');
  return this;
};


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
  
  if ('function' === typeof callback) callback();
  this.emit('play');
  return this;
};