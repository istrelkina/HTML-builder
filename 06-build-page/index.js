const { readdir } = require('fs/promises')
const fs = require('fs')
const path = require('path')
const readline = require('readline');
const { writeFile } = require('fs/promises');

let template = ''
const info = new fs.ReadStream(path.join(__dirname, 'template.html'), { encoding: 'utf-8' })
info.on('readable', function () {
   const text = info.read()
   if (text != null) template = text;
})

async function makeDir(pathFolder, dir) {
   try {
      // const newDir = dir + '-copy';
      await fs.promises.mkdir(path.join(pathFolder, dir), true)
   } catch (err) {
      //console.log('Ошибка ', err)
   }
}

async function createTemplate() {
   try {

      const files = await readdir(path.join(__dirname, 'components'), 'utf8', true)
      for (const file of files) {
         fs.readFile(path.join(__dirname, 'components', file), 'utf-8', (err, data) => {
            const name = file.split('.')[0]
            template = template.replace(`{{${name}}}`, data)
            console.log(name)
            //console.log(data)
         })
      }
      console.log(template)
      await writeFile(path.join(__dirname, 'project-dist', 'index.html'), template);
   } catch (err) {
      console.log('Ошибка: ', err)
   }
}


makeDir(__dirname, 'project-dist')
createTemplate()
