function register() {
  let username = document.getElementById('reg-username').value;
  let password = document.getElementById('reg-password').value;
  
  if (!username || !password) {
    alert("Please fill in all fields");
    return;
  }
  
  let users = JSON.parse(localStorage.getItem('users')) || {};
  if (users[username]) {
    alert("Username already exists!");
    return;
  }
  
  users[username] = password;
  localStorage.setItem('users', JSON.stringify(users));
  alert("Registered successfully!");
}

function login() {
  let username = document.getElementById('login-username').value;
  let password = document.getElementById('login-password').value;
  
  let users = JSON.parse(localStorage.getItem('users')) || {};
  
  if (users[username] && users[username] === password) {
    localStorage.setItem('currentUser', username);
    document.getElementById("attendance-section").style.display = "block";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "none";
    displayAttendance();
  } else {
    alert("Invalid login credentials!");
  }
}

function markAttendance() {
  let username = localStorage.getItem('currentUser');
  if (!username) {
    alert("Please log in first!");
    return;
  }
  
  let attendance = JSON.parse(localStorage.getItem('attendance')) || [];
  let timestamp = new Date().toLocaleString();
  attendance.push({ username: username, time: timestamp });
  localStorage.setItem('attendance', JSON.stringify(attendance));
  displayAttendance();
  alert("Attendance marked!");
}

function eraseTodayAttendance() {
  let attendance = JSON.parse(localStorage.getItem('attendance')) || [];
  
  let today = new Date().toLocaleDateString();
  attendance = attendance.filter(entry => {
    let entryDate = new Date(entry.time).toLocaleDateString();
    return entryDate !== today;
  });
  
  localStorage.setItem('attendance', JSON.stringify(attendance));
  displayAttendance();
  alert("Today's attendance has been erased!");
}

function displayAttendance() {
  let attendance = JSON.parse(localStorage.getItem('attendance')) || [];
  let table = document.getElementById('attendance-list');
  table.innerHTML = '';
  
  attendance.forEach(entry => {
    let row = document.createElement('tr');
    row.innerHTML = `<td>${entry.username}</td><td>${entry.time}</td>`;
    table.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem('currentUser')) {
    document.getElementById("attendance-section").style.display = "block";
    displayAttendance();
  }
});