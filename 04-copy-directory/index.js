const { readdir } = require('fs/promises');
const fs = require('fs');
const path = require('path');

async function copyFiles(pathSrc, pathDest, dir, prefix) {
  makeDir(pathDest, dir, prefix);
  try {
    const files = await readdir(path.join(pathSrc, dir), 'utf8', true);
    for (const file of files) {
      fs.stat(path.join(pathSrc, dir, file), (err, stats) => {
        if (err) throw err;
        if (stats.isFile()) {
          const newDir = dir + prefix;
          copyFile(path.join(pathSrc, dir), path.join(pathDest, newDir), file);
        } else {
          const newDir = dir + prefix;
          copyFiles(path.join(pathSrc, dir), path.join(pathDest, newDir), file, '');
        }
      });

    }
  } catch (err) {
    console.log('Что-то пошло не так с файлами');
  }
}

async function makeDir(pathFolder, dir, prefix) {
  try {
    const newDir = dir + prefix;
    await fs.promises.mkdir(path.join(pathFolder, newDir), true);
  } catch (err) {
    //console.log('Ошибка ', err)
  }

}
async function copyFile(pathSrc, pathDest, file) {
  try {
    await fs.promises.copyFile(path.join(pathSrc, file), path.join(pathDest, file));
  } catch (err) {
    console.log(err);
  }
}

function runCopy() {
  fs.access(path.join(__dirname, 'files-copy'), function (err) {
    if (err && err.code === 'ENOENT') {
      copyFiles(__dirname, __dirname, 'files', '-copy');
    } else {
      fs.rm(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
        if (err) throw err;
        copyFiles(__dirname, __dirname, 'files', '-copy');
      });
    }
  });
}

runCopy();


