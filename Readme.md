# embed-youtube

[Component](https://github.com/component/component) for embedding youtube videos.

## Installation

Install with [component(1)](http://component.io):

```
$ component install fredsterss/embed-youtube
```

## Example

Embed-youtube currently depends on ``swfobject.js``. 

```
<script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js"></script>
```

@TODO - componentize this.


```
var y = require('embed-youtube');
var youtube = y(el, videoId, width, height);
youtube.play();
youtube.seekTo(60);
```

To use it, pass in the ``el`` you want to attach it to, the Youtube ``videoId``, ``width`` and ``height``.

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
