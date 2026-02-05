// DOM
const mainFormEl = document.querySelector(".main-form");

// Util
function populateForm() {
    const fullNameInputEl = document.getElementById("fullName");
    const ageInputEl = document.getElementById("age");
    const genderRadioEl = document.querySelector("input[name='gender']");
    const tutorFullNameInputEl = document.getElementById("tutorFullName");
    const relationshipSelectEl = document.getElementById("relationship");
    const emailInputEl = document.getElementById("email");
    const contactPhoneInputEl = document.getElementById("contactPhone");
    const notesTextAreaEl = document.getElementById("notes");
    const diagnosisInputEl = document.getElementById("diagnosis");
    const channelSelectEl = document.getElementById("channel");

    fullNameInputEl.value = "Jair Montiel";
    ageInputEl.value = 15;
    genderRadioEl.checked = true;
    tutorFullNameInputEl.value = "Martha Leticia Villegas Aguilar";
    relationshipSelectEl.value = "Madre";
    emailInputEl.value = "letyva71@gmail.com";
    contactPhoneInputEl.value = "55 67297412";
    notesTextAreaEl.value =
        "Presenta una constante falta de concentración en clases";
    diagnosisInputEl.value = "Ansiedad";
    channelSelectEl.value = "Referido";
}

function buildPatientObject(formData) {
    const patientObject = {};

    for (const pair of formData.entries()) {
        const [key, value] = pair;

        patientObject[key] = value;
    }

    return patientObject;
}

// Handler
function handleSubmitForm(e) {
    e.preventDefault();

    const formData = new FormData(this);

    const patientObject = buildPatientObject(formData);

    console.log(patientObject);
}

// Event
mainFormEl.addEventListener("submit", handleSubmitForm);

// Init
populateForm();
