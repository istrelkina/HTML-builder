const { readdir } = require('fs/promises')
const fs = require('fs')
const path = require('path')

async function copyFiles(pathSrc, pathDest, dir) {
   makeDir(pathDest, dir)
   try {
      const files = await readdir(path.join(pathSrc, dir), 'utf8', true)
      for (const file of files) {
         fs.stat(path.join(pathSrc, dir, file), (err, stats) => {
            if (err) throw err;
            if (stats.isFile()) {
               const newDir = dir + '-copy';
               copyFile(path.join(pathSrc, dir), path.join(pathDest, newDir), file);
            } else {
               const newDir = dir + '-copy';
               copyFiles(path.join(pathSrc, dir), path.join(pathDest, newDir), file)
            }
         });

      }
   } catch (err) {
      console.log('Что-то пошло не так с файлами')
   }
}

async function makeDir(pathFolder, dir) {
   try {
      const newDir = dir + '-copy';
      await fs.promises.mkdir(path.join(pathFolder, newDir), true)
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

copyFiles(__dirname, __dirname, 'files');

