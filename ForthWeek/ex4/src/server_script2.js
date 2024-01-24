const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const counterFile = 'counter.txt';

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === '/') {
    // Serve the HTML form
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <head>
          <title>Run Counter</title>
        </head>
        <body>
          <form method="POST" action="/process">
            <select name="action">
              <option value="none"> _ </option>
              <option value="sync">Sync</option>
              <option value="async">Async</option>
            </select>
            <br>
            <textarea name="commands" rows="4" cols="50"></textarea>
            <br>
            <input type="submit" value="Submit">
          </form>
        </body>
      </html>
    `);
  } else if (pathname === '/process' && req.method === 'POST') {
    let body = '';
    req.on('data', (data) => {
      body += data;
    });

    req.on('end', () => {
      const formData = qs.parse(body);
      const action = formData.action;
      const commands = formData.commands;

      if (action === 'sync' || action === 'async') {
        // Read/Write the counter file synchronously or asynchronously
        let counter = 0;
        if (fs.existsSync(counterFile)) {
          if (action === 'sync') {
            counter = parseInt(fs.readFileSync(counterFile, 'utf-8'));
          } else {
            fs.readFile(counterFile, 'utf-8', (err, data) => {
              if (!err) {
                counter = parseInt(data);
              }
            });
          }
        }
        counter++;
        fs.writeFileSync(counterFile, counter.toString());

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`Number of program runs: ${counter}`);
      } else if (action === 'none') {
        // Execute system commands
        const exec = require('child_process').exec;
        exec(commands, (error, stdout, stderr) => {
          if (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error executing system commands');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(stdout);
          }
        });
      } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid action');
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
