const fs = require('fs')
const path = require('path');
const _dirname = path.dirname('01-read-file/index.js');

const info = new fs.ReadStream(path.join(_dirname, 'text.txt'), { encoding: 'utf-8' })
info.on('readable', function () {
   const text = info.read()
   if (text != null) console.log(text)
})