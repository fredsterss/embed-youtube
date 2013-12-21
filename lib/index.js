var Emitter = require('emitter')
  , domify = require('domify')
  , template = require('./index.html');


/**
 * Expose youtube
 */
module.exports = Youtube;


/**
 * Initialize a new 'Youtube'
 * @param {id} youtube video id
 */
function Youtube (id) {
  this.id = id;
  this.template = domify(template);

  document.body.appendChild(this.template);
};