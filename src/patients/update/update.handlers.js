import { getURLPatientId } from "../../shared/service.js";

export async function handleUpdatePatient(e, repository) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const patientObject = Object.fromEntries(formData.entries());
    patientObject.age = Number(patientObject.age);

    const patientId = getURLPatientId();

    const modifiedPatientObject = { ...patientObject, id: patientId };
    await repository.updatePatient(modifiedPatientObject);

    window.location.href = "../../index.html";
}
