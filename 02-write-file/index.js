const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
console.log(path.join(__dirname, 'text.txt'));
console.log('Введите текст: ');
fs.open(path.join(__dirname, 'text.txt'), 'w', (err) => {
  if (err) throw err;
});

const rl = readline.createInterface({ input, output });
rl.on('line', (answer) => {
  let str = answer + '\n';

  if (answer.trim() == 'exit') {
    console.log('Ввод данных закончен. С вами приятно иемть дело!');
    rl.close();
  } else {
    fs.appendFile(path.join(__dirname, 'text.txt'), str, (err) => {
      if (err) throw err;
    });
  }
});
rl.on('SIGINT', () => {
  console.log('Ввод данных закончен. С вами приятно иемть дело!');
  rl.close();
});
