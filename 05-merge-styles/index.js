const { readdir } = require('fs/promises')
const fs = require('fs')
const path = require('path')

fs.open(path.join(__dirname, 'project-dist', 'bundle.css'), 'w', (err) => {
   if (err) throw err;
})

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
                        fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), text, (err) => {
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

bundleFiles();