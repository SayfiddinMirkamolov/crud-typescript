interface Student {
	firstName: string;
	lastName: string;
	address: string;
	birthDate: string;
	position: string;
	typePosition: string;
	salary: number;
	isMarried: boolean;
}

let students: Student[] = [];

const studentForm = document.getElementById('studentForm') as HTMLFormElement;
const studentTableBody = document.getElementById('studentTableBody') as HTMLTableElement;
const studentModal = new bootstrap.Modal(document.getElementById('studentModal')!);
const studentIndexInput = document.getElementById('studentIndex') as HTMLInputElement;

const searchFirstNameInput = document.getElementById('searchFirstName') as HTMLInputElement;
const searchLastNameInput = document.getElementById('searchLastName') as HTMLInputElement;
const filterPositionSelect = document.getElementById('filterPosition') as HTMLSelectElement;
const filterIsMarriedSelect = document.getElementById('filterIsMarried') as HTMLSelectElement;
const sortSalaryButton = document.getElementById('sortSalary') as HTMLButtonElement;

let sortAscending = true;

studentForm.addEventListener('submit', function (e) {
	e.preventDefault();

	const student: Student = {
		firstName: (document.getElementById('firstName') as HTMLInputElement).value,
		lastName: (document.getElementById('lastName') as HTMLInputElement).value,
		address: (document.getElementById('address') as HTMLInputElement).value,
		birthDate: (document.getElementById('birthDate') as HTMLInputElement).value,
		position: (document.getElementById('position') as HTMLSelectElement).value,
		typePosition: (document.getElementById('typePosition') as HTMLSelectElement).value,
		salary: parseFloat((document.getElementById('salary') as HTMLInputElement).value),
		isMarried: (document.getElementById('isMarried') as HTMLInputElement).checked,
	};

	const studentIndex = studentIndexInput.value;
	if (studentIndex) {
		students[parseInt(studentIndex)] = student; // Update existing student
	} else {
		students.push(student); // Add new student
	}

	localStorage.setItem('students', JSON.stringify(students));
	studentModal.hide();
	studentForm.reset();
	studentIndexInput.value = '';
	renderStudents();
});

function renderStudents() {
	let filteredStudents = students;

	const searchFirstName = searchFirstNameInput.value.toLowerCase();
	const searchLastName = searchLastNameInput.value.toLowerCase();
	const filterPosition = filterPositionSelect.value;
	const filterIsMarried = filterIsMarriedSelect.value;

	if (searchFirstName) {
		filteredStudents = filteredStudents.filter(student => student.firstName.toLowerCase().includes(searchFirstName));
	}
	if (searchLastName) {
		filteredStudents = filteredStudents.filter(student => student.lastName.toLowerCase().includes(searchLastName));
	}
	if (filterPosition) {
		filteredStudents = filteredStudents.filter(student => student.position === filterPosition);
	}
	if (filterIsMarried) {
		filteredStudents = filteredStudents.filter(student => student.isMarried.toString() === filterIsMarried);
	}

	if (!sortAscending) {
		filteredStudents.sort((a, b) => b.salary - a.salary);
	} else {
		filteredStudents.sort((a, b) => a.salary - b.salary);
	}

	studentTableBody.innerHTML = '';
	filteredStudents.forEach((student, index) => {
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

function editStudent(index: number) {
	const student = students[index];
	(document.getElementById('firstName') as HTMLInputElement).value = student.firstName;
	(document.getElementById('lastName') as HTMLInputElement).value = student.lastName;
	(document.getElementById('address') as HTMLInputElement).value = student.address;
	(document.getElementById('birthDate') as HTMLInputElement).value = student.birthDate;
	(document.getElementById('position') as HTMLSelectElement).value = student.position;
	(document.getElementById('typePosition') as HTMLSelectElement).value = student.typePosition;
	(document.getElementById('salary') as HTMLInputElement).value = student.salary.toString();
	(document.getElementById('isMarried') as HTMLInputElement).checked = student.isMarried;

	studentIndexInput.value = index.toString();
	studentModal.show();
}

function deleteStudent(index: number) {
	students.splice(index, 1);
	localStorage.setItem('students', JSON.stringify(students));
	renderStudents();
}

sortSalaryButton.addEventListener('click', function () {
	sortAscending = !sortAscending;
	renderStudents();
});

searchFirstNameInput.addEventListener('input', renderStudents);
searchLastNameInput.addEventListener('input', renderStudents);
filterPositionSelect.addEventListener('change', renderStudents);
filterIsMarriedSelect.addEventListener('change', renderStudents);

window.onload = loadStudents;
