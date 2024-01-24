// usos.js

// Define an object to store student and subject information.

  
  // Get references to HTML elements.
  const studentNameInput = document.getElementById("studentName");
  const subjectNameInput = document.getElementById("subjectName");
  const gradeInput = document.getElementById("grade");
  const addGradeButton = document.getElementById("addGradeButton");
  const changeGradeButton = document.getElementById("changeGradeButton");
  const viewGradesButton = document.getElementById("viewGradesButton");
  const outputDiv = document.getElementById("output");
  
  // Function to handle adding a grade to a student in a specific subject.
  function addGrade(studentName, subjectName, grade) {
    if (!usosSystem.students[studentName]) {
      // If the student doesn't exist, create a new student.
      usosSystem.students[studentName] = {
        grades: {},
      };
    }
    
    if (!usosSystem.subjects[subjectName]) {
      // If the subject doesn't exist, create a new subject.
      usosSystem.subjects[subjectName] = true;
    }
  
    // Now you can add the grade to the student.
    usosSystem.students[studentName].grades[subjectName] = grade;
  
    return true;
  }
  
  
  // Function to change a specific grade given to a student.
  function changeGrade(studentName, subjectName, newGrade) {
    if (usosSystem.students[studentName] && usosSystem.subjects[subjectName]) {
      usosSystem.students[studentName].grades[subjectName] = newGrade;
      return true;
    }
    return false;
  }
  
  // Function to list grades for a specified student.
  function listGrades(studentName) {
    if (usosSystem.students[studentName]) {
      return usosSystem.students[studentName].grades;
    }
    return null;
  }
  
  function loadData() {
    const storedData = localStorage.getItem("usosSystem");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log("Loaded data from localStorage:", parsedData);
      return parsedData;
    } else {
      return {
        students: {},
        subjects: {},
      };
    }
  }
  
  function saveData() {
    localStorage.setItem("usosSystem", JSON.stringify(usosSystem));
    console.log("Saved data to localStorage:", usosSystem);
  }
  
  // Initialize the usosSystem object by loading data from localStorage.
const usosSystem = loadData();


addGradeButton.addEventListener("click", () => {
    const studentName = studentNameInput.value;
    const subjectName = subjectNameInput.value;
    const grade = gradeInput.value;
  
    if (studentName && subjectName && grade) {
      if (addGrade(studentName, subjectName, grade)) {
        saveData(); // Save data to localStorage after a change.
        clearInputs();
        outputDiv.innerHTML = "Grade added successfully.";
      } else {
        outputDiv.innerHTML = "Student or subject does not exist.";
      }
    } else {
      outputDiv.innerHTML = "Please fill in all fields.";
    }
  });
  
  changeGradeButton.addEventListener("click", () => {
    const studentName = studentNameInput.value;
    const subjectName = subjectNameInput.value;
    const newGrade = gradeInput.value;
  
    if (studentName && subjectName && newGrade) {
      if (changeGrade(studentName, subjectName, newGrade)) {
        saveData(); // Save data to localStorage after a change.
        clearInputs();
        outputDiv.innerHTML = "Grade changed successfully.";
      } else {
        outputDiv.innerHTML = "Student or subject does not exist.";
      }
    } else {
      outputDiv.innerHTML = "Please fill in all fields.";
    }
  });
  viewGradesButton.addEventListener("click", () => {
    const studentName = studentNameInput.value;
    if (studentName) {
      const grades = listGrades(studentName);
      console.log("Grades for", studentName, ":", grades); // Debugging line
      if (grades) {
        outputDiv.innerHTML = `Grades for ${studentName}:\n`;
        for (const subject in grades) {
          outputDiv.innerHTML += `Subject: ${subject}, Grade: ${grades[subject]}\n`;
        }
      } else {
        outputDiv.innerHTML = "Student does not exist.";
      }
    } else {
      outputDiv.innerHTML = "Please enter a student name.";
    }
  });
  
 