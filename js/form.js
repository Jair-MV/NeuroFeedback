// DOM
const mainFormEl = document.querySelector(".main-form");
const ageInputEl = document.getElementById("age");
const tutorFieldsetEl = document.getElementById("tutorFieldset");

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

// Domain
function isAdult(age) {
    return age >= 18;
}

// Data
function buildPatientObject(formData) {
    const patientObject = {};

    for (const pair of formData.entries()) {
        const [key, value] = pair;

        patientObject[key] = value;
    }

    return patientObject;
}

// Render
function renderTutorFieldset(render = true) {
    if (render) {
        tutorFieldsetEl.classList.remove("u-hide");
        tutorFieldsetEl.disabled = false;
    } else {
        tutorFieldsetEl.classList.add("u-hide");
        tutorFieldsetEl.disabled = true;
    }
}

// Handler
function handleSubmitForm(e) {
    e.preventDefault();

    const formData = new FormData(this);

    const patientObject = buildPatientObject(formData);

    console.log(patientObject);
}

function handleInputAge(ageValue, isAdultFn) {
    const patientAge = Number(ageValue);
    const isPatientAdult = isAdultFn(patientAge);

    if (!isPatientAdult) renderTutorFieldset();
    if (isPatientAdult) renderTutorFieldset(false);
}

// Event
mainFormEl.addEventListener("submit", handleSubmitForm);
ageInputEl.addEventListener("change", function () {
    handleInputAge(this.value, isAdult);
});

// Init
populateForm();
