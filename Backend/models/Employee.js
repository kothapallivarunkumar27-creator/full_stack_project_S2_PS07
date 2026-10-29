const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    department: { type: String, required: true },
    role: { type: String, required: true },
    salary: { type: Number, required: true },
    attendance: { type: Number, default: 0 },
    leaveStatus: { type: String, default: "No Leave" }
});

module.exports = mongoose.model("Employee", employeeSchema);
