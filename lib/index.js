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
  this.id = id;
  this.width = width;
  this.height = height;
  this.prefs = [
    "version=3",
    "enablejsapi=1",
    "playerapiid=myytflashplayer",
    "controls=1"
  ];
  this.url = "https://www.youtube.com/v/" + this.id + "?" + this.prefs.join("&amp;");

  this.template = template({
    url: this.url,
    width: this.width,
    height: this.height
  });

  document.body.appendChild(domify(this.template));
};