import { isAdult } from "../shared/utils.js";
import { renderTutorFieldset } from "./form.ui.js";

export function handleSubmitForm(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const patientObject = Object.fromEntries(formData.entries());

    console.log(patientObject);
}

export function handleInputAge(ageValue) {
    const patientAge = Number(ageValue);
    const isPatientAdult = isAdult(patientAge);

    renderTutorFieldset(!isPatientAdult);
}
