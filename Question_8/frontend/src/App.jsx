import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStudents();
  }, []);

  async function getStudents() {
    try {
      const response = await fetch("http://localhost:5000/api/students");
      const data = await response.json();
      if (Array.isArray(data)) setStudents(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function saveStudent(e) {
    e.preventDefault();
    setLoading(true);

    const studentData = {
      name: name,
      email: email,
      age: Number(age),
      course: course,
    };

    try {
      if (editId) {
        await fetch(`http://localhost:5000/api/students/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(studentData),
        });
      } else {
        await fetch("http://localhost:5000/api/students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(studentData),
        });
      }

      clearForm();
      getStudents();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function editStudent(student) {
    setEditId(student.id);
    setName(student.name);
    setEmail(student.email);
    setAge(student.age);
    setCourse(student.course);
  }

  async function deleteStudent(id) {
    if (!confirm("Are you sure you want to delete this student record?")) return;
    try {
      await fetch(`http://localhost:5000/api/students/${id}`, {
        method: "DELETE",
      });
      getStudents();
    } catch (err) {
      console.error(err);
    }
  }

  function clearForm() {
    setEditId(null);
    setName("");
    setEmail("");
    setAge("");
    setCourse("");
  }

  return (
    <div className="sis-app">
      <nav className="sis-nav">
        <div className="sis-brand">
          <div className="sis-logo">S</div>
          <div>
            <h2>Academia SIS</h2>
            <span>Sequelize ORM & Express Database Console • Question 08</span>
          </div>
        </div>
      </nav>

      <div className="sis-container">
        <div className="sis-header">
          <span className="badge-tag">Student Information Management</span>
          <h1 className="sis-title">Student Directory & Academic Enrollment</h1>
          <p className="sis-subtitle">Perform full CRUD operations powered by Sequelize ORM with real-time UI state sync.</p>
        </div>

        <div className="sis-grid">
          {/* STUDENT FORM */}
          <div className="sis-card">
            <h2 className="card-title">
              {editId ? "Update Student Profile" : "Enroll New Student"}
            </h2>

            <form onSubmit={saveStudent}>
              <div className="form-group">
                <label className="field-label">Student Full Name</label>
                <input
                  type="text"
                  className="field-input"
                  placeholder="e.g. Naitik Vaghasiya"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="field-label">Student Email Address</label>
                <input
                  type="email"
                  className="field-input"
                  placeholder="e.g. naitik@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="field-label">Age (Years)</label>
                <input
                  type="number"
                  className="field-input"
                  placeholder="e.g. 21"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="field-label">Enrolled Academic Course</label>
                <input
                  type="text"
                  className="field-input"
                  placeholder="e.g. B.Sc. IT (Sem 7)"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-submit-student" disabled={loading}>
                {loading 
                  ? "Processing..." 
                  : editId 
                    ? "Save Changes (Update)" 
                    : "Enroll Student Record"
                }
              </button>

              {editId && (
                <button type="button" className="btn-cancel-edit" onClick={clearForm}>
                  Cancel Edit Mode
                </button>
              )}
            </form>
          </div>

          {/* STUDENT TABLE */}
          <div className="sis-card">
            <div className="table-header-row">
              <h2 className="card-title" style={{ margin: 0, padding: 0, border: "none" }}>
                Enrolled Students
              </h2>
              <span className="students-count-badge">
                {students.length} Total Registered
              </span>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table className="sis-table">
                <thead>
                  <tr>
                    <th style={{ width: "60px" }}>ID</th>
                    <th>Name</th>
                    <th>Email Address</th>
                    <th>Age</th>
                    <th>Academic Course</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="empty-table-msg">
                        No student records found. Enroll your first student using the form on the left.
                      </td>
                    </tr>
                  ) : (
                    students.map((student) => (
                      <tr key={student.id}>
                        <td>
                          <span className="student-id-badge">#{student.id}</span>
                        </td>
                        <td><strong>{student.name}</strong></td>
                        <td>{student.email}</td>
                        <td>{student.age} yrs</td>
                        <td>
                          <span className="course-pill">{student.course}</span>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <button 
                            className="btn-edit-student"
                            onClick={() => editStudent(student)}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn-del-student"
                            onClick={() => deleteStudent(student.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
