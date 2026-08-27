function setupStudentForm(){
    const form = document.getElementById("studentForm");
    if (!form) {
        return;
    }

    const identificationInput = document.getElementById("identification");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const programInput = document.getElementById("program");
    const ageInput = document.getElementById("age");

    form.addEventListener("submit", function(event){
        event.preventDefault();
        const student = {
            identification: identificationInput.value,
            name: nameInput.value,
            email : emailInput.value,
            program : programInput.value,
            age : ageInput.value
        };
        
        saveStudent(student);
        alert("Estudiante registrado correctamente.");
        console.log(student);
        form.reset();
        window.location.href = "index.html";
    });
}

const STORAGE_KEY = "students";
function getStudents(){
    const storedStudents = localStorage.getItem(STORAGE_KEY);
    if (storedStudents === null) {
        return [];
    }
    return JSON.parse(storedStudents);
}

function saveStudents(students){
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(students)
    );
}

function saveStudent(student){
    const students = getStudents();
    students.push(student);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

function deleteStudent(index) {
    const students = getStudents();
    students.splice(index, 1);
    saveStudents(students);
    displayStudents();
}

function displayStudents() {
    const studentList = document.getElementById("studentList");
    const emptyMessage = document.getElementById("noStudentsMessage");

    if (!studentList) {
        return;
    }
    const students = getStudents();
    const searchInput = document.getElementById("searchName");
    let searchText = "";
    if (searchInput) {
        searchText = searchInput.value.toLowerCase();
    }

    const filteredStudents = students.filter(function (student) {
        return student.name.toLowerCase().includes(searchText);
    });

    studentList.innerHTML = "";
    if (filteredStudents.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";
    filteredStudents.forEach(function (student) {
        const row = document.createElement("tr");
        const identification = document.createElement("td");
        identification.textContent = student.identification;

        const name = document.createElement("td");
        name.textContent = student.name;

        const email = document.createElement("td");
        email.textContent = student.email;

        const program = document.createElement("td");
        program.textContent = student.program;

        const age = document.createElement("td");
        age.textContent = student.age;

        const actions = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";

        deleteButton.addEventListener("click", function () {
            const students = getStudents();
            const studentIndex = students.indexOf(student);
            deleteStudent(studentIndex);
        });

        actions.appendChild(deleteButton);
        row.appendChild(identification);
        row.appendChild(name);
        row.appendChild(email);
        row.appendChild(program);
        row.appendChild(age);
        row.appendChild(actions);

        studentList.appendChild(row);
    });
}

function setupSearch() {
    const searchInput = document.getElementById("searchName");

    if (!searchInput) {
        return;
    }

    searchInput.addEventListener("input", function () {
        displayStudents();
    });
}