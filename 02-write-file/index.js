const fs = require('fs');
const path = require('path')
const readline = require('readline')
const { stdin: input, stdout: output } = require('process')
const _dirname = path.dirname('02-write-file/index.js');
let answer = '';
console.log(path.join(_dirname, 'text.txt'))
console.log('Введите текст: ')
fs.open(path.join(_dirname, 'text.txt'), 'a+', (err) => {
   if (err) throw err;
   // console.log(err)
   // console.log('Что-то с открытием файла пошло не так')
})

const rl = readline.createInterface({ input, output })
rl.on('line', (answer) => {
   let str = answer + '\n';

   if (answer.trim() == 'exit') {
      console.log('Ввод данных закончен');
      rl.close();
   } else {
      fs.appendFile(path.join(_dirname, 'text.txt'), str, (err) => {
         if (err) throw err;
         // console.log(err)
         // console.log('Что-то с записью в файл пошло не так')
      })
   }
});
rl.on('SIGINT', () => {
   console.log('Ввод данных закончен');
   rl.close()
})
