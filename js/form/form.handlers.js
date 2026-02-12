import { isAdult } from "../shared/utils.js";
import { renderTutorFieldset } from "./form.ui.js";
import { updatePatient, createPatient } from "../patients/patients.api.js";

export function handleSubmitForm(e, patientId) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const patientObject = Object.fromEntries(formData.entries());

    if (patientId) {
        const updatedPatient = {
            ...patientObject,
            age: Number(patientObject.age),
            id: patientId,
        };

        updatePatient(updatedPatient);
    } else {
        createPatient(patientObject);
    }

    window.location.href = "../../index.html";
}

export function handleInputAge(ageValue) {
    const patientAge = Number(ageValue);
    const isPatientAdult = isAdult(patientAge);

    renderTutorFieldset(!isPatientAdult);
}
