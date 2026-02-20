export function renderTutorFieldset(tutorFieldsetEl, render = true) {
    if (render) {
        tutorFieldsetEl.classList.remove("u-hide");
        tutorFieldsetEl.disabled = false;
    } else {
        tutorFieldsetEl.classList.add("u-hide");
        tutorFieldsetEl.disabled = true;
    }
}

export function populateForm(patient) {
    const fullNameInputEl = document.getElementById("fullName");
    const ageInputEl = document.getElementById("age");
    const genderRadioEl = document.querySelector(
        `input[name="gender"][value="${patient.gender}"]`,
    );
    const tutorFullNameInputEl = document.getElementById("tutorFullName");
    const relationshipSelectEl = document.getElementById("relationship");
    const emailInputEl = document.getElementById("email");
    const contactPhoneInputEl = document.getElementById("contactPhone");
    const notesTextAreaEl = document.getElementById("notes");
    const diagnosisInputEl = document.getElementById("diagnosis");
    const channelSelectEl = document.getElementById("channel");

    fullNameInputEl.value = patient.fullName;
    ageInputEl.value = patient.age;
    genderRadioEl.checked = true;
    tutorFullNameInputEl.value = patient.tutorFullName;
    relationshipSelectEl.value = patient.relationship;
    emailInputEl.value = patient.email;
    contactPhoneInputEl.value = patient.contactPhone;
    notesTextAreaEl.value = patient.notes;
    diagnosisInputEl.value = patient.diagnosis;
    // channelSelectEl.value = patient.channel;
}

export function updateButtonText() {
    const mainFormButtonEl = document.querySelector(".main-form__button");
    mainFormButtonEl.innerHTML = `<ion-icon name="person-add-outline"></ion-icon> Actualizar`;
}

export function renderStatusPill(container) {
    const statusPillMarkup = `
        <div class="main-form__status-pill">Editando</div>
    `;

    container.insertAdjacentHTML("afterbegin", statusPillMarkup);
}
