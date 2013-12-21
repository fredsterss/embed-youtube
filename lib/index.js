var Emitter = require('emitter')
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
  if (!(this instanceof Youtube)) return new Youtube(id, width, height);

  /* Setup basic params */
  this.id = id;
  this.width = width;
  this.height = height;
  this.params = { allowScriptAccess: "always" };
  this.atts = { id: "myytplayer" };

  /* Append template to body */
  document.body.appendChild(domify(template()));
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
  var self = this;
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
  self.emit('show');
  return this;
};