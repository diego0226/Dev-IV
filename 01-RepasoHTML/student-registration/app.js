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
            id : identificationInput.value,
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