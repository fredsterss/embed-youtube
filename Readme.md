# embed-youtube

Embed youtube videos.

## Installation

Install with [component(1)](http://component.io):

```
$ component install fredsterss/embed-youtube
```

## Example

```
var youtube = require('embed-youtube');
youtube(id, width, height).show();
```

To use it, pass in the Youtube video ``id``, ``width`` and ``height``.

## API

### Youtube(video-id, width, height)

Create a new Youtube embed instance with the given ``video-id``, ``width`` and ``height``.

### #show(fn)

Show the youtube player, emitting ``show``, optionally calling ``fn``.

## License

MIT
