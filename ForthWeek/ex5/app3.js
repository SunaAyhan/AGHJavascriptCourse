import express from 'express';
import { MongoClient } from 'mongodb';
const app = express();
const port = 8000;

app.set('view engine', 'pug');
console.log("1")
// MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/';
const dbName = 'AGH';
console.log("2")
// Middleware to parse request parameters
app.use(express.static('public')); // Serve files from a 'public' directory
console.log("3")

  var client = null
app.get('/:faculty', async (req, res) => {
  // Connect to MongoDB
  client = await MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
  var db = null
  var studentsCollection = null

  const facultyAcronym = req.params.faculty;
  console.log("4")
  db = client.db(dbName) // once connected, assign the connection to the global variable
    studentsCollection = db.collection('Students');
    console.log("5")
    console.log("6")
    // Find students of the given faculty
    const students = await studentsCollection.find({ department: facultyAcronym }).toArray();
    console.log(students)
    // Render the list of students
    res.render('index', { students: students });
   
});
console.log("8")
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
