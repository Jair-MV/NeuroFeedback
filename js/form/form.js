import { mainFormEl, ageInputEl } from "./form.dom.js";
import { handleSubmitForm, handleInputAge } from "./form.handlers.js";

import { loadPatients, loadPatient } from "../patients/patients.api.js";

import {
    renderTutorFieldset,
    populateForm,
    updateButtonText,
} from "./form.ui.js";

import { isAdult } from "../shared/utils.js";

function getPatientId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("patientId");
}

const patientId = getPatientId();

// Event
mainFormEl.addEventListener("submit", function (e) {
    handleSubmitForm(e, patientId);
});
ageInputEl.addEventListener("change", function () {
    handleInputAge(this.value);
});

async function init() {
    await loadPatients();

    // Modo edición
    if (patientId) {
        const patient = await loadPatient(patientId);

        if (!isAdult(patient.age)) renderTutorFieldset();

        populateForm(patient);

        updateButtonText();
    }
}

init();
