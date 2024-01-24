const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/') {
    // Serve the home page (HTML form)
    const homePage = fs.readFileSync('index.html', 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(homePage);
  } else if (parsedUrl.pathname === '/addGrade') {
    // Handle adding a grade
    const query = parsedUrl.query;
    const studentName = query.studentName;
    const subjectName = query.subjectName;
    const grade = query.grade;

    // Read existing data from the JSON file (if it exists)
    let data = [];
    if (fs.existsSync('data.json')) {
      data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    }

    // Add the new grade to the data
    data.push({ studentName, subjectName, grade });

    // Write the updated data back to the JSON file
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Grade added successfully.');
  } else if (parsedUrl.pathname === '/viewGrades') {
    // Handle viewing grades
    const query = parsedUrl.query;
    const studentName = query.studentName;

    // Read the data from the JSON file
    let data = [];
    if (fs.existsSync('data.json')) {
      data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    }

    // Filter the data for the specified student
    const studentGrades = data.filter(entry => entry.studentName === studentName);

    // Send the student's grades as a JSON response
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(studentGrades));
  } else {
    // Handle other requests (e.g., CSS, JS files)
    const filePath = `.${parsedUrl.pathname}`;
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  }
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
