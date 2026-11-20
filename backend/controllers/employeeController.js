
import Employee from '../models/Employee.js';

// Employee Registration
export const registerEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            department,
            designation,
            salary
        } = req.body;

        // Check required fields
        if (!name || !email || !password || !department || !designation) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all required fields'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must contain at least 6 characters'
            });
        }

        // Check whether email already exists
        const existingEmployee = await Employee.findOne({
            email: email.toLowerCase()
        });

        if (existingEmployee) {
            return res.status(409).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Create employee
        const employee = await Employee.create({
            name,
            email,
            password,
            department,
            designation,
            salary: salary || 0,
            role: 'Employee'
        });

        res.status(201).json({
            success: true,
            message: 'Employee registered successfully',
            employee: {
                id: employee._id,
                name: employee.name,
                email: employee.email,
                department: employee.department,
                designation: employee.designation,
                role: employee.role
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Registration failed',
            error: error.message
        });
    }
};
