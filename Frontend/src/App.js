
import React, { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:5000/api/employees";

function App() {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
  name: "",
  email: "",
  phone: "",
  department: "",
  role: "",
  salary: "",
  attendance: "",
  leave: ""
  });

  async function loadEmployees() {
    try {
      const response = await fetch(API);
      if (!response.ok) throw new Error("Unable to load employees");

      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      setMessage("Backend connection failed. Check that the backend is running.");
    }
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  async function addEmployee(event) {
    event.preventDefault();
    setMessage("");

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        


body: JSON.stringify({
    ...form,
    salary: Number(form.salary),
    attendance: Number(form.attendance),
    leaveStatus: form.leave
})



      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add employee");
      }

      setMessage("Employee added successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        department: "",
        role: "",
        salary: "",
        attendance: "",
        leave: ""
      });

      await loadEmployees();
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  }

  return (
    <div className="container">
      <h1>Employee Management System</h1>
      <p className="subtitle">Manage your employees in one place</p>

      {message && <p className="message">{message}</p>}

      <section className="panel">
        <h2>Add Employee</h2>

        <form className="employee-form" onSubmit={addEmployee}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
          <input name="department" placeholder="Department" value={form.department} onChange={handleChange} required />
          <input name="role" placeholder="Role" value={form.role} onChange={handleChange} required />
          <input name="salary" type="number" placeholder="Salary" value={form.salary} onChange={handleChange} required />
          <input name="attendance" type="number" min="0" max="100" placeholder="Attendance (%)" value={form.attendance} onChange={handleChange} required />

          

<select
  name="leave"
  value={form.leave}
  onChange={handleChange}
  required
>
  <option value="">Select Leave Status</option>
  <option value="No Leave">No Leave</option>
  <option value="Leave Applied">Leave Applied</option>
  <option value="Leave Approved">Leave Approved</option>
</select>


          <button type="submit">Add Employee</button>
        </form>
      </section>

      <section className="panel">
        <h2>Employee List ({employees.length})</h2>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Role</th>
                <th>Salary</th>
                <th>Attendance</th>
                <th>Leave</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
    <tr key={employee._id}>
      <td>{employee.name}</td>
      <td>{employee.email}</td>
      <td>{employee.phone}</td>
      <td>{employee.department}</td>
      <td>{employee.role}</td>
      <td>{employee.salary}</td>
      <td>{employee.attendance ?? "-"}</td>
      <td>{employee.leaveStatus ?? employee.leave ?? "-"}</td>

      <td>
        <button
          type="button"
          className="delete-button"
          onClick={async () => {
            if (!window.confirm("Are you sure you want to delete this employee?")) {
              return;
            }

            try {
              const response = await fetch(
                `http://localhost:5000/api/employees/${employee._id}`,
                { method: "DELETE" }
              );

              if (!response.ok) {
                throw new Error("Delete failed");
              }

              setMessage("Employee deleted successfully!");
              await loadEmployees();
            } catch (error) {
              setMessage("Unable to delete employee. Check your backend DELETE route.");
            }
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}

            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default App;
