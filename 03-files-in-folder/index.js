const { readdir } = require('fs/promises');
const fs = require('fs');
const path = require('path');

async function getFiles() {
  try {
    const files = await readdir(path.join(__dirname, 'secret-folder'), 'utf8', true);
    for (const file of files) {
      const extname = path.parse(file);
      fs.stat(path.join(__dirname, 'secret-folder', file), (err, stats) => {
        if (err) throw err;
        if (stats.isFile())
          console.log(extname.name + ' - ' + extname.ext.substring(1, extname.ext.lenght) + ' - ' + stats.size);
      });
    }
  } catch (err) {
    console.log(err);
  }
}

getFiles();
