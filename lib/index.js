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
function Youtube (id) {
  this.id = id;
  this.template = template({ name: "world" });

  document.body.appendChild(domify(this.template));
};