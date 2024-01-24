// Functions to add, change, and view grades
function addGrade(studentName, subjectName, grade) {
    // Retrieve data from localStorage or create an empty object
    const usosData = JSON.parse(localStorage.getItem('usosData')) || {};
  
    if (!usosData[studentName]) {
      usosData[studentName] = {};
    }
  
    usosData[studentName][subjectName] = parseFloat(grade);
    localStorage.setItem('usosData', JSON.stringify(usosData));
  }
  
  function changeGrade(studentName, subjectName, grade) {
    const usosData = JSON.parse(localStorage.getItem('usosData'));
  
    if (usosData && usosData[studentName] && usosData[studentName][subjectName]) {
      usosData[studentName][subjectName] = parseFloat(grade);
      localStorage.setItem('usosData', JSON.stringify(usosData));
    } else {
      alert("Student or subject not found!");
    }
  }
  
  function viewGrades(studentName) {
    const usosData = JSON.parse(localStorage.getItem('usosData'));
  
    if (usosData && usosData[studentName]) {
      const studentGrades = usosData[studentName];
      const gradeList = Object.entries(studentGrades).map(([subject, grade]) => `${subject}: ${grade}`).join('<br>');
      document.getElementById('output').innerHTML = gradeList;
    } else {
      alert("Student not found!");
    }
  }
  
  // Event listeners for buttons
  document.getElementById('addGradeButton').addEventListener('click', function () {
    const studentName = document.getElementById('studentName').value;
    const subjectName = document.getElementById('subjectName').value;
    const grade = document.getElementById('grade').value;
  
    if (studentName && subjectName && grade) {
      addGrade(studentName, subjectName, grade);
      alert('Grade added successfully.');
    } else {
      alert('Please fill in all fields.');
    }
  });
  
  document.getElementById('changeGradeButton').addEventListener('click', function () {
    const studentName = document.getElementById('studentName').value;
    const subjectName = document.getElementById('subjectName').value;
    const grade = document.getElementById('grade').value;
  
    if (studentName && subjectName && grade) {
      changeGrade(studentName, subjectName, grade);
      alert('Grade changed successfully.');
    } else {
      alert('Please fill in all fields.');
    }
  });
  
  document.getElementById('viewGradesButton').addEventListener('click', function () {
    const studentName = document.getElementById('studentName').value;
    if (studentName) {
      viewGrades(studentName);
    } else {
      alert('Please enter the student name.');
    }
  });