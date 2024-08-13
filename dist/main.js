"use strict";
let students = [];
const studentForm = document.getElementById('studentForm');
const studentTableBody = document.getElementById('studentTableBody');
const studentModal = new bootstrap.Modal(document.getElementById('studentModal'));
const studentIndexInput = document.getElementById('studentIndex');
studentForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const student = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        address: document.getElementById('address').value,
        birthDate: document.getElementById('birthDate').value,
        position: document.getElementById('position').value,
        typePosition: document.getElementById('typePosition').value,
        salary: parseFloat(document.getElementById('salary').value),
        isMarried: document.getElementById('isMarried').checked,
    };
    const studentIndex = studentIndexInput.value;
    if (studentIndex) {
        students[parseInt(studentIndex)] = student; // Update existing student
    }
    else {
        students.push(student); // Add new student
    }
    localStorage.setItem('students', JSON.stringify(students));
    studentModal.hide();
    studentForm.reset();
    studentIndexInput.value = '';
    renderStudents();
});
function renderStudents() {
    studentTableBody.innerHTML = '';
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
					<td>${index + 1}</td>
					<td>${student.firstName}</td>
					<td>${student.lastName}</td>
					<td>${student.address}</td>
					<td>${student.birthDate}</td>
					<td>${student.position}</td>
					<td>${student.typePosition}</td>
					<td>${student.salary}</td>
					<td>${student.isMarried ? 'Ha' : 'Yo\'q'}</td>
					<td>
							<button class="btn btn-sm btn-primary" onclick="editStudent(${index})">Tahrirlash</button>
							<button class="btn btn-sm btn-danger" onclick="deleteStudent(${index})">O'chirish</button>
					</td>
			`;
        studentTableBody.appendChild(row);
    });
}
function loadStudents() {
    const storedStudents = localStorage.getItem('students');
    if (storedStudents) {
        students = JSON.parse(storedStudents);
        renderStudents();
    }
}
function editStudent(index) {
    const student = students[index];
    document.getElementById('firstName').value = student.firstName;
    document.getElementById('lastName').value = student.lastName;
    document.getElementById('address').value = student.address;
    document.getElementById('birthDate').value = student.birthDate;
    document.getElementById('position').value = student.position;
    document.getElementById('typePosition').value = student.typePosition;
    document.getElementById('salary').value = student.salary.toString();
    document.getElementById('isMarried').checked = student.isMarried;
    studentIndexInput.value = index.toString();
    studentModal.show();
}
function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderStudents();
}
window.onload = loadStudents;
