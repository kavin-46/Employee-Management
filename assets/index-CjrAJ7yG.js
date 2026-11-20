(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.querySelector(`#app`),t=[{id:1,name:`Arun Kumar`,username:`employee`,department:`IT`,designation:`Developer`,email:`arun@company.com`,salary:35e3},{id:2,name:`Priya Sharma`,username:`priya`,department:`HR`,designation:`HR Executive`,email:`priya@company.com`,salary:32e3},{id:3,name:`Rahul Das`,username:`rahul`,department:`Finance`,designation:`Accountant`,email:`rahul@company.com`,salary:3e4},{id:4,name:`Meena Devi`,username:`meena`,department:`Marketing`,designation:`Manager`,email:`meena@company.com`,salary:42e3}],n=(e,t)=>{try{let n=localStorage.getItem(`ems_`+e);return n?JSON.parse(n):t}catch{return t}},r=(e,t)=>{localStorage.setItem(`ems_`+e,JSON.stringify(t))},i=n(`employees`,t),a=n(`tasks`,[{id:1,title:`Website Development`,project:`Company Website`,employee:`Arun Kumar`,status:`Ongoing`,deadline:`2026-11-20`},{id:2,title:`Prepare Monthly Report`,project:`Finance Report`,employee:`Rahul Das`,status:`Pending`,deadline:`2026-11-25`},{id:3,title:`Employee Records Update`,project:`HR Management`,employee:`Priya Sharma`,status:`Completed`,deadline:`2026-11-10`}]),o=n(`leaves`,[{id:1,employee:`Arun Kumar`,type:`Casual Leave`,from:`2026-11-15`,to:`2026-11-16`,reason:`Personal work`,status:`Pending`},{id:2,employee:`Priya Sharma`,type:`Medical Leave`,from:`2026-11-12`,to:`2026-11-13`,reason:`Medical appointment`,status:`Approved`}]),s=n(`attendance`,[]),c=n(`salaries`,[{employee:`Arun Kumar`,month:`November 2026`,amount:35e3,status:`Paid`},{employee:`Priya Sharma`,month:`November 2026`,amount:32e3,status:`Pending`},{employee:`Rahul Das`,month:`November 2026`,amount:3e4,status:`Paid`},{employee:`Meena Devi`,month:`November 2026`,amount:42e3,status:`Pending`}]),l=null,u=`dashboard`,d=[[`dashboard`,`▦`,`Dashboard`],[`employees`,`♙`,`Employees`],[`tasks`,`▤`,`Projects & Tasks`],[`attendance`,`◷`,`Attendance`],[`leaves`,`▧`,`Leave Management`],[`salary`,`₹`,`Salary & Payroll`]],f=[[`dashboard`,`▦`,`Dashboard`],[`tasks`,`▤`,`My Tasks`],[`attendance`,`◷`,`My Attendance`],[`leaves`,`▧`,`My Leave`],[`salary`,`₹`,`My Salary`]],p=e=>`₹`+Number(e).toLocaleString(`en-IN`),m=()=>new Date().toISOString().slice(0,10),h=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),g=e=>`<span class="badge ${{Pending:`pending`,Ongoing:`ongoing`,Completed:`completed`,Approved:`approved`,Rejected:`rejected`,Present:`approved`,Absent:`rejected`,Paid:`completed`}[e]||`pending`}">${h(e)}</span>`;function _(){e.innerHTML=`
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
  `;let t=`admin`;document.querySelectorAll(`.role-tab`).forEach(e=>{e.onclick=()=>{t=e.dataset.role,document.querySelectorAll(`.role-tab`).forEach(t=>t.classList.toggle(`active`,t===e)),document.querySelector(`#loginMessage`).textContent=``}}),document.querySelector(`#showPassword`).onclick=()=>{let e=document.querySelector(`#password`);e.type=e.type===`password`?`text`:`password`,document.querySelector(`#showPassword`).textContent=e.type===`password`?`Show`:`Hide`},document.querySelector(`#loginForm`).onsubmit=e=>{e.preventDefault();let n=document.querySelector(`#username`).value.trim(),r=document.querySelector(`#password`).value;(t===`admin`?n===`admin`&&r===`admin123`:n===`employee`&&r===`employee123`)?(l=t===`admin`?{role:`admin`,name:`Administrator`,username:n}:{role:`employee`,name:i.find(e=>e.username===n)?.name||`Arun Kumar`,username:n},u=`dashboard`,v()):document.querySelector(`#loginMessage`).textContent=`Invalid demo username or password.`}}function v(){let t=l.role===`admin`?d:f;e.innerHTML=`
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
          ${t.map(([e,t,n])=>`
            <button class="nav-item ${u===e?`selected`:``}"
                    data-screen="${e}">
              <span class="nav-icon">${t}</span>
              ${n}
            </button>
          `).join(``)}
        </nav>

        <div class="sidebar-bottom">
          <div class="profile-mini">
            <div class="avatar">${h(l.name[0])}</div>
            <div>
              <strong>${h(l.name)}</strong>
              <small>${l.role===`admin`?`Administrator`:`Employee`}</small>
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
              <div class="breadcrumb">WORKSPACE / ${u.toUpperCase()}</div>
              <h2>${t.find(e=>e[0]===u)?.[2]||`Dashboard`}</h2>
            </div>
          </div>

          <div class="topbar-right">
            <span class="today-label">${new Date().toLocaleDateString(`en-IN`,{day:`2-digit`,month:`short`,year:`numeric`})}</span>
            <div class="avatar top-avatar">${h(l.name[0])}</div>
          </div>
        </header>

        <section class="page-content" id="pageContent">
          ${y()}
        </section>

        <footer class="app-footer">
          EMS Employee Management System · 2026
        </footer>
      </main>
    </div>
  `,document.querySelectorAll(`[data-screen]`).forEach(e=>{e.onclick=()=>{u=e.dataset.screen,v()}}),document.querySelector(`#logout`).onclick=()=>{l=null,_()},document.querySelector(`#menuToggle`).onclick=()=>{document.querySelector(`#sidebar`).classList.toggle(`show`)},w()}function y(){let e=l.role===`admin`,t=a.filter(e=>e.employee===l.name),n=o.filter(e=>e.employee===l.name),r=c.filter(e=>e.employee===l.name);if(u===`dashboard`){let c=s.filter(e=>e.date===m()&&e.status===`Present`).length,u=e?[[`TOTAL EMPLOYEES`,i.length,`♙`,`Active workforce`],[`DEPARTMENTS`,new Set(i.map(e=>e.department)).size,`▦`,`Departments`],[`PRESENT TODAY`,c,`◷`,`Attendance records`],[`PENDING LEAVES`,o.filter(e=>e.status===`Pending`).length,`▧`,`Awaiting approval`]]:[[`MY TASKS`,t.length,`▤`,`Assigned tasks`],[`PENDING TASKS`,t.filter(e=>e.status===`Pending`).length,`◷`,`Awaiting action`],[`MY LEAVES`,n.length,`▧`,`Leave requests`],[`MY SALARY`,p(r.reduce((e,t)=>e+Number(t.amount),0)),`₹`,`Recorded payroll`]];return`
      <div class="welcome-row">
        <div>
          <div class="gold-label">OVERVIEW</div>
          <h1>Hello, ${h(l.name)} 👋</h1>
          <p class="muted">${e?`Here is what is happening across your organization today.`:`Welcome to your personal employee workspace.`}</p>
        </div>
        <span class="role-pill">${e?`ADMIN ACCESS`:`EMPLOYEE ACCESS`}</span>
      </div>

      <div class="stats-grid">
        ${u.map(([e,t,n,r])=>`
          <div class="stat-card">
            <div class="stat-top">
              <span>${e}</span>
              <span class="stat-icon">${n}</span>
            </div>
            <h2>${t}</h2>
            <small>${r}</small>
          </div>
        `).join(``)}
      </div>

      <div class="content-grid">
        <div class="panel">
          <div class="panel-heading">
            <div><h3>${e?`Recent Tasks`:`My Assigned Tasks`}</h3>
            <p>Task progress overview</p></div>
            <button class="text-button" data-go="tasks">View all →</button>
          </div>
          ${x(e?a.slice(0,4):t.slice(0,4),!1)}
        </div>

        <div class="panel">
          <div class="panel-heading">
            <div><h3>${e?`Leave Requests`:`My Leave Requests`}</h3>
            <p>Latest leave activity</p></div>
            <button class="text-button" data-go="leaves">View all →</button>
          </div>
          ${S(e?o.slice(0,4):n.slice(0,4))}
        </div>
      </div>
    `}if(u===`employees`)return e?`
      <div class="section-heading">
        <div><h1>Employee Directory</h1><p class="muted">Manage your organization's workforce.</p></div>
        <button class="gold-button" id="addEmployee">+ Add Employee</button>
      </div>

      <div class="panel">
        <div class="table-toolbar">
          <h3>All Employees (${i.length})</h3>
          <input id="employeeSearch" placeholder="Search employees...">
        </div>
        <div class="table-wrap" id="employeeTable">${b(i)}</div>
      </div>
    `:C();if(u===`tasks`){let n=e?a:t;return`
      <div class="section-heading">
        <div><h1>${e?`Projects & Tasks`:`My Tasks`}</h1>
        <p class="muted">${e?`Assign and monitor employee tasks.`:`View and update your assigned work.`}</p></div>
        ${e?`<button class="gold-button" id="addTask">+ Assign Task</button>`:``}
      </div>

      <div class="task-stats">
        ${[`Pending`,`Ongoing`,`Completed`].map(e=>`
          <div class="mini-stat">
            <span>${e}</span>
            <strong>${n.filter(t=>t.status===e).length}</strong>
          </div>
        `).join(``)}
      </div>

      <div class="panel">
        <div class="panel-heading"><h3>${e?`All Assigned Tasks`:`Assigned to Me`}</h3></div>
        ${x(n,!0)}
      </div>
    `}if(u===`attendance`){let t=s.filter(t=>e||t.employee===l.name);return`
      <div class="section-heading">
        <div><h1>Attendance Management</h1>
        <p class="muted">${e?`Review employee attendance records.`:`Mark and view your attendance.`}</p></div>
        ${e?``:`<button class="gold-button" id="markAttendance">✓ Mark Present Today</button>`}
      </div>

      <div class="stats-grid">
        ${[[`Present`,t.filter(e=>e.status===`Present`).length],[`Absent`,t.filter(e=>e.status===`Absent`).length],[`Total Records`,t.length]].map(([e,t])=>`
          <div class="stat-card"><span>${e}</span><h2>${t}</h2></div>
        `).join(``)}
      </div>

      <div class="panel">
        <div class="panel-heading"><h3>Attendance History</h3></div>
        ${t.length?`
          <div class="table-wrap"><table>
            <thead><tr><th>Employee</th><th>Date</th><th>Status</th></tr></thead>
            <tbody>${t.map(e=>`
              <tr><td>${h(e.employee)}</td><td>${h(e.date)}</td><td>${g(e.status)}</td></tr>
            `).join(``)}</tbody>
          </table></div>
        `:`<div class="empty-state">No attendance records available.</div>`}
      </div>
    `}if(u===`leaves`)return`
      <div class="section-heading">
        <div><h1>Leave Management</h1>
        <p class="muted">${e?`Review and manage employee leave requests.`:`Submit and monitor your leave requests.`}</p></div>
        ${e?``:`<button class="gold-button" id="applyLeave">+ Apply for Leave</button>`}
      </div>

      <div class="panel">
        <div class="panel-heading"><h3>${e?`All Leave Requests`:`My Leave History`}</h3></div>
        ${S(e?o:n,e)}
      </div>
    `;if(u===`salary`){let t=e?c:r;return`
      <div class="section-heading">
        <div><h1>${e?`Salary & Payroll`:`My Salary`}</h1>
        <p class="muted">${e?`Manage payroll and employee salary records.`:`View your recorded salary details.`}</p></div>
        ${e?`<button class="gold-button" id="addSalary">+ Add Payroll</button>`:``}
      </div>

      <div class="panel">
        <div class="panel-heading"><h3>${e?`Payroll Records`:`My Salary Records`}</h3></div>
        ${t.length?`
          <div class="table-wrap"><table>
            <thead><tr><th>Employee</th><th>Month</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>${t.map(e=>`
              <tr><td>${h(e.employee)}</td>
              <td>${h(e.month)}</td>
              <td>${p(e.amount)}</td><td>${g(e.status)}</td></tr>
            `).join(``)}</tbody>
          </table></div>
        `:`<div class="empty-state">No salary records available.</div>`}
      </div>
    `}return C()}function b(e){return e.length?`<table>
    <thead><tr><th>Employee</th><th>Department</th><th>Designation</th><th>Email</th><th>Salary</th><th>Actions</th></tr></thead>
    <tbody>${e.map(e=>`
      <tr>
        <td><strong>${h(e.name)}</strong><small class="cell-sub">${h(e.username)}</small></td>
        <td>${h(e.department)}</td>
        <td>${h(e.designation)}</td>
        <td>${h(e.email)}</td>
        <td>${p(e.salary)}</td>
        <td>
          <button class="table-action" data-edit="${e.id}">Edit</button>
          <button class="table-action danger" data-delete="${e.id}">Delete</button>
        </td>
      </tr>
    `).join(``)}</tbody>
  </table>`:`<div class="empty-state">No employees found.</div>`}function x(e,t){return e.length?`<div class="table-wrap"><table>
    <thead><tr><th>Task</th><th>Project</th><th>Employee</th><th>Deadline</th><th>Status</th>${t?`<th>Update</th>`:``}</tr></thead>
    <tbody>${e.map(e=>`
      <tr>
        <td><strong>${h(e.title)}</strong></td>
        <td>${h(e.project)}</td>
        <td>${h(e.employee)}</td>
        <td>${h(e.deadline)}</td>
        <td>${g(e.status)}</td>
        ${t?`<td>
          <select class="status-select" data-task="${e.id}">
            ${[`Pending`,`Ongoing`,`Completed`].map(t=>`<option ${e.status===t?`selected`:``}>${t}</option>`).join(``)}
          </select>
        </td>`:``}
      </tr>
    `).join(``)}</tbody>
  </table></div>`:`<div class="empty-state">No tasks available.</div>`}function S(e,t=!1){return e.length?`<div class="table-wrap"><table>
    <thead><tr><th>Employee</th><th>Leave Type</th><th>From</th><th>To</th><th>Status</th>${t?`<th>Action</th>`:``}</tr></thead>
    <tbody>${e.map(e=>`
      <tr>
        <td>${h(e.employee)}</td>
        <td>${h(e.type)}</td>
        <td>${h(e.from)}</td>
        <td>${h(e.to)}</td>
        <td>${g(e.status)}</td>
        ${t?`<td>
          ${e.status===`Pending`?`
            <button class="table-action" data-leave="${e.id}" data-decision="Approved">Approve</button>
            <button class="table-action danger" data-leave="${e.id}" data-decision="Rejected">Reject</button>
          `:`—`}
        </td>`:``}
      </tr>
    `).join(``)}</tbody>
  </table></div>`:`<div class="empty-state">No leave requests available.</div>`}function C(){return`<div class="panel empty-state">You do not have permission to view this section.</div>`}function w(){document.querySelectorAll(`[data-go]`).forEach(e=>e.onclick=()=>{u=e.dataset.go,v()});let e=document.querySelector(`#addEmployee`);e&&(e.onclick=()=>{let e=prompt(`Employee full name:`);if(!e)return;let t=prompt(`Employee username:`),n=prompt(`Department:`),a=prompt(`Designation:`),o=prompt(`Email:`),s=Number(prompt(`Monthly salary:`));!t||!n||!a||!o||!Number.isFinite(s)||s<=0?alert(`Please enter valid employee details.`):i.some(e=>e.username.toLowerCase()===t.trim().toLowerCase())?alert(`Username already exists.`):(i.push({id:Date.now(),name:e,username:t,department:n,designation:a,email:o,salary:s}),r(`employees`,i),v())});let t=document.querySelector(`#employeeSearch`);t&&(t.oninput=()=>{let e=t.value.toLowerCase(),n=i.filter(t=>[t.name,t.username,t.department,t.email].some(t=>t.toLowerCase().includes(e)));document.querySelector(`#employeeTable`).innerHTML=b(n),T()}),T();let n=document.querySelector(`#addTask`);n&&(n.onclick=()=>{if(!i.length)return alert(`Add employees first.`);let e=prompt(`Task title:`);if(!e)return;let t=prompt(`Project name:`)||`General`,n=prompt(`Enter employee username:
`+i.map(e=>e.username+` - `+e.name).join(`
`)),o=i.find(e=>e.username===n);if(!o)return alert(`Employee username not found.`);let s=prompt(`Deadline (YYYY-MM-DD):`,m());if(!s||!/^\d{4}-\d{2}-\d{2}$/.test(s)||Number.isNaN(Date.parse(s)))return alert(`Enter a valid deadline in YYYY-MM-DD format.`);a.push({id:Date.now(),title:e,project:t,employee:o.name,status:`Pending`,deadline:s}),r(`tasks`,a),v()}),document.querySelectorAll(`[data-task]`).forEach(e=>{e.onchange=()=>{let t=a.find(t=>t.id===Number(e.dataset.task));t&&(t.status=e.value,r(`tasks`,a),v())}}),document.querySelectorAll(`[data-leave]`).forEach(e=>{e.onclick=()=>{let t=o.find(t=>t.id===Number(e.dataset.leave));t&&(t.status=e.dataset.decision,r(`leaves`,o),v())}});let d=document.querySelector(`#markAttendance`);d&&(d.onclick=()=>{if(s.some(e=>e.employee===l.name&&e.date===m()))return alert(`Attendance already marked today.`);s.push({id:Date.now(),employee:l.name,date:m(),status:`Present`}),r(`attendance`,s),v()});let f=document.querySelector(`#applyLeave`);f&&(f.onclick=()=>{let e=prompt(`Leave type (Casual / Medical / Other):`);if(!e)return;let t=prompt(`From date (YYYY-MM-DD):`),n=prompt(`To date (YYYY-MM-DD):`),i=prompt(`Reason for leave:`);if(!t||!n||!i||!/^\d{4}-\d{2}-\d{2}$/.test(t)||!/^\d{4}-\d{2}-\d{2}$/.test(n)||Number.isNaN(Date.parse(t))||Number.isNaN(Date.parse(n))||t>n)return alert(`Enter valid leave dates and reason.`);o.push({id:Date.now(),employee:l.name,type:e,from:t,to:n,reason:i,status:`Pending`}),r(`leaves`,o),v()});let p=document.querySelector(`#addSalary`);p&&(p.onclick=()=>{if(!i.length)return alert(`Add employees first.`);let e=prompt(`Employee username:
`+i.map(e=>e.username).join(`
`)),t=i.find(t=>t.username===e);if(!t)return alert(`Employee not found.`);let n=Number(prompt(`Salary amount:`));if(!Number.isFinite(n)||n<=0)return alert(`Invalid amount.`);let a=prompt(`Payroll month:`,`November 2026`);a&&(c.push({employee:t.name,month:a,amount:n,status:`Pending`}),r(`salaries`,c),v())})}function T(){document.querySelectorAll(`[data-delete]`).forEach(e=>{e.onclick=()=>{let t=Number(e.dataset.delete),n=i.find(e=>e.id===t);n&&confirm(`Delete ${n.name}?`)&&(i=i.filter(e=>e.id!==t),r(`employees`,i),v())}}),document.querySelectorAll(`[data-edit]`).forEach(e=>{e.onclick=()=>{let t=i.find(t=>t.id===Number(e.dataset.edit));if(!t)return;let n=prompt(`Employee name:`,t.name);n&&(t.name=n,t.department=prompt(`Department:`,t.department)||t.department,t.designation=prompt(`Designation:`,t.designation)||t.designation,t.email=prompt(`Email:`,t.email)||t.email,r(`employees`,i),v())}})}_();