
import './style.css';

const app = document.querySelector('#app');
const API_URL = import.meta.env.VITE_API_BASE_URL ||"https://employee-management-backend-vkz2.onrender.com/";

const initialEmployees = [
  { id: 1, name: 'Arun Kumar', username: 'employee', department: 'IT', designation: 'Developer', email: 'arun@company.com', salary: 35000 },
  { id: 2, name: 'Priya Sharma', username: 'priya', department: 'HR', designation: 'HR Executive', email: 'priya@company.com', salary: 32000 },
  { id: 3, name: 'Rahul Das', username: 'rahul', department: 'Finance', designation: 'Accountant', email: 'rahul@company.com', salary: 30000 },
  { id: 4, name: 'Meena Devi', username: 'meena', department: 'Marketing', designation: 'Manager', email: 'meena@company.com', salary: 42000 }
];

const loadData = (key, fallback) => {
  try {
    const saved = localStorage.getItem('ems_' + key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

const saveData = (key, data) => {
  localStorage.setItem('ems_' + key, JSON.stringify(data));
};

let employees = loadData('employees', initialEmployees);
let tasks = loadData('tasks', [
  { id: 1, title: 'Website Development', project: 'Company Website', employee: 'Arun Kumar', status: 'Ongoing', deadline: '2026-11-20' },
  { id: 2, title: 'Prepare Monthly Report', project: 'Finance Report', employee: 'Rahul Das', status: 'Pending', deadline: '2026-11-25' },
  { id: 3, title: 'Employee Records Update', project: 'HR Management', employee: 'Priya Sharma', status: 'Completed', deadline: '2026-11-10' }
]);
let leaves = loadData('leaves', [
  { id: 1, employee: 'Arun Kumar', type: 'Casual Leave', from: '2026-11-15', to: '2026-11-16', reason: 'Personal work', status: 'Pending' },
  { id: 2, employee: 'Priya Sharma', type: 'Medical Leave', from: '2026-11-12', to: '2026-11-13', reason: 'Medical appointment', status: 'Approved' }
]);
let attendance = loadData('attendance', []);
let salaries = loadData('salaries', [
  { employee: 'Arun Kumar', month: 'November 2026', amount: 35000, status: 'Paid' },
  { employee: 'Priya Sharma', month: 'November 2026', amount: 32000, status: 'Pending' },
  { employee: 'Rahul Das', month: 'November 2026', amount: 30000, status: 'Paid' },
  { employee: 'Meena Devi', month: 'November 2026', amount: 42000, status: 'Pending' }
]);

let currentUser = null;
let currentScreen = 'dashboard';

const adminNav = [
  ['dashboard', '▦', 'Dashboard'],
  ['employees', '♙', 'Employees'],
  ['tasks', '▤', 'Projects & Tasks'],
  ['attendance', '◷', 'Attendance'],
  ['leaves', '▧', 'Leave Management'],
  ['salary', '₹', 'Salary & Payroll']
];

const employeeNav = [
  ['dashboard', '▦', 'Dashboard'],
  ['tasks', '▤', 'My Tasks'],
  ['attendance', '◷', 'My Attendance'],
  ['leaves', '▧', 'My Leave'],
  ['salary', '₹', 'My Salary']
];

const money = amount =>
  '₹' + Number(amount).toLocaleString('en-IN');

const today = () => new Date().toISOString().slice(0, 10);

const escapeHTML = value =>
  String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);

const badge = status => {
  const color = {
    Pending: 'pending',
    Ongoing: 'ongoing',
    Completed: 'completed',
    Approved: 'approved',
    Rejected: 'rejected',
    Present: 'approved',
    Absent: 'rejected',
    Paid: 'completed'
  }[status] || 'pending';

  return `<span class="badge ${color}">${escapeHTML(status)}</span>`;
};

// LOGIN PAGE

function renderLogin() {
  app.innerHTML = `
    <main class="login-page">

      <section class="login-brand">
        <div class="brand-logo">E<span>M</span>S</div>

        <div class="brand-message">
          <div class="gold-label">WORKFORCE MANAGEMENT PLATFORM</div>
          <h1>People First.<br><span>Performance Always.</span></h1>
          <p>
            A smarter way to manage your people,
            projects, attendance and organizational growth.
          </p>

          <div class="brand-features">
            <span>✦ Employee Management</span>
            <span>✦ Smart Task Tracking</span>
            <span>✦ Workforce Analytics</span>
          </div>
        </div>

        <p class="brand-footer">EMS © 2026 | Employee Management System</p>
      </section>

      <section class="login-section">
        <div class="login-card">

          <div class="login-symbol">EMS</div>
          <div class="gold-label">WELCOME BACK</div>
          <h2>Sign in to continue</h2>
          <p class="muted">Choose your account type to access your workspace.</p>

          <div class="role-tabs">
            <button class="role-tab active" data-role="admin">
              ♙ Admin
            </button>
            <button class="role-tab" data-role="employee">
              ♧ Employee
            </button>
          </div>

          <form id="loginForm">
            <label for="username">Username</label>
            <input id="username" placeholder="Enter your username" required>

            <label for="password">Password</label>
            <div class="password-input">
              <input id="password" type="password"
                     placeholder="Enter your password" required>
              <button type="button" id="showPassword">Show</button>
            </div>

            <div class="login-options">
              <label class="remember">
                <input type="checkbox"> Remember me
              </label>
              <span>● Secure portal</span>
            </div>

            <button class="gold-button full-width" type="submit">
              Sign In →
            </button>
            <p id="loginMessage" class="form-message"></p>
          </form>

          <div class="demo-box">
            <strong>Demo credentials</strong>
            <p>Admin: <b>admin</b> / <b>admin123</b></p>
            <p>Employee: <b>employee</b> / <b>employee123</b></p>
            <small>Demo only – replace with real authentication before deployment.</small>
          </div>

        </div>
      </section>

    </main>
  `;

  let role = 'admin';

  document.querySelectorAll('.role-tab').forEach(button => {
    button.onclick = () => {
      role = button.dataset.role;
      document.querySelectorAll('.role-tab')
        .forEach(item => item.classList.toggle('active', item === button));
      document.querySelector('#loginMessage').textContent = '';
    };
  });

  document.querySelector('#showPassword').onclick = () => {
    const input = document.querySelector('#password');
    input.type = input.type === 'password' ? 'text' : 'password';
    document.querySelector('#showPassword').textContent =
      input.type === 'password' ? 'Show' : 'Hide';
  };

  document.querySelector('#loginForm').onsubmit = event => {
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value;
    const valid = role === 'admin'
      ? username === 'admin' && password === 'admin123'
      : username === 'employee' && password === 'employee123';

    if (!valid) {
      document.querySelector('#loginMessage').textContent =
        'Invalid demo username or password.';
      return;
    }

    currentUser = role === 'admin'
      ? { role: 'admin', name: 'Administrator', username }
      : { role: 'employee', name: employees.find(e => e.username === username)?.name || 'Arun Kumar', username };

    currentScreen = 'dashboard';
    renderApp();
  };
}

// APPLICATION LAYOUT

function renderApp() {
  const nav = currentUser.role === 'admin' ? adminNav : employeeNav;

  app.innerHTML = `
    <div class="app-layout">

      <aside class="sidebar" id="sidebar">
        <div class="sidebar-brand">
          <div class="brand-logo small">E<span>M</span>S</div>
          <div>
            <strong>EMS PORTAL</strong>
            <small>Workforce Suite</small>
          </div>
        </div>

        <div class="nav-caption">MAIN MENU</div>

        <nav class="side-nav">
          ${nav.map(([id, icon, label]) => `
            <button class="nav-item ${currentScreen === id ? 'selected' : ''}"
                    data-screen="${id}">
              <span class="nav-icon">${icon}</span>
              ${label}
            </button>
          `).join('')}
        </nav>

        <div class="sidebar-bottom">
          <div class="profile-mini">
            <div class="avatar">${escapeHTML(currentUser.name[0])}</div>
            <div>
              <strong>${escapeHTML(currentUser.name)}</strong>
              <small>${currentUser.role === 'admin' ? 'Administrator' : 'Employee'}</small>
            </div>
          </div>
          <button class="logout-button" id="logout">↪ Sign Out</button>
        </div>
      </aside>

      <main class="main-area">
        <header class="topbar">
          <div class="topbar-left">
            <button id="menuToggle" class="menu-toggle">☰</button>
            <div>
              <div class="breadcrumb">WORKSPACE / ${currentScreen.toUpperCase()}</div>
              <h2>${nav.find(item => item[0] === currentScreen)?.[2] || 'Dashboard'}</h2>
            </div>
          </div>

          <div class="topbar-right">
            <span class="today-label">${new Date().toLocaleDateString('en-IN', {
              day: '2-digit', month: 'short', year: 'numeric'
            })}</span>
            <div class="avatar top-avatar">${escapeHTML(currentUser.name[0])}</div>
          </div>
        </header>

        <section class="page-content" id="pageContent">
          ${renderScreen()}
        </section>

        <footer class="app-footer">
          EMS Employee Management System · 2026
        </footer>
      </main>
    </div>
  `;

  document.querySelectorAll('[data-screen]').forEach(button => {
    button.onclick = () => {
      currentScreen = button.dataset.screen;
      renderApp();
    };
  });

  document.querySelector('#logout').onclick = () => {
    currentUser = null;
    renderLogin();
  };

  document.querySelector('#menuToggle').onclick = () => {
    document.querySelector('#sidebar').classList.toggle('show');
  };

  bindPageActions();
}

// DASHBOARD

function renderScreen() {
  const admin = currentUser.role === 'admin';
  const myTasks = tasks.filter(t => t.employee === currentUser.name);
  const myLeaves = leaves.filter(l => l.employee === currentUser.name);
  const mySalary = salaries.filter(s => s.employee === currentUser.name);

  if (currentScreen === 'dashboard') {
    const presentToday = attendance.filter(
      a => a.date === today() && a.status === 'Present'
    ).length;

    const stats = admin ? [
      ['TOTAL EMPLOYEES', employees.length, '♙', 'Active workforce'],
      ['DEPARTMENTS', new Set(employees.map(e => e.department)).size, '▦', 'Departments'],
      ['PRESENT TODAY', presentToday, '◷', 'Attendance records'],
      ['PENDING LEAVES', leaves.filter(l => l.status === 'Pending').length, '▧', 'Awaiting approval']
    ] : [
      ['MY TASKS', myTasks.length, '▤', 'Assigned tasks'],
      ['PENDING TASKS', myTasks.filter(t => t.status === 'Pending').length, '◷', 'Awaiting action'],
      ['MY LEAVES', myLeaves.length, '▧', 'Leave requests'],
      ['MY SALARY', money(mySalary.reduce((s, x) => s + Number(x.amount), 0)), '₹', 'Recorded payroll']
    ];

    return `
      <div class="welcome-row">
        <div>
          <div class="gold-label">OVERVIEW</div>
          <h1>Hello, ${escapeHTML(currentUser.name)} 👋</h1>
          <p class="muted">${admin
            ? 'Here is what is happening across your organization today.'
            : 'Welcome to your personal employee workspace.'}</p>
        </div>
        <span class="role-pill">${admin ? 'ADMIN ACCESS' : 'EMPLOYEE ACCESS'}</span>
      </div>

      <div class="stats-grid">
        ${stats.map(([label, value, icon, description]) => `
          <div class="stat-card">
            <div class="stat-top">
              <span>${label}</span>
              <span class="stat-icon">${icon}</span>
            </div>
            <h2>${value}</h2>
            <small>${description}</small>
          </div>
        `).join('')}
      </div>

      <div class="content-grid">
        <div class="panel">
          <div class="panel-heading">
            <div><h3>${admin ? 'Recent Tasks' : 'My Assigned Tasks'}</h3>
            <p>Task progress overview</p></div>
            <button class="text-button" data-go="tasks">View all →</button>
          </div>
          ${taskTable(admin ? tasks.slice(0, 4) : myTasks.slice(0, 4), false)}
        </div>

        <div class="panel">
          <div class="panel-heading">
            <div><h3>${admin ? 'Leave Requests' : 'My Leave Requests'}</h3>
            <p>Latest leave activity</p></div>
            <button class="text-button" data-go="leaves">View all →</button>
          </div>
          ${leavesTable(admin ? leaves.slice(0, 4) : myLeaves.slice(0, 4))}
        </div>
      </div>
    `;
  }

  if (currentScreen === 'employees') {
    if (!admin) return denied();

    return `
      <div class="section-heading">
        <div><h1>Employee Directory</h1><p class="muted">Manage your organization's workforce.</p></div>
        <button class="gold-button" id="addEmployee">+ Add Employee</button>
      </div>

      <div class="panel">
        <div class="table-toolbar">
          <h3>All Employees (${employees.length})</h3>
          <input id="employeeSearch" placeholder="Search employees...">
        </div>
        <div class="table-wrap" id="employeeTable">${employeeTable(employees)}</div>
      </div>
    `;
  }

  if (currentScreen === 'tasks') {
    const visibleTasks = admin ? tasks : myTasks;

    return `
      <div class="section-heading">
        <div><h1>${admin ? 'Projects & Tasks' : 'My Tasks'}</h1>
        <p class="muted">${admin ? 'Assign and monitor employee tasks.' : 'View and update your assigned work.'}</p></div>
        ${admin ? '<button class="gold-button" id="addTask">+ Assign Task</button>' : ''}
      </div>

      <div class="task-stats">
        ${['Pending', 'Ongoing', 'Completed'].map(status => `
          <div class="mini-stat">
            <span>${status}</span>
            <strong>${visibleTasks.filter(t => t.status === status).length}</strong>
          </div>
        `).join('')}
      </div>

      <div class="panel">
        <div class="panel-heading"><h3>${admin ? 'All Assigned Tasks' : 'Assigned to Me'}</h3></div>
        ${taskTable(visibleTasks, true)}
      </div>
    `;
  }

  if (currentScreen === 'attendance') {
    const records = attendance.filter(a => admin || a.employee === currentUser.name);

    return `
      <div class="section-heading">
        <div><h1>Attendance Management</h1>
        <p class="muted">${admin ? 'Review employee attendance records.' : 'Mark and view your attendance.'}</p></div>
        ${!admin ? '<button class="gold-button" id="markAttendance">✓ Mark Present Today</button>' : ''}
      </div>

      <div class="stats-grid">
        ${[['Present', records.filter(a => a.status === 'Present').length],
           ['Absent', records.filter(a => a.status === 'Absent').length],
           ['Total Records', records.length]].map(([name, count]) => `
          <div class="stat-card"><span>${name}</span><h2>${count}</h2></div>
        `).join('')}
      </div>

      <div class="panel">
        <div class="panel-heading"><h3>Attendance History</h3></div>
        ${records.length ? `
          <div class="table-wrap"><table>
            <thead><tr><th>Employee</th><th>Date</th><th>Status</th></tr></thead>
            <tbody>${records.map(a => `
              <tr><td>${escapeHTML(a.employee)}</td><td>${escapeHTML(a.date)}</td><td>${badge(a.status)}</td></tr>
            `).join('')}</tbody>
          </table></div>
        ` : '<div class="empty-state">No attendance records available.</div>'}
      </div>
    `;
  }

  if (currentScreen === 'leaves') {
    const visibleLeaves = admin ? leaves : myLeaves;

    return `
      <div class="section-heading">
        <div><h1>Leave Management</h1>
        <p class="muted">${admin ? 'Review and manage employee leave requests.' : 'Submit and monitor your leave requests.'}</p></div>
        ${!admin ? '<button class="gold-button" id="applyLeave">+ Apply for Leave</button>' : ''}
      </div>

      <div class="panel">
        <div class="panel-heading"><h3>${admin ? 'All Leave Requests' : 'My Leave History'}</h3></div>
        ${leavesTable(visibleLeaves, admin)}
      </div>
    `;
  }

  if (currentScreen === 'salary') {
    const visibleSalary = admin ? salaries : mySalary;

    return `
      <div class="section-heading">
        <div><h1>${admin ? 'Salary & Payroll' : 'My Salary'}</h1>
        <p class="muted">${admin ? 'Manage payroll and employee salary records.' : 'View your recorded salary details.'}</p></div>
        ${admin ? '<button class="gold-button" id="addSalary">+ Add Payroll</button>' : ''}
      </div>

      <div class="panel">
        <div class="panel-heading"><h3>${admin ? 'Payroll Records' : 'My Salary Records'}</h3></div>
        ${visibleSalary.length ? `
          <div class="table-wrap"><table>
            <thead><tr><th>Employee</th><th>Month</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>${visibleSalary.map(s => `
              <tr><td>${escapeHTML(s.employee)}</td>
              <td>${escapeHTML(s.month)}</td>
              <td>${money(s.amount)}</td><td>${badge(s.status)}</td></tr>
            `).join('')}</tbody>
          </table></div>
        ` : '<div class="empty-state">No salary records available.</div>'}
      </div>
    `;
  }

  return denied();
}

// TABLE HELPERS

function employeeTable(list) {
  if (!list.length) return '<div class="empty-state">No employees found.</div>';

  return `<table>
    <thead><tr><th>Employee</th><th>Department</th><th>Designation</th><th>Email</th><th>Salary</th><th>Actions</th></tr></thead>
    <tbody>${list.map(e => `
      <tr>
        <td><strong>${escapeHTML(e.name)}</strong><small class="cell-sub">${escapeHTML(e.username)}</small></td>
        <td>${escapeHTML(e.department)}</td>
        <td>${escapeHTML(e.designation)}</td>
        <td>${escapeHTML(e.email)}</td>
        <td>${money(e.salary)}</td>
        <td>
          <button class="table-action" data-edit="${e.id}">Edit</button>
          <button class="table-action danger" data-delete="${e.id}">Delete</button>
        </td>
      </tr>
    `).join('')}</tbody>
  </table>`;
}

function taskTable(list, allowUpdate) {
  if (!list.length) return '<div class="empty-state">No tasks available.</div>';

  return `<div class="table-wrap"><table>
    <thead><tr><th>Task</th><th>Project</th><th>Employee</th><th>Deadline</th><th>Status</th>${allowUpdate ? '<th>Update</th>' : ''}</tr></thead>
    <tbody>${list.map(t => `
      <tr>
        <td><strong>${escapeHTML(t.title)}</strong></td>
        <td>${escapeHTML(t.project)}</td>
        <td>${escapeHTML(t.employee)}</td>
        <td>${escapeHTML(t.deadline)}</td>
        <td>${badge(t.status)}</td>
        ${allowUpdate ? `<td>
          <select class="status-select" data-task="${t.id}">
            ${['Pending', 'Ongoing', 'Completed'].map(s =>
              `<option ${t.status === s ? 'selected' : ''}>${s}</option>`
            ).join('')}
          </select>
        </td>` : ''}
      </tr>
    `).join('')}</tbody>
  </table></div>`;
}

function leavesTable(list, admin = false) {
  if (!list.length) return '<div class="empty-state">No leave requests available.</div>';

  return `<div class="table-wrap"><table>
    <thead><tr><th>Employee</th><th>Leave Type</th><th>From</th><th>To</th><th>Status</th>${admin ? '<th>Action</th>' : ''}</tr></thead>
    <tbody>${list.map(l => `
      <tr>
        <td>${escapeHTML(l.employee)}</td>
        <td>${escapeHTML(l.type)}</td>
        <td>${escapeHTML(l.from)}</td>
        <td>${escapeHTML(l.to)}</td>
        <td>${badge(l.status)}</td>
        ${admin ? `<td>
          ${l.status === 'Pending' ? `
            <button class="table-action" data-leave="${l.id}" data-decision="Approved">Approve</button>
            <button class="table-action danger" data-leave="${l.id}" data-decision="Rejected">Reject</button>
          ` : '—'}
        </td>` : ''}
      </tr>
    `).join('')}</tbody>
  </table></div>`;
}

function denied() {
  return '<div class="panel empty-state">You do not have permission to view this section.</div>';
}

// PAGE ACTIONS

function bindPageActions() {
  const goButtons = document.querySelectorAll('[data-go]');
  goButtons.forEach(button => button.onclick = () => {
    currentScreen = button.dataset.go;
    renderApp();
  });

  const addEmployee = document.querySelector('#addEmployee');
  if (addEmployee) addEmployee.onclick = () => {
    const name = prompt('Employee full name:');
    if (!name) return;

    const username = prompt('Employee username:');
    const department = prompt('Department:');
    const designation = prompt('Designation:');
    const email = prompt('Email:');
    const salary = Number(prompt('Monthly salary:'));

    if (!username || !department || !designation || !email || !Number.isFinite(salary) || salary <= 0) {
      alert('Please enter valid employee details.');
      return;
    }

    if (employees.some(e => e.username.toLowerCase() === username.trim().toLowerCase())) {
      alert('Username already exists.');
      return;
    }

    employees.push({
      id: Date.now(), name, username, department, designation, email, salary
    });

    saveData('employees', employees);
    renderApp();
  };

  const search = document.querySelector('#employeeSearch');
  if (search) search.oninput = () => {
    const query = search.value.toLowerCase();
    const filtered = employees.filter(e =>
      [e.name, e.username, e.department, e.email].some(
        value => value.toLowerCase().includes(query)
      )
    );
    document.querySelector('#employeeTable').innerHTML = employeeTable(filtered);
    bindEmployeeActions();
  };

  bindEmployeeActions();

  const addTask = document.querySelector('#addTask');
  if (addTask) addTask.onclick = () => {
    if (!employees.length) return alert('Add employees first.');

    const title = prompt('Task title:');
    if (!title) return;

    const project = prompt('Project name:') || 'General';
    const employee = prompt(
      'Enter employee username:\n' +
      employees.map(e => e.username + ' - ' + e.name).join('\n')
    );

    const selected = employees.find(e => e.username === employee);

    if (!selected) return alert('Employee username not found.');

    const deadline = prompt('Deadline (YYYY-MM-DD):', today());
    if (!deadline || !/^\d{4}-\d{2}-\d{2}$/.test(deadline) ||
        Number.isNaN(Date.parse(deadline))) {
      return alert('Enter a valid deadline in YYYY-MM-DD format.');
    }

    tasks.push({
      id: Date.now(), title, project,
      employee: selected.name,
      status: 'Pending',
      deadline
    });

    saveData('tasks', tasks);
    renderApp();
  };

  document.querySelectorAll('[data-task]').forEach(select => {
    select.onchange = () => {
      const task = tasks.find(t => t.id === Number(select.dataset.task));
      if (!task) return;
      task.status = select.value;
      saveData('tasks', tasks);
      renderApp();
    };
  });

  document.querySelectorAll('[data-leave]').forEach(button => {
    button.onclick = () => {
      const leave = leaves.find(l => l.id === Number(button.dataset.leave));
      if (!leave) return;
      leave.status = button.dataset.decision;
      saveData('leaves', leaves);
      renderApp();
    };
  });

  const markAttendance = document.querySelector('#markAttendance');
  if (markAttendance) markAttendance.onclick = () => {
    if (attendance.some(a => a.employee === currentUser.name && a.date === today())) {
      return alert('Attendance already marked today.');
    }

    attendance.push({
      id: Date.now(), employee: currentUser.name,
      date: today(), status: 'Present'
    });

    saveData('attendance', attendance);
    renderApp();
  };

  const applyLeave = document.querySelector('#applyLeave');
  if (applyLeave) applyLeave.onclick = () => {
    const type = prompt('Leave type (Casual / Medical / Other):');
    if (!type) return;
    const from = prompt('From date (YYYY-MM-DD):');
    const to = prompt('To date (YYYY-MM-DD):');
    const reason = prompt('Reason for leave:');

    if (!from || !to || !reason ||
        !/^\d{4}-\d{2}-\d{2}$/.test(from) ||
        !/^\d{4}-\d{2}-\d{2}$/.test(to) ||
        Number.isNaN(Date.parse(from)) ||
        Number.isNaN(Date.parse(to)) ||
        from > to) {
      return alert('Enter valid leave dates and reason.');
    }

    leaves.push({
      id: Date.now(), employee: currentUser.name,
      type, from, to, reason, status: 'Pending'
    });

    saveData('leaves', leaves);
    renderApp();
  };

  const addSalary = document.querySelector('#addSalary');
  if (addSalary) addSalary.onclick = () => {
    if (!employees.length) return alert('Add employees first.');

    const username = prompt(
      'Employee username:\n' + employees.map(e => e.username).join('\n')
    );

    const employee = employees.find(e => e.username === username);
    if (!employee) return alert('Employee not found.');

    const amount = Number(prompt('Salary amount:'));
    if (!Number.isFinite(amount) || amount <= 0) return alert('Invalid amount.');

    const month = prompt('Payroll month:', 'November 2026');
    if (!month) return;

    salaries.push({
      employee: employee.name, month, amount, status: 'Pending'
    });

    saveData('salaries', salaries);
    renderApp();
  };
}

function bindEmployeeActions() {
  document.querySelectorAll('[data-delete]').forEach(button => {
    button.onclick = () => {
      const id = Number(button.dataset.delete);
      const employee = employees.find(e => e.id === id);
      if (!employee) return;

      if (!confirm(`Delete ${employee.name}?`)) return;

      employees = employees.filter(e => e.id !== id);
      saveData('employees', employees);
      renderApp();
    };
  });

  document.querySelectorAll('[data-edit]').forEach(button => {
    button.onclick = () => {
      const employee = employees.find(e => e.id === Number(button.dataset.edit));
      if (!employee) return;

      const name = prompt('Employee name:', employee.name);
      if (!name) return;

      employee.name = name;
      employee.department = prompt('Department:', employee.department) || employee.department;
      employee.designation = prompt('Designation:', employee.designation) || employee.designation;
      employee.email = prompt('Email:', employee.email) || employee.email;

      saveData('employees', employees);
      renderApp();
    };
  });
}

renderLogin();
