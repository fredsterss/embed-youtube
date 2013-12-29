[Component](https://github.com/component/component) for embedding youtube videos.

## Installation

Install with [component(1)](http://component.io):

```
$ component install fredsterss/embed-youtube
```

## Example

```js
var y = require('embed-youtube');
var videoId = "n3nZtcjRLyY";
var el = document.getElementById("youtube-holder");

var youtube = y(el, videoId, { width: 640, height: 360 });
// loads youtube video "n3nZtcjRLyY" inside el

youtube.play();
// plays video

youtube.seekTo(60);
// seeks to 60 seconds into the video
```

To use it, pass in the ``el`` you want to attach it to, the Youtube ``videoId``, ``options.width`` and ``options.height``.

## API

### Youtube(el, videoId, options, fn)

Insert a new Youtube embed instance into ``el`` with the given ``videoId``, options hash and optional callback ``fn``.

Options:
- ``width`` Number (px) (required)
- ``height`` Number (px) (required)
- ``controls`` Boolean

### #play(seconds, fn)

Play whatever video is loaded, emitting ``play``. If ``seconds`` is passed, ``#seekTo(seconds)`` is automatically called. Optionally calls ``fn``.

### #pause(fn)

Pause whatever video is loaded, emitting ``pause``, optionally calling ``fn``.

### #seekTo(seconds, fn)

Seek to a specified time in the video, optionally calling ``fn``.

### #stop(fn)

Stop the current video, optionally calling ``fn``.

## Common Issues

### Failed to load resource

You need to run this code on a webserver for it to work correctly. [Pow](http://pow.cx/) works great.

### display: none / hidden;

A common pattern when using embed-youtube is to hide the video's container element when it is not in use. Unfortunately, for certain browsers, changing the visibility of content loaded via ``<object>`` or ``<embed>`` tags will cause that content to be reloaded, and the event handlers are lost in the process. Therefore you must use some other way of hiding (eg: ``overflow: hidden; height: 0px;`` etc.) if you want to reuse the player.



## License

MIT
