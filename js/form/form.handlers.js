import { isAdult } from "../shared/utils.js";
import { renderTutorFieldset } from "./form.ui.js";
import { updatePatient, createPatient } from "../patients/patients.api.js";

export async function handleSubmitForm(e, patientId) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const patientObject = Object.fromEntries(formData.entries());
    patientObject.age = Number(patientObject.age);

    if (patientId) {
        const updatedPatient = {
            ...patientObject,
            id: patientId,
        };

        await updatePatient(updatedPatient);
    } else {
        await createPatient(patientObject);
    }

    window.location.href = "../../index.html";
}

export function handleInputAge(ageValue) {
    const patientAge = Number(ageValue);
    const isPatientAdult = isAdult(patientAge);

    renderTutorFieldset(!isPatientAdult);
}
