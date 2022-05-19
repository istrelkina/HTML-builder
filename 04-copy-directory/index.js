const { readdir } = require('fs/promises')
const fs = require('fs')
const path = require('path')
let files;

async function getFiles() {
   try {
      files = await readdir(path.join(__dirname, 'files'), 'utf8', true)
      copyFile(files);
   } catch (err) {
      console.log('Что-то пошло не так с файлами')
   }
}

async function checkDir(pathFolder) {
   try {
      const dir = await fs.promises.mkdir(pathFolder, true)
   } catch (err) {
      //console.log('Ошибка ', err)
   }

}
async function copyFile(files) {
   try {
      for (const file of files)
         await fs.promises.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file));
   } catch (err) {
      console.log(err);
   }
}
checkDir(path.join(__dirname, 'files-copy'))
getFiles();

