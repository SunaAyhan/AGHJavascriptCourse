db.students.insertOne({
    name: "John",
    surname: "Doe",
    department: "IET"
  })
  db.students.find({ department: "IET" })
