# embed-youtube

Embed youtube videos.

## Installation

Install with [component(1)](http://component.io):

```
$ component install fredsterss/embed-youtube
```

## Example

```
var y = require('embed-youtube');
var youtube = y(id, width, height);
y.show().play();
```

To use it, pass in the Youtube video ``id``, ``width`` and ``height``.

## API

### Youtube(video-id, width, height)

Create a new Youtube embed instance with the given ``video-id``, ``width`` and ``height``.

### #show(fn)

Show the youtube player, emitting ``show``, optionally calling ``fn``.

### #play(fn)

Play whatever video is loaded, emitting ``play``, optionally calling ``fn``.

## License

MIT
