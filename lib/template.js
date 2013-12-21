module.exports = function anonymous(obj) {

  function escape(html) {
    return String(html)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  function section(obj, prop, negate, str) {
    var val = obj[prop];
    if ('function' == typeof val) return val.call(obj, str);
    if (negate) val = !val;
    if (val) return str;
    return '';
  };

  return "<object\n  type=\"application/x-shockwave-flash\" \n  id=\"myytflashplayer\" \n  data=\"" + escape(obj.url) + "\" \n  width=\"" + escape(obj.width) + "\" \n  height=\"" + escape(obj.height) + "\">\n  <param name=\"allowScriptAccess\" value=\"always\">\n  <param name=\"bgcolor\" value=\"#cccccc\">\n</object>"
}