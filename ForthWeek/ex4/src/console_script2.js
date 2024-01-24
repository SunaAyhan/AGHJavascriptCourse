const fs = require('fs');
const readline = require('readline');

const counterFile = 'counter.txt';
let counter = 0;

function incrementCounter() {
  counter++;
  if (process.argv.includes('--sync')) {
    fs.writeFileSync(counterFile, counter.toString());
  } else {
    fs.writeFile(counterFile, counter.toString(), (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      }
    });
  }
}

function readCounter() {
  if (fs.existsSync(counterFile)) {
    if (process.argv.includes('--sync')) {
      counter = parseInt(fs.readFileSync(counterFile, 'utf-8'));
    } else {
      fs.readFile(counterFile, 'utf-8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
        } else {
          counter = parseInt(data);
        }
      });
    }
  }
}

function executeCommandsFromInput() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Enter commands - Pressing Ctrl+D completes data entry\n'
  });

  rl.prompt();
  rl.on('line', (line) => {
    console.log(line);
  });

  rl.on('close', () => {
    console.log('Ctrl+D pressed. Exiting...');
    process.exit(0);
  });
}

if (process.argv.includes('--sync') || process.argv.includes('--async')) {
  readCounter();
  incrementCounter();
  console.log(`Number of program runs: ${counter}`);
} else {
  executeCommandsFromInput();
}
