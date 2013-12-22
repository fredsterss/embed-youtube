# embed-youtube

[Component](https://github.com/component/component) for embedding youtube videos.

## Installation

Install with [component(1)](http://component.io):

```
$ component install fredsterss/embed-youtube
```

## Example

```
var y = require('embed-youtube');
var youtube = y(el, videoId, width, height);
youtube.play();
youtube.seekTo(60);
```

To use it, pass in the ``el`` you want to attach it to, the Youtube ``videoId``, ``width`` and ``height``.

__Note:__ a common pattern when using embed-youtube is to hide the video's container element when it is not in use. Unfortunately, for certain browsers, changing the visibility of content loaded via ``<object>`` or ``<embed>`` tags will cause that content to be reloaded, and the event handlers are lost in the process. Therefore you must use some other way of hiding (eg: ``overflow: hidden; height: 0px;`` etc.) if you want to reuse the player.

## API

### Youtube(el, videoId, width, height, fn)

Insert a new Youtube embed instance into ``el`` with the given ``videoId``, ``width`` and ``height``. Optionally calls ``fn``.

### #play(seconds, fn)

Play whatever video is loaded, emitting ``play``. If ``seconds`` is passed, ``#seekTo(seconds)`` is automatically called. Optionally calls ``fn``.

### #pause(fn)

Pause whatever video is loaded, emitting ``pause``, optionally calling ``fn``.

### #seekTo(seconds, fn)

Seek to a specified time in the video, optionally calling ``fn``.

### #stop(fn)

Stop the current video, optionally calling ``fn``.


## License

MIT
