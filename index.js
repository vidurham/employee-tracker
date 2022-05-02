const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');
const { allowedNodeEnvironmentFlags, exit } = require('process');

const startTrack = () => {
    console.log("Welcome to Employee Tracker!");
    firstQuestion();
};

const firstQuestion = () => {
    inquirer.prompt([
        {
            type: 'list',
            name:'startChoice',
            message: 'What would you like to do?',
            choices:[
                'View all Employees',
                'View Roles',
                'View Departments',
                'Add Employee',
                'Add Role',
                'Add Department',
                'Exit'
            ]
        }
    ]).then((answer) => {
        switch (answer.startChoice) {
            case 'View all Employees':
                viewAllEmployees();
                break;
            case 'View Roles':
                viewRoles();
                break;
            case 'View Departments':
                viewDepartments();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Exit':
                exit();
                

        }
    })
};

const viewAllEmployees = () => {
    const query = `SELECT employees.id, employees.first_name AS First, employees.last_name AS Last, roles.title AS Title, departments.name AS Department, roles.salary AS Salary, CONCAT(manager.first_name,' ', manager.last_name) AS Manager
    FROM employees
    LEFT JOIN employees manager on manager.id = employees.manager_id
    INNER JOIN roles ON employees.role_id = roles.id
    INNER JOIN departments ON departments.id = roles.department_id;`
    db.query(query, (err, res) => {
        if (err) {
            throw err
        }
        console.log('Viewing all employees');
        console.log('===============================================');
        console.table(res);
        console.log('===============================================');
        firstQuestion();
    })
};

const viewRoles = () => {
    const query = `SELECT roles.id, roles.title AS Title, roles.salary AS Salary, departments.name AS Department FROM roles LEFT JOIN departments on roles.department_id = departments.id`
    db.query(query, (err, res) => {
        if (err) {
            throw err
        }
        console.log('Viewing all roles');
        console.log('===============================================');
        console.table(res);
        console.log('===============================================');
        firstQuestion();
    })
};

const viewDepartments = () => {
    query = `SELECT departments.id, departments.name AS Department FROM departments`
    db.query(query, (err, res) => {
        if (err) {
            throw err
        }
        console.log('Viewing all departments');
        console.log('===============================================');
        console.table(res);
        console.log('===============================================');
        firstQuestion();
    })
};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the first name of the employee you would you like to add?',
            name: 'first_name'
        },
        {
            type: 'input',
            message: 'What is the last name of the employee you would you like to add?',
            name: 'last_name'
        },
        {
            type: 'input',
            message: 'What is the role ID number of the employee you would you like to add?',
            name: 'role'
        },
        {
            type: 'input',
            message: 'What is the manager ID number of the employee you would you like to add?',
            name: 'manager'
        }
    ]).then((answers) => {
        const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`
        db.query(query, [answers.first_name, answers.last_name, answers.role, answers.manager], 
            (err) => {
                if (err) {
                    throw err;
                }
                console.log('Added new Employee');
                console.log('===============================================');
                console.table(answers);
                console.log('===============================================');
                firstQuestion();
            })
    })
}

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the title of the role you would like to add?',
            name: 'newRole'
        },
        {
            type: 'input',
            message: 'What is the salary of this role?',
            name: 'salary'
        },
        {
            type: 'input',
            message: 'What is the department ID number for this role?',
            name: 'dept_id'
        }
    ]).then((answers) => {
        const query = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`
        db.query(query, [answers.newRole, answers.salary, answers.dept_id], 
            (err) => {
                if (err) {
                    throw err;
                }
                console.log('Added new Role');
                console.log('===============================================');
                console.table(answers);
                console.log('===============================================');
                firstQuestion();
            })
    })
}

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What department would you like to add?',
            name: 'newDepartment'
        }
    ]).then((answer) => {
        const query = `INSERT INTO departments (name) VALUES (?)`
        db.query(query, answer.newDepartment, 
        (err) => {
            if (err) {
                throw err;
            }
            console.log('Added new Department');
            console.log('===============================================');
            console.table(answer);
            console.log('===============================================');
            firstQuestion();
        })
    })
}

startTrack();