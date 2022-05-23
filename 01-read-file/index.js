const fs = require('fs');
const path = require('path');

const info = new fs.ReadStream(path.join(__dirname, 'text.txt'), { encoding: 'utf-8' });
info.on('readable', function () {
  const text = info.read();
  if (text != null) console.log(text);
});