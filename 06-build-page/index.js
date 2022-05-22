const { readdir } = require('fs/promises')
const fs = require('fs')
const path = require('path')
const readline = require('readline');
const { writeFile } = require('fs/promises');
const { readFile } = require('fs/promises');

async function readTemplate() {
   const data = await readFile(path.join(__dirname, 'template.html'), 'utf-8')
   const template = data
   createTemplate(template)
}

async function makeDir(pathFolder, dir) {
   try {
      await fs.promises.mkdir(path.join(pathFolder, dir), true)
   } catch (err) {
      //console.log('Ошибка ', err)
   }
}

async function createTemplate(template) {
   try {
      let arrTemplate = [];
      let i = 0;
      arrTemplate.push(template);
      const files = await readdir(path.join(__dirname, 'components'), 'utf8', true)
      for (const file of files) {
         fs.readFile(path.join(__dirname, 'components', file), 'utf-8', (err, data) => {
            const name = file.split('.')[0]
            i++
            arrTemplate.push(arrTemplate[i - 1].replace(`{{${name}}}`, data))
            if (i === (files.length)) {
               writeFile(path.join(__dirname, 'project-dist', 'index.html'), arrTemplate[i]);
            }
         })
      }
   } catch (err) {
      console.log('Ошибка: ', err)
   }
}
async function copyFile(pathSrc, pathDest, file) {
   try {
      await fs.promises.copyFile(path.join(pathSrc, file), path.join(pathDest, file));
   } catch (err) {
      console.log(err);
   }
}

async function copyFiles(pathSrc, pathDest, dir) {
   makeDir(pathDest, dir)
   try {
      const files = await readdir(path.join(pathSrc, dir), 'utf8', true)
      for (const file of files) {
         fs.stat(path.join(pathSrc, dir, file), (err, stats) => {
            if (err) throw err;
            if (stats.isFile()) {
               copyFile(path.join(pathSrc, dir), path.join(pathDest, dir), file);
            } else {
               copyFiles(path.join(pathSrc, dir), path.join(pathDest, dir), file)
            }
         });

      }
   } catch (err) {
      console.log('Что-то пошло не так с файлами')
   }
}
async function bundleFiles() {
   try {
      const files = await readdir(path.join(__dirname, 'styles'), 'utf8', true)
      for (const file of files) {
         const extname = path.parse(file)
         fs.stat(path.join(__dirname, 'styles', file), (err, stats) => {
            if (err) throw err;
            if (stats.isFile())
               if (extname.ext === '.css') {
                  const info = new fs.ReadStream(path.join(__dirname, 'styles', file), { encoding: 'utf-8' })
                  info.on('readable', function () {
                     const text = info.read()
                     if (text != null)
                        fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), text, (err) => {
                           if (err) throw err;
                        })
                  })
               }
         });
      }
   } catch (err) {
      console.log(err)
   }
}
fs.open(path.join(__dirname, 'project-dist', 'style.css'), 'w', (err) => {
   if (err) throw err;
})
makeDir(__dirname, 'project-dist')
readTemplate()
makeDir(path.join(__dirname, 'project-dist'), 'assets')
copyFiles(__dirname, path.join(__dirname, 'project-dist'), 'assets');
bundleFiles()


