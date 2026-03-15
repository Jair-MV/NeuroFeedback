export function handleInputAge({ age, tutorFieldsetEl, isAdult, ui }) {
    const patientAge = Number(age);
    const isPatientAdult = isAdult(patientAge);

    ui.renderTutorFieldset(tutorFieldsetEl, !isPatientAdult);
}
